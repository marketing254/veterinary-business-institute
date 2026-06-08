import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const benchmarkPath = path.join(root, "site_autoresearch", "benchmark.json");
const reportPath = path.join(root, "site_autoresearch", "latest-report.json");
const resultsPath = path.join(root, "site_autoresearch", "results.tsv");
const benchmark = JSON.parse(fs.readFileSync(benchmarkPath, "utf8"));
const description = process.argv.slice(2).join(" ").trim() || "manual evaluation";

function countMatches(text, regex) {
  return (text.match(regex) || []).length;
}

function includesCaseInsensitive(text, value) {
  return text.toLowerCase().includes(value.toLowerCase());
}

function scoreThreshold(actual, target, points) {
  if (actual >= target) {
    return points;
  }

  return Math.max(0, Math.round((actual / target) * points));
}

const pageReports = benchmark.routes.map((routeConfig) => {
  const filePath = path.join(root, routeConfig.file);
  const exists = fs.existsSync(filePath);
  const source = exists ? fs.readFileSync(filePath, "utf8") : "";
  const sectionCount = countMatches(source, /<section/g);
  const buttonCount = countMatches(source, /className="button/g);
  const assetCount = countMatches(source, /\/assets\//g);
  const metadataPresent = /export const metadata\s*=/.test(source);
  const keywordHits = routeConfig.keywords.filter((item) => includesCaseInsensitive(source, item));
  const internalLinkHits = routeConfig.internalLinks.filter((item) =>
    source.includes(`href="${item}"`) || source.includes(`href='${item}'`)
  );

  const checks = [
    {
      label: "file exists",
      passed: exists,
      score: exists ? 10 : 0,
      possible: 10,
      actual: exists ? "present" : "missing",
      target: "present"
    },
    {
      label: "metadata export",
      passed: metadataPresent,
      score: metadataPresent ? 10 : 0,
      possible: 10,
      actual: metadataPresent,
      target: true
    },
    {
      label: "section count",
      passed: sectionCount >= routeConfig.minSections,
      score: scoreThreshold(sectionCount, routeConfig.minSections, 20),
      possible: 20,
      actual: sectionCount,
      target: routeConfig.minSections
    },
    {
      label: "button count",
      passed: buttonCount >= routeConfig.minButtons,
      score: scoreThreshold(buttonCount, routeConfig.minButtons, 15),
      possible: 15,
      actual: buttonCount,
      target: routeConfig.minButtons
    },
    {
      label: "asset usage",
      passed: assetCount >= routeConfig.minAssets,
      score: scoreThreshold(assetCount, routeConfig.minAssets, 10),
      possible: 10,
      actual: assetCount,
      target: routeConfig.minAssets
    },
    {
      label: "keyword coverage",
      passed: keywordHits.length === routeConfig.keywords.length,
      score: Math.round((keywordHits.length / routeConfig.keywords.length) * 25),
      possible: 25,
      actual: keywordHits,
      target: routeConfig.keywords
    },
    {
      label: "internal route links",
      passed: internalLinkHits.length === routeConfig.internalLinks.length,
      score: Math.round((internalLinkHits.length / routeConfig.internalLinks.length) * 10),
      possible: 10,
      actual: internalLinkHits,
      target: routeConfig.internalLinks
    }
  ];

  const score = checks.reduce((sum, item) => sum + item.score, 0);
  const possible = checks.reduce((sum, item) => sum + item.possible, 0);

  return {
    route: routeConfig.route,
    file: routeConfig.file,
    score,
    possible,
    percent: Number(((score / possible) * 100).toFixed(1)),
    checks
  };
});

const globalChecks = benchmark.globalChecks.map((relativePath) => {
  const exists = fs.existsSync(path.join(root, relativePath));

  return {
    file: relativePath,
    passed: exists,
    score: exists ? 10 : 0,
    possible: 10
  };
});

const totalScore =
  pageReports.reduce((sum, item) => sum + item.score, 0) +
  globalChecks.reduce((sum, item) => sum + item.score, 0);
const totalPossible =
  pageReports.reduce((sum, item) => sum + item.possible, 0) +
  globalChecks.reduce((sum, item) => sum + item.possible, 0);

const report = {
  generatedAt: new Date().toISOString(),
  description,
  reference: benchmark.reference,
  totalScore,
  totalPossible,
  percent: Number(((totalScore / totalPossible) * 100).toFixed(1)),
  globalChecks,
  pages: pageReports
};

fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

if (!fs.existsSync(resultsPath)) {
  fs.writeFileSync(resultsPath, "timestamp\ttotal_score\tstatus\tdescription\n");
}

fs.appendFileSync(
  resultsPath,
  `${report.generatedAt}\t${report.totalScore}/${report.totalPossible}\tok\t${description}\n`
);

console.log(JSON.stringify(report, null, 2));
