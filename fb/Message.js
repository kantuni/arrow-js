"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.org = void 0;
const NS7624605610262437867 = require("./Schema");
var org;
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                flatbuf.Schema = NS7624605610262437867.org.apache.arrow.flatbuf.Schema;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * ----------------------------------------------------------------------
 * The root Message type
 * This union enables us to easily send different message types without
 * redundant storage, and in the future we can easily add new message types.
 *
 * Arrow implementations do not need to implement all of the message types,
 * which may include experimental metadata types. For maximum compatibility,
 * it is best to send data using RecordBatch
 *
 * @enum {number}
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                let MessageHeader;
                (function (MessageHeader) {
                    MessageHeader[MessageHeader["NONE"] = 0] = "NONE";
                    MessageHeader[MessageHeader["Schema"] = 1] = "Schema";
                    MessageHeader[MessageHeader["DictionaryBatch"] = 2] = "DictionaryBatch";
                    MessageHeader[MessageHeader["RecordBatch"] = 3] = "RecordBatch";
                    MessageHeader[MessageHeader["Tensor"] = 4] = "Tensor";
                    MessageHeader[MessageHeader["SparseTensor"] = 5] = "SparseTensor";
                })(MessageHeader = flatbuf.MessageHeader || (flatbuf.MessageHeader = {}));
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * ----------------------------------------------------------------------
 * Data structures for describing a table row batch (a collection of
 * equal-length Arrow arrays)
 * Metadata about a field at some level of a nested type tree (but not
 * its children).
 *
 * For example, a List<Int16> with values [[1, 2, 3], null, [4], [5, 6], null]
 * would have {length: 5, null_count: 2} for its List node, and {length: 6,
 * null_count: 0} for its Int16 node, as separate FieldNode structs
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class FieldNode {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns FieldNode
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * The number of value slots in the Arrow array at this level of a nested
                     * tree
                     *
                     * @returns flatbuffers.Long
                     */
                    length() {
                        return this.bb.readInt64(this.bb_pos);
                    }
                    /**
                     * The number of observed nulls. Fields with null_count == 0 may choose not
                     * to write their physical validity bitmap out as a materialized buffer,
                     * instead setting the length of the bitmap buffer to 0.
                     *
                     * @returns flatbuffers.Long
                     */
                    nullCount() {
                        return this.bb.readInt64(this.bb_pos + 8);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Long length
                     * @param flatbuffers.Long null_count
                     * @returns flatbuffers.Offset
                     */
                    static createFieldNode(builder, length, null_count) {
                        builder.prep(8, 16);
                        builder.writeInt64(null_count);
                        builder.writeInt64(length);
                        return builder.offset();
                    }
                }
                flatbuf.FieldNode = FieldNode;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * A data header describing the shared memory layout of a "record" or "row"
 * batch. Some systems call this a "row batch" internally and others a "record
 * batch".
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class RecordBatch {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns RecordBatch
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param RecordBatch= obj
                     * @returns RecordBatch
                     */
                    static getRootAsRecordBatch(bb, obj) {
                        return (obj || new RecordBatch).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * number of records / rows. The arrays in the batch should all have this
                     * length
                     *
                     * @returns flatbuffers.Long
                     */
                    length() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
                    }
                    /**
                     * Nodes correspond to the pre-ordered flattened logical schema
                     *
                     * @param number index
                     * @param org.apache.arrow.flatbuf.FieldNode= obj
                     * @returns org.apache.arrow.flatbuf.FieldNode
                     */
                    nodes(index, obj) {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? (obj || new org.apache.arrow.flatbuf.FieldNode).__init(this.bb.__vector(this.bb_pos + offset) + index * 16, this.bb) : null;
                    }
                    /**
                     * @returns number
                     */
                    nodesLength() {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
                    }
                    /**
                     * Buffers correspond to the pre-ordered flattened buffer tree
                     *
                     * The number of buffers appended to this list depends on the schema. For
                     * example, most primitive arrays will have 2 buffers, 1 for the validity
                     * bitmap and 1 for the values. For struct arrays, there will only be a
                     * single buffer for the validity (nulls) bitmap
                     *
                     * @param number index
                     * @param org.apache.arrow.flatbuf.Buffer= obj
                     * @returns org.apache.arrow.flatbuf.Buffer
                     */
                    buffers(index, obj) {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? (obj || new NS7624605610262437867.org.apache.arrow.flatbuf.Buffer).__init(this.bb.__vector(this.bb_pos + offset) + index * 16, this.bb) : null;
                    }
                    /**
                     * @returns number
                     */
                    buffersLength() {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startRecordBatch(builder) {
                        builder.startObject(3);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Long length
                     */
                    static addLength(builder, length) {
                        builder.addFieldInt64(0, length, builder.createLong(0, 0));
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset nodesOffset
                     */
                    static addNodes(builder, nodesOffset) {
                        builder.addFieldOffset(1, nodesOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number numElems
                     */
                    static startNodesVector(builder, numElems) {
                        builder.startVector(16, numElems, 8);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset buffersOffset
                     */
                    static addBuffers(builder, buffersOffset) {
                        builder.addFieldOffset(2, buffersOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number numElems
                     */
                    static startBuffersVector(builder, numElems) {
                        builder.startVector(16, numElems, 8);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endRecordBatch(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createRecordBatch(builder, length, nodesOffset, buffersOffset) {
                        RecordBatch.startRecordBatch(builder);
                        RecordBatch.addLength(builder, length);
                        RecordBatch.addNodes(builder, nodesOffset);
                        RecordBatch.addBuffers(builder, buffersOffset);
                        return RecordBatch.endRecordBatch(builder);
                    }
                }
                flatbuf.RecordBatch = RecordBatch;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * For sending dictionary encoding information. Any Field can be
 * dictionary-encoded, but in this case none of its children may be
 * dictionary-encoded.
 * There is one vector / column per dictionary, but that vector / column
 * may be spread across multiple dictionary batches by using the isDelta
 * flag
 *
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class DictionaryBatch {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns DictionaryBatch
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param DictionaryBatch= obj
                     * @returns DictionaryBatch
                     */
                    static getRootAsDictionaryBatch(bb, obj) {
                        return (obj || new DictionaryBatch).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @returns flatbuffers.Long
                     */
                    id() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
                    }
                    /**
                     * @param org.apache.arrow.flatbuf.RecordBatch= obj
                     * @returns org.apache.arrow.flatbuf.RecordBatch|null
                     */
                    data(obj) {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? (obj || new org.apache.arrow.flatbuf.RecordBatch).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
                    }
                    /**
                     * If isDelta is true the values in the dictionary are to be appended to a
                     * dictionary with the indicated id
                     *
                     * @returns boolean
                     */
                    isDelta() {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startDictionaryBatch(builder) {
                        builder.startObject(3);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Long id
                     */
                    static addId(builder, id) {
                        builder.addFieldInt64(0, id, builder.createLong(0, 0));
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset dataOffset
                     */
                    static addData(builder, dataOffset) {
                        builder.addFieldOffset(1, dataOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param boolean isDelta
                     */
                    static addIsDelta(builder, isDelta) {
                        builder.addFieldInt8(2, +isDelta, +false);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endDictionaryBatch(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    static createDictionaryBatch(builder, id, dataOffset, isDelta) {
                        DictionaryBatch.startDictionaryBatch(builder);
                        DictionaryBatch.addId(builder, id);
                        DictionaryBatch.addData(builder, dataOffset);
                        DictionaryBatch.addIsDelta(builder, isDelta);
                        return DictionaryBatch.endDictionaryBatch(builder);
                    }
                }
                flatbuf.DictionaryBatch = DictionaryBatch;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));
/**
 * @constructor
 */
(function (org) {
    var apache;
    (function (apache) {
        var arrow;
        (function (arrow) {
            var flatbuf;
            (function (flatbuf) {
                class Message {
                    constructor() {
                        this.bb = null;
                        this.bb_pos = 0;
                    }
                    /**
                     * @param number i
                     * @param flatbuffers.ByteBuffer bb
                     * @returns Message
                     */
                    __init(i, bb) {
                        this.bb_pos = i;
                        this.bb = bb;
                        return this;
                    }
                    /**
                     * @param flatbuffers.ByteBuffer bb
                     * @param Message= obj
                     * @returns Message
                     */
                    static getRootAsMessage(bb, obj) {
                        return (obj || new Message).__init(bb.readInt32(bb.position()) + bb.position(), bb);
                    }
                    /**
                     * @returns org.apache.arrow.flatbuf.MetadataVersion
                     */
                    version() {
                        let offset = this.bb.__offset(this.bb_pos, 4);
                        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : NS7624605610262437867.org.apache.arrow.flatbuf.MetadataVersion.V1;
                    }
                    /**
                     * @returns org.apache.arrow.flatbuf.MessageHeader
                     */
                    headerType() {
                        let offset = this.bb.__offset(this.bb_pos, 6);
                        return offset ? /**  */ (this.bb.readUint8(this.bb_pos + offset)) : org.apache.arrow.flatbuf.MessageHeader.NONE;
                    }
                    /**
                     * @param flatbuffers.Table obj
                     * @returns ?flatbuffers.Table
                     */
                    header(obj) {
                        let offset = this.bb.__offset(this.bb_pos, 8);
                        return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
                    }
                    /**
                     * @returns flatbuffers.Long
                     */
                    bodyLength() {
                        let offset = this.bb.__offset(this.bb_pos, 10);
                        return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
                    }
                    /**
                     * @param number index
                     * @param org.apache.arrow.flatbuf.KeyValue= obj
                     * @returns org.apache.arrow.flatbuf.KeyValue
                     */
                    customMetadata(index, obj) {
                        let offset = this.bb.__offset(this.bb_pos, 12);
                        return offset ? (obj || new NS7624605610262437867.org.apache.arrow.flatbuf.KeyValue).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
                    }
                    /**
                     * @returns number
                     */
                    customMetadataLength() {
                        let offset = this.bb.__offset(this.bb_pos, 12);
                        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     */
                    static startMessage(builder) {
                        builder.startObject(5);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.MetadataVersion version
                     */
                    static addVersion(builder, version) {
                        builder.addFieldInt16(0, version, NS7624605610262437867.org.apache.arrow.flatbuf.MetadataVersion.V1);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param org.apache.arrow.flatbuf.MessageHeader headerType
                     */
                    static addHeaderType(builder, headerType) {
                        builder.addFieldInt8(1, headerType, org.apache.arrow.flatbuf.MessageHeader.NONE);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset headerOffset
                     */
                    static addHeader(builder, headerOffset) {
                        builder.addFieldOffset(2, headerOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Long bodyLength
                     */
                    static addBodyLength(builder, bodyLength) {
                        builder.addFieldInt64(3, bodyLength, builder.createLong(0, 0));
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset customMetadataOffset
                     */
                    static addCustomMetadata(builder, customMetadataOffset) {
                        builder.addFieldOffset(4, customMetadataOffset, 0);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param Array.<flatbuffers.Offset> data
                     * @returns flatbuffers.Offset
                     */
                    static createCustomMetadataVector(builder, data) {
                        builder.startVector(4, data.length, 4);
                        for (let i = data.length - 1; i >= 0; i--) {
                            builder.addOffset(data[i]);
                        }
                        return builder.endVector();
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param number numElems
                     */
                    static startCustomMetadataVector(builder, numElems) {
                        builder.startVector(4, numElems, 4);
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @returns flatbuffers.Offset
                     */
                    static endMessage(builder) {
                        let offset = builder.endObject();
                        return offset;
                    }
                    /**
                     * @param flatbuffers.Builder builder
                     * @param flatbuffers.Offset offset
                     */
                    static finishMessageBuffer(builder, offset) {
                        builder.finish(offset);
                    }
                    static createMessage(builder, version, headerType, headerOffset, bodyLength, customMetadataOffset) {
                        Message.startMessage(builder);
                        Message.addVersion(builder, version);
                        Message.addHeaderType(builder, headerType);
                        Message.addHeader(builder, headerOffset);
                        Message.addBodyLength(builder, bodyLength);
                        Message.addCustomMetadata(builder, customMetadataOffset);
                        return Message.endMessage(builder);
                    }
                }
                flatbuf.Message = Message;
            })(flatbuf = arrow.flatbuf || (arrow.flatbuf = {}));
        })(arrow = apache.arrow || (apache.arrow = {}));
    })(apache = org.apache || (org.apache = {}));
})(org = exports.org || (exports.org = {}));

//# sourceMappingURL=Message.js.map
