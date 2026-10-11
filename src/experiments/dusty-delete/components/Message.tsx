type Props = {
  text: string;
  time: string;
  mine: boolean;
  onSelect: () => void;
};

export default function Message({ text, time, mine, onSelect }: Props) {
  return (
    <div className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
      <div
        onClick={mine ? onSelect : undefined}
        onContextMenu={(e) => {
          if (!mine) return;
          e.preventDefault();
          onSelect();
        }}
        className={`max-w-[85%] whitespace-pre-line rounded-[18px] px-3.5 py-2.5 text-[13px] leading-relaxed select-none ${
          mine
            ? "cursor-context-menu rounded-br-[4px] bg-[#35A7FF] text-white"
            : "rounded-bl-[4px] bg-[#EEEEF0] text-[#555]"
        }`}
      >
        {text}
      </div>

      <span className="mt-1 px-1 text-[9px] text-[#aaa]">{time}</span>
    </div>
  );
}