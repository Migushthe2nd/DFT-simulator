import {NodeProps, Position} from "reactflow"
import CustomHandle from '../CustomHandle';
import {NodeType, SpareNodeData} from "./Nodes"
import {useDynamicHandles} from "../../utils/useDynamicHandles.tsx"
import {createHandleId} from "../../utils/idParser.ts"

export default function SpareNode({id, data}: NodeProps<SpareNodeData>) {
    const color = data.failed !== null ? (data.failed ? 'red' : 'green') : '';

    // dynamically create more handles
    const connectedSources = useDynamicHandles(id, "spare")
    const nHandles = Math.max(connectedSources.length + 1, 1)
    const spacing = 80 / (nHandles + 1)

    return (
        <div className='entity spare' style={{backgroundColor: color, justifyContent: 'flex-end'}}>
            <CustomHandle
                type="source"
                position={Position.Top}
                id={createHandleId(NodeType.SPARE_NODE, "output")}
                isConnectable={true}
            />
            <CustomHandle
                type="target"
                position={Position.Left}
                id={createHandleId(NodeType.SPARE_NODE, "primary")}
                isConnectable={1}
                style={{top: 'auto', bottom: '10px'}}
            />

            <CustomHandle
                type="target"
                position={Position.Bottom}
                style={{left: (20 + spacing) + "%"}}
                id={createHandleId(NodeType.SPARE_NODE, "spare", 1)}
                isConnectable={1}
            />
            {connectedSources.map((edge, i) => (
                <CustomHandle
                    type="target"
                    position={Position.Bottom}
                    id={createHandleId(NodeType.SPARE_NODE, "spare", i + 2)}
                    key={edge.id + edge.targetHandle}
                    style={{left: 20 + (spacing * (i + 2)) + "%"}}
                    isConnectable={1}
                />
            ))}

            <p>SPARE</p>
            <div style={{
                height: "40%",
                display: "flex",
            }}>
                <div style={{width: 40, display: "flex", alignItems: "center", justifyContent: "center"}}>
                </div>
                <div style={{flexGrow: 2, borderLeft: "2px solid black", borderTop: "2px solid black"}}>
                </div>
            </div>
        </div>
    );
}