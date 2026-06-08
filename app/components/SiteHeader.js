"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import AttractButton from "./AttractButton";
import ThemeToggle from "./ThemeToggle";
import { withBasePath } from "../lib/base-path";
import { headerNavigation, topBarItems } from "../lib/site-data";
import { cn } from "../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";

export default function SiteHeader() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState(null);
  const sheetRef = useRef(null);

  // Close on route change
  useEffect(() => {
    setSheetOpen(false);
    setOpenMobileGroup(null);
  }, [pathname]);

  // Lock body scroll when sheet open
  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sheetOpen]);

  // Close on Escape
  useEffect(() => {
    if (!sheetOpen) return;
    function onKey(e) { if (e.key === "Escape") setSheetOpen(false); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheetOpen]);

  return (
    <>
      {/* ── Top Bar ── */}
      <header className="topbar">
        <div className="container topbar-grid">
          {topBarItems.map((item) => (
            <a className="topbar-item" href={item.href} key={item.label} target="_blank" rel="noreferrer">
              <span className="eyebrow">{item.label}</span>
              <span className="topbar-copy">{item.copy}</span>
            </a>
          ))}
        </div>
      </header>

      {/* ── Sticky Nav ── */}
      <nav className="nav" aria-label="Site navigation">
        <div className="container nav-row">
          <div className="nav-shell w-full">
            <div className="nav-inner-grid">

              {/* Logo */}
              <Link className="brand shrink-0" href="/" aria-label="Veterinary Business Institute home">
                <img className="brand-logo brand-logo-light" src={withBasePath("/assets/logo.svg")} alt="Veterinary Business Institute" />
                <img className="brand-logo brand-logo-dark" src={withBasePath("/assets/logo-white.svg")} alt="Veterinary Business Institute" />
              </Link>

              {/* Desktop Nav */}
              <div className="nav-desktop-only">
              <NavigationMenu
                className="nav-menu-root"
                aria-label="Main"
              >
                <NavigationMenuList className="nav-menu-list">
                  {headerNavigation.map((item) => {
                    if (item.type === "link") {
                      const isActive = pathname === item.href;
                      return (
                        <NavigationMenuItem key={item.href}>
                          <NavigationMenuLink
                            asChild
                            className={cn(navigationMenuTriggerStyle(), "nav-menu-link", isActive && "is-active")}
                          >
                            <Link href={item.href} aria-current={isActive ? "page" : undefined}>
                              {item.label}
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      );
                    }

                    const isActive = pathname === item.href || item.items.some((c) => pathname === c.href);
                    return (
                      <NavigationMenuItem key={item.label}>
                        <NavigationMenuTrigger
                          className={cn(navigationMenuTriggerStyle(), "nav-menu-trigger", isActive && "is-active")}
                        >
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="nav-menu-content">
                          <div className="nav-dropdown-shell">
                            <Link className="nav-dropdown-feature" href={item.href}>
                              <span className="card-label">Explore</span>
                              <h3>{item.label}</h3>
                              <p>{item.description}</p>
                            </Link>
                            <div className="nav-dropdown-list">
                              {item.items.map((child) => {
                                const childActive = pathname === child.href;
                                return (
                                  <Link
                                    className={cn("nav-dropdown-item", childActive && "is-active")}
                                    href={child.href}
                                    key={child.href}
                                  >
                                    <span>{child.label}</span>
                                    <p>{child.description}</p>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
                <NavigationMenuIndicator className="nav-menu-indicator" />
              </NavigationMenu>
              </div>

              {/* Theme toggle (desktop) */}
              <ThemeToggle className="nav-desktop-only" />

              {/* Desktop CTA */}
              <Link
                className="button button-primary button-compact nav-cta nav-desktop-only"
                href="/contact"
              >
                <span aria-hidden="true" className="nav-cta-fill" />
                <span className="nav-cta-label">Contact Now</span>
                <span aria-hidden="true" className="nav-cta-icon">&rarr;</span>
              </Link>

              {/* Mobile controls: theme toggle + hamburger */}
              <div className="nav-mobile-controls nav-mobile-only">
                <ThemeToggle />
                <button
                  className="vbi-menu-toggle"
                  type="button"
                  aria-expanded={sheetOpen}
                  aria-label={sheetOpen ? "Close menu" : "Open menu"}
                  onClick={() => setSheetOpen(true)}
                >
                  <Menu size={22} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Sheet ── */}
      {/* Backdrop */}
      <div
        className={cn("vbi-sheet-backdrop", sheetOpen && "is-open")}
        aria-hidden="true"
        onClick={() => setSheetOpen(false)}
      />

      {/* Drawer panel */}
      <div
        ref={sheetRef}
        className={cn("vbi-sheet", sheetOpen && "is-open")}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Sheet header */}
        <div className="vbi-sheet-head">
          <Link href="/" className="brand" onClick={() => setSheetOpen(false)}>
            <img src={withBasePath("/assets/logo.svg")} alt="Veterinary Business Institute" style={{ width: 160 }} />
          </Link>
          <button
            className="vbi-sheet-close"
            onClick={() => setSheetOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="vbi-sheet-divider" />

        {/* Nav links */}
        <nav className="vbi-sheet-nav">
          {headerNavigation.map((item) => {
            if (item.type === "link") {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn("vbi-sheet-link", isActive && "is-active")}
                  onClick={() => setSheetOpen(false)}
                >
                  {item.label}
                </Link>
              );
            }

            const isOpen = openMobileGroup === item.label;
            const isActive = pathname === item.href || item.items.some((c) => pathname === c.href);

            return (
              <div className="vbi-sheet-group" key={item.label}>
                <button
                  className={cn("vbi-sheet-group-trigger", isActive && "is-active")}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenMobileGroup((cur) => (cur === item.label ? null : item.label))}
                >
                  <span>{item.label}</span>
                  <ChevronRight
                    size={16}
                    strokeWidth={2.5}
                    className={cn("vbi-sheet-chevron", isOpen && "is-open")}
                  />
                </button>

                <div className={cn("vbi-sheet-children", isOpen && "is-open")}>
                  <div className="vbi-sheet-children-inner">
                    <Link
                      href={item.href}
                      className="vbi-sheet-child vbi-sheet-child-feature"
                      onClick={() => setSheetOpen(false)}
                    >
                      {item.label} Overview
                    </Link>
                    {item.items.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          aria-current={childActive ? "page" : undefined}
                          className={cn("vbi-sheet-child", childActive && "is-active")}
                          onClick={() => setSheetOpen(false)}
                        >
                          <span>{child.label}</span>
                          {child.description && <p>{child.description}</p>}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Sheet footer CTA */}
        <div className="vbi-sheet-footer">
          <Link
            className="button button-primary w-full"
            href="/contact"
            onClick={() => setSheetOpen(false)}
          >
            Contact Now &rarr;
          </Link>
          <AttractButton
            href="/consultation"
            className="w-full"
            onClick={() => setSheetOpen(false)}
          >
            Free Strategy Call
          </AttractButton>
        </div>
      </div>
    </>
  );
}
