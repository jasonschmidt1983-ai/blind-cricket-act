import React, { useState, type RefObject } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Accessibility,
  ArrowRight,
  Check,
  Contrast,
  Droplets,
  Minus,
  Moon,
  Plus,
  RotateCcw,
  Sun,
  Type,
  Underline,
  X,
  type LucideIcon,
} from "lucide-react";
import { useDisplayPreferences } from "../lib/useDisplayPreferences";
import {
  DEFAULT_DISPLAY_PREFERENCES,
  stepTextSize,
  type ColourMode,
  type DisplayPreferences,
} from "../lib/displayPreferences";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  openerRef: RefObject<HTMLButtonElement | null>;
};

type OptionProps = {
  label: string;
  description: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
};
function Option({
  label,
  description,
  icon: Icon,
  active,
  onClick,
}: OptionProps) {
  return (
    <button
      type="button"
      className="a11y-option"
      aria-pressed={active}
      onClick={onClick}
    >
      <Icon size={22} aria-hidden="true" />
      <span>
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      {active && <Check className="a11y-check" size={18} aria-hidden="true" />}
    </button>
  );
}

export function AccessibilityToolbar({ open, onOpenChange, openerRef }: Props) {
  const { preferences, setPreferences } = useDisplayPreferences();
  const [announcement, setAnnouncement] = useState("");
  function togglePreference(
    name: "grayscale" | "underlineLinks" | "readableFont",
    label: string
  ) {
    const active = !preferences[name];
    setPreferences(previous => ({ ...previous, [name]: active }));
    setAnnouncement(`${label} ${active ? "on" : "off"}.`);
  }
  function setColourMode(mode: Exclude<ColourMode, "default">, label: string) {
    const next = preferences.colourMode === mode ? "default" : mode;
    setPreferences(previous => ({ ...previous, colourMode: next }));
    setAnnouncement(
      next === "default" ? "Original colours restored." : `${label} on.`
    );
  }
  function resize(direction: -1 | 1) {
    const next = stepTextSize(preferences.textSize, direction);
    setPreferences(previous => ({ ...previous, textSize: next }));
    setAnnouncement(`Text size ${next} percent.`);
  }
  function reset() {
    setPreferences({
      ...DEFAULT_DISPLAY_PREFERENCES,
    } satisfies DisplayPreferences);
    setAnnouncement(
      "All display settings reset. Text size 100 percent; original colours and font restored."
    );
  }

  return (
    <>
      <button
        type="button"
        className="accessibility-fab"
        aria-label="Open accessibility tools"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="accessibility-toolbar"
        onClick={event => {
          openerRef.current = event.currentTarget;
          onOpenChange(true);
        }}
      >
        <Accessibility size={25} aria-hidden="true" />
        <span>Accessibility</span>
      </button>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            id="accessibility-toolbar"
            className="dialog-content accessibility-panel"
            onCloseAutoFocus={event => {
              event.preventDefault();
              openerRef.current?.focus();
            }}
          >
            <p className="a11y-eyebrow">YOUR VIEW. YOUR CHOICE.</p>
            <Dialog.Title>Accessibility tools</Dialog.Title>
            <Dialog.Description>
              Adjust this website to suit you. Settings are saved only in your
              browser, when storage is available.
            </Dialog.Description>

            <section className="a11y-group" aria-labelledby="a11y-text-heading">
              <h3 id="a11y-text-heading">Text size</h3>
              <div className="a11y-text-controls">
                <button
                  type="button"
                  onClick={() => resize(-1)}
                  disabled={preferences.textSize === 100}
                >
                  <Minus size={20} aria-hidden="true" />
                  <span>Decrease Text</span>
                </button>
                <output
                  className="a11y-text-value"
                  aria-label="Current text size"
                >
                  {preferences.textSize}%
                </output>
                <button
                  type="button"
                  onClick={() => resize(1)}
                  disabled={preferences.textSize === 200}
                >
                  <Plus size={20} aria-hidden="true" />
                  <span>Increase Text</span>
                </button>
              </div>
              <p className="a11y-help">
                Choose 100% to 200%. Your browser’s zoom controls work too.
              </p>
            </section>

            <section
              className="a11y-group"
              aria-labelledby="a11y-colour-heading"
            >
              <h3 id="a11y-colour-heading">Colours & contrast</h3>
              <div className="a11y-options">
                <Option
                  label="High Contrast"
                  description="Strong colours and clear borders."
                  icon={Contrast}
                  active={preferences.colourMode === "high"}
                  onClick={() => setColourMode("high", "High contrast")}
                />
                <Option
                  label="Negative Contrast"
                  description="Light text on dark backgrounds."
                  icon={Moon}
                  active={preferences.colourMode === "negative"}
                  onClick={() => setColourMode("negative", "Negative contrast")}
                />
                <Option
                  label="Light Background"
                  description="Dark text on light surfaces."
                  icon={Sun}
                  active={preferences.colourMode === "light"}
                  onClick={() => setColourMode("light", "Light background")}
                />
                <Option
                  label="Grayscale"
                  description="View the page without colour."
                  icon={Droplets}
                  active={preferences.grayscale}
                  onClick={() => togglePreference("grayscale", "Grayscale")}
                />
              </div>
              <p className="a11y-help">
                Select an active colour mode again to return to the original
                colours.
              </p>
            </section>

            <section
              className="a11y-group"
              aria-labelledby="a11y-reading-heading"
            >
              <h3 id="a11y-reading-heading">Reading preferences</h3>
              <div className="a11y-options">
                <Option
                  label="Links Underline"
                  description="Make text links easier to spot."
                  icon={Underline}
                  active={preferences.underlineLinks}
                  onClick={() =>
                    togglePreference("underlineLinks", "Link underlining")
                  }
                />
                <Option
                  label="Readable Font"
                  description="Use a familiar sans-serif font."
                  icon={Type}
                  active={preferences.readableFont}
                  onClick={() =>
                    togglePreference("readableFont", "Readable font")
                  }
                />
              </div>
            </section>

            <button type="button" className="a11y-reset" onClick={reset}>
              <RotateCcw size={19} aria-hidden="true" />
              <span>Reset all settings</span>
            </button>
            <a className="text-link" href="/accessibility/">
              Read our accessibility statement{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <p
              className="a11y-status sr-only"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {announcement}
            </p>
            <Dialog.Close
              className="dialog-close"
              aria-label="Close accessibility tools"
            >
              <X aria-hidden="true" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
