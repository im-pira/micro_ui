"use client";

import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type LucideIcon, MoreHorizontal } from "lucide-react";

type Item = {
    name: string;
    icon: LucideIcon;
};

export default function SortableNavigation({
    items,
    active,
    onChange,
    onReorder,
}: {
    items: Item[];
    active: string;
    onChange: (name: string) => void;
    onReorder: (items: Item[]) => void;
}) {
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active: dragged, over }) => {
                if (!over || dragged.id === over.id) return;

                const oldIndex = items.findIndex((x) => x.name === dragged.id);
                const newIndex = items.findIndex((x) => x.name === over.id);

                onReorder(arrayMove(items, oldIndex, newIndex));
            }}
        >
            <SortableContext items={items.map((x) => x.name)} strategy={verticalListSortingStrategy}>
                {items.map((item) => (
                    <SortableItem
                        key={item.name}
                        item={item}
                        active={active === item.name}
                        onClick={() => onChange(item.name)}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
}

function SortableItem({
    item,
    active,
    onClick,
}: {
    item: Item;
    active: boolean;
    onClick: () => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: item.name,
    });

    const Icon = item.icon;

    return (
        <button
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            onClick={onClick}
            {...attributes}
            {...listeners}
            className={`mb-1 flex w-full cursor-grab items-center justify-between rounded-lg px-2.5 py-2 text-[11px] transition active:cursor-grabbing ${active
                ? "bg-[#1d1b19] text-orange-100"
                : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300"
                } ${isDragging ? "z-50 scale-[1.02] border border-orange-400/20 bg-[#201c18] shadow-xl" : ""}`}
        >
            <span className="flex items-center gap-2.5">
                <Icon size={14} />
                {item.name}
            </span>

            {active && <MoreHorizontal size={13} />}
        </button>
    );
}