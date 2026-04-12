"use strict";
(self["webpackChunkbase_frontend"] = self["webpackChunkbase_frontend"] || []).push([[631],{

/***/ 7416:
/*!*******************************************************************************!*\
  !*** ./src/app/dashboard/components/asset-details/asset-details.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssetDetailsComponent: () => (/* binding */ AssetDetailsComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/bottom-sheet */ 6665);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 177);




const _c0 = (a0, a1) => [a0, a1];
function AssetDetailsComponent_i_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "i", 7);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("color", ctx_r0.data.user.klientStatus.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](3, _c0, "fa-" + ctx_r0.data.user.klientStatus.type, "fa-" + ctx_r0.data.user.klientStatus.name));
  }
}
function AssetDetailsComponent_i_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "i", 7);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("color", ctx_r0.data.user.taximeterStatus.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](3, _c0, "fa-" + ctx_r0.data.user.taximeterStatus.type, "fa-" + ctx_r0.data.user.taximeterStatus.name));
  }
}
function AssetDetailsComponent_i_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "i", 7);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("color", ctx_r0.data.user.statusIcon.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](3, _c0, "fa-" + ctx_r0.data.user.statusIcon.type, "fa-" + ctx_r0.data.user.statusIcon.name));
  }
}
let AssetDetailsComponent = /*#__PURE__*/(() => {
  class AssetDetailsComponent {
    constructor(data, bottomSheetRef) {
      this.data = data;
      this.bottomSheetRef = bottomSheetRef;
    }
    close() {
      this.bottomSheetRef.dismiss();
    }
    static {
      this.ɵfac = function AssetDetailsComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || AssetDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_1__.MAT_BOTTOM_SHEET_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_1__.MatBottomSheetRef));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: AssetDetailsComponent,
        selectors: [["app-asset-details"]],
        decls: 76,
        vars: 20,
        consts: [[1, "asset-details-sheet"], [1, "asset-title"], [1, "detail-card"], [1, "detail-row"], [1, "label"], [1, "value"], [3, "ngClass", "color", 4, "ngIf"], [3, "ngClass"]],
        template: function AssetDetailsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "h2", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2)(4, "div", 3)(5, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Last seen");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](9, "date");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 3)(11, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Speed");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](15, "number");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 3)(17, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "EV Battery");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 3)(22, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Klient Status");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, AssetDetailsComponent_i_25_Template, 1, 6, "i", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 3)(27, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Taximeter Status");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, AssetDetailsComponent_i_30_Template, 1, 6, "i", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 3)(32, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Status Icon");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](35, AssetDetailsComponent_i_35_Template, 1, 6, "i", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 3)(37, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Latitude");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 3)(42, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Longitude");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 3)(47, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "Heading");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 3)(52, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "Altitude");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 3)(57, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "Username");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 3)(62, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Email");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 3)(67, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "Phone Number");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 3)(72, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Description");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
          }
          if (rf & 2) {
            let tmp_3_0;
            let tmp_7_0;
            let tmp_8_0;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.user.name);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](9, 15, ctx.data.user.lastSeen, "HH:mm:ss"));
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](15, 18, ctx.data.user.speed), " km/h");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_3_0 = ctx.data.user.evBattery) !== null && tmp_3_0 !== undefined ? tmp_3_0 : "-");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.data.user.klientStatus);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.data.user.taximeterStatus);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.data.user.statusIcon);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_7_0 = ctx.data.user.lat) !== null && tmp_7_0 !== undefined ? tmp_7_0 : "-");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_8_0 = ctx.data.user.lng) !== null && tmp_8_0 !== undefined ? tmp_8_0 : "-");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.user.heading);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.user.altitude);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.user.username);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.user.email || "-");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.user.phoneNumber || "-");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.user.description || "-");
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_2__.DatePipe],
        styles: [".asset-details-sheet[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n\n.close-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  background: linear-gradient(135deg, #ff4b2b, #ff416c);\n  border: none;\n  color: white;\n  padding: 14px 20px;\n  font-size: 16px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  transition: transform 0.2s, box-shadow 0.2s;\n  margin-bottom: 20px;\n}\n\n.close-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 18px rgba(255, 65, 108, 0.4);\n}\n\n.asset-title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0 0 20px 0;\n  font-size: 22px;\n  font-weight: 700;\n}\n\n.detail-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 16px;\n  padding: 18px 16px;\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);\n}\n\n.detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 12px 0;\n  border-bottom: 1px solid #eee;\n}\n\n.detail-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #444;\n}\n\n.value[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #222;\n}\n\n.value[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 20px;\n}"]
      });
    }
  }
  return AssetDetailsComponent;
})();

/***/ }),

/***/ 8392:
/*!*****************************************************************!*\
  !*** ./src/app/dashboard/components/assets/assets.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssetsComponent: () => (/* binding */ AssetsComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/bottom-sheet */ 6665);
/* harmony import */ var _asset_details_asset_details_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../asset-details/asset-details.component */ 7416);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ 5596);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 9417);







function AssetsComponent_mat_card_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AssetsComponent_mat_card_4_Template_mat_card_click_0_listener() {
      const user_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.openDetails(user_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-card-content")(4, "p")(5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Last seen:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "p")(10, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Speed:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](13, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](user_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](8, 3, user_r2.lastSeen, "HH:mm:ss"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](13, 6, user_r2.speed), " km/h");
  }
}
let AssetsComponent = /*#__PURE__*/(() => {
  class AssetsComponent {
    constructor(data, bottomSheetRef, bottomSheet) {
      this.data = data;
      this.bottomSheetRef = bottomSheetRef;
      this.bottomSheet = bottomSheet;
      this.searchText = "";
      this.filteredUsers = [];
    }
    ngOnInit() {
      this.filteredUsers = this.data.users;
    }
    applyFilter() {
      const text = this.searchText.toLowerCase().trim();
      this.filteredUsers = this.data.users.filter(u => u.name?.toLowerCase().includes(text));
    }
    close() {
      this.bottomSheetRef.dismiss();
    }
    openDetails(user) {
      this.bottomSheet.open(_asset_details_asset_details_component__WEBPACK_IMPORTED_MODULE_0__.AssetDetailsComponent, {
        data: {
          user,
          users: this.filteredUsers
        },
        hasBackdrop: true,
        disableClose: false
      });
    }
    static {
      this.ɵfac = function AssetsComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || AssetsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_2__.MAT_BOTTOM_SHEET_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_2__.MatBottomSheetRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_2__.MatBottomSheet));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: AssetsComponent,
        selectors: [["app-assets"]],
        decls: 5,
        vars: 2,
        consts: [[1, "assets-bottom-sheet"], [1, "search-container"], ["type", "text", "placeholder", "Search", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "asset-list"], ["class", "asset-card", 3, "click", 4, "ngFor", "ngForOf"], [1, "asset-card", 3, "click"]],
        template: function AssetsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "input", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function AssetsComponent_Template_input_ngModelChange_2_listener($event) {
              _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.searchText, $event) || (ctx.searchText = $event);
              return $event;
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AssetsComponent_Template_input_ngModelChange_2_listener() {
              return ctx.applyFilter();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, AssetsComponent_mat_card_4_Template, 14, 8, "mat-card", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.searchText);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.filteredUsers);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardContent, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe],
        styles: [".asset-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.asset-card[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: 0.2s;\n}\n\n.asset-card[_ngcontent-%COMP%]:hover {\n  transform: scale(1.02);\n}\n\n.asset-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  padding-left: 14px;\n  font-size: 18px;\n  font-weight: 600;\n}\n\n.mat-bottom-sheet-container[_ngcontent-%COMP%] {\n  border-top-left-radius: 16px !important;\n  border-top-right-radius: 16px !important;\n  padding-top: 12px !important;\n  transition: transform 0.25s ease-out;\n}\n\n.search-container[_ngcontent-%COMP%] {\n  padding: 10px 15px;\n  background: #fff;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 14px;\n  border-radius: 8px;\n  border: 1px solid #ccc;\n  font-size: 15px;\n  outline: none;\n}"]
      });
    }
  }
  return AssetsComponent;
})();

/***/ }),

/***/ 6368:
/*!***********************************************************************!*\
  !*** ./src/app/dashboard/components/dashboard/dashboard.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardComponent: () => (/* binding */ DashboardComponent)
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 8244);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_cons_general__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/cons/general */ 6254);
/* harmony import */ var _assets_assets_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/assets.component */ 8392);
/* harmony import */ var _shared_cons_endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/cons/endpoints */ 6328);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../models */ 4432);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _services_map_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/map.service */ 6720);
/* harmony import */ var _core_services_navigation_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/services/navigation.service */ 1518);
/* harmony import */ var _shared_services_general_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/services/general.service */ 5030);
/* harmony import */ var _core_services_local_storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/services/local-storage.service */ 9879);
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/bottom-sheet */ 6665);
/* harmony import */ var _core_services_authorization_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/services/authorization.service */ 581);












let DashboardComponent = /*#__PURE__*/(() => {
  class DashboardComponent {
    constructor(mapService, navigationService, generalService, localstorage, bottomSheet, authService) {
      this.mapService = mapService;
      this.navigationService = navigationService;
      this.generalService = generalService;
      this.localstorage = localstorage;
      this.bottomSheet = bottomSheet;
      this.authService = authService;
      this.selectedView = new _models__WEBPACK_IMPORTED_MODULE_4__.ViewModel();
      this.applicationID = 0;
      this.users = [];
      this.iconSets = [];
      this.usersLoaded = false;
    }
    ngOnInit() {
      this.applicationID = Number(this.localstorage.getItem(_shared_cons_general__WEBPACK_IMPORTED_MODULE_1__.SELECTED_APPLICATION_ID_LOCAL_STORAGE_KEY));
      this.initMap();
      this.addZoomButton();
      this.addCurrentLocationButton();
      this.waitForAppId();
    }
    waitForAppId() {
      if (this.applicationID && this.applicationID !== 0) {
        this.loadAssets();
        return;
      }
      console.warn("AppID = 0 → po presim që të ngarkohet...");
      setTimeout(() => {
        this.applicationID = Number(this.localstorage.getItem(_shared_cons_general__WEBPACK_IMPORTED_MODULE_1__.SELECTED_APPLICATION_ID_LOCAL_STORAGE_KEY));
        this.waitForAppId();
      }, 1000);
    }
    initMap() {
      this.map = leaflet__WEBPACK_IMPORTED_MODULE_0__.map('map', {
        center: [41.3275, 19.8189],
        zoom: 7,
        zoomControl: false
      });
      leaflet__WEBPACK_IMPORTED_MODULE_0__.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      this.mapService.setMap(this.map);
    }
    loadAssets() {
      const params = {
        appId: this.applicationID,
        iCount: 1000,
        iIndex: 0,
        iViewID: this.selectedView.id
      };
      const payload = this.generalService.getMethodPayload(_shared_cons_endpoints__WEBPACK_IMPORTED_MODULE_3__.METHOD_GET_LATEST_USER_DATA_BY_VIEW_CHUNK, params);
      this.navigationService.getLatestUserDataByViewChunked(payload).subscribe({
        next: response => {
          const rawUsers = response.result?.result?.users || [];
          this.users = rawUsers.filter(u => u.name?.toLowerCase() !== "admin").map(u => {
            const mappedUser = {
              name: u.name ?? '-',
              speed: u.calculatedSpeed ?? 0,
              lastSeen: u.trackPoint?.utc ?? null,
              signal43: u.attributes?.["43"]?.value === "true",
              signal6267: u.attributes?.["6267"]?.value === "true",
              signal6268: u.attributes?.["6268"]?.value === "true",
              lat: u.trackPoint?.pos?.lat,
              lng: u.trackPoint?.pos?.lng,
              evBattery: u.attributes?.evbattery?.value ?? null,
              klientStatus: u.attributes?.klient_status?.value ? JSON.parse(u.attributes.klient_status.value) : null,
              taximeterStatus: u.attributes?.taximeter_status?.value ? JSON.parse(u.attributes.taximeter_status.value) : null,
              username: u.username ?? null,
              surname: u.surname ?? null,
              email: u.email ?? null,
              phoneNumber: u.phoneNumber ?? null,
              description: u.description ?? null,
              altitude: u.trackPoint?.pos?.alt ?? null,
              heading: u.trackPoint?.vel?.heading ?? null
            };
            return mappedUser;
          });
          this.addUserMarkers();
          this.loadIconSets();
          setInterval(() => this.loadAssets(), 5000);
        }
      });
    }
    loadIconSets() {
      const params = {
        appId: this.applicationID
      };
      const payload = this.generalService.getMethodPayload(_shared_cons_endpoints__WEBPACK_IMPORTED_MODULE_3__.METHOD_GET_ICONS_SETS, params);
      this.navigationService.getIconSets(payload).subscribe({
        next: res => {
          this.iconSets = (res?.result?.result || []).map(set => ({
            ...set,
            state: JSON.parse(set.state)
          }));
          this.updateUserIcons();
          this.addDashboardMarker();
        }
      });
    }
    updateUserIcons() {
      if (!this.iconSets || this.iconSets.length === 0 || !this.users) return;
      const allIcons = this.iconSets.flatMap(s => s.state.icons);
      this.users = this.users.map(user => {
        const signals = {
          43: user.signal43,
          6267: user.signal6267,
          6268: user.signal6268
        };
        const matchedIcon = allIcons.find(icon => icon.rules.every(r => {
          const val = signals[r.signal];
          return r.cmp === '==' ? val == r.cmpVal : val != r.cmpVal;
        }));
        user.statusIcon = matchedIcon?.icon || null;
        return user;
      });
    }
    addDashboardMarker() {
      if (!this.map) return;
      const carButton = document.createElement('div');
      carButton.innerHTML = `<img src="assets/icons/car.svg" style="width:20px;height:20px;" />`;
      carButton.style.position = 'absolute';
      carButton.style.bottom = '120px';
      carButton.style.left = '20px';
      carButton.style.zIndex = '1000';
      carButton.style.cursor = 'pointer';
      carButton.style.background = 'white';
      carButton.style.width = '50px';
      carButton.style.height = '50px';
      carButton.style.borderRadius = '12px';
      carButton.style.display = 'flex';
      carButton.style.alignItems = 'center';
      carButton.style.justifyContent = 'center';
      carButton.addEventListener('click', () => {
        setTimeout(() => {
          this.bottomSheet.open(_assets_assets_component__WEBPACK_IMPORTED_MODULE_2__.AssetsComponent, {
            data: {
              users: this.users
            }
          });
        }, 0);
      });
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        mapContainer.appendChild(carButton);
      }
    }
    addZoomButton() {
      if (!this.map) return;
      const zoomButton = document.createElement('div');
      zoomButton.innerHTML = `<img src="assets/icons/zoom.svg" style="width:20px;height:20px;" />`;
      zoomButton.style.position = 'absolute';
      zoomButton.style.top = '20px';
      zoomButton.style.right = '20px';
      zoomButton.style.zIndex = '1000';
      zoomButton.style.cursor = 'pointer';
      zoomButton.style.background = 'white';
      zoomButton.style.width = '50px';
      zoomButton.style.height = '50px';
      zoomButton.style.borderRadius = '12px';
      zoomButton.style.display = 'flex';
      zoomButton.style.alignItems = 'center';
      zoomButton.style.justifyContent = 'center';
      zoomButton.addEventListener('click', () => {
        this.map.zoomIn();
      });
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        mapContainer.appendChild(zoomButton);
      }
    }
    addCurrentLocationButton() {
      if (!this.map) return;
      const locationButton = document.createElement('div');
      locationButton.innerHTML = `<img src="assets/icons/location.svg" style="width:20px;height:20px;" />`;
      locationButton.style.position = 'absolute';
      locationButton.style.top = '80px';
      locationButton.style.right = '20px';
      locationButton.style.zIndex = '1000';
      locationButton.style.cursor = 'pointer';
      locationButton.style.background = 'white';
      locationButton.style.width = '50px';
      locationButton.style.height = '50px';
      locationButton.style.borderRadius = '12px';
      locationButton.style.display = 'flex';
      locationButton.style.alignItems = 'center';
      locationButton.style.justifyContent = 'center';
      locationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            this.map.setView([lat, lng], 15);
            leaflet__WEBPACK_IMPORTED_MODULE_0__.marker([lat, lng]).addTo(this.map).bindPopup("Ju jeni këtu").openPopup();
          }, error => {
            console.error("Geolocation error:", error);
          });
        } else {
          console.warn("Shfletuesi nuk mbështet geolocation");
        }
      });
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        mapContainer.appendChild(locationButton);
      }
    }
    addUserMarkers() {
      if (!this.map || !this.users) return;
      this.users.forEach(user => {
        if (!user.lat || !user.lng) {
          console.warn('User without coordinates:', user);
          return;
        }
        const marker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker([user.lat, user.lng], {
          zIndexOffset: 1000
        }).addTo(this.map);
        marker.bindPopup(`User: ${user.name}`);
        marker.on('click', () => {
          this.bottomSheet.open(_assets_assets_component__WEBPACK_IMPORTED_MODULE_2__.AssetsComponent, {
            data: {
              users: [user]
            }
          });
        });
      });
    }
    static {
      this.ɵfac = function DashboardComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || DashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_map_service__WEBPACK_IMPORTED_MODULE_5__.MapService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_services_navigation_service__WEBPACK_IMPORTED_MODULE_6__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_general_service__WEBPACK_IMPORTED_MODULE_7__.GeneralService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_services_local_storage_service__WEBPACK_IMPORTED_MODULE_8__.LocalStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__.MatBottomSheet), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_services_authorization_service__WEBPACK_IMPORTED_MODULE_9__.AuthorizationService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
        type: DashboardComponent,
        selectors: [["app-dashboard"]],
        inputs: {
          selectedView: "selectedView"
        },
        decls: 1,
        vars: 0,
        consts: [["id", "map", 2, "height", "100%", "width", "100%"]],
        template: function DashboardComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "div", 0);
          }
        }
      });
    }
  }
  return DashboardComponent;
})();

/***/ }),

/***/ 9542:
/*!*******************************************************!*\
  !*** ./src/app/dashboard/dashboard-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardRoutingModule: () => (/* binding */ DashboardRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7901);
/* harmony import */ var _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/dashboard/dashboard.component */ 6368);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7705);




const routes = [{
  path: '',
  component: _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__.DashboardComponent
}];
let DashboardRoutingModule = /*#__PURE__*/(() => {
  class DashboardRoutingModule {
    static {
      this.ɵfac = function DashboardRoutingModule_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || DashboardRoutingModule)();
      };
    }
    static {
      this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: DashboardRoutingModule
      });
    }
    static {
      this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
      });
    }
  }
  return DashboardRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](DashboardRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 5631:
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardModule: () => (/* binding */ DashboardModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard-routing.module */ 9542);
/* harmony import */ var _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/dashboard/dashboard.component */ 6368);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tooltip */ 4823);
/* harmony import */ var _components_assets_assets_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/assets/assets.component */ 8392);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ 5596);
/* harmony import */ var _components_asset_details_asset_details_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/asset-details/asset-details.component */ 7416);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 9417);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 9213);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7705);










let DashboardModule = /*#__PURE__*/(() => {
  class DashboardModule {
    static {
      this.ɵfac = function DashboardModule_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || DashboardModule)();
      };
    }
    static {
      this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
        type: DashboardModule
      });
    }
    static {
      this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__.DashboardRoutingModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCard, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon]
      });
    }
  }
  return DashboardModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](DashboardModule, {
    declarations: [_components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_1__.DashboardComponent, _components_assets_assets_component__WEBPACK_IMPORTED_MODULE_2__.AssetsComponent, _components_asset_details_asset_details_component__WEBPACK_IMPORTED_MODULE_3__.AssetDetailsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__.DashboardRoutingModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__.MatTooltip, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardContent, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon]
  });
})();

/***/ }),

/***/ 6665:
/*!******************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/bottom-sheet.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_BOTTOM_SHEET_DATA: () => (/* binding */ MAT_BOTTOM_SHEET_DATA),
/* harmony export */   MAT_BOTTOM_SHEET_DEFAULT_OPTIONS: () => (/* binding */ MAT_BOTTOM_SHEET_DEFAULT_OPTIONS),
/* harmony export */   MatBottomSheet: () => (/* binding */ MatBottomSheet),
/* harmony export */   MatBottomSheetConfig: () => (/* binding */ MatBottomSheetConfig),
/* harmony export */   MatBottomSheetContainer: () => (/* binding */ MatBottomSheetContainer),
/* harmony export */   MatBottomSheetModule: () => (/* binding */ MatBottomSheetModule),
/* harmony export */   MatBottomSheetRef: () => (/* binding */ MatBottomSheetRef),
/* harmony export */   matBottomSheetAnimations: () => (/* binding */ matBottomSheetAnimations)
/* harmony export */ });
/* harmony import */ var _angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/dialog */ 2529);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/portal */ 6939);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/core */ 3);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/a11y */ 8617);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/layout */ 9327);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/overlay */ 7987);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 9969);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/keycodes */ 7336);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 8530);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 7786);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 5964);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 6697);
















/** Animations used by the Material bottom sheet. */
function MatBottomSheetContainer_ng_template_0_Template(rf, ctx) {}
const matBottomSheetAnimations = {
  /** Animation that shows and hides a bottom sheet. */
  bottomSheetState: /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('state', [/*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('void, hidden', /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
    transform: 'translateY(100%)'
  })), /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('visible', /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
    transform: 'translateY(0%)'
  })), /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('visible => void, visible => hidden', /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.group)([/*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(`${_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.AnimationDurations.COMPLEX} ${_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.AnimationCurves.ACCELERATION_CURVE}`), /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.query)('@*', /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animateChild)(), {
    optional: true
  })])), /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('void => visible', /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.group)([/*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(`${_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.AnimationDurations.EXITING} ${_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.AnimationCurves.DECELERATION_CURVE}`), /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.query)('@*', /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animateChild)(), {
    optional: true
  })]))])
};

/**
 * Internal component that wraps user-provided bottom sheet content.
 * @docs-private
 */
let MatBottomSheetContainer = /*#__PURE__*/(() => {
  class MatBottomSheetContainer extends _angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_2__.CdkDialogContainer {
    constructor(elementRef, focusTrapFactory, document, config, checker, ngZone, overlayRef, breakpointObserver, focusMonitor) {
      super(elementRef, focusTrapFactory, document, config, checker, ngZone, overlayRef, focusMonitor);
      /** The state of the bottom sheet animations. */
      this._animationState = 'void';
      /** Emits whenever the state of the animation changes. */
      this._animationStateChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
      this._breakpointSubscription = breakpointObserver.observe([_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.Medium, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.Large, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.XLarge]).subscribe(() => {
        const classList = this._elementRef.nativeElement.classList;
        classList.toggle('mat-bottom-sheet-container-medium', breakpointObserver.isMatched(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.Medium));
        classList.toggle('mat-bottom-sheet-container-large', breakpointObserver.isMatched(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.Large));
        classList.toggle('mat-bottom-sheet-container-xlarge', breakpointObserver.isMatched(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.XLarge));
      });
    }
    /** Begin animation of bottom sheet entrance into view. */
    enter() {
      if (!this._destroyed) {
        this._animationState = 'visible';
        this._changeDetectorRef.markForCheck();
        this._changeDetectorRef.detectChanges();
      }
    }
    /** Begin animation of the bottom sheet exiting from view. */
    exit() {
      if (!this._destroyed) {
        this._animationState = 'hidden';
        this._changeDetectorRef.markForCheck();
      }
    }
    ngOnDestroy() {
      super.ngOnDestroy();
      this._breakpointSubscription.unsubscribe();
      this._destroyed = true;
    }
    _onAnimationDone(event) {
      if (event.toState === 'visible') {
        this._trapFocus();
      }
      this._animationStateChanged.emit(event);
    }
    _onAnimationStart(event) {
      this._animationStateChanged.emit(event);
    }
    _captureInitialFocus() {}
    static {
      this.ɵfac = function MatBottomSheetContainer_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || MatBottomSheetContainer)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__.FocusTrapFactory), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_6__.DOCUMENT, 8), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogConfig), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__.InteractivityChecker), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__.OverlayRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.BreakpointObserver), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__.FocusMonitor));
      };
    }
    static {
      this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: MatBottomSheetContainer,
        selectors: [["mat-bottom-sheet-container"]],
        hostAttrs: ["tabindex", "-1", 1, "mat-bottom-sheet-container"],
        hostVars: 4,
        hostBindings: function MatBottomSheetContainer_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsyntheticHostListener"]("@state.start", function MatBottomSheetContainer_animation_state_start_HostBindingHandler($event) {
              return ctx._onAnimationStart($event);
            })("@state.done", function MatBottomSheetContainer_animation_state_done_HostBindingHandler($event) {
              return ctx._onAnimationDone($event);
            });
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsyntheticHostProperty"]("@state", ctx._animationState);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("role", ctx._config.role)("aria-modal", ctx._config.ariaModal)("aria-label", ctx._config.ariaLabel);
          }
        },
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
        decls: 1,
        vars: 0,
        consts: [["cdkPortalOutlet", ""]],
        template: function MatBottomSheetContainer_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, MatBottomSheetContainer_ng_template_0_Template, 0, 0, "ng-template", 0);
          }
        },
        dependencies: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__.CdkPortalOutlet],
        styles: [".mat-bottom-sheet-container{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);padding:8px 16px;min-width:100vw;box-sizing:border-box;display:block;outline:0;max-height:80vh;overflow:auto;background:var(--mat-bottom-sheet-container-background-color, var(--mat-app-surface-container-low));color:var(--mat-bottom-sheet-container-text-color, var(--mat-app-on-surface));font-family:var(--mat-bottom-sheet-container-text-font, var(--mat-app-body-large-font));font-size:var(--mat-bottom-sheet-container-text-size, var(--mat-app-body-large-size));line-height:var(--mat-bottom-sheet-container-text-line-height, var(--mat-app-body-large-line-height));font-weight:var(--mat-bottom-sheet-container-text-weight, var(--mat-app-body-large-weight));letter-spacing:var(--mat-bottom-sheet-container-text-tracking, var(--mat-app-body-large-tracking))}.cdk-high-contrast-active .mat-bottom-sheet-container{outline:1px solid}.mat-bottom-sheet-container-xlarge,.mat-bottom-sheet-container-large,.mat-bottom-sheet-container-medium{border-top-left-radius:var(--mat-bottom-sheet-container-shape);border-top-right-radius:var(--mat-bottom-sheet-container-shape)}.mat-bottom-sheet-container-medium{min-width:384px;max-width:calc(100vw - 128px)}.mat-bottom-sheet-container-large{min-width:512px;max-width:calc(100vw - 256px)}.mat-bottom-sheet-container-xlarge{min-width:576px;max-width:calc(100vw - 384px)}"],
        encapsulation: 2,
        data: {
          animation: [matBottomSheetAnimations.bottomSheetState]
        }
      });
    }
  }
  return MatBottomSheetContainer;
})();
/*#__PURE__*/(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Injection token that can be used to access the data that was passed in to a bottom sheet. */
const MAT_BOTTOM_SHEET_DATA = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_3__.InjectionToken('MatBottomSheetData');
/**
 * Configuration used when opening a bottom sheet.
 */
class MatBottomSheetConfig {
  constructor() {
    /** Data being injected into the child component. */
    this.data = null;
    /** Whether the bottom sheet has a backdrop. */
    this.hasBackdrop = true;
    /** Whether the user can use escape or clicking outside to close the bottom sheet. */
    this.disableClose = false;
    /** Aria label to assign to the bottom sheet element. */
    this.ariaLabel = null;
    /** Whether this is a modal bottom sheet. Used to set the `aria-modal` attribute. */
    this.ariaModal = true;
    /**
     * Whether the bottom sheet should close when the user goes backwards/forwards in history.
     * Note that this usually doesn't include clicking on links (unless the user is using
     * the `HashLocationStrategy`).
     */
    this.closeOnNavigation = true;
    // Note that this is set to 'dialog' by default, because while the a11y recommendations
    // are to focus the first focusable element, doing so prevents screen readers from reading out the
    // rest of the bottom sheet content.
    /**
     * Where the bottom sheet should focus on open.
     * @breaking-change 14.0.0 Remove boolean option from autoFocus. Use string or
     * AutoFocusTarget instead.
     */
    this.autoFocus = 'dialog';
    /**
     * Whether the bottom sheet should restore focus to the
     * previously-focused element, after it's closed.
     */
    this.restoreFocus = true;
  }
}

/**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 */
class MatBottomSheetRef {
  /** Instance of the component making up the content of the bottom sheet. */
  get instance() {
    return this._ref.componentInstance;
  }
  /**
   * `ComponentRef` of the component opened into the bottom sheet. Will be
   * null when the bottom sheet is opened using a `TemplateRef`.
   */
  get componentRef() {
    return this._ref.componentRef;
  }
  constructor(_ref, config, containerInstance) {
    this._ref = _ref;
    /** Subject for notifying the user that the bottom sheet has opened and appeared. */
    this._afterOpened = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.containerInstance = containerInstance;
    this.disableClose = config.disableClose;
    // Emit when opening animation completes
    containerInstance._animationStateChanged.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(event => event.phaseName === 'done' && event.toState === 'visible'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1)).subscribe(() => {
      this._afterOpened.next();
      this._afterOpened.complete();
    });
    // Dispose overlay when closing animation is complete
    containerInstance._animationStateChanged.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(event => event.phaseName === 'done' && event.toState === 'hidden'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1)).subscribe(() => {
      clearTimeout(this._closeFallbackTimeout);
      this._ref.close(this._result);
    });
    _ref.overlayRef.detachments().subscribe(() => {
      this._ref.close(this._result);
    });
    (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.merge)(this.backdropClick(), this.keydownEvents().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(event => event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_13__.ESCAPE))).subscribe(event => {
      if (!this.disableClose && (event.type !== 'keydown' || !(0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_13__.hasModifierKey)(event))) {
        event.preventDefault();
        this.dismiss();
      }
    });
  }
  /**
   * Dismisses the bottom sheet.
   * @param result Data to be passed back to the bottom sheet opener.
   */
  dismiss(result) {
    if (!this.containerInstance) {
      return;
    }
    // Transition the backdrop in parallel to the bottom sheet.
    this.containerInstance._animationStateChanged.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(event => event.phaseName === 'start'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1)).subscribe(event => {
      // The logic that disposes of the overlay depends on the exit animation completing, however
      // it isn't guaranteed if the parent view is destroyed while it's running. Add a fallback
      // timeout which will clean everything up if the animation hasn't fired within the specified
      // amount of time plus 100ms. We don't need to run this outside the NgZone, because for the
      // vast majority of cases the timeout will have been cleared before it has fired.
      this._closeFallbackTimeout = setTimeout(() => {
        this._ref.close(this._result);
      }, event.totalTime + 100);
      this._ref.overlayRef.detachBackdrop();
    });
    this._result = result;
    this.containerInstance.exit();
    this.containerInstance = null;
  }
  /** Gets an observable that is notified when the bottom sheet is finished closing. */
  afterDismissed() {
    return this._ref.closed;
  }
  /** Gets an observable that is notified when the bottom sheet has opened and appeared. */
  afterOpened() {
    return this._afterOpened;
  }
  /**
   * Gets an observable that emits when the overlay's backdrop has been clicked.
   */
  backdropClick() {
    return this._ref.backdropClick;
  }
  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  keydownEvents() {
    return this._ref.keydownEvents;
  }
}

/** Injection token that can be used to specify default bottom sheet options. */
const MAT_BOTTOM_SHEET_DEFAULT_OPTIONS = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_3__.InjectionToken('mat-bottom-sheet-default-options');
/**
 * Service to trigger Material Design bottom sheets.
 */
let MatBottomSheet = /*#__PURE__*/(() => {
  class MatBottomSheet {
    /** Reference to the currently opened bottom sheet. */
    get _openedBottomSheetRef() {
      const parent = this._parentBottomSheet;
      return parent ? parent._openedBottomSheetRef : this._bottomSheetRefAtThisLevel;
    }
    set _openedBottomSheetRef(value) {
      if (this._parentBottomSheet) {
        this._parentBottomSheet._openedBottomSheetRef = value;
      } else {
        this._bottomSheetRefAtThisLevel = value;
      }
    }
    constructor(_overlay, injector, _parentBottomSheet, _defaultOptions) {
      this._overlay = _overlay;
      this._parentBottomSheet = _parentBottomSheet;
      this._defaultOptions = _defaultOptions;
      this._bottomSheetRefAtThisLevel = null;
      this._dialog = injector.get(_angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_2__.Dialog);
    }
    open(componentOrTemplateRef, config) {
      const _config = {
        ...(this._defaultOptions || new MatBottomSheetConfig()),
        ...config
      };
      let ref;
      this._dialog.open(componentOrTemplateRef, {
        ..._config,
        // Disable closing since we need to sync it up to the animation ourselves.
        disableClose: true,
        // Disable closing on detachments so that we can sync up the animation.
        closeOnOverlayDetachments: false,
        maxWidth: '100%',
        container: MatBottomSheetContainer,
        scrollStrategy: _config.scrollStrategy || this._overlay.scrollStrategies.block(),
        positionStrategy: this._overlay.position().global().centerHorizontally().bottom('0'),
        templateContext: () => ({
          bottomSheetRef: ref
        }),
        providers: (cdkRef, _cdkConfig, container) => {
          ref = new MatBottomSheetRef(cdkRef, _config, container);
          return [{
            provide: MatBottomSheetRef,
            useValue: ref
          }, {
            provide: MAT_BOTTOM_SHEET_DATA,
            useValue: _config.data
          }];
        }
      });
      // When the bottom sheet is dismissed, clear the reference to it.
      ref.afterDismissed().subscribe(() => {
        // Clear the bottom sheet ref if it hasn't already been replaced by a newer one.
        if (this._openedBottomSheetRef === ref) {
          this._openedBottomSheetRef = null;
        }
      });
      if (this._openedBottomSheetRef) {
        // If a bottom sheet is already in view, dismiss it and enter the
        // new bottom sheet after exit animation is complete.
        this._openedBottomSheetRef.afterDismissed().subscribe(() => ref.containerInstance?.enter());
        this._openedBottomSheetRef.dismiss();
      } else {
        // If no bottom sheet is in view, enter the new bottom sheet.
        ref.containerInstance.enter();
      }
      this._openedBottomSheetRef = ref;
      return ref;
    }
    /**
     * Dismisses the currently-visible bottom sheet.
     * @param result Data to pass to the bottom sheet instance.
     */
    dismiss(result) {
      if (this._openedBottomSheetRef) {
        this._openedBottomSheetRef.dismiss(result);
      }
    }
    ngOnDestroy() {
      if (this._bottomSheetRefAtThisLevel) {
        this._bottomSheetRefAtThisLevel.dismiss();
      }
    }
    static {
      this.ɵfac = function MatBottomSheet_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || MatBottomSheet)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](MatBottomSheet, 12), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, 8));
      };
    }
    static {
      this.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
        token: MatBottomSheet,
        factory: MatBottomSheet.ɵfac,
        providedIn: 'root'
      });
    }
  }
  return MatBottomSheet;
})();
/*#__PURE__*/(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let MatBottomSheetModule = /*#__PURE__*/(() => {
  class MatBottomSheetModule {
    static {
      this.ɵfac = function MatBottomSheetModule_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || MatBottomSheetModule)();
      };
    }
    static {
      this.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: MatBottomSheetModule
      });
    }
    static {
      this.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        providers: [MatBottomSheet],
        imports: [_angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__.PortalModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule]
      });
    }
  }
  return MatBottomSheetModule;
})();
/*#__PURE__*/(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=bottom-sheet.mjs.map

/***/ })

}]);