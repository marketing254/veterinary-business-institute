const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(value) {
  if (!value) {
    return value;
  }

  if (/^(?:[a-z]+:)?\/\//i.test(value) || /^(?:mailto:|tel:|#)/i.test(value)) {
    return value;
  }

  return `${basePath}${value.startsWith("/") ? value : `/${value}`}`;
}

export { basePath };
