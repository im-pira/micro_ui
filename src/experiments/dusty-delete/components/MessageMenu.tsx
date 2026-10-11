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
        className={`absolute inset-0 z-10 bg-white/20 backdrop-blur-[5px] transition-opacity duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="menu"
        aria-label="Message actions"
        aria-hidden={!open}
        inert={!open}
        className={`absolute bottom-[100px] right-4 z-20 w-[155px] overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.14)] transition-[clip-path,opacity] duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
          open
            ? "opacity-100 [clip-path:inset(0_0_0_0_round_16px)]"
            : "pointer-events-none opacity-0 [clip-path:inset(100%_0_0_0_round_16px)]"
        }`}
      >
        {actions.map(({ label, icon: Icon, color }, index) => (
          <button
            key={label}
            type="button"
            role="menuitem"
            onClick={onClose}
            className="flex w-full items-center justify-between rounded-lg px-2.5 py-2.5 text-xs text-[#333] transition-colors hover:bg-black/5 active:scale-[0.97]"
          >
            <span>{label}</span>

            <span
              className={`inline-flex transition-transform duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
                open ? "translate-y-0" : "translate-y-1"
              }`}
              style={{
                transitionDelay: open
                  ? `${(actions.length - 1 - index) * 100}ms`
                  : "0ms",
              }}
            >
              <Icon size={17} strokeWidth={1.8} className={color} />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}