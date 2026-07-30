"use client";

import {
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import localFont from "next/font/local";
import {
  getSkillTooltipLabel,
  getTotalLevel,
  skills,
  type LifeSkill,
} from "@/data/skills";
import "./skills-panel.css";

const runescapeSmall = localFont({
  src: [
    {
      path: "../../public/fonts/runescape_small.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/runescape_small.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-runescape-small",
  display: "block",
  adjustFontFallback: false,
  fallback: ["monospace"],
});

const FRAME = {
  col: 26,
  bar: 0,
  innerW: 235,
  innerH: 335,
} as const;

const PANEL_NATIVE_WIDTH = FRAME.col * 2 + FRAME.innerW;
const PANEL_NATIVE_HEIGHT = FRAME.bar * 2 + FRAME.innerH;
const TOOLTIP_OFFSET = 10;
const TOOLTIP_EST_WIDTH = 110;
const TOOLTIP_EST_HEIGHT = 42;
const TOOLTIP_DESC_EST_WIDTH = 168;
const TOOLTIP_DESC_EST_HEIGHT = 96;

type TooltipState = {
  skill: LifeSkill;
  x: number;
  y: number;
} | null;

function clampTooltip(x: number, y: number, skill?: LifeSkill) {
  const width = skill?.description ? TOOLTIP_DESC_EST_WIDTH : TOOLTIP_EST_WIDTH;
  const height = skill?.description ? TOOLTIP_DESC_EST_HEIGHT : TOOLTIP_EST_HEIGHT;
  return {
    x: Math.min(Math.max(2, x), PANEL_NATIVE_WIDTH - width - 2),
    y: Math.min(Math.max(2, y), PANEL_NATIVE_HEIGHT - height - 2),
  };
}

export function SkillsPanel({
  scale = 2,
  fit = false,
}: {
  scale?: number;
  fit?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [liveScale, setLiveScale] = useState(scale);
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  const totalLevel = useMemo(() => getTotalLevel(skills), []);

  useEffect(() => {
    if (!fit) {
      setLiveScale(scale);
      return;
    }

    const host = hostRef.current;
    if (!host) return;

    const update = () => {
      const { height } = host.getBoundingClientRect();
      if (height <= 0) return;
      // Snug width follows height-scaled panel; no side padding inside the host.
      const next = Math.min(height / PANEL_NATIVE_HEIGHT, scale);
      setLiveScale(Math.max(0.8, Math.round(next * 100) / 100));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(host);
    return () => observer.disconnect();
  }, [fit, scale]);

  function positionFromPointer(
    event: MouseEvent<HTMLElement>,
    skill: LifeSkill,
  ): { x: number; y: number } | null {
    const shell = event.currentTarget.closest(".osrs-skills-shell");
    if (!(shell instanceof HTMLElement)) return null;
    const rect = shell.getBoundingClientRect();
    const liveScale = rect.width / PANEL_NATIVE_WIDTH;
    return clampTooltip(
      (event.clientX - rect.left) / liveScale + TOOLTIP_OFFSET,
      (event.clientY - rect.top) / liveScale + TOOLTIP_OFFSET,
      skill,
    );
  }

  function positionFromCell(
    cell: HTMLElement,
    skill: LifeSkill,
  ): { x: number; y: number } | null {
    const shell = cell.closest(".osrs-skills-shell");
    if (!(shell instanceof HTMLElement)) return null;
    const shellRect = shell.getBoundingClientRect();
    const cellRect = cell.getBoundingClientRect();
    const liveScale = shellRect.width / PANEL_NATIVE_WIDTH;
    return clampTooltip(
      (cellRect.right - shellRect.left) / liveScale + 4,
      (cellRect.top - shellRect.top) / liveScale + 4,
      skill,
    );
  }

  function showTooltip(skill: LifeSkill, x: number, y: number) {
    setTooltip({ skill, x, y });
  }

  function hideTooltip() {
    setTooltip(null);
  }

  function handleMouseEnter(skill: LifeSkill, event: MouseEvent<HTMLElement>) {
    const pos = positionFromPointer(event, skill);
    if (!pos) return;
    showTooltip(skill, pos.x, pos.y);
  }

  function handleMouseMove(skill: LifeSkill, event: MouseEvent<HTMLElement>) {
    const pos = positionFromPointer(event, skill);
    if (!pos) return;
    showTooltip(skill, pos.x, pos.y);
  }

  function handleFocus(skill: LifeSkill, event: FocusEvent<HTMLElement>) {
    const pos = positionFromCell(event.currentTarget, skill);
    if (!pos) return;
    showTooltip(skill, pos.x, pos.y);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>, href?: string) {
    if (!href) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.location.assign(href);
    }
  }

  function renderSkill(skill: LifeSkill) {
    const rankLabel = getSkillTooltipLabel(skill);
    const content = (
      <>
        <Image
          className="osrs-skill-icon"
          src={skill.icon}
          alt=""
          width={32}
          height={32}
          draggable={false}
          unoptimized
        />
        <span className="osrs-level-box" aria-hidden="true">
          <span className="osrs-level osrs-level-current">{skill.level}</span>
          <span className="osrs-level-slash" />
          <span className="osrs-level osrs-level-base">99</span>
        </span>
      </>
    );

    const commonProps = {
      className: "osrs-skill-cell",
      tabIndex: 0 as const,
      onMouseEnter: (event: MouseEvent<HTMLElement>) => handleMouseEnter(skill, event),
      onMouseMove: (event: MouseEvent<HTMLElement>) => handleMouseMove(skill, event),
      onMouseLeave: hideTooltip,
      onFocus: (event: FocusEvent<HTMLElement>) => handleFocus(skill, event),
      onBlur: hideTooltip,
      "aria-label": `${skill.name}, level ${skill.level}, ${rankLabel}`,
    };

    if (skill.href) {
      return (
        <a
          key={skill.id}
          href={skill.href}
          {...commonProps}
          onKeyDown={(event) => handleKeyDown(event, skill.href)}
        >
          {content}
        </a>
      );
    }

    return (
      <div key={skill.id} {...commonProps}>
        {content}
      </div>
    );
  }

  return (
    <div ref={hostRef} className={fit ? "osrs-skills-fit" : undefined}>
      <div
        className={`osrs-skills-stage ${runescapeSmall.variable}`}
        style={{ "--osrs-scale": liveScale } as CSSProperties}
      >
        <div className={`osrs-skills-shell ${runescapeSmall.className}`}>
          <img
            className="osrs-frame-left"
            src="/skills/frame/left.png"
            alt=""
            width={26}
            height={261}
            draggable={false}
          />
          <img
            className="osrs-frame-right"
            src="/skills/frame/right.png"
            alt=""
            width={26}
            height={261}
            draggable={false}
          />

          <div className="osrs-skills-panel" role="group" aria-label="Real-life skills">
            <div className="osrs-skills-grid">{skills.map(renderSkill)}</div>
            <div className="osrs-total-level">Total level: {totalLevel}</div>
          </div>

          {tooltip ? (
            <div
              className={`osrs-tooltip${tooltip.skill.description ? " osrs-tooltip--desc" : ""}`}
              style={{ left: tooltip.x, top: tooltip.y }}
              role="tooltip"
            >
              <span>{tooltip.skill.name}</span>
              <span>Level {tooltip.skill.level}</span>
              <span>{getSkillTooltipLabel(tooltip.skill)}</span>
              {tooltip.skill.description ? (
                <span className="osrs-tooltip-desc">{tooltip.skill.description}</span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
