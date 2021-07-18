"use strict";
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.partial2 = exports.partial1 = exports.partial0 = void 0;
/** @ignore */
function partial0(visit) {
    return function () { return visit(this); };
}
exports.partial0 = partial0;
/** @ignore */
function partial1(visit) {
    return function (a) { return visit(this, a); };
}
exports.partial1 = partial1;
/** @ignore */
function partial2(visit) {
    return function (a, b) { return visit(this, a, b); };
}
exports.partial2 = partial2;

//# sourceMappingURL=fn.js.map
