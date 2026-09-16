"use client";

import { ArrowDownLeft, ArrowUpRight, Bell, ChevronDown, MoreHorizontal, PanelLeftClose, PanelLeftOpen, Pin, RefreshCw, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { activities, chartData, navigation } from "./data";
import SortableNavigation from "./SortableNavigation";

export default function SolanaDashboard() {
  const [navigationOpen, setNavigationOpen] = useState(true);
  const [navigationItems, setNavigationItems] = useState(navigation);
  const [active, setActive] = useState("Markets");
  const [range, setRange] = useState("24H");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchOpen) return;
    const timeout = setTimeout(() => searchRef.current?.focus(), 150);
    return () => clearTimeout(timeout);
  }, [searchOpen]);

  return (
    <main className="flex h-screen overflow-hidden bg-[#090909] text-white">
      <aside className="flex h-screen shrink-0 overflow-hidden bg-[#050505]">
        <div className="flex w-[60px] shrink-0 flex-col items-center border-r border-white/[0.05] py-4">
          <button onClick={() => setNavigationOpen(!navigationOpen)} className="mb-6 flex size-9 items-center justify-center rounded-lg border border-white/[0.06] bg-[#151515] text-zinc-500 transition hover:bg-[#1c1c1c] hover:text-white">
            {navigationOpen ? <PanelLeftClose size={15} /> : <PanelLeftOpen size={15} />}
          </button>

          <div className="flex flex-1 flex-col gap-5">
            {navigationItems.map(({ name, icon: Icon }) => (
              <button key={name} onClick={() => setActive(name)} className={`relative transition ${active === name ? "text-orange-400" : "text-zinc-600 hover:text-zinc-300"}`}>
                {active === name && <span className="absolute -left-[22px] top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r bg-orange-400" />}
                <Icon size={16} strokeWidth={1.6} />
              </button>
            ))}
          </div>

          <button className="flex size-9 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-600 hover:text-zinc-300">
            <Pin size={15} />
          </button>
        </div>

        <div className={`h-full overflow-hidden border-r border-white/[0.05] bg-[#080808] transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${navigationOpen ? "w-[230px]" : "w-0"}`}>
          <div className={`w-[230px] p-3 transition duration-300 ${navigationOpen ? "opacity-100" : "-translate-x-3 opacity-0"}`}>
            <div className="mb-6 flex items-center gap-2 px-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-orange-400 text-[12px] font-bold text-black">S</div>
              <div>
                <p className="text-[12px] font-medium">Solboard</p>
                <p className="text-[8px] text-zinc-600">Trading workspace</p>
              </div>
            </div>

            <p className="mb-2 px-2 text-[8px] uppercase tracking-[.18em] text-zinc-700">Workspace</p>

            <SortableNavigation
              items={navigationItems}
              active={active}
              onChange={setActive}
              onReorder={setNavigationItems}
            />

            <div className="mt-6 border-t border-white/[0.05] pt-4">
              <p className="mb-2 px-2 text-[8px] uppercase tracking-[.18em] text-zinc-700">Watchlist</p>
              <Asset name="SOL" price="$144.20" change="+5.12%" />
              <Asset name="JUP" price="$0.86" change="+2.14%" />
              <Asset name="USDC" price="$1.00" change="+0.01%" />
            </div>
          </div>
        </div>
      </aside>

      <section className="h-screen flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1220px] px-6 py-5">
          <header className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[9px] text-zinc-600">Markets / Solana</p>
              <h1 className="mt-1 text-[22px] font-semibold tracking-[-.04em]">SOL / USD</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className={`flex h-8 items-center overflow-hidden rounded-lg border border-white/[0.06] bg-[#121212] transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${searchOpen ? "w-[240px]" : "w-8"}`}>
                <button onClick={() => setSearchOpen(!searchOpen)} className="flex size-8 shrink-0 items-center justify-center text-zinc-600 hover:text-white">
                  <Search size={14} />
                </button>

                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search markets..."
                  className={`min-w-0 flex-1 bg-transparent text-[9px] text-zinc-300 outline-none placeholder:text-zinc-700 transition-opacity duration-200 ${searchOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
                />

                {searchOpen && (
                  <button onClick={() => { setQuery(""); setSearchOpen(false); }} className="mr-2 text-zinc-700 hover:text-zinc-300">
                    <X size={12} />
                  </button>
                )}
              </div>

              <IconButton><Bell size={14} /></IconButton>

              <button className="flex h-8 items-center gap-2 rounded-lg border border-white/[0.06] bg-[#121212] px-3 text-[9px] text-zinc-400">
                7Fks...92mQ <ChevronDown size={11} />
              </button>
            </div>
          </header>

          <div className="grid grid-cols-4 gap-3">
            <Metric title="SOL price" value="$144.20" detail="+5.12%" positive />
            <Metric title="24h high" value="$145.21" detail="+1.01" />
            <Metric title="24h volume" value="$3.82B" detail="+12.4%" positive />
            <Metric title="Market cap" value="$77.4B" detail="#6" />
          </div>

          <div className="mt-3 grid grid-cols-[1fr_295px] gap-3">
            <div className="min-w-0">
              <div className="overflow-hidden rounded-xl border border-white/[0.055] bg-[#101010]">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[22px] font-semibold tracking-[-.04em]">$144.20</span>
                      <span className="flex items-center gap-1 text-[9px] text-emerald-400">
                        <ArrowUpRight size={10} /> 5.12%
                      </span>
                    </div>
                    <p className="mt-1 text-[8px] text-zinc-600">SOL / USD · 24 hour market price</p>
                  </div>

                  <div className="flex rounded-lg border border-white/[0.05] bg-[#090909] p-0.5">
                    {["1H", "24H", "7D", "30D", "1Y"].map((item) => (
                      <button key={item} onClick={() => setRange(item)} className={`rounded-md px-2.5 py-1 text-[8px] transition ${range === item ? "bg-orange-400/10 text-orange-300" : "text-zinc-600 hover:text-zinc-300"}`}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <PriceChart />

                <div className="grid grid-cols-4 border-t border-white/[0.045]">
                  <Mini label="24h low" value="$134.87" />
                  <Mini label="Open" value="$136.11" />
                  <Mini label="Avg. price" value="$139.42" />
                  <Mini label="Trades" value="128.4K" />
                </div>
              </div>

              <RecentActivity />
            </div>

            <div className="space-y-3">
              <Portfolio />
              <Trade />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PriceChart() {
  const [hover, setHover] = useState<number | null>(null);

  const W = 800, H = 245, px = 16, top = 15, bottom = 28;
  const values = chartData.map((x) => x[1]);
  const min = Math.min(...values) - 1;
  const max = Math.max(...values) + 1;

  const points = chartData.map((item, i) => ({
    x: px + (i / (chartData.length - 1)) * (W - px * 2),
    y: top + ((max - item[1]) / (max - min)) * (H - top - bottom),
    time: item[0],
    price: item[1],
    volume: item[2],
  }));

  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${px},${H - bottom} ${line} ${W - px},${H - bottom}`;
  const point = hover !== null ? points[hover] : null;

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const index = Math.round(((x - px) / (W - px * 2)) * (points.length - 1));
    setHover(Math.max(0, Math.min(points.length - 1, index)));
  }

  return (
    <div className="relative h-[275px] select-none">
      <svg viewBox={`0 0 ${W} ${H}`} onMouseMove={handleMove} onMouseLeave={() => setHover(null)} className="h-full w-full cursor-crosshair">
        <defs>
          <linearGradient id="orangeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity=".13" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[45, 95, 145, 195].map((y) => (
          <line key={y} x1="16" x2="784" y1={y} y2={y} stroke="rgba(255,255,255,.035)" />
        ))}

        <polygon points={area} fill="url(#orangeFill)" />
        <polyline points={line} fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />

        {point && (
          <>
            <line x1={point.x} x2={point.x} y1="15" y2="217" stroke="rgba(255,255,255,.14)" strokeDasharray="3 4" />
            <line x1="16" x2="784" y1={point.y} y2={point.y} stroke="rgba(255,255,255,.07)" strokeDasharray="3 4" />
            <circle cx={point.x} cy={point.y} r="4" fill="#f97316" stroke="#101010" strokeWidth="2.5" />
          </>
        )}

        {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "Now"].map((label, i) => (
          <text key={label} x={18 + i * 127} y="238" fontSize="7" fill="#3f3f46">{label}</text>
        ))}
      </svg>

      {point && (
        <div className="pointer-events-none absolute top-4 z-10 min-w-[120px] rounded-lg border border-white/[0.08] bg-[#171513]/95 p-2.5 shadow-2xl backdrop-blur" style={{ left: `clamp(8px, calc(${(point.x / W) * 100}% - 60px), calc(100% - 128px))` }}>
          <p className="text-[8px] text-zinc-500">{point.time}</p>
          <p className="mt-1 text-[13px] font-semibold">${point.price.toFixed(2)}</p>
          <div className="mt-1.5 flex justify-between gap-4 text-[7px]">
            <span className="text-zinc-600">Volume</span>
            <span className="text-orange-300">{point.volume}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Trade() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("1000");

  const isBuy = side === "buy";
  const solPrice = 144.2;
  const result = isBuy
    ? `${amount ? (Number(amount) / solPrice).toFixed(3) : "0.000"} SOL`
    : `$${(Number(amount || 0) * solPrice).toFixed(2)}`;

  return (
    <div className="rounded-xl border border-white/[0.055] bg-[#101010] p-4">
      <div className="mb-3 flex justify-between">
        <p className="text-[11px] font-medium">Trade SOL</p>
        <RefreshCw size={11} className="text-zinc-600" />
      </div>

      <div className="relative mb-3 grid grid-cols-2 rounded-lg bg-[#090909] p-1">
        <div className={`absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-md transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${isBuy ? "left-1 bg-orange-400/[0.12]" : "left-[50%] bg-red-400/[0.10]"}`} />
        <button onClick={() => setSide("buy")} className={`relative z-10 py-1.5 text-[9px] transition ${isBuy ? "text-orange-300" : "text-zinc-600"}`}>Buy</button>
        <button onClick={() => setSide("sell")} className={`relative z-10 py-1.5 text-[9px] transition ${!isBuy ? "text-red-300" : "text-zinc-600"}`}>Sell</button>
      </div>

      <div className="mb-2 rounded-lg border border-white/[0.05] bg-[#090909] p-3">
        <p className="text-[7px] text-zinc-600">{isBuy ? "You pay" : "You sell"}</p>
        <div className="mt-1 flex items-center justify-between">
          <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))} className="w-full bg-transparent text-[14px] outline-none" />
          <span className="rounded-md bg-white/[0.05] px-2 py-1 text-[7px] text-zinc-500">{isBuy ? "USD" : "SOL"}</span>
        </div>
      </div>

      <TradeInput label="You receive" value={result} token={isBuy ? "SOL" : "USD"} />

      <div className="my-3 text-[8px]">
        <Row label="SOL price" value="$144.20" />
        <Row label="Network fee" value="~$0.002" />
        <Row label="Slippage" value="0.1%" />
      </div>

      <button className={`w-full rounded-lg py-2.5 text-[9px] font-semibold text-black transition active:scale-[.98] ${isBuy ? "bg-orange-400 hover:bg-orange-300" : "bg-red-400 hover:bg-red-300"}`}>
        {isBuy ? "Buy SOL" : "Sell SOL"}
      </button>
    </div>
  );
}

function RecentActivity() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "All" ? activities : activities.filter((item) => item.type === filter);

  return (
    <div className="mt-3 rounded-xl border border-white/[0.055] bg-[#101010] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium">Recent activity</p>
          <p className="text-[8px] text-zinc-600">Wallet transactions</p>
        </div>

        <div className="flex rounded-lg bg-[#090909] p-1">
          {["All", "Buy", "Swap", "Stake"].map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={`rounded-md px-2 py-1 text-[8px] transition ${filter === item ? "bg-white/[0.07] text-zinc-200" : "text-zinc-600 hover:text-zinc-300"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        {filtered.map((item) => {
          const open = expanded === item.type;

          return (
            <div key={item.type} className="overflow-hidden rounded-lg transition hover:bg-white/[0.025]">
              <button onClick={() => setExpanded(open ? null : item.type)} className="grid w-full grid-cols-[32px_1fr_120px_80px] items-center px-1 py-2.5 text-left">
                <div className="flex size-7 items-center justify-center rounded-lg bg-orange-400/[0.07] text-orange-400">
                  {item.type === "Swap" ? <RefreshCw size={12} /> : <ArrowDownLeft size={12} />}
                </div>

                <div>
                  <p className="text-[10px] text-zinc-300">{item.type}</p>
                  <p className="text-[8px] text-zinc-600">{item.asset}</p>
                </div>

                <span className="text-[9px] text-zinc-400">{item.value}</span>
                <span className="text-right text-[8px] text-zinc-700">{item.time}</span>
              </button>

              <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="mx-9 mb-2 grid grid-cols-3 rounded-lg border border-white/[0.04] bg-[#0b0b0b] px-3 py-2.5 text-[8px]">
                    <div><p className="text-zinc-700">Status</p><p className="mt-1 text-emerald-400">{item.status}</p></div>
                    <div><p className="text-zinc-700">Network</p><p className="mt-1 text-zinc-400">Solana</p></div>
                    <div><p className="text-zinc-700">Fee</p><p className="mt-1 text-zinc-400">$0.0021</p></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <div className="rounded-xl border border-white/[0.055] bg-[#101010] p-4">
      <p className="text-[8px] text-zinc-600">Portfolio balance</p>
      <p className="mt-1 text-[21px] font-semibold">$18,420.52</p>
      <p className="mt-1 text-[8px] text-emerald-400">↗ $624.21 today</p>

      <div className="my-4 flex h-1 overflow-hidden rounded-full bg-white/[0.05]">
        <div className="w-[70%] bg-orange-400" />
        <div className="w-[23%] bg-orange-200/60" />
        <div className="w-[7%] bg-zinc-600" />
      </div>

      <Holding name="SOL" amount="90.01" value="$12,840" color="bg-orange-400" />
      <Holding name="USDC" amount="4,210" value="$4,210" color="bg-orange-200/70" />
      <Holding name="JUP" amount="1,593" value="$1,370" color="bg-zinc-500" />
    </div>
  );
}

function Metric({ title, value, detail, positive }: any) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-[#101010] p-3.5 transition hover:border-white/[0.08]">
      <p className="text-[8px] text-zinc-600">{title}</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-[17px] font-semibold">{value}</p>
        <span className={`text-[7px] ${positive ? "text-emerald-400" : "text-zinc-600"}`}>{detail}</span>
      </div>
    </div>
  );
}

function Asset({ name, price, change }: any) {
  return (
    <button className="flex w-full justify-between rounded-lg px-2 py-2 text-left hover:bg-white/[0.025]">
      <span className="text-[9px] text-zinc-400">{name}</span>
      <div className="text-right">
        <p className="text-[8px] text-zinc-300">{price}</p>
        <p className="text-[7px] text-emerald-500">{change}</p>
      </div>
    </button>
  );
}

function Mini({ label, value }: any) {
  return <div className="border-r border-white/[0.04] px-4 py-3 last:border-0"><p className="text-[7px] text-zinc-700">{label}</p><p className="mt-1 text-[9px] text-zinc-300">{value}</p></div>;
}

function Holding({ name, amount, value, color }: any) {
  return <div className="flex items-center justify-between py-2"><div className="flex items-center gap-2"><span className={`size-1.5 rounded-full ${color}`} /><div><p className="text-[9px]">{name}</p><p className="text-[7px] text-zinc-700">{amount}</p></div></div><span className="text-[8px] text-zinc-400">{value}</span></div>;
}

function TradeInput({ label, value, token }: any) {
  return <div className="mb-2 rounded-lg border border-white/[0.05] bg-[#090909] p-3"><p className="text-[7px] text-zinc-600">{label}</p><div className="mt-1 flex items-center justify-between"><p className="text-[14px]">{value}</p><span className="rounded-md bg-white/[0.05] px-2 py-1 text-[7px] text-zinc-500">{token}</span></div></div>;
}

function Row({ label, value }: any) {
  return <div className="flex justify-between border-b border-white/[0.035] py-2 last:border-0"><span className="text-zinc-700">{label}</span><span className="text-zinc-400">{value}</span></div>;
}

function IconButton({ children }: any) {
  return <button className="flex size-8 items-center justify-center rounded-lg border border-white/[0.05] bg-[#121212] text-zinc-600 transition hover:bg-[#181818] hover:text-zinc-300">{children}</button>;
}