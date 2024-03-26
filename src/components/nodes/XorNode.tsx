import {NodeProps, Position} from "reactflow"
import SvgXOr from "./../../img/xor.svg"
import CustomHandle from "../CustomHandle"
import {NodeType, XorNodeData} from "./Nodes"
import {useDynamicHandles} from "../../utils/useDynamicHandles.tsx"
import {createHandleId} from "../../utils/idParser.ts"

export default function XOrNode({id, data}: NodeProps<XorNodeData>) {
    const color = data.failed !== null ? (data.failed ? 'red' : 'green') : '';

    // dynamically create more handles
    const connectedSources = useDynamicHandles(id)
    const nHandles = Math.max(connectedSources.length + 1, 2)
    const spacing = 100 / (nHandles + 1)

    return (
        <div className="entity or">
            <CustomHandle
                type="source"
                position={Position.Top}
                id={createHandleId(NodeType.XOR_NODE, "output")}
                isConnectable={true}
            />
            <CustomHandle
                type="target"
                position={Position.Bottom}
                style={{ left: spacing + "%" }}
                id={createHandleId(NodeType.XOR_NODE, "input", 1)}
                isConnectable={1}
            />
            <CustomHandle
                type="target"
                position={Position.Bottom}
                style={{ left: spacing * 2 + "%" }}
                id={createHandleId(NodeType.XOR_NODE, "input", 2)}
                isConnectable={1}
            />
            {connectedSources.slice(1).map((edge, i) => (
                <CustomHandle
                    type="target"
                    position={Position.Bottom}
                    id={createHandleId(NodeType.XOR_NODE, "input", i + 3)}
                    key={edge.id + edge.targetHandle}
                    style={{ left: spacing * (i + 3) + "%" }}
                    isConnectable={1}
                />
            ))}
            <img className="gate-img" style={{backgroundColor: color}} src={SvgXOr}/>
        </div>
    )
}