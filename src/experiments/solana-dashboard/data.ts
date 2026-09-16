import { Activity, BarChart3, Coins, Home, Wallet } from "lucide-react";

export const navigation = [
    { name: "Overview", icon: Home },
    { name: "Markets", icon: BarChart3 },
    { name: "Portfolio", icon: Wallet },
    { name: "Activity", icon: Activity },
    { name: "Staking", icon: Coins },
];

export const chartData = [
    ["00:00", 136.2, "82.4M"], ["01:00", 136.7, "91.2M"], ["02:00", 137.8, "74.8M"],
    ["03:00", 138.5, "88.1M"], ["04:00", 138.1, "93.7M"], ["05:00", 137.6, "71.5M"],
    ["06:00", 138.8, "84.9M"], ["07:00", 140.2, "102M"], ["08:00", 141.1, "118M"],
    ["09:00", 140.7, "96M"], ["10:00", 139.6, "89M"], ["11:00", 138.8, "82M"],
    ["12:00", 139.4, "91M"], ["13:00", 140.6, "109M"], ["14:00", 142, "127M"],
    ["15:00", 142.6, "131M"], ["16:00", 142.2, "112M"], ["17:00", 141, "95M"],
    ["18:00", 140.1, "83M"], ["19:00", 141.4, "104M"], ["20:00", 142.3, "116M"],
    ["21:00", 143, "124M"], ["22:00", 142.7, "101M"], ["Now", 144.2, "138M"],
] as const;

export const activities = [
    {
        type: "Buy",
        asset: "+4.20 SOL",
        value: "$599.26",
        time: "18m ago",
        status: "Completed",
    },
    {
        type: "Swap",
        asset: "12.4 SOL → USDC",
        value: "$1,768.92",
        time: "42m ago",
        status: "Completed",
    },
    {
        type: "Stake",
        asset: "32 SOL",
        value: "$4,565.76",
        time: "2h ago",
        status: "Active",
    },
    {
        type: "Reward",
        asset: "+0.084 SOL",
        value: "$11.98",
        time: "5h ago",
        status: "Claimed",
    },
];