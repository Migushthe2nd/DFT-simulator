export class DividerProps {
    orientation: string = "horizontal"
}

export default function Divider({orientation}: DividerProps) {
    return (
        <div className={
            'flex items-center justify-center'
        }>
            <div
                className={orientation === "vertical" ? "h-[80%] w-1 rounded-full bg-gray-300" : "w-[80%] h-1 rounded-full bg-gray-300"}
            />
        </div>
    )
}