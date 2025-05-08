"use strict";
var SizeNumeric;
(function (SizeNumeric) {
    SizeNumeric[SizeNumeric["Small"] = 0] = "Small";
    SizeNumeric[SizeNumeric["Medium"] = 1] = "Medium";
    SizeNumeric[SizeNumeric["Large"] = 2] = "Large";
})(SizeNumeric || (SizeNumeric = {}));
;
var Size;
(function (Size) {
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large";
})(Size || (Size = {}));
;
var StringSize;
(function (StringSize) {
    StringSize["Small"] = "s";
    StringSize["Medium"] = "m";
    StringSize["Large"] = "l";
})(StringSize || (StringSize = {}));
;
let mySize = Size.Medium;
console.log(mySize);
;
let myOptimizedSize = 2;
console.log(myOptimizedSize);
//# sourceMappingURL=2.js.map