
export { Y } from './utils/Y.js'
// export { UndoManager } from './utils/UndoManager.js'
export { Transaction } from './utils/Transaction.js'
export { ItemJSON } from './structs/ItemJSON.js'
export { ItemString } from './structs/ItemString.js'
export { ItemFormat } from './structs/ItemFormat.js'
export { ItemEmbed } from './structs/ItemEmbed.js'
export { ItemBinary } from './structs/ItemBinary.js'
export { GC } from './structs/GC.js'

export { YArray as Array } from './types/YArray.js'
export { YMap as Map } from './types/YMap.js'
export { YText as Text } from './types/YText.js'
export { YXmlText as XmlText } from './types/YXmlText.js'
export { YXmlHook as XmlHook } from './types/YXmlHook.js'
export { YXmlElement as XmlElement, YXmlFragment as XmlFragment } from './types/YXmlElement.js'

export { createRelativePosition, createRelativePositionByOffset, createAbsolutePosition, compareRelativePositions, writeRelativePosition, readRelativePosition, AbsolutePosition, RelativePosition } from './utils/relativePosition.js'
export { ID, createID, compareIDs } from './utils/ID.js'
export { isParentOf } from './utils/isParentOf.js'

export { writeStructs, writeStructsFromTransaction, readStructs } from './utils/structEncoding.js'
export { getState, getStates, readStatesAsMap, writeStates } from './utils/StructStore.js'