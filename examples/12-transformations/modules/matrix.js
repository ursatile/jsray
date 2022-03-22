import { Vector } from "./vector";


const W = 1;

export class Matrix extends Transformation {
    constructor(elements) {
        super();

        this.elements = elements;

    }

    apply = that => {
        let result = this.multiplyVector(that);

        return new Vector(result[0], result[1], result[2]);

    }

    multiply = that => (that.length == 16 ? this.multiplyMatrix(that) : this.multiplyVector(that));


    multiplyMatrix = that => {
        let v0 = this.multiplyVector(that.slice(0, 3));

        let v1 = this.multiplyVector(that.slice(4, 7));

        let v2 = this.multiplyVector(that.slice(8, 11));

        let v3 = this.multiplyVector(that.slice(12, 15));

        return v0.concat(v1).concat(v2).concat(v3);

    }

    multiplyVector = v => {
        let xx = v.x * elements[0] + v.y * elements[4] + v.z * elements[8] + W * elements[12];

        let yy = v.x * elements[1] + v.y * elements[5] + v.z * elements[9] + W * elements[13];

        let zz = v.x * elements[2] + v.y * elements[6] + v.z * elements[10] + W * elements[14];

        let ww = v.x * elements[3] + v.y * elements[7] + v.z * elements[11] + W * elements[12];

        return [xx, yy, zz, ww];

    }
}



// function calculate() {
// var a11 = parseFloat(document.getElementById("a11").value);
//  var a12 = parseFloat(document.getElementById("a12").value);
//  var a13 = parseFloat(document.getElementById("a13").value);
//  var a14 = parseFloat(document.getElementById("a14").value);
//  var a21 = parseFloat(document.getElementById("a21").value);
//  var a22 = parseFloat(document.getElementById("a22").value);
//  var a23 = parseFloat(document.getElementById("a23").value);
//  var a24 = parseFloat(document.getElementById("a24").value);
//  var a31 = parseFloat(document.getElementById("a31").value);
//  var a32 = parseFloat(document.getElementById("a32").value);
//  var a33 = parseFloat(document.getElementById("a33").value);
//  var a34 = parseFloat(document.getElementById("a34").value);
//  var a41 = parseFloat(document.getElementById("a41").value);
//  var a42 = parseFloat(document.getElementById("a42").value);
//  var a43 = parseFloat(document.getElementById("a43").value);
//  var a44 = parseFloat(document.getElementById("a44").value);


//     var det = a11 * (a22 * (a33 * a44 - a43 * a34) - a23 * (a32 * a44 - a42 * a34) + a24 * (a32 * a43 - a42 * a33)) - a12 * (a21 * (a33 * a44 - a43 * a34) - a23 * (a31 * a44 - a41 * a34) + a24 * (a31 * a43 - a41 * a33)) + a13 * (a21 * (a32 * a44 - a42 * a34) - a22 * (a31 * a44 - a41 * a34) + a24 * (a31 * a42 - a41 * a32)) - a14 * (a21 * (a32 * a43 - a42 * a33) - a22 * (a31 * a43 - a41 * a33) + a23 * (a31 * a42 - a41 * a32));
//  document.getElementById("res_area").style.visibility = "visible";
//  c11 = a22 * a33 * a44 + a23 * a34 * a42 + a24 * a32 * a43 - a22 * a34 * a43 - a23 * a32 * a44 - a24 * a33 * a42;
//  c21 = a12 * a34 * a43 + a13 * a32 * a44 + a14 * a33 * a42 - a12 * a33 * a44 - a13 * a34 * a42 - a14 * a32 * a43;
//  c31 = a12 * a23 * a44 + a13 * a24 * a42 + a14 * a22 * a43 - a12 * a24 * a43 - a13 * a22 * a44 - a14 * a23 * a42;
//  c41 = a12 * a24 * a33 + a13 * a22 * a34 + a14 * a23 * a32 - a12 * a23 * a34 - a13 * a24 * a32 - a14 * a22 * a33;
//  c12 = a21 * a34 * a43 + a23 * a31 * a44 + a24 * a33 * a41 - a21 * a33 * a44 - a23 * a34 * a41 - a24 * a31 * a43;
//  c22 = a11 * a33 * a44 + a13 * a34 * a41 + a14 * a31 * a43 - a11 * a34 * a43 - a13 * a31 * a44 - a14 * a33 * a41;
//  c32 = -1 * (a11 * a23 * a44 - a13 * a21 * a44 + a14 * a21 * a43 - a11 * a24 * a43 + a13 * a41 * a24 - a14 * a23 * a41);
//  c42 = a11 * a23 * a34 + a13 * a24 * a31 + a14 * a21 * a33 - a11 * a24 * a33 - a13 * a21 * a34 - a14 * a23 * a31;
//  c13 = a21 * a32 * a44 + a22 * a34 * a41 + a24 * a31 * a42 - a21 * a34 * a42 - a22 * a31 * a44 - a24 * a32 * a41;
//  c23 = a11 * a34 * a42 + a12 * a31 * a44 + a14 * a32 * a41 - a11 * a32 * a44 - a12 * a34 * a41 - a14 * a31 * a42;
//  c33 = a11 * a22 * a44 + a12 * a24 * a41 + a14 * a21 * a42 - a11 * a24 * a42 - a12 * a21 * a44 - a14 * a22 * a41;
//  c43 = a11 * a24 * a32 + a12 * a21 * a34 + a14 * a22 * a31 - a11 * a22 * a34 - a12 * a24 * a31 - a14 * a21 * a32;
//  c14 = a21 * a33 * a42 + a22 * a31 * a43 + a23 * a32 * a41 - a21 * a32 * a43 - a22 * a33 * a41 - a23 * a31 * a42;
//  c24 = a11 * a32 * a43 + a12 * a33 * a41 + a13 * a31 * a42 - a11 * a33 * a42 - a12 * a31 * a43 - a13 * a32 * a41;
//  c34 = a11 * a23 * a42 + a12 * a21 * a43 + a13 * a22 * a41 - a11 * a22 * a43 - a12 * a23 * a41 - a13 * a21 * a42;
//  c44 = a11 * a22 * a33 + a12 * a23 * a31 + a13 * a21 * a32 - a11 * a23 * a32 - a12 * a21 * a33 - a13 * a22 * a31;
//  document.getElementById("c11").value = c11;
//  document.getElementById("c12").value = c12;
//  document.getElementById("c13").value = c13;
//  document.getElementById("c14").value = c14;
//  document.getElementById("c21").value = c21;
//  document.getElementById("c22").value = c22;
//  document.getElementById("c23").value = c23;
//  document.getElementById("c24").value = c24;
//  document.getElementById("c31").value = c31;
//  document.getElementById("c32").value = c32;
//  document.getElementById("c33").value = c33;
//  document.getElementById("c34").value = c34;
//  document.getElementById("c41").value = c41;
//  document.getElementById("c42").value = c42;
//  document.getElementById("c43").value = c43;
//  document.getElementById("c44").value = c44;
//  document.getElementById("det").value = det;
//  document.getElementById("d11").value = c11 + '/' + det;
//  document.getElementById("d12").value = c12 + '/' + det;
//  document.getElementById("d13").value = c13 + '/' + det;
//  document.getElementById("d14").value = c14 + '/' + det;
//  document.getElementById("d21").value = c21 + '/' + det;
//  document.getElementById("d22").value = c22 + '/' + det;
//  document.getElementById("d23").value = c23 + '/' + det;
//  document.getElementById("d24").value = c24 + '/' + det;
//  document.getElementById("d31").value = c31 + '/' + det;
//  document.getElementById("d32").value = c32 + '/' + det;
//  document.getElementById("d33").value = c33 + '/' + det;
//  document.getElementById("d34").value = c34 + '/' + det;
//  document.getElementById("d41").value = c41 + '/' + det;
//  document.getElementById("d42").value = c42 + '/' + det;
//  document.getElementById("d43").value = c43 + '/' + det;
//  document.getElementById("d44").value = c44 + '/' + det;
//  if (det < 0) { det = -1 * det;
//  document.getElementById("d11").value = -1 * c11 + '/' + det;
//  document.getElementById("d12").value = -1 * c12 + '/' + det;
//  document.getElementById("d13").value = -1 * c13 + '/' + det;
//  document.getElementById("d14").value = -1 * c14 + '/' + det;
//  document.getElementById("d21").value = -1 * c21 + '/' + det;
//  document.getElementById("d22").value = -1 * c22 + '/' + det;
//  document.getElementById("d23").value = -1 * c23 + '/' + det;
//  document.getElementById("d24").value = -1 * c24 + '/' + det;
//  document.getElementById("d31").value = -1 * c31 + '/' + det;
//  document.getElementById("d32").value = -1 * c32 + '/' + det;
//  document.getElementById("d33").value = -1 * c33 + '/' + det;
//  document.getElementById("d34").value = -1 * c34 + '/' + det;
//  document.getElementById("d41").value = -1 * c41 + '/' + det;
//  document.getElementById("d42").value = -1 * c42 + '/' + det;
//  document.getElementById("d43").value = -1 * c43 + '/' + det;
//  document.getElementById("d44").value = -1 * c44 + '/' + det;
//  } if (c11 == 0) document.getElementById("d11").value = 0;
//  if (c12 == 0) document.getElementById("d12").value = 0;
//  if (c13 == 0) document.getElementById("d13").value = 0;
//  if (c14 == 0) document.getElementById("d14").value = 0;
//  if (c21 == 0) document.getElementById("d21").value = 0;
//  if (c22 == 0) document.getElementById("d22").value = 0;
//  if (c23 == 0) document.getElementById("d23").value = 0;
//  if (c24 == 0) document.getElementById("d24").value = 0;
//  if (c31 == 0) document.getElementById("d31").value = 0;
//  if (c32 == 0) document.getElementById("d32").value = 0;
//  if (c33 == 0) document.getElementById("d33").value = 0;
//  if (c34 == 0) document.getElementById("d34").value = 0;
//  if (c41 == 0) document.getElementById("d41").value = 0;
//  if (c42 == 0) document.getElementById("d42").value = 0;
//  if (c43 == 0) document.getElementById("d43").value = 0;
//  if (c44 == 0) document.getElementById("d44").value = 0;

// }