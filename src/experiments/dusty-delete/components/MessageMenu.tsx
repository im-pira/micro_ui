import { actions } from "../data";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MessageMenu({ open, onClose }: Props) {
  return (
    <>
      <div
        onClick={onClose}
        className={`absolute inset-0 z-10 bg-white/20 backdrop-blur-[5px] transition-opacity duration-300 ease-out ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="menu"
        aria-label="Message actions"
        aria-hidden={!open}
        inert={!open}
        className={`absolute bottom-32 right-4 z-20 w-[155px] origin-bottom-right overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.14)] transition-[transform,opacity] duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-opacity ${
          open
            ? "translate-y-0 scale-y-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-y-[0.75] opacity-0"
        }`}
      >
        {actions.map(({ label, icon: Icon, color }) => (
          <button
            key={label}
            type="button"
            role="menuitem"
            onClick={onClose}
            className="flex w-full items-center justify-between rounded-lg px-2.5 py-2.5 text-xs text-[#333] transition-colors hover:bg-black/5 active:scale-[0.97]"
          >
            <span>{label}</span>
            <Icon size={17} strokeWidth={1.8} className={color} />
          </button>
        ))}
      </div>
    </>
  );
}