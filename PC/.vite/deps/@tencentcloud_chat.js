import {
  __commonJS
} from "./chunk-UXIASGQL.js";

// node_modules/@tencentcloud/chat/index.js
var require_chat = __commonJS({
  "node_modules/@tencentcloud/chat/index.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).TencentCloudChat = t();
    }(exports, function() {
      function e(e2, t2) {
        var n2 = Object.keys(e2);
        if (Object.getOwnPropertySymbols) {
          var o2 = Object.getOwnPropertySymbols(e2);
          t2 && (o2 = o2.filter(function(t3) {
            return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
          })), n2.push.apply(n2, o2);
        }
        return n2;
      }
      function t(t2) {
        for (var n2 = 1; n2 < arguments.length; n2++) {
          var o2 = null != arguments[n2] ? arguments[n2] : {};
          n2 % 2 ? e(Object(o2), true).forEach(function(e2) {
            s(t2, e2, o2[e2]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(o2)) : e(Object(o2)).forEach(function(e2) {
            Object.defineProperty(t2, e2, Object.getOwnPropertyDescriptor(o2, e2));
          });
        }
        return t2;
      }
      function n(e2) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        })(e2);
      }
      function o(e2, t2) {
        if (!(e2 instanceof t2))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e2, t2) {
        for (var n2 = 0; n2 < t2.length; n2++) {
          var o2 = t2[n2];
          o2.enumerable = o2.enumerable || false, o2.configurable = true, "value" in o2 && (o2.writable = true), Object.defineProperty(e2, o2.key, o2);
        }
      }
      function a(e2, t2, n2) {
        return t2 && i(e2.prototype, t2), n2 && i(e2, n2), Object.defineProperty(e2, "prototype", { writable: false }), e2;
      }
      function s(e2, t2, n2) {
        return t2 in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
      }
      function r(e2, t2) {
        if ("function" != typeof t2 && null !== t2)
          throw new TypeError("Super expression must either be null or a function");
        e2.prototype = Object.create(t2 && t2.prototype, { constructor: { value: e2, writable: true, configurable: true } }), Object.defineProperty(e2, "prototype", { writable: false }), t2 && u(e2, t2);
      }
      function c(e2) {
        return (c = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e3) {
          return e3.__proto__ || Object.getPrototypeOf(e3);
        })(e2);
      }
      function u(e2, t2) {
        return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e3, t3) {
          return e3.__proto__ = t3, e3;
        })(e2, t2);
      }
      function l() {
        if ("undefined" == typeof Reflect || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if ("function" == typeof Proxy)
          return true;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          })), true;
        } catch (e2) {
          return false;
        }
      }
      function d(e2, t2, n2) {
        return (d = l() ? Reflect.construct.bind() : function(e3, t3, n3) {
          var o2 = [null];
          o2.push.apply(o2, t3);
          var i2 = new (Function.bind.apply(e3, o2))();
          return n3 && u(i2, n3.prototype), i2;
        }).apply(null, arguments);
      }
      function p(e2) {
        var t2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
        return (p = function(e3) {
          if (null === e3 || (n2 = e3, -1 === Function.toString.call(n2).indexOf("[native code]")))
            return e3;
          var n2;
          if ("function" != typeof e3)
            throw new TypeError("Super expression must either be null or a function");
          if (void 0 !== t2) {
            if (t2.has(e3))
              return t2.get(e3);
            t2.set(e3, o2);
          }
          function o2() {
            return d(e3, arguments, c(this).constructor);
          }
          return o2.prototype = Object.create(e3.prototype, { constructor: { value: o2, enumerable: false, writable: true, configurable: true } }), u(o2, e3);
        })(e2);
      }
      function g(e2, t2) {
        if (null == e2)
          return {};
        var n2, o2, i2 = function(e3, t3) {
          if (null == e3)
            return {};
          var n3, o3, i3 = {}, a3 = Object.keys(e3);
          for (o3 = 0; o3 < a3.length; o3++)
            n3 = a3[o3], t3.indexOf(n3) >= 0 || (i3[n3] = e3[n3]);
          return i3;
        }(e2, t2);
        if (Object.getOwnPropertySymbols) {
          var a2 = Object.getOwnPropertySymbols(e2);
          for (o2 = 0; o2 < a2.length; o2++)
            n2 = a2[o2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (i2[n2] = e2[n2]);
        }
        return i2;
      }
      function h(e2) {
        if (void 0 === e2)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e2;
      }
      function _(e2, t2) {
        if (t2 && ("object" == typeof t2 || "function" == typeof t2))
          return t2;
        if (void 0 !== t2)
          throw new TypeError("Derived constructors may only return object or undefined");
        return h(e2);
      }
      function f(e2) {
        var t2 = l();
        return function() {
          var n2, o2 = c(e2);
          if (t2) {
            var i2 = c(this).constructor;
            n2 = Reflect.construct(o2, arguments, i2);
          } else
            n2 = o2.apply(this, arguments);
          return _(this, n2);
        };
      }
      function v(e2, t2) {
        return M(e2) || function(e3, t3) {
          var n2 = null == e3 ? null : "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
          if (null == n2)
            return;
          var o2, i2, a2 = [], s2 = true, r2 = false;
          try {
            for (n2 = n2.call(e3); !(s2 = (o2 = n2.next()).done) && (a2.push(o2.value), !t3 || a2.length !== t3); s2 = true)
              ;
          } catch (c2) {
            r2 = true, i2 = c2;
          } finally {
            try {
              s2 || null == n2.return || n2.return();
            } finally {
              if (r2)
                throw i2;
            }
          }
          return a2;
        }(e2, t2) || I(e2, t2) || D();
      }
      function m(e2) {
        return function(e3) {
          if (Array.isArray(e3))
            return C(e3);
        }(e2) || y(e2) || I(e2) || function() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }
      function M(e2) {
        if (Array.isArray(e2))
          return e2;
      }
      function y(e2) {
        if ("undefined" != typeof Symbol && null != e2[Symbol.iterator] || null != e2["@@iterator"])
          return Array.from(e2);
      }
      function I(e2, t2) {
        if (e2) {
          if ("string" == typeof e2)
            return C(e2, t2);
          var n2 = Object.prototype.toString.call(e2).slice(8, -1);
          return "Object" === n2 && e2.constructor && (n2 = e2.constructor.name), "Map" === n2 || "Set" === n2 ? Array.from(e2) : "Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? C(e2, t2) : void 0;
        }
      }
      function C(e2, t2) {
        (null == t2 || t2 > e2.length) && (t2 = e2.length);
        for (var n2 = 0, o2 = new Array(t2); n2 < t2; n2++)
          o2[n2] = e2[n2];
        return o2;
      }
      function D() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function T(e2, t2) {
        var n2 = "undefined" != typeof Symbol && e2[Symbol.iterator] || e2["@@iterator"];
        if (!n2) {
          if (Array.isArray(e2) || (n2 = I(e2)) || t2 && e2 && "number" == typeof e2.length) {
            n2 && (e2 = n2);
            var o2 = 0, i2 = function() {
            };
            return { s: i2, n: function() {
              return o2 >= e2.length ? { done: true } : { done: false, value: e2[o2++] };
            }, e: function(e3) {
              throw e3;
            }, f: i2 };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var a2, s2 = true, r2 = false;
        return { s: function() {
          n2 = n2.call(e2);
        }, n: function() {
          var e3 = n2.next();
          return s2 = e3.done, e3;
        }, e: function(e3) {
          r2 = true, a2 = e3;
        }, f: function() {
          try {
            s2 || null == n2.return || n2.return();
          } finally {
            if (r2)
              throw a2;
          }
        } };
      }
      var k = { SDK_READY: "sdkStateReady", SDK_NOT_READY: "sdkStateNotReady", SDK_DESTROY: "sdkDestroy", MESSAGE_RECEIVED: "onMessageReceived", MESSAGE_MODIFIED: "onMessageModified", MESSAGE_REVOKED: "onMessageRevoked", MESSAGE_READ_BY_PEER: "onMessageReadByPeer", MESSAGE_READ_RECEIPT_RECEIVED: "onMessageReadReceiptReceived", MESSAGE_EXTENSIONS_UPDATED: "onMessageExtensionsUpdated", MESSAGE_EXTENSIONS_DELETED: "onMessageExtensionsDeleted", MESSAGE_REACTIONS_UPDATED: "onMessageReactionsUpdated", CONVERSATION_LIST_UPDATED: "onConversationListUpdated", TOTAL_UNREAD_MESSAGE_COUNT_UPDATED: "onTotalUnreadMessageCountUpdated", CONVERSATION_GROUP_LIST_UPDATED: "onConversationGroupListUpdated", CONVERSATION_IN_GROUP_UPDATED: "onConversationInGroupUpdated", GROUP_LIST_UPDATED: "onGroupListUpdated", GROUP_ATTRIBUTES_UPDATED: "groupAttributesUpdated", GROUP_COUNTER_UPDATED: "onGroupCounterUpdated", TOPIC_CREATED: "onTopicCreated", TOPIC_DELETED: "onTopicDeleted", TOPIC_UPDATED: "onTopicUpdated", PROFILE_UPDATED: "onProfileUpdated", USER_STATUS_UPDATED: "onUserStatusUpdated", BLACKLIST_UPDATED: "blacklistUpdated", FRIEND_LIST_UPDATED: "onFriendListUpdated", FRIEND_GROUP_LIST_UPDATED: "onFriendGroupListUpdated", FRIEND_APPLICATION_LIST_UPDATED: "onFriendApplicationListUpdated", KICKED_OUT: "kickedOut", ERROR: "error", NET_STATE_CHANGE: "netStateChange" }, L = { MSG_TEXT: "TIMTextElem", MSG_IMAGE: "TIMImageElem", MSG_SOUND: "TIMSoundElem", MSG_AUDIO: "TIMSoundElem", MSG_FILE: "TIMFileElem", MSG_FACE: "TIMFaceElem", MSG_VIDEO: "TIMVideoFileElem", MSG_GEO: "TIMLocationElem", MSG_LOCATION: "TIMLocationElem", MSG_GRP_TIP: "TIMGroupTipElem", MSG_GRP_SYS_NOTICE: "TIMGroupSystemNoticeElem", MSG_CUSTOM: "TIMCustomElem", MSG_MERGER: "TIMRelayElem", MSG_PRIORITY_HIGH: "High", MSG_PRIORITY_NORMAL: "Normal", MSG_PRIORITY_LOW: "Low", MSG_PRIORITY_LOWEST: "Lowest", CONV_C2C: "C2C", CONV_GROUP: "GROUP", CONV_TOPIC: "TOPIC", CONV_SYSTEM: "@TIM#SYSTEM", CONV_AT_ME: 1, CONV_AT_ALL: 2, CONV_AT_ALL_AT_ME: 3, CONV_MARK_TYPE_STAR: 1, CONV_MARK_TYPE_UNREAD: 2, CONV_MARK_TYPE_FOLD: 4, CONV_MARK_TYPE_HIDE: 8, GRP_PRIVATE: "Private", GRP_WORK: "Private", GRP_PUBLIC: "Public", GRP_CHATROOM: "ChatRoom", GRP_MEETING: "ChatRoom", GRP_AVCHATROOM: "AVChatRoom", GRP_COMMUNITY: "Community", GRP_MBR_ROLE_OWNER: "Owner", GRP_MBR_ROLE_ADMIN: "Admin", GRP_MBR_ROLE_MEMBER: "Member", GRP_MBR_ROLE_CUSTOM: "Custom", GRP_TIP_MBR_JOIN: 1, GRP_TIP_MBR_QUIT: 2, GRP_TIP_MBR_KICKED_OUT: 3, GRP_TIP_MBR_SET_ADMIN: 4, GRP_TIP_MBR_CANCELED_ADMIN: 5, GRP_TIP_GRP_PROFILE_UPDATED: 6, GRP_TIP_MBR_PROFILE_UPDATED: 7, GRP_TIP_BAN_AVCHATROOM_MEMBER: 10, GRP_TIP_UNBAN_AVCHATROOM_MEMBER: 11, MSG_REMIND_ACPT_AND_NOTE: "AcceptAndNotify", MSG_REMIND_ACPT_NOT_NOTE: "AcceptNotNotify", MSG_REMIND_DISCARD: "Discard", GENDER_UNKNOWN: "Gender_Type_Unknown", GENDER_FEMALE: "Gender_Type_Female", GENDER_MALE: "Gender_Type_Male", KICKED_OUT_MULT_ACCOUNT: "multipleAccount", KICKED_OUT_MULT_DEVICE: "multipleDevice", KICKED_OUT_USERSIG_EXPIRED: "userSigExpired", KICKED_OUT_REST_API: "REST_API_Kick", ALLOW_TYPE_ALLOW_ANY: "AllowType_Type_AllowAny", ALLOW_TYPE_NEED_CONFIRM: "AllowType_Type_NeedConfirm", ALLOW_TYPE_DENY_ANY: "AllowType_Type_DenyAny", FORBID_TYPE_NONE: "AdminForbid_Type_None", FORBID_TYPE_SEND_OUT: "AdminForbid_Type_SendOut", JOIN_OPTIONS_FREE_ACCESS: "FreeAccess", JOIN_OPTIONS_NEED_PERMISSION: "NeedPermission", JOIN_OPTIONS_DISABLE_APPLY: "DisableApply", JOIN_STATUS_SUCCESS: "JoinedSuccess", JOIN_STATUS_ALREADY_IN_GROUP: "AlreadyInGroup", JOIN_STATUS_WAIT_APPROVAL: "WaitAdminApproval", INVITE_OPTIONS_DISABLE_INVITE: "DisableInvite", INVITE_OPTIONS_NEED_PERMISSION: "NeedPermission", INVITE_OPTIONS_FREE_ACCESS: "FreeAccess", GRP_PROFILE_OWNER_ID: "ownerID", GRP_PROFILE_CREATE_TIME: "createTime", GRP_PROFILE_LAST_INFO_TIME: "lastInfoTime", GRP_PROFILE_MEMBER_NUM: "memberNum", GRP_PROFILE_MAX_MEMBER_NUM: "maxMemberNum", GRP_PROFILE_JOIN_OPTION: "joinOption", GRP_PROFILE_INVITE_OPTION: "inviteOption", GRP_PROFILE_INTRODUCTION: "introduction", GRP_PROFILE_NOTIFICATION: "notification", GRP_PROFILE_MUTE_ALL_MBRS: "muteAllMembers", SNS_ADD_TYPE_SINGLE: "Add_Type_Single", SNS_ADD_TYPE_BOTH: "Add_Type_Both", SNS_DELETE_TYPE_SINGLE: "Delete_Type_Single", SNS_DELETE_TYPE_BOTH: "Delete_Type_Both", SNS_APPLICATION_TYPE_BOTH: "Pendency_Type_Both", SNS_APPLICATION_SENT_TO_ME: "Pendency_Type_ComeIn", SNS_APPLICATION_SENT_BY_ME: "Pendency_Type_SendOut", SNS_APPLICATION_AGREE: "Response_Action_Agree", SNS_APPLICATION_AGREE_AND_ADD: "Response_Action_AgreeAndAdd", SNS_CHECK_TYPE_BOTH: "CheckResult_Type_Both", SNS_CHECK_TYPE_SINGLE: "CheckResult_Type_Single", SNS_TYPE_NO_RELATION: "CheckResult_Type_NoRelation", SNS_TYPE_A_WITH_B: "CheckResult_Type_AWithB", SNS_TYPE_B_WITH_A: "CheckResult_Type_BWithA", SNS_TYPE_BOTH_WAY: "CheckResult_Type_BothWay", NET_STATE_CONNECTED: "connected", NET_STATE_CONNECTING: "connecting", NET_STATE_DISCONNECTED: "disconnected", MSG_AT_ALL: "__kImSDK_MesssageAtALL__", READ_ALL_C2C_MSG: "readAllC2CMessage", READ_ALL_GROUP_MSG: "readAllGroupMessage", READ_ALL_MSG: "readAllMessage", USER_STATUS_UNKNOWN: 0, USER_STATUS_ONLINE: 1, USER_STATUS_OFFLINE: 2, USER_STATUS_UNLOGINED: 3 }, N = { NEW_INVITATION_RECEIVED: "newInvitationReceived", INVITEE_ACCEPTED: "ts_invitee_accepted", INVITEE_REJECTED: "ts_invitee_rejected", INVITATION_CANCELLED: "ts_invitation_cancelled", INVITATION_TIMEOUT: "ts_invitation_timeout", INVITATION_MODIFIED: "ts_invitation_modified", ACTION_TYPE_UNKNOWN: 0, ACTION_TYPE_INVITE: 1, ACTION_TYPE_CANCEL_INVITE: 2, ACTION_TYPE_ACCEPT_INVITE: 3, ACTION_TYPE_REJECT_INVITE: 4, ACTION_TYPE_INVITE_TIMEOUT: 5 }, S = function() {
        function e2() {
          o(this, e2), this.cache = [], this.options = null;
        }
        return a(e2, [{ key: "use", value: function(e3) {
          if ("function" != typeof e3)
            throw "middleware must be a function";
          return this.cache.push(e3), this;
        } }, { key: "next", value: function(e3) {
          if (this.middlewares && this.middlewares.length > 0)
            return this.middlewares.shift().call(this, this.options, this.next.bind(this));
        } }, { key: "run", value: function(e3) {
          return this.middlewares = this.cache.map(function(e4) {
            return e4;
          }), this.options = e3, this.next();
        } }]), e2;
      }(), A = function() {
        function e2() {
          var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
          o(this, e2), this.high = t2, this.low = n2;
        }
        return a(e2, [{ key: "equal", value: function(e3) {
          return null !== e3 && (this.low === e3.low && this.high === e3.high);
        } }, { key: "toString", value: function() {
          var e3 = Number(this.high).toString(16), t2 = Number(this.low).toString(16);
          if (t2.length < 8)
            for (var n2 = 8 - t2.length; n2; )
              t2 = "0" + t2, n2--;
          return e3 + t2;
        } }]), e2;
      }(), E = { TEST: { CHINA: { DEFAULT: "wss://wss-dev.tim.qq.com" }, OVERSEA: { DEFAULT: "wss://wss-dev.tim.qq.com" }, SINGAPORE: { DEFAULT: "wss://wsssgp-dev.im.qcloud.com" }, KOREA: { DEFAULT: "wss://wsskr-dev.im.qcloud.com" }, GERMANY: { DEFAULT: "wss://wssger-dev.im.qcloud.com" }, IND: { DEFAULT: "wss://wssind-dev.im.qcloud.com" }, JPN: { DEFAULT: "wss://wssjpn-dev.im.qcloud.com" }, USA: { DEFAULT: "wss://wssusa-dev.im.qcloud.com" } }, PRODUCTION: { CHINA: { DEFAULT: "wss://wss.im.qcloud.com", BACKUP: "wss://wss.tim.qq.com", STAT: "https://events.im.qcloud.com", ANYCAST: "wss://162.14.13.203" }, OVERSEA: { DEFAULT: "wss://wss.im.qcloud.com", BACKUP: "wss://wss.my-imcloud.com", STAT: "https://api.my-imcloud.com" }, SINGAPORE: { DEFAULT: "wss://wsssgp.im.qcloud.com", BACKUP: "wss://wsssgp.my-imcloud.com", STAT: "https://apisgp.my-imcloud.com", ANYCAST: "wss://162.14.19.159" }, KOREA: { DEFAULT: "wss://wsskr.im.qcloud.com", BACKUP: "wss://wsskr.my-imcloud.com", STAT: "https://apikr.my-imcloud.com", ANYCAST: "wss://162.14.13.104" }, GERMANY: { DEFAULT: "wss://wssger.im.qcloud.com", BACKUP: "wss://wssger.my-imcloud.com", STAT: "https://apiger.my-imcloud.com", ANYCAST: "wss://162.14.3.17" }, IND: { DEFAULT: "wss://wssind.my-imcloud.com", BACKUP: "wss://wssind.im.qcloud.com", STAT: "https://apiind.my-imcloud.com", ANYCAST: "wss://162.14.18.188" }, JPN: { DEFAULT: "wss://wssjpn.im.qcloud.com", BACKUP: "wss://wssjpn.my-imcloud.com", STAT: "https://apijpn.my-imcloud.com" }, USA: { DEFAULT: "wss://wssusa.im.qcloud.com", BACKUP: "wss://wssusa.my-imcloud.com", STAT: "https://apiusa.my-imcloud.com", ANYCAST: "wss://162.14.10.42" } } }, R = { ANDROID: 2, IOS: 3, MAC: 4, WEB: 7, WX_MP: 8, QQ_MP: 9, TT_MP: 10, BAIDU_MP: 11, ALI_MP: 12, IPAD: 13, UNI_NATIVE_APP: 15 }, O = "1.7.3", G = 537048168, U = "CHINA", P = "OVERSEA", b = "SINGAPORE", w = "KOREA", F = "GERMANY", q = "IND", x = "JPN", V = "USA", H = { HOST: { CURRENT: { DEFAULT: "wss://wss.im.qcloud.com", STAT: "https://events.im.qcloud.com" }, setCurrent: function() {
        var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : U;
        this.CURRENT = E.PRODUCTION[e2];
      } }, NAME: { OPEN_IM: "openim", OPEN_IM_MSG_EXT: "openim_msg_ext_http_svc", GROUP: "group_open_http_svc", GROUP_AVCHATROOM: "group_open_avchatroom_http_svc", GROUP_COMMUNITY: "million_group_open_http_svc", GROUP_ATTR: "group_open_attr_http_svc", FRIEND: "sns", PROFILE: "profile", RECENT_CONTACT: "recentcontact", PIC: "openpic", BIG_GROUP_NO_AUTH: "group_open_http_noauth_svc", BIG_GROUP_LONG_POLLING: "group_open_long_polling_http_svc", BIG_GROUP_LONG_POLLING_NO_AUTH: "group_open_long_polling_http_noauth_svc", IM_OPEN_STAT: "imopenstat", WEB_IM: "webim", IM_COS_SIGN: "im_cos_sign_svr", CUSTOM_UPLOAD: "im_cos_msg", HEARTBEAT: "heartbeat", IM_OPEN_PUSH: "im_open_push", IM_OPEN_STATUS: "im_open_status", IM_LONG_MESSAGE: "im_long_msg", IM_CONFIG_MANAGER: "im_sdk_config_mgr", STAT_SERVICE: "StatSvc", OVERLOAD_PUSH: "OverLoadPush", IM_MSG_AUDIT_MGR: "im_msg_audit_mgr", TUIROOM_SVR: "tui_room_svr", IM_OPEN_TRANSLATE: "im_open_translate", IM_OPEN_SPEECH: "im_open_speech", MESSAGE_SEARCH: "message_search" }, CHANNEL: { SOCKET: 1, XHR: 2, AUTO: 0 }, NAME_VERSION: { openim: "v4", group_open_http_svc: "v4", sns: "v4", profile: "v4", recentcontact: "v4", openpic: "v4", group_open_http_noauth_svc: "v4", group_open_long_polling_http_svc: "v4", group_open_long_polling_http_noauth_svc: "v4", imopenstat: "v4", im_cos_sign_svr: "v4", im_cos_msg: "v4", webim: "v4", im_open_push: "v4", im_open_status: "v4" } }, B = { SEARCH_MSG: new A(0, Math.pow(2, 0)).toString(), SEARCH_GRP_SNS: new A(0, Math.pow(2, 1)).toString(), AVCHATROOM_HISTORY_MSG: new A(0, Math.pow(2, 2)).toString(), GRP_COMMUNITY: new A(0, Math.pow(2, 3)).toString(), MSG_TO_SPECIFIED_GRP_MBR: new A(0, Math.pow(2, 4)).toString(), AVCHATROOM_MBR_LIST: new A(0, Math.pow(2, 6)).toString(), USER_STATUS: new A(0, Math.pow(2, 7)).toString(), CONV_MARK: new A(0, Math.pow(2, 9)).toString(), CONV_GROUP: new A(0, Math.pow(2, 10)).toString(), AVCHATROOM_BAN_MBR: new A(0, Math.pow(2, 11)).toString(), MSG_EXT: new A(0, Math.pow(2, 13)).toString(), GRP_COUNTER: new A(0, Math.pow(2, 15)).toString(), MSG_REACTION: new A(Math.pow(2, 16)).toString() }, K = "c2c_text_message", W = "c2c_custom_message", Y = "group_text_message", j = "group_custom_message", J = "user_profile", z = "sns", X = "group_profile", Q = "group_member_profile";
      H.HOST.setCurrent(U);
      var Z = "undefined" != typeof wx && "function" == typeof wx.getSystemInfoSync && Boolean(wx.getSystemInfoSync().fontSizeSetting), $ = "undefined" != typeof qq && "function" == typeof qq.getSystemInfoSync && Boolean(qq.getSystemInfoSync().fontSizeSetting), ee = "undefined" != typeof tt && "function" == typeof tt.getSystemInfoSync && Boolean(tt.getSystemInfoSync().fontSizeSetting), te = "undefined" != typeof swan && "function" == typeof swan.getSystemInfoSync && Boolean(swan.getSystemInfoSync().fontSizeSetting), ne = "undefined" != typeof my && "function" == typeof my.getSystemInfoSync && Boolean(my.getSystemInfoSync().fontSizeSetting), oe = "undefined" != typeof jd && "function" == typeof jd.getSystemInfoSync, ie = "undefined" != typeof uni && "undefined" == typeof window && "function" == typeof uni.requireNativePlugin, ae = "undefined" != typeof uni, se = Z || $ || ee || te || ne || ie || oe, re = ("undefined" != typeof uni || "undefined" != typeof window) && !se, ce = $ ? qq : ee ? tt : te ? swan : ne ? my : Z ? wx : ie ? uni : oe ? jd : {}, ue = re && window && window.navigator && window.navigator.userAgent || "", le = /(micromessenger|webbrowser)/i.test(ue), de = /AppleWebKit\/([\d.]+)/i.exec(ue);
      de && parseFloat(de.pop());
      var pe, ge, he = (pe = "WEB", le ? pe = "WEB" : $ ? pe = "QQ_MP" : ee ? pe = "TT_MP" : te ? pe = "BAIDU_MP" : ne ? pe = "ALI_MP" : Z ? pe = "WX_MP" : ie && (pe = "UNI_NATIVE_APP"), R[pe]), _e = /iPad/i.test(ue), fe = /iPhone/i.test(ue) && !_e, ve = /iPod/i.test(ue), me = fe || _e || ve, Me = (ge = ue.match(/OS (\d+)_/i)) && ge[1] ? ge[1] : null, ye = /Android/i.test(ue), Ie = function() {
        var e2 = ue.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
        if (!e2)
          return null;
        var t2 = e2[1] && parseFloat(e2[1]), n2 = e2[2] && parseFloat(e2[2]);
        return t2 && n2 ? parseFloat(e2[1] + "." + e2[2]) : t2 || null;
      }(), Ce = /Edge/i.test(ue), De = !Ce && /Chrome/i.test(ue);
      !function() {
        var e2 = ue.match(/Chrome\/(\d+)/);
        e2 && e2[1] && parseFloat(e2[1]);
      }();
      var Te = /MSIE/.test(ue) || ue.indexOf("Trident") > -1 && ue.indexOf("rv:11.0") > -1, ke = function() {
        var e2 = /MSIE\s(\d+)\.\d/.exec(ue), t2 = e2 && parseFloat(e2[1]);
        return !t2 && /Trident\/7.0/i.test(ue) && /rv:11.0/.test(ue) && (t2 = 11), t2;
      }(), Le = /Safari/i.test(ue) && !De && !ye && !Ce;
      !function() {
        var e2 = ue.match(/TBS\/(\d+)/i);
        if (e2 && e2[1])
          e2[1];
      }();
      var Ne, Se, Ae = /Windows/i.test(ue), Ee = /MAC OS X/i.test(ue), Re = re && "undefined" != typeof Worker && !Te, Oe = ye || me, Ge = re && void 0 !== window.tencent_cloud_im_csig_flutter_for_web_25F_cy, Ue = function() {
        if ("undefined" == typeof window)
          return false;
        var e2 = window.navigator.standalone;
        return !(!me || e2 || Le);
      }();
      Ne = "undefined" != typeof console ? console : "undefined" != typeof global && global.console ? global.console : "undefined" != typeof window && window.console ? window.console : {};
      for (var Pe = function() {
      }, be = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "group", "groupCollapsed", "groupEnd", "info", "log", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], we = be.length; we--; )
        Se = be[we], console[Se] || (Ne[Se] = Pe);
      var Fe = Ne, qe = 0, xe = function() {
        return (/* @__PURE__ */ new Date()).getTime() + qe;
      }, Ve = function() {
        qe = 0;
      }, He = function() {
        return Math.floor(xe() / 1e3);
      }, Be = 0;
      function Ke() {
        return tn() ? "%c Chat %c" : "Chat";
      }
      function We() {
        var e2, t2 = ((e2 = /* @__PURE__ */ new Date()).setTime(xe()), e2);
        return t2.toLocaleTimeString("en-US", { hour12: false }) + "." + function(e3) {
          var t3;
          switch (e3.toString().length) {
            case 1:
              t3 = "00" + e3;
              break;
            case 2:
              t3 = "0" + e3;
              break;
            default:
              t3 = e3;
          }
          return t3;
        }(t2.getMilliseconds());
      }
      var Ye = { arguments2String: function(e2) {
        var t2 = "";
        if (1 === e2.length)
          t2 = e2[0];
        else
          for (var n2 = 0, o2 = e2.length; n2 < o2; n2++)
            vt(e2[n2]) ? Mt(e2[n2]) ? t2 += Tt(e2[n2]) : t2 += JSON.stringify(e2[n2]) : t2 += e2[n2], t2 += " ";
        return t2;
      }, _exec: function(e2, t2) {
        tn() ? Fe[e2](Ke(), "background:#0abf5b; padding:1px; border-radius:3px; color: #fff", "background:transparent", We(), t2) : Fe[e2]("".concat(Ke(), " ").concat(We(), " ").concat(t2));
      }, d: function() {
        if (Be <= -1) {
          var e2 = this.arguments2String(arguments);
          this._exec("debug", e2);
        }
      }, l: function() {
        if (Be <= 0) {
          var e2 = this.arguments2String(arguments);
          this._exec("log", e2);
        }
      }, log: function() {
        if (Be <= 0) {
          var e2 = this.arguments2String(arguments);
          this._exec("log", e2);
        }
      }, i: function() {
        if (Be <= 1) {
          var e2 = this.arguments2String(arguments);
          this._exec("info", e2);
        }
      }, w: function() {
        if (Be <= 2) {
          var e2 = this.arguments2String(arguments);
          this._exec("warn", e2);
        }
      }, e: function() {
        if (Be <= 3) {
          var e2 = this.arguments2String(arguments);
          this._exec("error", e2);
        }
      }, setLevel: function(e2) {
        e2 < 4 && this._exec("log", "set level from " + Be + " to " + e2), Be = e2;
      }, getLevel: function() {
        return Be;
      } }, je = { JPG: 1, JPEG: 1, GIF: 2, PNG: 3, BMP: 4, UNKNOWN: 255 }, Je = { NICK: "Tag_Profile_IM_Nick", GENDER: "Tag_Profile_IM_Gender", BIRTHDAY: "Tag_Profile_IM_BirthDay", LOCATION: "Tag_Profile_IM_Location", SELFSIGNATURE: "Tag_Profile_IM_SelfSignature", ALLOWTYPE: "Tag_Profile_IM_AllowType", LANGUAGE: "Tag_Profile_IM_Language", AVATAR: "Tag_Profile_IM_Image", MESSAGESETTINGS: "Tag_Profile_IM_MsgSettings", ADMINFORBIDTYPE: "Tag_Profile_IM_AdminForbidType", LEVEL: "Tag_Profile_IM_Level", ROLE: "Tag_Profile_IM_Role" }, ze = "Tag_SNS_IM_Group", Xe = "Tag_SNS_IM_Remark", Qe = "Tag_SNS_IM_AddSource", Ze = "Tag_SNS_IM_AddWording", $e = "Tag_SNS_IM_AddTime", et = { UNKNOWN: "Gender_Type_Unknown", FEMALE: "Gender_Type_Female", MALE: "Gender_Type_Male" }, nt = { NONE: "AdminForbid_Type_None", SEND_OUT: "AdminForbid_Type_SendOut" }, ot = { NEED_CONFIRM: "AllowType_Type_NeedConfirm", ALLOW_ANY: "AllowType_Type_AllowAny", DENY_ANY: "AllowType_Type_DenyAny" }, it = "JoinedSuccess", at = "WaitAdminApproval", st = "@TGS#_", rt = "@TOPIC#_", ct = ["url"], ut = function(e2) {
        return "map" === It(e2);
      }, lt = function(e2) {
        return "file" === It(e2);
      }, dt = function(e2) {
        return null !== e2 && ("number" == typeof e2 && !isNaN(e2 - 0) || "object" === n(e2) && e2.constructor === Number);
      }, pt = function(e2) {
        return "string" == typeof e2;
      }, gt = function(e2) {
        return null !== e2 && "object" === n(e2);
      }, ht = function(e2) {
        if ("object" !== n(e2) || null === e2)
          return false;
        var t2 = Object.getPrototypeOf(e2);
        if (null === t2)
          return true;
        for (var o2 = t2; null !== Object.getPrototypeOf(o2); )
          o2 = Object.getPrototypeOf(o2);
        return t2 === o2;
      }, _t = function(e2) {
        return "function" == typeof Array.isArray ? Array.isArray(e2) : "array" === It(e2);
      }, ft = function(e2) {
        return void 0 === e2;
      }, vt = function(e2) {
        return _t(e2) || gt(e2);
      }, mt = function(e2) {
        return "function" == typeof e2;
      }, Mt = function(e2) {
        return e2 instanceof Error;
      }, yt = function(e2) {
        return "filelist" === It(e2);
      }, It = function(e2) {
        return Object.prototype.toString.call(e2).match(/^\[object (.*)\]$/)[1].toLowerCase();
      }, Ct = function(e2) {
        if ("string" != typeof e2)
          return false;
        var t2 = e2[0];
        return !/[^a-zA-Z0-9]/.test(t2);
      };
      Date.now || (Date.now = function() {
        return (/* @__PURE__ */ new Date()).getTime();
      });
      var Dt = function e2(t2, n2, o2, i2) {
        if (!vt(t2) || !vt(n2))
          return 0;
        for (var a2, s2 = 0, r2 = Object.keys(n2), c2 = 0, u2 = r2.length; c2 < u2; c2++)
          if (a2 = r2[c2], !(ft(n2[a2]) || o2 && o2.includes(a2)))
            if (vt(t2[a2]) && vt(n2[a2]))
              s2 += e2(t2[a2], n2[a2], o2, i2);
            else {
              if (i2 && i2.includes(n2[a2]))
                continue;
              t2[a2] !== n2[a2] && (t2[a2] = n2[a2], s2 += 1);
            }
        return s2;
      }, Tt = function(e2) {
        return JSON.stringify(e2, ["message", "code"]);
      }, kt = function(e2) {
        if (0 === e2.length)
          return 0;
        for (var t2 = 0, n2 = 0, o2 = "undefined" != typeof document && void 0 !== document.characterSet ? document.characterSet : "UTF-8"; void 0 !== e2[t2]; )
          n2 += e2[t2++].charCodeAt[t2] <= 255 ? 1 : false === o2 ? 3 : 2;
        return n2;
      }, Lt = function(e2) {
        var t2 = e2 || 99999999;
        return Math.round(Math.random() * t2);
      }, Nt = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", St = Nt.length, At = function(e2, t2) {
        for (var n2 in e2)
          if (e2[n2] === t2)
            return true;
        return false;
      }, Et = {}, Rt = function(e2) {
        return -1 === e2.indexOf("http://") || -1 === e2.indexOf("https://") ? "https://" + e2 : e2.replace(/https|http/, "https");
      }, Ot = function e2(t2) {
        if (0 === Object.getOwnPropertyNames(t2).length)
          return /* @__PURE__ */ Object.create(null);
        var o2 = Array.isArray(t2) ? [] : /* @__PURE__ */ Object.create(null), i2 = "";
        for (var a2 in t2)
          null !== t2[a2] ? void 0 !== t2[a2] ? (i2 = n(t2[a2]), ["string", "number", "function", "boolean"].indexOf(i2) >= 0 ? o2[a2] = t2[a2] : o2[a2] = e2(t2[a2])) : o2[a2] = void 0 : o2[a2] = null;
        return o2;
      };
      function Gt(e2, t2) {
        if (!_t(e2) || !_t(t2))
          return false;
        var n2 = false;
        return t2.forEach(function(t3) {
          var o2 = t3.key, i2 = t3.value, a2 = e2.find(function(e3) {
            return e3.key === o2;
          });
          a2 ? a2.value !== i2 && (a2.value = i2, n2 = true) : (e2.push({ key: o2, value: i2 }), n2 = true);
        }), n2;
      }
      var Ut = function(e2) {
        return e2 === L.GRP_AVCHATROOM;
      }, Pt = function(e2) {
        var t2 = e2.type, n2 = e2.groupID;
        return t2 === L.GRP_COMMUNITY || "".concat(n2).startsWith(st) && !"".concat(n2).includes(rt);
      }, bt = function(e2) {
        return "".concat(e2).startsWith(st) && "".concat(e2).includes(rt);
      }, wt = function(e2) {
        return pt(e2) && e2.slice(0, 3) === L.CONV_C2C;
      }, Ft = function(e2) {
        return pt(e2) && e2.slice(0, 5) === L.CONV_GROUP;
      }, qt = function(e2) {
        return pt(e2) && e2 === L.CONV_SYSTEM;
      };
      function xt(e2, t2) {
        var n2 = {};
        return Object.keys(e2).forEach(function(o2) {
          n2[o2] = t2(e2[o2], o2);
        }), n2;
      }
      function Vt(e2) {
        return se ? new Promise(function(t2, n2) {
          ce.getImageInfo({ src: e2, success: function(e3) {
            t2({ width: e3.width, height: e3.height });
          }, fail: function() {
            t2({ width: 0, height: 0 });
          } });
        }) : Te && 9 === ke ? Promise.resolve({ width: 0, height: 0 }) : new Promise(function(t2, n2) {
          var o2 = new Image();
          o2.onload = function() {
            t2({ width: this.width, height: this.height }), o2 = null;
          }, o2.onerror = function() {
            t2({ width: 0, height: 0 }), o2 = null;
          }, o2.src = e2;
        });
      }
      function Ht() {
        function e2() {
          return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        }
        return "".concat(e2() + e2()).concat(e2()).concat(e2()).concat(e2()).concat(e2()).concat(e2()).concat(e2());
      }
      function Bt() {
        var e2 = "unknown";
        if (Ee && (e2 = "mac"), Ae && (e2 = "windows"), me && (e2 = "ios"), ye && (e2 = "android"), se)
          try {
            var t2 = ce.getSystemInfoSync().platform;
            void 0 !== t2 && (e2 = t2);
          } catch (n2) {
          }
        return e2;
      }
      function Kt(e2, t2) {
        e2 = e2.split("."), t2 = t2.split(".");
        for (var n2 = Math.max(e2.length, t2.length); e2.length < n2; )
          e2.push("0");
        for (; t2.length < n2; )
          t2.push("0");
        for (var o2 = 0; o2 < n2; o2++) {
          var i2 = parseInt(e2[o2]), a2 = parseInt(t2[o2]);
          if (i2 > a2)
            return 1;
          if (i2 < a2)
            return -1;
        }
        return 0;
      }
      function Wt(e2) {
        var t2 = e2.originUrl, n2 = void 0 === t2 ? void 0 : t2, o2 = e2.originWidth, i2 = e2.originHeight, a2 = e2.min, s2 = void 0 === a2 ? 198 : a2, r2 = parseInt(o2), c2 = parseInt(i2), u2 = { url: void 0, width: 0, height: 0 };
        if ((r2 <= c2 ? r2 : c2) <= s2)
          u2.url = n2, u2.width = r2, u2.height = c2;
        else {
          c2 <= r2 ? (u2.width = Math.ceil(r2 * s2 / c2), u2.height = s2) : (u2.width = s2, u2.height = Math.ceil(c2 * s2 / r2));
          var l2 = n2 && n2.indexOf("?") > -1 ? "".concat(n2, "&") : "".concat(n2, "?");
          u2.url = "".concat(l2, 198 === s2 ? "imageView2/3/w/198/h/198" : "imageView2/3/w/720/h/720");
        }
        return ft(n2) ? (u2.url, g(u2, ct)) : u2;
      }
      function Yt(e2) {
        var t2 = e2[2];
        e2[2] = e2[1], e2[1] = t2;
        for (var n2 = 0; n2 < e2.length; n2++)
          e2[n2].setType(n2);
      }
      function jt(e2) {
        var t2 = e2.servcmd;
        return t2.slice(t2.indexOf(".") + 1);
      }
      function Jt(e2, t2) {
        return Math.round(Number(e2) * Math.pow(10, t2)) / Math.pow(10, t2);
      }
      function zt(e2, t2) {
        return e2.includes(t2);
      }
      function Xt(e2, t2) {
        return e2.includes(t2);
      }
      function Qt(e2) {
        return e2.split(rt)[0];
      }
      var Zt = function(e2, t2, n2) {
        if (ft(t2))
          return "";
        switch (e2) {
          case L.MSG_TEXT:
            return t2.text;
          case L.MSG_IMAGE:
            return n2 ? "[Image]" : "[图片]";
          case L.MSG_LOCATION:
            return n2 ? "[Location]" : "[位置]";
          case L.MSG_AUDIO:
            return n2 ? "[Voice]" : "[语音]";
          case L.MSG_VIDEO:
            return n2 ? "[Video]" : "[视频]";
          case L.MSG_FILE:
            return n2 ? "[File]" : "[文件]";
          case L.MSG_CUSTOM:
            return n2 ? "[Custom Messages]" : "[自定义消息]";
          case L.MSG_GRP_TIP:
            return n2 ? "[Group Notification]" : "[群提示消息]";
          case L.MSG_GRP_SYS_NOTICE:
            return n2 ? "[Group System Message]" : "[群系统通知]";
          case L.MSG_FACE:
            return n2 ? "[Animated Sticker]" : "[动画表情]";
          case L.MSG_MERGER:
            return n2 ? "[Chat Record]" : "[聊天记录]";
          default:
            return "";
        }
      };
      function $t(e2) {
        return e2 === L.MSG_TEXT || e2 === L.MSG_CUSTOM || e2 === L.MSG_LOCATION || e2 === L.MSG_FACE;
      }
      function en(e2) {
        var t2 = [];
        if (!pt(e2))
          return t2;
        var n2 = e2.length;
        if (0 === n2)
          return t2;
        for (var o2 = n2 - 1; o2 >= 0; o2--)
          "1" === e2[o2] && t2.push(Math.pow(2, n2 - o2 - 1));
        return t2;
      }
      function tn() {
        return !Te && !se;
      }
      function nn(e2) {
        return "the length of userIDList cannot exceed ".concat(e2);
      }
      function on(e2, t2) {
        if (e2) {
          var n2 = e2;
          return t2 && (e2.startsWith("http://") ? n2 = e2.replace(/^http:\/\/[^/]+/, t2) : e2.startsWith("https://") && (n2 = e2.replace(/^https:\/\/[^/]+/, t2))), n2;
        }
      }
      function an(e2) {
        if (_t(e2) && 0 !== e2.length) {
          var t2 = 0;
          return e2.forEach(function(e3) {
            t2 += e3;
          }), t2.toFixed(0);
        }
      }
      function sn(e2) {
        if (_t(e2) && 0 !== e2.length) {
          var t2 = 0;
          return e2.forEach(function(e3) {
            t2 += e3;
          }), (t2 / e2.length).toFixed(0);
        }
      }
      function rn(e2) {
        var t2 = false;
        return e2 && e2 > 1 && (t2 = true), t2;
      }
      var cn = Object.prototype.hasOwnProperty;
      function un(e2) {
        if (null == e2)
          return true;
        if ("boolean" == typeof e2)
          return false;
        if ("number" == typeof e2)
          return 0 === e2;
        if ("string" == typeof e2)
          return 0 === e2.length;
        if ("function" == typeof e2)
          return 0 === e2.length;
        if (Array.isArray(e2))
          return 0 === e2.length;
        if (e2 instanceof Error)
          return "" === e2.message;
        if (ht(e2)) {
          for (var t2 in e2)
            if (cn.call(e2, t2))
              return false;
          return true;
        }
        return !(!ut(e2) && (n2 = e2, "set" !== It(n2)) && !lt(e2)) && 0 === e2.size;
        var n2;
      }
      function ln(e2, t2, n2) {
        if (void 0 === t2)
          return true;
        var o2 = true;
        if (ht(t2))
          Object.keys(t2).forEach(function(i3) {
            var a2 = 1 === e2.length ? e2[0][i3] : void 0;
            o2 = !!dn(a2, t2[i3], n2, i3) && o2;
          });
        else if (_t(t2))
          for (var i2 = 0; i2 < t2.length; i2++)
            o2 = !!dn(e2[i2], t2[i2], n2, t2[i2].name) && o2;
        if (o2)
          return o2;
        throw new Error("Params validate failed.");
      }
      function dn(e2, t2, n2, o2) {
        if (void 0 === t2)
          return true;
        var i2 = true;
        if (t2.required && un(e2) && (Ye.e("[".concat(n2, '] Missing required params: "').concat(o2, '".')), i2 = false), !un(e2)) {
          var a2 = It(e2), s2 = t2.type.toLowerCase();
          a2 !== s2 && ("asyncfunction" === a2 && "function" === s2 || (Ye.e("[".concat(n2, '] Invalid params: type check failed for "').concat(o2, '". Expected ').concat(t2.type, ".")), i2 = false));
        }
        return t2.validator && !t2.validator(e2, n2, o2) && (Ye.e("[".concat(n2, '] Invalid params: custom validator check failed for "').concat(o2, '".')), i2 = false), i2;
      }
      var pn, gn = { UNSEND: "unSend", SUCCESS: "success", FAIL: "fail" }, hn = { NOT_START: "notStart", PENDING: "pending", RESOLVED: "resolved", REJECTED: "rejected" }, _n = function(e2) {
        if (!e2)
          return false;
        if (wt(e2) || Ft(e2) || qt(e2))
          return true;
        var t2 = Kn("InvalidConversationID", e2);
        return t2 && Ye.w(t2), false;
      }, fn = function(e2) {
        "" !== e2.desc && "" !== Kn("API_REFER") && Ye.w("[".concat(e2.api, "] | ").concat(e2.paramName, " | ").concat(e2.desc, ", ").concat(Kn("API_REFER")).concat(e2.api));
      }, vn = function() {
        return Kn("StringRequiredLog");
      }, mn = function(e2) {
        return Kn("NonEmptyStringRequiredLog", e2);
      }, Mn = function() {
        return Kn("NumberRequiredLog");
      }, yn = function() {
        return Kn("UndefinedNotAllowedLog");
      }, In = function() {
        return Kn("FileRequiredLog");
      }, Cn = function() {
        return Kn("FunctionRequiredLog");
      }, Dn = function() {
        return Kn("ArrayRequiredLog");
      }, Tn = function() {
        return Kn("NonEmptyArrayLog");
      }, kn = function() {
        return Kn("CallbackMissingLog");
      }, Ln = function() {
        return Kn("PositiveIntegerRequiredLog");
      }, Nn = function(e2, t2) {
        return Kn("StringNotLongerThanLog", e2, t2);
      }, Sn = function(e2, t2) {
        return Kn("NumberLessThanLog", e2, t2);
      }, An = function(e2, t2) {
        return Kn("NumberGreaterOrEqualLog", e2, t2);
      }, En = function(e2) {
        return Kn("KeyValueStringRequiredLog", e2);
      }, Rn = function() {
        return Kn("PlainObjectRequiredLog");
      }, On = function() {
        return Kn("NonEmptyContentRequiredLog");
      }, Gn = function() {
        return Kn("FileNotSelectedLog");
      }, Un = function() {
        return Kn("MessageInstanceRequiredLog");
      }, Pn = function() {
        return Kn("NonAnonymousFunctionLog");
      }, bn = function() {
        return Kn("MessageExtensionNotAvailableLog");
      }, wn = function() {
        return Kn("MessageReactionRequiredLog");
      }, Fn = function(e2, t2) {
        return Kn("MaximumArrayLengthLog", e2, t2);
      }, qn = { type: "String", required: true }, xn = { type: "Array", required: true }, Vn = { type: "Object", required: true }, Hn = { type: "Boolean", required: true }, Bn = { type: "number", required: true }, Kn = null, Wn = { hookGetAPITips: function(e2) {
        Kn = e2;
      }, login: { userID: qn, userSig: qn }, addToBlacklist: { userIDList: xn }, removeFromBlacklist: { userIDList: xn }, on: [{ name: "eventName", type: "String", validator: function(e2, t2, n2) {
        return "string" == typeof e2 && 0 !== e2.length || (fn({ api: t2, paramName: n2, desc: mn(n2) }), false);
      } }, { name: "handler", type: "Function", validator: function(e2, t2, n2) {
        return "function" != typeof e2 ? (fn({ api: t2, paramName: n2, desc: Cn() }), false) : ("" === e2.name && fn({ api: t2, paramName: n2, desc: Pn() }), true);
      } }], once: [{ name: "eventName", type: "String", validator: function(e2, t2, n2) {
        return "string" == typeof e2 && 0 !== e2.length || (fn({ api: t2, paramName: n2, desc: mn(n2) }), false);
      } }, { name: "handler", type: "Function", validator: function(e2, t2, n2) {
        return "function" != typeof e2 ? (fn({ api: t2, paramName: n2, desc: Cn() }), false) : ("" === e2.name && fn({ api: t2, paramName: n2, desc: Pn() }), true);
      } }], off: [{ name: "eventName", type: "String", validator: function(e2, t2, n2) {
        return "string" == typeof e2 && 0 !== e2.length || (fn({ api: t2, paramName: n2, desc: mn(n2) }), false);
      } }, { name: "handler", type: "Function", validator: function(e2, t2, n2) {
        return "function" != typeof e2 ? (fn({ api: t2, paramName: n2, desc: Cn() }), false) : ("" === e2.name && fn({ api: t2, paramName: n2, desc: Pn() }), true);
      } }], sendMessage: [t({ name: "message" }, Vn)], setMessageExtensions: [t(t({ name: "message" }, Vn), {}, { validator: function(e2, t2, n2) {
        return e2.status === gn.SUCCESS && true === e2.isSupportExtension || (fn({ api: t2, paramName: n2, desc: bn() }), false);
      } }), t({ name: "extensions" }, xn)], getMessageExtensions: [t(t({ name: "message" }, Vn), {}, { validator: function(e2, t2, n2) {
        return e2.status === gn.SUCCESS && true === e2.isSupportExtension || (fn({ api: t2, paramName: n2, desc: bn() }), false);
      } })], deleteMessageExtensions: [t(t({ name: "message" }, Vn), {}, { validator: function(e2, t2, n2) {
        return e2.status === gn.SUCCESS && true === e2.isSupportExtension || (fn({ api: t2, paramName: n2, desc: bn() }), false);
      } })], addMessageReaction: [t(t({ name: "message" }, Vn), {}, { validator: function(e2, t2, n2) {
        return "success" === e2.status || (fn({ api: t2, paramName: n2, desc: wn() }), false);
      } }), t({ name: "reactionID" }, qn)], removeMessageReaction: [t(t({ name: "message" }, Vn), {}, { validator: function(e2, t2, n2) {
        return "sucess" === e2.status || (fn({ api: t2, paramName: n2, desc: wn() }), false);
      } }), t({ name: "reactionID" }, qn)], getMessageReactions: { messageList: t({}, xn) }, getAllUserListOfMessageReaction: { message: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        return "success" === e2.status || (fn({ api: t2, paramName: n2, desc: wn() }), false);
      } }), reactionID: t({}, qn), nextSeq: { type: "Number" }, count: { type: "Number" } }, getMessageList: { conversationID: t(t({}, qn), {}, { validator: function(e2) {
        return _n(e2);
      } }), nextReqMessageID: { type: "String" }, count: { type: "Number", validator: function(e2, t2, n2) {
        return !(!ft(e2) && !/^[1-9][0-9]*$/.test(e2)) || (fn({ api: t2, paramName: n2, desc: Ln() }), false);
      } } }, getMessageListHopping: { conversationID: t(t({}, qn), {}, { validator: function(e2) {
        return _n(e2);
      } }), sequence: { type: "Number" }, time: { type: "Number" }, direction: { type: "Number", validator: function(e2, t2, n2) {
        return !(!ft(e2) && 0 !== e2 && 1 !== e2) || (fn({ api: t2, paramName: n2, desc: Kn("0Or1RequiredLog") }), false);
      } }, count: { type: "Number", validator: function(e2, t2, n2) {
        return !(!ft(e2) && !/^[1-9][0-9]*$/.test(e2)) || (fn({ api: t2, paramName: n2, desc: Ln }), false);
      } } }, setMessageRead: { conversationID: t(t({}, qn), {}, { validator: function(e2) {
        return _n(e2);
      } }) }, setAllMessageRead: { scope: { type: "String", required: false, validator: function(e2, t2, n2) {
        return !e2 || -1 !== [L.READ_ALL_C2C_MSG, L.READ_ALL_GROUP_MSG, L.READ_ALL_MSG].indexOf(e2) || (fn({ api: t2, paramName: n2, desc: Kn("ValidScopeRequired") }), false);
      } } }, getConversationProfile: [t(t({ name: "conversationID" }, qn), {}, { validator: function(e2) {
        return _n(e2);
      } })], clearHistoryMessage: [t(t({ name: "conversationID" }, qn), {}, { validator: function(e2) {
        return _n(e2);
      } })], pinConversation: { conversationID: t(t({}, qn), {}, { validator: function(e2) {
        return _n(e2);
      } }), isPinned: t({}, Hn) }, setConversationDraft: { conversationID: t(t({}, qn), {}, { validator: function(e2) {
        return _n(e2);
      } }), draftText: { type: "String", validator: function(e2, t2, n2) {
        return !!pt(e2) || (fn({ api: t2, paramName: n2, desc: vn() }), false);
      } } }, setConversationCustomData: { conversationIDList: t({}, xn), customData: { type: "String", validator: function(e2, t2, n2) {
        return pt(e2) ? !(e2.length > 256) || (fn({ api: t2, paramName: n2, desc: Nn(n2, 256) }), false) : (fn({ api: t2, paramName: n2, desc: vn() }), false);
      } } }, markConversation: { conversationIDList: t({}, xn), markType: { type: "number", validator: function(e2, t2, n2) {
        return dt(e2) ? e2 <= 0 ? (fn({ api: t2, paramName: n2, desc: (o2 = n2, i2 = 0, Kn("NumberGreaterThanLog", o2, i2)) }), false) : !(e2 >= Math.pow(2, 64)) || (fn({ api: t2, paramName: n2, desc: Sn(n2, "Math.pow(2,64)") }), false) : (fn({ api: t2, paramName: n2, desc: Mn() }), false);
        var o2, i2;
      } }, enableMark: t({}, Hn) }, createConversationGroup: { conversationIDList: t({}, xn), groupName: t(t({}, qn), {}, { validator: function(e2, t2, n2) {
        return !!e2 && (!(e2.length > 32) || (fn({ api: t2, paramName: n2, desc: Nn(n2, 32) }), false));
      } }) }, deleteConversationGroup: [t({ name: "groupName" }, qn)], renameConversationGroup: { oldName: t({}, qn), newName: t(t({}, qn), {}, { validator: function(e2, t2, n2) {
        return !!e2 && (!(e2.length > 32) || (fn({ api: t2, paramName: n2, desc: Nn(n2, 32) }), false));
      } }) }, addConversationsToGroup: { conversationIDList: t({}, xn), groupName: t({}, qn) }, deleteConversationsFromGroup: { conversationIDList: t({}, xn), groupName: t({}, qn) }, getGroupList: { groupProfileFilter: { type: "Array" } }, getGroupProfile: { groupID: qn, groupCustomFieldFilter: { type: "Array" }, memberCustomFieldFilter: { type: "Array" } }, getGroupProfileAdvance: { groupIDList: xn }, createGroup: { name: qn }, joinGroup: { groupID: qn, type: { type: "String" }, applyMessage: { type: "String" } }, quitGroup: [t({ name: "groupID" }, qn)], handleApplication: { message: Vn, handleAction: qn, handleMessage: { type: "String" } }, changeGroupOwner: { groupID: qn, newOwnerID: qn }, updateGroupProfile: { groupID: qn, muteAllMembers: { type: "Boolean" } }, dismissGroup: [t({ name: "groupID" }, qn)], searchGroupByID: [t({ name: "groupID" }, qn)], initGroupAttributes: { groupID: qn, groupAttributes: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        var o2 = true;
        return Object.keys(e2).forEach(function(i2) {
          if (!pt(e2[i2]))
            return fn({ api: t2, paramName: n2, desc: En("value") }), o2 = false;
        }), o2;
      } }) }, setGroupAttributes: { groupID: qn, groupAttributes: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        var o2 = true;
        return Object.keys(e2).forEach(function(i2) {
          if (!pt(e2[i2]))
            return fn({ api: t2, paramName: n2, desc: En("value") }), o2 = false;
        }), o2;
      } }) }, deleteGroupAttributes: { groupID: qn, keyList: { type: "Array", validator: function(e2, t2, n2) {
        if (ft(e2) || !_t(e2))
          return fn({ api: t2, paramName: n2, desc: Dn() }), false;
        if (!un(e2)) {
          var o2 = true;
          return e2.forEach(function(e3) {
            if (!pt(e3))
              return fn({ api: t2, paramName: n2, desc: Kn("StringArrayRequiredLog") }), o2 = false;
          }), o2;
        }
        return true;
      } } }, getGroupAttributes: { groupID: qn, keyList: { type: "Array", validator: function(e2, t2, n2) {
        if (ft(e2) || !_t(e2))
          return fn({ api: t2, paramName: n2, desc: Dn() }), false;
        if (!un(e2)) {
          var o2 = true;
          return e2.forEach(function(e3) {
            if (!pt(e3))
              return fn({ api: t2, paramName: n2, desc: En("key") }), o2 = false;
          }), o2;
        }
        return true;
      } } }, setGroupCounters: { groupID: qn, counters: Vn }, increaseGroupCounter: { groupID: qn, key: qn, value: Bn }, decreaseGroupCounter: { groupID: qn, key: qn, value: Bn }, getGroupCounters: { groupID: qn }, getGroupMemberList: { groupID: qn, count: { type: "Number" } }, getGroupMemberProfile: { groupID: qn, userIDList: xn, memberCustomFieldFilter: { type: "Array" } }, addGroupMember: { groupID: qn, userIDList: xn }, setGroupMemberRole: { groupID: qn, userID: qn, role: qn }, setGroupMemberMuteTime: { groupID: qn, userID: qn, muteTime: { type: "Number", validator: function(e2) {
        return e2 >= 0;
      } } }, setGroupMemberNameCard: { groupID: qn, userID: { type: "String" }, nameCard: { type: "String", validator: function(e2, t2, n2) {
        return pt(e2) ? (e2.length, true) : (fn({ api: t2, paramName: n2, desc: vn() }), false);
      } } }, setGroupMemberCustomField: { groupID: qn, userID: { type: "String" }, memberCustomField: xn }, deleteGroupMember: { groupID: qn }, markGroupMemberList: { groupID: qn, markType: { type: "number", validator: function(e2, t2, n2) {
        return dt(e2) ? !(e2 < 1e3) || (fn({ api: t2, paramName: n2, desc: An(n2, 1e3) }), false) : (fn({ api: t2, paramName: n2, desc: Mn() }), false);
      } }, userIDList: t({}, xn), enableMark: t({}, Hn) }, createTextMessage: { to: qn, conversationType: qn, payload: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        return ht(e2) ? pt(e2.text) ? 0 !== e2.text.length || (fn({ api: t2, paramName: "payload.text", desc: On() }), false) : (fn({ api: t2, paramName: "payload.text", desc: vn() }), false) : (fn({ api: t2, paramName: n2, desc: Rn() }), false);
      } }) }, createTextAtMessage: { to: qn, conversationType: qn, payload: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        return ht(e2) ? pt(e2.text) ? 0 === e2.text.length ? (fn({ api: t2, paramName: "payload.text", desc: On() }), false) : !(e2.atUserList && !_t(e2.atUserList)) || (fn({ api: t2, paramName: "payload.atUserList", desc: Dn() }), false) : (fn({ api: t2, paramName: "payload.text", desc: vn() }), false) : (fn({ api: t2, paramName: n2, desc: Rn() }), false);
      } }) }, createCustomMessage: { to: qn, conversationType: qn, payload: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        return ht(e2) ? e2.data && !pt(e2.data) ? (fn({ api: t2, paramName: "payload.data", desc: vn() }), false) : e2.description && !pt(e2.description) ? (fn({ api: t2, paramName: "payload.description", desc: vn() }), false) : !(e2.extension && !pt(e2.extension)) || (fn({ api: t2, paramName: "payload.extension", desc: vn() }), false) : (fn({ api: t2, paramName: "payload", desc: Rn() }), false);
      } }) }, createImageMessage: { to: qn, conversationType: qn, payload: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        if (!ht(e2))
          return fn({ api: t2, paramName: n2, desc: Rn() }), false;
        if (ft(e2.file))
          return fn({ api: t2, paramName: "payload.file", desc: yn() }), false;
        if (re) {
          if (!(e2.file instanceof HTMLInputElement || lt(e2.file)))
            return ht(e2.file) && "undefined" != typeof uni ? 0 !== e2.file.tempFilePaths.length && 0 !== e2.file.tempFiles.length || (fn({ api: t2, paramName: "payload.file", desc: Gn() }), false) : (fn({ api: t2, paramName: "payload.file", desc: In() }), false);
          if (e2.file instanceof HTMLInputElement && 0 === e2.file.files.length)
            return fn({ api: t2, paramName: "payload.file", desc: Gn() }), false;
        }
        return true;
      }, onProgress: { type: "Function", required: false, validator: function(e2, t2, n2) {
        return ft(e2) && fn({ api: t2, paramName: n2, desc: kn() }), true;
      } } }) }, createAudioMessage: { to: qn, conversationType: qn, payload: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        return !!ht(e2) || (fn({ api: t2, paramName: n2, desc: Rn() }), false);
      } }), onProgress: { type: "Function", required: false, validator: function(e2, t2, n2) {
        return ft(e2) && fn({ api: t2, paramName: n2, desc: kn() }), true;
      } } }, createVideoMessage: { to: qn, conversationType: qn, payload: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        if (!ht(e2))
          return fn({ api: t2, paramName: n2, desc: Rn() }), false;
        if (ft(e2.file))
          return fn({ api: t2, paramName: "payload.file", desc: yn() }), false;
        if (re) {
          if (!(e2.file instanceof HTMLInputElement || lt(e2.file)))
            return ht(e2.file) && "undefined" != typeof uni ? !!lt(e2.file.tempFile) || (fn({ api: t2, paramName: "payload.file", desc: Gn() }), false) : (fn({ api: t2, paramName: "payload.file", desc: In() }), false);
          if (e2.file instanceof HTMLInputElement && 0 === e2.file.files.length)
            return fn({ api: t2, paramName: "payload.file", desc: Gn() }), false;
        }
        return true;
      } }), onProgress: { type: "Function", required: false, validator: function(e2, t2, n2) {
        return ft(e2) && fn({ api: t2, paramName: n2, desc: kn() }), true;
      } } }, createFaceMessage: { to: qn, conversationType: qn, payload: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        return ht(e2) ? dt(e2.index) ? !!pt(e2.data) || (fn({ api: t2, paramName: "payload.data", desc: vn() }), false) : (fn({ api: t2, paramName: "payload.index", desc: Mn() }), false) : (fn({ api: t2, paramName: n2, desc: Rn() }), false);
      } }) }, createFileMessage: { to: qn, conversationType: qn, payload: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        if (!ht(e2))
          return fn({ api: t2, paramName: n2, desc: Rn() }), false;
        if (ft(e2.file))
          return fn({ api: t2, paramName: "payload.file", desc: yn() }), false;
        if (re) {
          if (!(e2.file instanceof HTMLInputElement || lt(e2.file)))
            return ht(e2.file) && "undefined" != typeof uni ? 0 !== e2.file.tempFilePaths.length && 0 !== e2.file.tempFiles.length || (fn({ api: t2, paramName: "payload.file", desc: Gn() }), false) : (fn({ api: t2, paramName: "payload.file", desc: In() }), false);
          if (e2.file instanceof HTMLInputElement && 0 === e2.file.files.length)
            return fn({ api: t2, paramName: "payload.file", desc: Gn() }), false;
        }
        return true;
      } }), onProgress: { type: "Function", required: false, validator: function(e2, t2, n2) {
        return ft(e2) && fn({ api: t2, paramName: n2, desc: kn() }), true;
      } } }, createLocationMessage: { to: qn, conversationType: qn, payload: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        return ht(e2) ? pt(e2.description) ? dt(e2.longitude) ? !!dt(e2.latitude) || (fn({ api: t2, paramName: "payload.latitude", desc: Mn() }), false) : (fn({ api: t2, paramName: "payload.longitude", desc: Mn() }), false) : (fn({ api: t2, paramName: "payload.description", desc: vn() }), false) : (fn({ api: t2, paramName: n2, desc: Rn() }), false);
      } }) }, createMergerMessage: { to: qn, conversationType: qn, payload: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        if (un(e2.messageList))
          return fn({ api: t2, paramName: "payload.messageList", desc: Tn() }), false;
        if (un(e2.compatibleText))
          return fn({ api: t2, paramName: "payload.compatibleText", desc: mn("compatibleText") }), false;
        var o2 = false;
        return e2.messageList.forEach(function(e3) {
          e3.status === gn.FAIL && (o2 = true);
        }), !o2 || (fn({ api: t2, paramName: "payload.messageList", desc: Kn("MergeFailedMessageLog") }), false);
      } }) }, revokeMessage: [t(t({ name: "message" }, Vn), {}, { validator: function(e2, t2, n2) {
        return un(e2) ? (fn({ api: t2, paramName: n2, desc: Un() }), false) : e2.conversationType === L.CONV_SYSTEM ? (fn({ api: t2, paramName: n2, desc: Kn("MessageCanBeRevokedDesc") }), false) : true !== e2.isRevoked || (fn({ api: t2, paramName: n2, desc: Kn("MessageRevokedLog") }), false);
      } })], deleteMessage: [t(t({ name: "messageList" }, xn), {}, { validator: function(e2, t2, n2) {
        return !un(e2) || (fn({ api: t2, paramName: n2, desc: Tn() }), false);
      } })], translateText: { sourceTextList: xn, sourceLanguage: qn, targetLanguage: qn }, convertVoiceToText: { message: t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        return un(e2) ? (fn({ api: t2, paramName: n2, desc: Un() }), false) : e2.type === L.MSG_AUDIO && "success" === e2.status || (fn({ api: t2, paramName: n2, desc: Kn("AudioMessageRequiredLog") }), false);
      } }) }, modifyMessage: [t(t({ name: "message" }, Vn), {}, { validator: function(e2, t2, n2) {
        return un(e2) ? (fn({ api: t2, paramName: n2, desc: Un() }), false) : e2.conversationType === L.CONV_SYSTEM ? (fn({ api: t2, paramName: n2, desc: Kn("MessageCanBeModifiedLog") }), false) : true !== e2._onlineOnlyFlag || (fn({ api: t2, paramName: n2, desc: Kn("OnlineMessageNotSupportLog") }), false);
      } })], searchCloudMessages: { keywordList: { type: "Array", required: false, validator: function(e2, t2, n2) {
        return !e2 || (_t(e2) ? 0 === e2.length ? (fn({ api: t2, paramName: n2, desc: Tn() }), false) : !(e2.length > 5) || (fn({ api: t2, paramName: n2, desc: Fn(n2, 5) }), false) : (fn({ api: t2, paramName: n2, desc: Dn() }), false));
      } }, keywordListMatchType: { type: "String", required: false, validator: function(e2, t2, n2) {
        return !e2 || ("or" === e2 || "and" === e2 || fn({ api: t2, paramName: n2, desc: "".concat(e2, " is invalid match type") }));
      } }, senderUserIDList: { type: "Array", required: false, validator: function(e2, t2, n2) {
        return !e2 || (_t(e2) ? (0 === e2.length && fn({ api: t2, paramName: n2, desc: Tn() }), !(e2.length > 5) || (fn({ api: t2, paramName: n2, desc: Fn(n2, 5) }), false)) : (fn({ api: t2, paramName: n2, desc: Dn() }), false));
      } }, messageTypeList: { type: "Array", required: false, validator: function(e2, t2, n2) {
        if (!e2)
          return true;
        if (!_t(e2))
          return fn({ api: t2, paramName: n2, desc: Dn() }), false;
        0 === e2.length && fn({ api: t2, paramName: n2, desc: Tn() });
        var o2, i2 = [L.MSG_TEXT, L.MSG_IMAGE, L.MSG_AUDIO, L.MSG_FILE, L.MSG_VIDEO, L.MSG_LOCATION, L.MSG_CUSTOM, L.MSG_MERGER];
        return !(e2.filter(function(e3) {
          return -1 === i2.indexOf(e3);
        }).length > 0) || (fn({ api: t2, paramName: n2, desc: (o2 = n2, Kn("ContainsUnsupportedMessageTypeLog", o2)) }), false);
      } }, conversationID: { type: "String", required: false, validator: function(e2) {
        return !e2 || _n(e2);
      } }, timePosition: { type: "number", required: false, validator: function(e2, t2, n2) {
        return !e2 || (!(e2 < 0) || (fn({ api: t2, paramName: n2, desc: An(n2, 0) }), false));
      } }, timePeriod: { type: "number", required: false, validator: function(e2, t2, n2) {
        return !e2 || (!(e2 < 0) || (fn({ api: t2, paramName: n2, desc: An(n2, 0) }), false));
      } }, cursor: { type: "String", required: false } }, getUserProfile: { userIDList: { type: "Array", validator: function(e2, t2, n2) {
        return _t(e2) ? (0 === e2.length && fn({ api: t2, paramName: n2, desc: Tn() }), true) : (fn({ api: t2, paramName: n2, desc: Dn() }), false);
      } } }, updateMyProfile: { profileCustomField: { type: "Array", validator: function(e2, t2, n2) {
        return !!ft(e2) || (!!_t(e2) || (fn({ api: t2, paramName: n2, desc: Dn() }), false));
      } } }, setSelfStatus: { customStatus: { type: "String", validator: function(e2, t2, n2) {
        return !!pt(e2) || (fn({ api: t2, paramName: n2, desc: vn() }), false);
      } } }, getUserStatus: { userIDList: { type: "Array", validator: function(e2, t2, n2) {
        return _t(e2) ? 0 !== e2.length || (fn({ api: t2, paramName: n2, desc: Tn() }), false) : (fn({ api: t2, paramName: n2, desc: Dn() }), false);
      } } }, subscribeUserStatus: { userIDList: { type: "Array", validator: function(e2, t2, n2) {
        return _t(e2) ? 0 !== e2.length || (fn({ api: t2, paramName: n2, desc: Tn() }), false) : (fn({ api: t2, paramName: n2, desc: Dn() }), false);
      } } }, unsubscribeUserStatus: { userIDList: { type: "Array", validator: function(e2, t2, n2) {
        return !e2 || (!!_t(e2) || (fn({ api: t2, paramName: n2, desc: Dn() }), false));
      } } }, addFriend: { to: qn, source: { type: "String", required: true, validator: function(e2, t2, n2) {
        return !!e2 && (e2.startsWith("AddSource_Type_") ? !(e2.replace("AddSource_Type_", "").length > 8) || (fn({ api: t2, paramName: n2, desc: Nn("keyword", 8) }), false) : (fn({ api: t2, paramName: n2, desc: Kn("SourcePrefixLog") }), false));
      } }, remark: { type: "String", required: false, validator: function(e2, t2, n2) {
        return !(pt(e2) && e2.length > 96) || (fn({ api: t2, paramName: n2, desc: Nn(n2, 96) }), false);
      } } }, deleteFriend: { userIDList: xn }, checkFriend: { userIDList: xn }, getFriendProfile: { userIDList: xn }, updateFriend: { userID: qn, remark: { type: "String", required: false, validator: function(e2, t2, n2) {
        return !(pt(e2) && e2.length > 96) || (fn({ api: t2, paramName: n2, desc: Nn(n2, 96) }), false);
      } }, friendCustomField: { type: "Array", required: false, validator: function(e2, t2, n2) {
        if (e2) {
          if (!_t(e2))
            return fn({ api: t2, paramName: n2, desc: Dn() }), false;
          var o2 = true;
          return e2.forEach(function(e3) {
            return pt(e3.key) && -1 !== e3.key.indexOf("Tag_SNS_Custom") ? pt(e3.value) ? e3.key.replace("Tag_SNS_Custom_", "").length > 8 ? (fn({ api: t2, paramName: n2, desc: Nn("keyword", 8) }), o2 = false) : void 0 : (fn({ api: t2, paramName: n2, desc: En("value") }), o2 = false) : (fn({ api: t2, paramName: n2, desc: Kn("FriendCustomFieldPrefixLog") }), o2 = false);
          }), o2;
        }
        return true;
      } } }, acceptFriendApplication: { userID: qn }, refuseFriendApplication: { userID: qn }, deleteFriendApplication: { userID: qn }, createFriendGroup: { name: qn }, deleteFriendGroup: { name: qn }, addToFriendGroup: { name: qn, userIDList: xn }, removeFromFriendGroup: { name: qn, userIDList: xn }, renameFriendGroup: { oldName: qn, newName: qn }, sendMessageReadReceipt: [{ name: "messageList", type: "Array", validator: function(e2, t2, n2) {
        return _t(e2) ? 0 !== e2.length || (fn({ api: t2, paramName: n2, desc: Tn() }), false) : (fn({ api: t2, paramName: n2, desc: Dn() }), false);
      } }], getMessageReadReceiptList: [{ name: "messageList", type: "Array", validator: function(e2, t2, n2) {
        return _t(e2) ? 0 !== e2.length || (fn({ api: t2, paramName: n2, desc: Tn() }), false) : (fn({ api: t2, paramName: n2, desc: Dn() }), false);
      } }], createTopicInCommunity: { groupID: qn, topicName: qn }, deleteTopicFromCommunity: { groupID: qn, topicIDList: { type: "Array", validator: function(e2, t2, n2) {
        return !e2 || (!!_t(e2) || (fn({ api: t2, paramName: n2, desc: Dn() }), false));
      } } }, updateTopicProfile: { groupID: qn, topicID: qn }, getTopicList: { groupID: qn, topicIDList: { type: "Array", validator: function(e2, t2, n2) {
        return !e2 || (!!_t(e2) || (fn({ api: t2, paramName: n2, desc: Dn() }), false));
      } } }, addSignalingListener: [{ name: "eventName", type: "String", validator: function(e2, t2, n2) {
        return "string" == typeof e2 && 0 !== e2.length || (fn({ api: t2, paramName: n2, desc: mn(n2) }), false);
      } }, { name: "handler", type: "Function", validator: function(e2, t2, n2) {
        return "function" != typeof e2 ? (fn({ api: t2, paramName: n2, desc: Cn() }), false) : ("" === e2.name && fn({ api: t2, paramName: n2, desc: Pn() }), true);
      } }], removeSignalingListener: [{ name: "eventName", type: "String", validator: function(e2, t2, n2) {
        return "string" == typeof e2 && 0 !== e2.length || (fn({ api: t2, paramName: n2, desc: mn(n2) }), false);
      } }, { name: "handler", type: "Function", validator: function(e2, t2, n2) {
        return "function" != typeof e2 ? (fn({ api: t2, paramName: n2, desc: Cn() }), false) : ("" === e2.name && fn({ api: t2, paramName: n2, desc: Pn() }), true);
      } }], invite: { userID: qn }, inviteSync: [t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        return ht(e2) ? !!pt(e2.userID) || (fn({ api: t2, paramName: "options.userID", desc: vn() }), false) : (fn({ api: t2, paramName: "options", desc: Rn() }), false);
      } }), { name: "successCb", type: "Function", required: false, validator: function(e2, t2, n2) {
        return ft(e2) && fn({ api: t2, paramName: n2, desc: Cn() }), true;
      } }, { name: "errorCb", type: "Function", required: false, validator: function(e2, t2, n2) {
        return ft(e2) && fn({ api: t2, paramName: n2, desc: Cn() }), true;
      } }], inviteInGroup: { groupID: qn, inviteeList: xn }, inviteInGroupSync: [t(t({}, Vn), {}, { validator: function(e2, t2, n2) {
        return ht(e2) ? pt(e2.groupID) ? !!_t(e2.inviteeList) || (fn({ api: t2, paramName: "options.inviteeList", desc: Dn() }), false) : (fn({ api: t2, paramName: "options.groupID", desc: vn() }), false) : (fn({ api: t2, paramName: "options", desc: Rn() }), false);
      } }), { name: "successCb", type: "Function", required: false, validator: function(e2, t2, n2) {
        return ft(e2) && fn({ api: t2, paramName: n2, desc: Cn() }), true;
      } }, { name: "errorCb", type: "Function", required: false, validator: function(e2, t2, n2) {
        return ft(e2) && fn({ api: t2, paramName: n2, desc: Cn() }), true;
      } }], accept: { inviteID: qn }, reject: { inviteID: qn }, getSignalingInfo: [t(t({ name: "message" }, Vn), {}, { validator: function(e2, t2, n2) {
        return !un(e2) || (fn({ api: t2, paramName: n2, desc: Un() }), false);
      } })], modifyInvitation: { inviteID: qn, data: qn } }, Yn = { login: 1, logout: 1, on: 1, once: 1, off: 1, setLogLevel: 1, registerPlugin: 1, destroy: 1, isReady: 1, createTextMessage: 1, createTextAtMessage: 1, createImageMessage: 1, createAudioMessage: 1, createVideoMessage: 1, createCustomMessage: 1, createFaceMessage: 1, createFileMessage: 1, createLocationMessage: 1, createMergerMessage: 1, downloadMergerMessage: 1, createForwardMessage: 1, sendMessage: 1, resendMessage: 1, revokeMessage: 1, deleteMessage: 1, translateText: 1, convertVoiceToText: 1, modifyMessage: 1, searchCloudMessages: 1, sendMessageReadReceipt: 1, getGroupMessageReadMemberList: 1, getMessageReadReceiptList: 1, setMessageExtensions: 1, getMessageExtensions: 1, deleteMessageExtensions: 1, addMessageReaction: 1, removeMessageReaction: 1, getMessageReactions: 1, getAllUserListOfMessageReaction: 1, getMessageList: 1, findMessage: 1, getMessageListHopping: 1, setMessageRead: 1, setAllMessageRead: 1, getConversationList: 1, getConversationProfile: 1, deleteConversation: 1, setConversationDraft: 1, pinConversation: 1, getTotalUnreadMessageCount: 1, setConversationCustomData: 1, markConversation: 1, createConversationGroup: 1, getConversationGroupList: 1, deleteConversationGroup: 1, renameConversationGroup: 1, addConversationsToGroup: 1, deleteConversationsFromGroup: 1, clearHistoryMessage: 1, getGroupList: 1, getGroupProfile: 1, createGroup: 1, joinGroup: 1, updateGroupProfile: 1, quitGroup: 1, dismissGroup: 1, changeGroupOwner: 1, searchGroupByID: 1, setMessageRemindType: 1, getGroupApplicationList: 1, handleGroupApplication: 1, initGroupAttributes: 1, setGroupAttributes: 1, deleteGroupAttributes: 1, getGroupAttributes: 1, setGroupCounters: 1, increaseGroupCounter: 1, decreaseGroupCounter: 1, getGroupCounters: 1, getJoinedCommunityList: 1, createTopicInCommunity: 1, deleteTopicFromCommunity: 1, updateTopicProfile: 1, getTopicList: 1, getGroupMemberProfile: 1, getGroupMemberList: 1, addGroupMember: 1, deleteGroupMember: 1, setGroupMemberNameCard: 1, setGroupMemberMuteTime: 1, setGroupMemberRole: 1, setGroupMemberCustomField: 1, getGroupOnlineMemberCount: 1, markGroupMemberList: 1, getMyProfile: 1, getUserProfile: 1, updateMyProfile: 1, setSelfStatus: 1, getUserStatus: 1, subscribeUserStatus: 1, unsubscribeUserStatus: 1, getBlacklist: 1, addToBlacklist: 1, removeFromBlacklist: 1, getFriendList: 1, addFriend: 1, deleteFriend: 1, checkFriend: 1, updateFriend: 1, getFriendProfile: 1, getFriendApplicationList: 1, refuseFriendApplication: 1, deleteFriendApplication: 1, acceptFriendApplication: 1, setFriendApplicationRead: 1, getFriendGroupList: 1, createFriendGroup: 1, renameFriendGroup: 1, deleteFriendGroup: 1, addToFriendGroup: 1, removeFromFriendGroup: 1, callExperimentalAPI: 1, addSignalingListener: 1, removeSignalingListener: 1, invite: 1, inviteSync: 1, inviteInGroup: 1, inviteInGroupSync: 1, cancel: 1, accept: 1, reject: 1, getSignalingInfo: 1, modifyInvitation: 1 }, jn = 1, Jn = 2, zn = 3, Xn = 4, Qn = 6, Zn = 7, $n = 8, eo = 10, to = 11, no = 12, oo = 13, io = 14, ao = 15, so = 17, ro = 18, co = 19, uo = 20, lo = 21, po = 22, go = 23, ho = 24, _o = 25, fo = 26, vo = 27, mo = 28, Mo = 29, yo = 30, Io = 31, Co = 32, Do = 33, To = 34, ko = function(e2) {
        return { code: 0, data: e2 || {} };
      }, Lo = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          o(this, n2), i2 = t2.call(this);
          var a2 = e3.code, s2 = e3.message, r2 = e3.data;
          return i2.code = a2, i2.message = s2 || i2._getErrorMessage(i2.code), i2.data = r2 || {}, i2;
        }
        return a(n2);
      }(p(Error)), No = { NO_SDKAPPID: 2e3, NO_ACCOUNT_TYPE: 2001, NO_IDENTIFIER: 2002, NO_USERSIG: 2003, NO_TINYID: 2022, NO_A2KEY: 2023, USER_NOT_LOGGED_IN: 2024, REPEAT_LOGIN: 2025, COS_UNDETECTED: 2040, COS_GET_SIG_FAIL: 2041, MSG_SEND_FAIL: 2100, MSG_SEND_FAIL_NOT_IN_AVCHATROOM: 2101, MSG_INSTANCE_REQUIRED: 2105, MSG_INVALID_CONV_TYPE: 2106, MSG_F_IS_EMPTY: 2108, MSG_ONPROGRESS_FUNCTION_ERROR: 2109, MSG_REVOKE_FAIL: 2110, MSG_DELETE_FAIL: 2111, MSG_UNREAD_ALL_FAIL: 2112, READ_RECEIPT_MSG_LIST_EMPTY: 2114, MSG_SEND_GRP_WITH_TOPIC_FAIL: 2115, CANNOT_DELETE_GRP_SYSTEM_NOTICE: 2116, TRANSLATE_TEXT_FAIL: 2117, VOICE_TO_TEXT_FAIL: 2118, UNSUPPORTED_VOICE_FORMAT: 2119, MSG_I_SELECT_F_FIRST: 2251, MSG_I_TYPES_LIMIT: 2252, MSG_I_SIZE_LIMIT: 2253, MSG_A_UPLOAD_FAIL: 2300, MSG_A_SIZE_LIMIT: 2301, MSG_V_UPLOAD_FAIL: 2350, MSG_V_SIZE_LIMIT: 2351, MSG_V_TYPES_LIMIT: 2352, MSG_F_UPLOAD_FAIL: 2400, MSG_F_SELECT_F_FIRST: 2401, MSG_F_SIZE_LIMIT: 2402, MSG_F_URL_IS_EMPTY: 2403, MSG_MERGER_TYPE_INVALID: 2450, MSG_MERGER_KEY_INVALID: 2451, MSG_MERGER_DOWNLOAD_FAIL: 2452, MSG_FORWARD_TYPE_INVALID: 2453, MSG_MODIFY_CONFLICT: 2480, MSG_MODIFY_DISABLED_IN_AVCHATROOM: 2481, CONV_NOT_FOUND: 2500, USER_OR_GRP_NOT_FOUND: 2501, CONV_UN_RECORDED_TYPE: 2502, INVALID_CONV_ID: 2503, ILLEGAL_GRP_TYPE: 2600, CANNOT_JOIN_WORK: 2601, ILLEGAL_GRP_ID: 2602, CANNOT_FIND_GRP: 2603, CANNOT_CHANGE_OWNER_IN_AVCHATROOM: 2620, CANNOT_CHANGE_OWNER_TO_SELF: 2621, CANNOT_DISMISS_WORK: 2622, MEMBER_NOT_IN_GRP: 2623, JOIN_GRP_FAIL: 2660, CANNOT_ADD_MEMBER_IN_AVCHATROOM: 2661, CANNOT_JOIN_NON_AVCHATROOM_WITHOUT_LOGIN: 2662, NOT_OWNER: 2681, CANNOT_SET_MEMBER_ROLE_IN_WORK_AND_AVCHATROOM: 2682, INVALID_MEMBER_ROLE: 2683, CANNOT_SET_SELF_MEMBER_ROLE: 2684, CANNOT_MUTE_SELF: 2685, BAN_DURATION_INVALID: 2686, OPERATION_NOT_SUPPORTED_IN_AVCHATROOM: 2687, NOT_MY_FRIEND: 2700, ALREADY_MY_FRIEND: 2701, FRIEND_GRP_EXISTED: 2710, FRIEND_GRP_NOT_EXIST: 2711, FRIEND_APPLICATION_NOT_EXIST: 2716, UPDATE_PROFILE_INVALID_PARAM: 2721, UPDATE_PROFILE_NO_KEY: 2722, CANNOT_ADD_SELF_TO_BLACKLIST: 2742, NETWORK_ERROR: 2800, NETWORK_TIMEOUT: 2801, NO_NETWORK: 2805, UNCAUGHT_ERROR: 2903, INVALID_OPERATION: 2905, INVALID_TRTC_CMD: 2995, OVER_FREQUENCY_LIMIT: 2996, CANNOT_FIND_PROTOCOL: 2997, CANNOT_FIND_MODULE: 2998, SDK_IS_NOT_READY: 2999, LOGGING_IN: 3e3, LOGIN_FAILED: 3001, KICKED_OUT_MULT_DEVICE: 3002, KICKED_OUT_MULT_ACCOUNT: 3003, KICKED_OUT_USERSIG_EXPIRED: 3004, LOGGED_OUT: 3005, KICKED_OUT_REST_API: 3006, ILLEGAL_TOPIC_ID: 3021, CANNOT_USE_COMMERCIAL_ABILITY: 3122, PROFANITY_FOUND: 3123, OPTIONS_IS_EMPTY: 3153, MSG_A2KEY_EXPIRED: 20002, ACCOUNT_A2KEY_EXPIRED: 70001, HELLO_ANSWER_KICKED_OUT: 1002, OPEN_SERVICE_OVERLOAD_ERROR: 60022, SIGNALING_INVALID_INVITE_ID: 8010, SIGNALING_NO_PERMISSION: 8011, SIGNALING_ALREADY_EXISTS: 8012, INVALID_CANCEL_MESSAGE: 8020, SEND_MESSAGE_FAILED_WITH_CANCEL: 8021, ERR_SVR_COMM_INVALID_SERVICE: 60020, MSG_SEARCH_CURSOR_INVALID: 27002, MSG_SEARCH_CURSOR_EXPIRED: 27003 }, So = null, Ao = function(e2) {
        So = e2;
      }, Eo = function(e2) {
        return Promise.resolve(ko(e2));
      }, Ro = function(e2) {
        var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (e2 instanceof Lo)
          return t2 && null !== So && So.emit(k.ERROR, e2), Promise.reject(e2);
        if (e2 instanceof Error) {
          var n2 = new Lo({ code: No.UNCAUGHT_ERROR });
          return t2 && null !== So && So.emit(k.ERROR, n2), Promise.reject(n2);
        }
        if (ft(e2) || ft(e2.code))
          return Promise.reject(new Lo({ code: No.UNCAUGHT_ERROR }));
        var o2 = new Lo(e2);
        return t2 && null !== So && So.emit(k.ERROR, o2), Promise.reject(o2);
      }, Oo = function() {
        function e2(t2) {
          o(this, e2), this._m = t2, this._n = "";
        }
        return a(e2, [{ key: "isLoggedIn", value: function() {
          return this._m.getModule(no).isLoggedIn();
        } }, { key: "isOversea", value: function() {
          return this._m.getModule(no).isOversea();
        } }, { key: "isPrivateNetWork", value: function() {
          return this._m.getModule(no).isPrivateNetWork();
        } }, { key: "getFileDownloadProxy", value: function() {
          return this._m.getModule(no).getFileDownloadProxy();
        } }, { key: "getMyUserID", value: function() {
          return this._m.getModule(no).getUserID();
        } }, { key: "getMyTinyID", value: function() {
          return this._m.getModule(no).getTinyID();
        } }, { key: "getSDKAppID", value: function() {
          return this._m.getModule(no).getSDKAppID();
        } }, { key: "isIntl", value: function() {
          return this._m.getModule(no).isIntl();
        } }, { key: "isDevMode", value: function() {
          return this._m.getModule(no).isDevMode();
        } }, { key: "getModule", value: function(e3) {
          return this._m.getModule(e3);
        } }, { key: "getPlatform", value: function() {
          return he;
        } }, { key: "getNetworkType", value: function() {
          return this._m.getModule(ao).getNetworkType();
        } }, { key: "probeNetwork", value: function(e3) {
          return this._m.getModule(ao).probe(e3);
        } }, { key: "getCloudConfig", value: function(e3) {
          return this._m.getModule(go).getCloudConfig(e3);
        } }, { key: "emitOuterEvent", value: function(e3, t2) {
          this._m.getOuterEmitterInstance().emit(e3, t2);
        } }, { key: "emitInnerEvent", value: function(e3, t2) {
          this._m.getInnerEmitterInstance().emit(e3, t2);
        } }, { key: "getInnerEmitterInstance", value: function() {
          return this._m.getInnerEmitterInstance();
        } }, { key: "generateTjgID", value: function(e3) {
          return this._m.getModule(no).getTinyID() + "-" + e3.random;
        } }, { key: "filterModifiedMessage", value: function(e3) {
          if (!un(e3)) {
            var t2 = e3.filter(function(e4) {
              return true === e4.isModified;
            });
            t2.length > 0 && this.emitOuterEvent(k.MESSAGE_MODIFIED, t2);
          }
        } }, { key: "filterUnmodifiedMessage", value: function(e3) {
          return un(e3) ? [] : e3.filter(function(e4) {
            return false === e4.isModified;
          });
        } }, { key: "request", value: function(e3) {
          return this._m.getModule(uo).request(e3);
        } }, { key: "canIUse", value: function(e3) {
          return this._m.getModule(vo).canIUse(e3);
        } }, { key: "getErrorMessage", value: function(e3, t2, n2) {
          return this._m.getErrorMessage(e3, t2, n2);
        } }, { key: "outputWarning", value: function(e3, t2, n2) {
          var o2 = this.getErrorMessage(e3, t2, n2);
          o2 && Ye.w(o2);
        } }, { key: "cannotUseCommercialAbility", value: function(e3) {
          var t2 = No.CANNOT_USE_COMMERCIAL_ABILITY;
          return Ro({ code: t2, message: this.getErrorMessage(t2, e3) });
        } }]), e2;
      }(), Go = "wslogin", Uo = "wslogout", Po = "wshello", bo = "KickOther", wo = "getmsg", Fo = "sendmsg", qo = "send_group_msg", xo = "portrait_get_all", Vo = "portrait_set", Ho = "black_list_get", Bo = "black_list_add", Ko = "black_list_delete", Wo = "friend_get", Yo = "friend_get_specified", jo = "friend_check", Jo = "friend_delete", zo = "friend_add", Xo = "friend_update", Qo = "friend_response", Zo = "pendency_get", $o = "pendency_delete", ei = "pendency_report", ti = "group_get", ni = "group_add", oi = "group_delete", ii = "group_update", ai = "msgwithdraw", si = "msgreaded", ri = "set_c2c_peer_mute_notifications", ci = "get_c2c_peer_mute_notifications", ui = "getroammsg", li = "get_peer_read_time", di = "delete_c2c_msg_ramble", pi = "modify_c2c_msg", gi = "set_key_values", hi = "get_key_values", _i = "reaction_add", fi = "reaction_del", vi = "reaction_multi_stat", mi = "reaction_iterate", Mi = "page_get", yi = "batch_delete", Ii = "clear_msg", Ci = "top", Di = "deletemsg", Ti = "set_conv_custom_data", ki = "mark_contact", Li = "create_contact_group", Ni = "del_contact_group", Si = "update_contact_group", Ai = "add_conv_to_group", Ei = "del_conv_from_group", Ri = "get_contact_group", Oi = "get_joined_group_list", Gi = "get_group_self_member_info", Ui = "create_group", Pi = "destroy_group", bi = "modify_group_base_info", wi = "apply_join_group", Fi = "apply_join_group_noauth", qi = "quit_group", xi = "get_group_public_info", Vi = "change_group_owner", Hi = "handle_apply_join_group", Bi = "handle_invite_join_permission_group", Ki = "handle_invite_join_group", Wi = "group_msg_recall", Yi = "msg_read_report", ji = "read_all_unread_msg", Ji = "group_msg_get", zi = "get_group_msg_receipt", Xi = "group_msg_receipt", Qi = "c2c_msg_read_receipt", Zi = "get_group_msg_receipt_detail", $i = "get_pendency", ea = "deletemsg", ta = "get_msg", na = "get_msg_noauth", oa = "get_online_member_num", ia = "delete_group_ramble_msg_by_seq", aa = "modify_group_msg", sa = "set_group_attr", ra = "modify_group_attr", ca = "delete_group_attr", ua = "clear_group_attr", la = "get_group_attr", da = "group_set_key_values", pa = "group_get_key_values", ga = "batch_get_group_notify", ha = "update_group_counter", _a = "get_group_counter", fa = "group_reaction_add", va = "group_reaction_del", ma = "group_reaction_multi_stat", Ma = "group_reaction_iterate", ya = "get_group_member_info", Ia = "get_members", Ca = "get_specified_group_member_info", Da = "add_group_member", Ta = "delete_group_member", ka = "ban_group_member", La = "modify_group_member_info", Na = "modify_user_info", Sa = "cos", Aa = "pre_sig", Ea = "video_cover", Ra = "tim_web_report_v2", Oa = "alive", Ga = "msg_push", Ua = "query", Pa = "multi_msg_push_ws", ba = "ws_msg_push_ack", wa = "stat_forceoffline", Fa = "save_relay_json_msg", qa = "get_relay_json_msg", xa = "fetch_config", Va = "push_configv2", Ha = "fetch_imsdk_purchase_bitsv2", Ba = "push_imsdk_purchase_bitsv2", Ka = "notify2", Wa = "create_topic", Ya = "destroy_topic", ja = "modify_topic", Ja = "get_topic", za = "ws_set_custom_status", Xa = "ws_get_user_status", Qa = "ws_status_subscribe", Za = "ws_status_unsubscribe", $a = "ws_stat_background", es = "ws_stat_foreground", ts = "ws_stat_settoken", ns = "get_local_words", os = "ws_batch_trans_text", is = "ws_sentence_recognition", as = "networkRTT", ss = "messageE2EDelay", rs = "sendMessageC2C", cs = "sendMessageGroup", us = "sendMessageGroupAV", ls = "sendMessageRichMedia", ds = "cosUpload", ps = "messageReceivedGroup", gs = "messageReceivedGroupAVPush", hs = "messageReceivedGroupAVPull", _s = (s(pn = {}, as, 2), s(pn, ss, 3), s(pn, rs, 4), s(pn, cs, 5), s(pn, us, 6), s(pn, ls, 7), s(pn, ps, 8), s(pn, gs, 9), s(pn, hs, 10), s(pn, ds, 11), pn), fs = { info: 4, warning: 5, error: 6 }, vs = { wifi: 1, "2g": 2, "3g": 3, "4g": 4, "5g": 5, unknown: 6, none: 7, online: 8 }, ms = { login: 4 }, Ms = function() {
        function e2(t2) {
          o(this, e2), this._n = "SSOLogData", this.eventType = ms[t2] || 0, this.timestamp = 0, this.networkType = 8, this.code = 0, this.message = "", this.moreMessage = "", this.extension = t2, this.costTime = 0, this.duplicate = false, this.level = 4, this.uiPlatform = void 0, this._sentFlag = false, this._startts = xe();
        }
        return a(e2, [{ key: "updateTimeStamp", value: function() {
          this.timestamp = xe();
        } }, { key: "start", value: function(e3) {
          return this._startts = e3, this;
        } }, { key: "end", value: function() {
          var e3 = this, t2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if (!this._sentFlag) {
            var n2 = xe();
            0 === this.costTime && (this.costTime = n2 - this._startts), this.setMoreMessage("startts:".concat(this._startts, " endts:").concat(n2)), t2 ? (this._sentFlag = true, this._eventStatModule && this._eventStatModule.pushIn(this)) : setTimeout(function() {
              e3._sentFlag = true, e3._eventStatModule && e3._eventStatModule.pushIn(e3);
            }, 0);
          }
        } }, { key: "setError", value: function(e3, t2, n2) {
          if (!(e3 instanceof Error))
            return Ye.w("".concat(this._n, ".setError value not instanceof Error, please check!")), this;
          if (this._sentFlag)
            return this;
          if (this.setNetworkType(n2), t2)
            e3.code && this.setCode(e3.code), e3.message && this.setMoreMessage(e3.message);
          else {
            var o2 = No.NO_NETWORK;
            this.setCode(o2);
          }
          return this.setLevel("error"), this;
        } }, { key: "setCode", value: function(e3) {
          return ft(e3) || this._sentFlag || ("ECONNABORTED" === e3 && (this.code = 103), dt(e3) ? this.code = e3 : Ye.w("".concat(this._n, ".setCode value not a number, please check!"), e3, n(e3))), this;
        } }, { key: "setMessage", value: function(e3) {
          return ft(e3) || this._sentFlag || (dt(e3) && (this.message = e3.toString()), pt(e3) && (this.message = e3)), this;
        } }, { key: "setCostTime", value: function(e3) {
          return this.costTime = e3, this;
        } }, { key: "setLevel", value: function(e3) {
          return ft(e3) || this._sentFlag || (this.level = fs[e3]), this;
        } }, { key: "setMoreMessage", value: function(e3) {
          return un(this.moreMessage) ? this.moreMessage = "".concat(e3) : this.moreMessage += " ".concat(e3), this;
        } }, { key: "setNetworkType", value: function(e3) {
          if (ft(e3))
            Ye.w("".concat(this._n, ".setNetworkType value is undefined, please check!"));
          else {
            var t2 = vs[e3.toLowerCase()];
            ft(t2) || (this.networkType = t2);
          }
          return this;
        } }, { key: "getStartTs", value: function() {
          return this._startts;
        } }, { key: "setUIPlatform", value: function(e3) {
          this.uiPlatform = e3;
        } }], [{ key: "bindEventStatModule", value: function(t2) {
          e2.prototype._eventStatModule = t2;
        } }]), e2;
      }(), ys = function() {
        function e2(t2) {
          o(this, e2), this.type = L.MSG_TEXT, this.content = { text: t2.text || "" };
        }
        return a(e2, [{ key: "setText", value: function(e3) {
          this.content.text = e3;
        } }, { key: "sendable", value: function() {
          return 0 !== this.content.text.length;
        } }]), e2;
      }(), Is = function() {
        function e2(t2, n2) {
          o(this, e2), this._imageMemoryURL = "", this._fileDownloadProxy = n2, se ? this.createImageDataASURLInWXMiniApp(t2.file) : this.createImageDataASURLInWeb(t2.file), this._initImageInfoModel(), this.type = L.MSG_IMAGE, this._percent = 0, this.content = { imageFormat: t2.imageFormat || je.UNKNOWN, uuid: t2.uuid, imageInfoArray: [] }, this.initImageInfoArray(t2.imageInfoArray), this._autoFixUrl();
        }
        return a(e2, [{ key: "_initImageInfoModel", value: function() {
          var e3 = this;
          this._ImageInfoModel = function(t2) {
            this.instanceID = Lt(9999999), this.sizeType = t2.type || 0, this.type = 0, this.size = t2.size || 0, this.width = t2.width || 0, this.height = t2.height || 0, this.imageUrl = t2.url || "", this.url = on(t2.url || e3._imageMemoryURL, e3._fileDownloadProxy);
          }, this._ImageInfoModel.prototype = { setSizeType: function(e4) {
            this.sizeType = e4;
          }, setType: function(e4) {
            this.type = e4;
          }, setImageUrl: function(e4) {
            e4 && (this.imageUrl = e4);
          }, getImageUrl: function() {
            return this.imageUrl;
          } };
        } }, { key: "initImageInfoArray", value: function(e3) {
          for (var t2 = 0, n2 = null, o2 = null; t2 <= 2; )
            o2 = ft(e3) || ft(e3[t2]) ? { type: 0, size: 0, width: 0, height: 0, url: "" } : e3[t2], (n2 = new this._ImageInfoModel(o2)).setSizeType(t2 + 1), n2.setType(t2), this.addImageInfo(n2), t2++;
          this.updateAccessSideImageInfoArray();
        } }, { key: "updateImageInfoArray", value: function(e3) {
          for (var t2, n2 = this.content.imageInfoArray.length, o2 = 0; o2 < n2; o2++)
            t2 = this.content.imageInfoArray[o2], e3[o2].size && (t2.size = e3[o2].size), e3[o2].url && t2.setImageUrl(e3[o2].url), e3[o2].width && (t2.width = e3[o2].width), e3[o2].height && (t2.height = e3[o2].height);
        } }, { key: "_autoFixUrl", value: function() {
          for (var e3 = this.content.imageInfoArray.length, t2 = "", n2 = "", o2 = ["http", "https"], i2 = null, a2 = 0; a2 < e3; a2++)
            this.content.imageInfoArray[a2].url && "" !== (i2 = this.content.imageInfoArray[a2]).imageUrl && (n2 = i2.imageUrl.slice(0, i2.imageUrl.indexOf("://") + 1), t2 = i2.imageUrl.slice(i2.imageUrl.indexOf("://") + 1), o2.indexOf(n2) < 0 && (n2 = "https:"), this.content.imageInfoArray[a2].setImageUrl([n2, t2].join("")));
        } }, { key: "updatePercent", value: function(e3) {
          this._percent = e3, this._percent > 1 && (this._percent = 1);
        } }, { key: "updateImageFormat", value: function(e3) {
          this.content.imageFormat = je[e3.toUpperCase()] || je.UNKNOWN;
        } }, { key: "createImageDataASURLInWeb", value: function(e3) {
          void 0 !== e3 && e3.files.length > 0 && (this._imageMemoryURL = window.URL.createObjectURL(e3.files[0]));
        } }, { key: "createImageDataASURLInWXMiniApp", value: function(e3) {
          e3 && e3.url && (this._imageMemoryURL = e3.url);
        } }, { key: "replaceImageInfo", value: function(e3, t2) {
          this.content.imageInfoArray[t2] instanceof this._ImageInfoModel || (this.content.imageInfoArray[t2] = e3);
        } }, { key: "addImageInfo", value: function(e3) {
          this.content.imageInfoArray.length >= 3 || this.content.imageInfoArray.push(e3);
        } }, { key: "updateAccessSideImageInfoArray", value: function() {
          var e3 = this.content.imageInfoArray, t2 = e3[0], n2 = t2.width, o2 = void 0 === n2 ? 0 : n2, i2 = t2.height, a2 = void 0 === i2 ? 0 : i2;
          0 !== o2 && 0 !== a2 && (Yt(e3), Object.assign(e3[2], Wt({ originWidth: o2, originHeight: a2, min: 720 })));
        } }, { key: "sendable", value: function() {
          return 0 !== this.content.imageInfoArray.length && ("" !== this.content.imageInfoArray[0].imageUrl && 0 !== this.content.imageInfoArray[0].size);
        } }]), e2;
      }(), Cs = function() {
        function e2(t2) {
          o(this, e2), this.type = L.MSG_FACE, this.content = t2 || null;
        }
        return a(e2, [{ key: "sendable", value: function() {
          return null !== this.content;
        } }]), e2;
      }(), Ds = function() {
        function e2(t2, n2) {
          o(this, e2), this.type = L.MSG_AUDIO, this._percent = 0, this.content = { downloadFlag: 2, second: t2.second, size: t2.size, url: on(t2.url, n2), remoteAudioUrl: t2.url || "", uuid: t2.uuid };
        }
        return a(e2, [{ key: "updatePercent", value: function(e3) {
          this._percent = e3, this._percent > 1 && (this._percent = 1);
        } }, { key: "updateAudioUrl", value: function(e3) {
          this.content.remoteAudioUrl = e3;
        } }, { key: "sendable", value: function() {
          return "" !== this.content.remoteAudioUrl;
        } }]), e2;
      }(), Ts = { from: true, groupID: true, groupName: true, to: true }, ks = function() {
        function e2(t2) {
          o(this, e2), this.type = L.MSG_GRP_TIP, this.content = {}, this._initContent(t2);
        }
        return a(e2, [{ key: "_initContent", value: function(e3) {
          var t2 = this;
          Object.keys(e3).forEach(function(n2) {
            switch (n2) {
              case "remarkInfo":
                break;
              case "groupProfile":
                t2.content.groupProfile = {}, t2._initGroupProfile(e3[n2]);
                break;
              case "operatorInfo":
                break;
              case "memberInfoList":
              case "msgMemberInfo":
                t2._updateMemberList(e3[n2]);
                break;
              case "memberExtraInfo":
              case "onlineMemberInfo":
                break;
              case "memberNum":
                t2.content[n2] = e3[n2], t2.content.memberCount = e3[n2];
                break;
              case "newGroupProfile":
                t2.content.newGroupProfile = {}, t2._initNewGroupProfile(e3[n2]);
                break;
              default:
                t2.content[n2] = e3[n2];
            }
          }), this.content.userIDList || (this.content.userIDList = [this.content.operatorID]);
        } }, { key: "_initGroupProfile", value: function(e3) {
          for (var t2 = Object.keys(e3), n2 = 0; n2 < t2.length; n2++) {
            var o2 = t2[n2];
            Ts[o2] && (this.content.groupProfile[o2] = e3[o2]);
          }
        } }, { key: "_updateMemberList", value: function(e3) {
          un(this.content.memberList) ? this.content.memberList = e3 : this.content.memberList.forEach(function(t2) {
            e3.forEach(function(e4) {
              t2.userID === e4.userID && Object.assign(t2, e4);
            });
          });
        } }, { key: "_initNewGroupProfile", value: function(e3) {
          for (var t2 = Object.keys(e3), n2 = 0; n2 < t2.length; n2++) {
            var o2 = t2[n2];
            "muteAllMembers" !== o2 ? this.content.newGroupProfile[o2] = e3[o2] : this.content.newGroupProfile[o2] = 1 === e3[o2];
          }
        } }]), e2;
      }(), Ls = { from: true, groupID: true, groupName: true, to: true }, Ns = function() {
        function e2(t2) {
          o(this, e2), this.type = L.MSG_GRP_SYS_NOTICE, this.content = {}, this._initContent(t2);
        }
        return a(e2, [{ key: "_initContent", value: function(e3) {
          var t2 = this;
          Object.keys(e3).forEach(function(n2) {
            switch (n2) {
              case "memberInfoList":
                break;
              case "remarkInfo":
                t2.content.handleMessage = e3[n2];
                break;
              case "groupProfile":
                t2.content.groupProfile = {}, t2._initGroupProfile(e3[n2]);
                break;
              default:
                t2.content[n2] = e3[n2];
            }
          });
        } }, { key: "_initGroupProfile", value: function(e3) {
          for (var t2 = Object.keys(e3), n2 = 0; n2 < t2.length; n2++) {
            var o2 = t2[n2];
            Ls[o2] && ("groupName" === o2 ? this.content.groupProfile.name = e3[o2] : this.content.groupProfile[o2] = e3[o2]);
          }
        } }]), e2;
      }(), Ss = function() {
        function e2(t2, n2) {
          o(this, e2), this.type = L.MSG_FILE, this._percent = 0;
          var i2 = this._getFileInfo(t2);
          this.content = { downloadFlag: 2, fileUrl: on(t2.url, n2) || "", uuid: t2.uuid, fileName: i2.name || "", fileSize: i2.size || 0 };
        }
        return a(e2, [{ key: "_getFileInfo", value: function(e3) {
          if (!ft(e3.fileName) && !ft(e3.fileSize))
            return { size: e3.fileSize, name: e3.fileName };
          var t2 = e3.file.files[0];
          if (ie) {
            if (t2.path && -1 !== t2.path.indexOf(".")) {
              var n2 = t2.path.slice(t2.path.lastIndexOf(".") + 1).toLowerCase();
              t2.type = n2, t2.name || (t2.name = "".concat(Lt(999999), ".").concat(n2));
            }
            t2.name || (t2.type = "", t2.name = t2.path.slice(t2.path.lastIndexOf("/") + 1).toLowerCase()), t2.suffix && (t2.type = t2.suffix), t2.url || (t2.url = t2.path);
          }
          return { size: t2.size, name: t2.name };
        } }, { key: "updatePercent", value: function(e3) {
          this._percent = e3, this._percent > 1 && (this._percent = 1);
        } }, { key: "updateFileUrl", value: function(e3) {
          this.content.fileUrl = e3;
        } }, { key: "sendable", value: function() {
          return "" !== this.content.fileUrl && ("" !== this.content.fileName && 0 !== this.content.fileSize);
        } }]), e2;
      }(), As = function() {
        function e2(t2) {
          o(this, e2), this.type = L.MSG_CUSTOM, this.content = { data: t2.data || "", description: t2.description || "", extension: t2.extension || "" };
        }
        return a(e2, [{ key: "setData", value: function(e3) {
          return this.content.data = e3, this;
        } }, { key: "setDescription", value: function(e3) {
          return this.content.description = e3, this;
        } }, { key: "setExtension", value: function(e3) {
          return this.content.extension = e3, this;
        } }, { key: "sendable", value: function() {
          return 0 !== this.content.data.length || 0 !== this.content.description.length || 0 !== this.content.extension.length;
        } }]), e2;
      }(), Es = function() {
        function e2(t2, n2) {
          o(this, e2), this.type = L.MSG_VIDEO, this._percent = 0, this.content = { remoteVideoUrl: t2.remoteVideoUrl || t2.videoUrl || "", videoFormat: t2.videoFormat, videoSecond: parseInt(t2.videoSecond, 10), videoSize: t2.videoSize, videoUrl: on(t2.videoUrl, n2), videoDownloadFlag: 2, videoUUID: t2.videoUUID, thumbUUID: t2.thumbUUID, thumbFormat: t2.thumbFormat, thumbWidth: t2.thumbWidth, snapshotWidth: t2.thumbWidth, thumbHeight: t2.thumbHeight, snapshotHeight: t2.thumbHeight, thumbSize: t2.thumbSize, snapshotSize: t2.thumbSize, thumbDownloadFlag: 2, thumbUrl: on(t2.thumbUrl, n2), snapshotUrl: on(t2.thumbUrl, n2) };
        }
        return a(e2, [{ key: "updatePercent", value: function(e3) {
          this._percent = e3, this._percent > 1 && (this._percent = 1);
        } }, { key: "updateVideoUrl", value: function(e3) {
          e3 && (this.content.remoteVideoUrl = e3);
        } }, { key: "updateSnapshotInfo", value: function(e3) {
          var t2 = e3.snapshotUrl, n2 = e3.snapshotWidth, o2 = e3.snapshotHeight;
          un(t2) || (this.content.thumbUrl = this.content.snapshotUrl = t2), un(n2) || (this.content.thumbWidth = this.content.snapshotWidth = Number(n2)), un(o2) || (this.content.thumbHeight = this.content.snapshotHeight = Number(o2));
        } }, { key: "sendable", value: function() {
          return "" !== this.content.remoteVideoUrl;
        } }]), e2;
      }(), Rs = function() {
        function e2(t2) {
          o(this, e2), this.type = L.MSG_LOCATION;
          var n2 = t2.description, i2 = t2.longitude, a2 = t2.latitude;
          this.content = { description: n2, longitude: i2, latitude: a2 };
        }
        return a(e2, [{ key: "sendable", value: function() {
          return true;
        } }]), e2;
      }(), Os = function() {
        function e2(t2, n2) {
          if (o(this, e2), this.from = t2.from, this.messageSender = t2.from, this.time = t2.time, this.messageSequence = t2.sequence, this.clientSequence = t2.clientSequence || t2.sequence, this.messageRandom = t2.random, this.cloudCustomData = t2.cloudCustomData || "", this.clientTime = t2.clientTime || void 0, t2.ID)
            this.ID = t2.ID || "", this.nick = t2.nick || "", this.avatar = t2.avatar || "", this.messageBody = [{ type: t2.type, payload: t2.payload }], t2.conversationType.startsWith(L.CONV_C2C) ? this.receiverUserID = t2.to : t2.conversationType.startsWith(L.CONV_GROUP) && (this.receiverGroupID = t2.to), this.messageReceiver = t2.to;
          else {
            this.nick = t2.nick || "", this.avatar = t2.avatar || "", this.messageBody = [];
            var i2 = t2.elements[0].type, a2 = t2.elements[0].content;
            this._patchRichMediaPayload(i2, a2), this._updateRichMediaDownloadUrl(i2, a2, n2), i2 === L.MSG_MERGER ? this.messageBody.push({ type: i2, payload: new Gs(a2).content }) : this.messageBody.push({ type: i2, payload: a2 }), t2.groupID && (this.receiverGroupID = t2.groupID, this.messageReceiver = t2.groupID), t2.to && (this.receiverUserID = t2.to, this.messageReceiver = t2.to), this.ID = "".concat(t2.tinyID, "-").concat(t2.clientTime, "-").concat(t2.random);
          }
        }
        return a(e2, [{ key: "_patchRichMediaPayload", value: function(e3, t2) {
          e3 === L.MSG_IMAGE ? t2.imageInfoArray.forEach(function(e4) {
            !e4.imageUrl && e4.url && (e4.imageUrl = e4.url, e4.sizeType = e4.type, 1 === e4.type ? e4.type = 0 : 3 === e4.type && (e4.type = 1));
          }) : e3 === L.MSG_VIDEO ? !t2.remoteVideoUrl && t2.videoUrl && (t2.remoteVideoUrl = t2.videoUrl) : e3 === L.MSG_AUDIO ? !t2.remoteAudioUrl && t2.url && (t2.remoteAudioUrl = t2.url) : e3 === L.MSG_FILE && !t2.fileUrl && t2.url && (t2.fileUrl = t2.url, t2.url = void 0);
        } }, { key: "_updateRichMediaDownloadUrl", value: function(e3, t2, n2) {
          n2 && (e3 === L.MSG_IMAGE ? t2.imageInfoArray.forEach(function(e4) {
            e4.url = on(e4.url, n2);
          }) : e3 === L.MSG_VIDEO ? (t2.videoUrl = on(t2.videoUrl, n2), t2.snapshotUrl = on(t2.thumbUrl, n2), t2.snapshotHeight = t2.thumbHeight, t2.snapshotWidth = t2.thumbWidth) : e3 === L.MSG_AUDIO ? t2.url = on(t2.url, n2) : e3 === L.MSG_FILE && (t2.fileUrl = on(t2.fileUrl, n2)));
        } }]), e2;
      }(), Gs = function() {
        function e2(t2, n2) {
          if (o(this, e2), this.type = L.MSG_MERGER, this.content = { downloadKey: "", pbDownloadKey: "", messageList: [], title: "", abstractList: [], compatibleText: "", version: 0, layersOverLimit: false }, t2.downloadKey) {
            var i2 = t2.downloadKey, a2 = t2.pbDownloadKey, s2 = t2.title, r2 = t2.abstractList, c2 = t2.compatibleText, u2 = t2.version;
            this.content.downloadKey = i2, this.content.pbDownloadKey = a2, this.content.title = s2, this.content.abstractList = r2, this.content.compatibleText = c2, this.content.version = u2 || 0;
          } else if (un(t2.messageList))
            1 === t2.layersOverLimit && (this.content.layersOverLimit = true);
          else {
            var l2 = t2.messageList, d2 = t2.title, p2 = t2.abstractList, g2 = t2.compatibleText, h2 = t2.version, _2 = [];
            l2.forEach(function(e3) {
              if (!un(e3)) {
                var t3 = new Os(e3, n2);
                _2.push(t3);
              }
            }), this.content.messageList = _2, this.content.title = d2, this.content.abstractList = p2, this.content.compatibleText = g2, this.content.version = h2 || 0;
          }
        }
        return a(e2, [{ key: "sendable", value: function() {
          return !un(this.content.messageList) || !un(this.content.downloadKey);
        } }]), e2;
      }(), Us = { 1: L.MSG_PRIORITY_HIGH, 2: L.MSG_PRIORITY_NORMAL, 3: L.MSG_PRIORITY_LOW, 4: L.MSG_PRIORITY_LOWEST }, Ps = function() {
        function e2(t2) {
          o(this, e2), this.ID = "", this.conversationID = t2.conversationID || null, this.conversationType = t2.conversationType || L.CONV_C2C, this.conversationSubType = t2.conversationSubType, this.time = t2.time || Math.ceil(Date.now() / 1e3), this.sequence = t2.sequence || 0, this.clientSequence = t2.clientSequence || t2.sequence || 0, this.random = t2.random || 0 === t2.random ? t2.random : Lt(), this.priority = this._computePriority(t2.priority), this.nick = t2.nick || "", this.avatar = t2.avatar || "", this.isPeerRead = false, this.nameCard = "", this.hasRiskContent = rn(t2.checkResult), this._elements = [], this.isPlaceMessage = t2.isPlaceMessage || 0, this.isRevoked = 2 === t2.isPlaceMessage || 8 === t2.msgFlagBits, this.from = t2.from || null, this.to = t2.to || null, this.flow = "", this.isSystemMessage = t2.isSystemMessage || false, this.protocol = t2.protocol || "JSON", this.isResend = false, this.isRead = false, this.status = t2.status || gn.SUCCESS, this._onlineOnlyFlag = false, this._groupAtInfoList = [], this._relayFlag = false, this.atUserList = [], this.cloudCustomData = t2.cloudCustomData || "", this.isDeleted = false, this.isModified = false, this._isExcludedFromUnreadCount = !(!t2.messageControlInfo || 1 !== t2.messageControlInfo.excludedFromUnreadCount), this._isExcludedFromLastMessage = !(!t2.messageControlInfo || 1 !== t2.messageControlInfo.excludedFromLastMessage), this.clientTime = t2.clientTime || He() || 0, this.senderTinyID = t2.senderTinyID || t2.tinyID || "", this.readReceiptInfo = t2.readReceiptInfo || { readCount: void 0, unreadCount: void 0, isPeerRead: void 0 }, this.needReadReceipt = true === t2.needReadReceipt || 1 === t2.needReadReceipt, this.version = t2.messageVersion || 0, this.isBroadcastMessage = t2.isBroadcastMessage || false, this._receiverList = t2.receiverList || void 0, this.isSupportExtension = true === t2.isSupportExtension || 1 === t2.isSupportExtension, this.revoker = t2.revokerInfo && t2.revokerInfo.revoker || "", this.revokerInfo = t2.revokerInfo || { userID: "", nick: "", avatar: "" }, this.revokeReason = t2.revokeReason || "", this.reInitialize(t2.currentUser), this.extractGroupInfo(t2.groupProfile || null), this.handleGroupAtInfo(t2), this.initC2CReadReceiptInfo(t2.readReceiptSentByPeer);
        }
        return a(e2, [{ key: "elements", get: function() {
          return this._elements;
        } }, { key: "getElements", value: function() {
          return this._elements;
        } }, { key: "extractGroupInfo", value: function(e3) {
          if (null !== e3) {
            pt(e3.nick) && (this.nick = e3.nick), pt(e3.avatar) && (this.avatar = e3.avatar);
            var t2 = e3.messageFromAccountExtraInformation;
            ht(t2) && pt(t2.nameCard) && (this.nameCard = t2.nameCard);
          }
        } }, { key: "handleGroupAtInfo", value: function(e3) {
          var t2 = this;
          e3.payload && e3.payload.atUserList && e3.payload.atUserList.forEach(function(e4) {
            e4 !== L.MSG_AT_ALL ? (t2._groupAtInfoList.push({ groupAtAllFlag: 0, groupAtUserID: e4 }), t2.atUserList.push(e4)) : (t2._groupAtInfoList.push({ groupAtAllFlag: 1 }), t2.atUserList.push(L.MSG_AT_ALL));
          }), _t(e3.groupAtInfo) && e3.groupAtInfo.forEach(function(e4) {
            0 === e4.groupAtAllFlag ? t2.atUserList.push(e4.groupAtUserID) : 1 === e4.groupAtAllFlag && t2.atUserList.push(L.MSG_AT_ALL);
          });
        } }, { key: "getGroupAtInfoList", value: function() {
          return this._groupAtInfoList;
        } }, { key: "_initProxy", value: function() {
          this._elements[0] && (this.payload = this._elements[0].content, this.type = this._elements[0].type);
        } }, { key: "reInitialize", value: function(e3) {
          e3 && (this.status = this.from ? gn.SUCCESS : gn.UNSEND, !this.from && (this.from = e3)), this._initFlow(e3), this._initSequence(e3), this._concatConversationID(e3), this.generateMessageID();
        } }, { key: "isSendable", value: function() {
          return 0 !== this._elements.length && ("function" == typeof this._elements[0].sendable && this._elements[0].sendable());
        } }, { key: "_initTo", value: function(e3) {
          this.conversationType === L.CONV_GROUP && (this.to = e3.groupID);
        } }, { key: "_initSequence", value: function(e3) {
          0 === this.clientSequence && e3 && (this.clientSequence = function(e4) {
            if (!e4)
              return false;
            if (void 0 === Et[e4]) {
              var t2 = /* @__PURE__ */ new Date(), n2 = "3".concat(t2.getHours()).slice(-2), o2 = "0".concat(t2.getMinutes()).slice(-2), i2 = "0".concat(t2.getSeconds()).slice(-2);
              Et[e4] = parseInt([n2, o2, i2, "0001"].join("")), n2 = null, o2 = null, i2 = null, Ye.l("autoIncrementIndex start index:".concat(Et[e4]));
            }
            return Et[e4]++;
          }(e3)), 0 === this.sequence && this.conversationType === L.CONV_C2C && (this.sequence = this.clientSequence);
        } }, { key: "generateMessageID", value: function() {
          this.from === L.CONV_SYSTEM && (this.senderTinyID = "144115198244471703"), this.ID = "".concat(this.senderTinyID, "-").concat(this.clientTime, "-").concat(this.random);
        } }, { key: "_initFlow", value: function(e3) {
          "" !== e3 && (e3 === this.from ? (this.flow = "out", this.isRead = true) : this.flow = "in");
        } }, { key: "_concatConversationID", value: function(e3) {
          var t2 = this.to, n2 = "", o2 = this.conversationType;
          o2 !== L.CONV_SYSTEM ? (n2 = o2 === L.CONV_C2C ? e3 === this.from ? t2 : this.from : this.to, this.conversationID = n2 ? "".concat(o2).concat(n2) : null) : this.conversationID = L.CONV_SYSTEM;
        } }, { key: "isElement", value: function(e3) {
          return e3 instanceof ys || e3 instanceof Is || e3 instanceof Cs || e3 instanceof Ds || e3 instanceof Ss || e3 instanceof Es || e3 instanceof ks || e3 instanceof Ns || e3 instanceof As || e3 instanceof Rs || e3 instanceof Gs;
        } }, { key: "setElement", value: function(e3, t2) {
          var n2 = this;
          if (this.isElement(e3))
            return this._elements = [e3], void this._initProxy();
          var o2 = function(e4) {
            if (e4.type && e4.content)
              switch (e4.type) {
                case L.MSG_TEXT:
                  n2.setTextElement(e4.content);
                  break;
                case L.MSG_IMAGE:
                  n2.setImageElement(e4.content, t2);
                  break;
                case L.MSG_AUDIO:
                  n2.setAudioElement(e4.content, t2);
                  break;
                case L.MSG_FILE:
                  n2.setFileElement(e4.content, t2);
                  break;
                case L.MSG_VIDEO:
                  n2.setVideoElement(e4.content, t2);
                  break;
                case L.MSG_CUSTOM:
                  n2.setCustomElement(e4.content);
                  break;
                case L.MSG_LOCATION:
                  n2.setLocationElement(e4.content);
                  break;
                case L.MSG_GRP_TIP:
                  n2.setGroupTipElement(e4.content);
                  break;
                case L.MSG_GRP_SYS_NOTICE:
                  n2.setGroupSystemNoticeElement(e4.content);
                  break;
                case L.MSG_FACE:
                  n2.setFaceElement(e4.content);
                  break;
                case L.MSG_MERGER:
                  n2.setMergerElement(e4.content, t2);
              }
          };
          if (_t(e3))
            for (var i2 = 0; i2 < e3.length; i2++)
              o2(e3[i2]);
          else
            o2(e3);
          this._initProxy();
        } }, { key: "clearElement", value: function() {
          this._elements.length = 0;
        } }, { key: "setTextElement", value: function(e3) {
          var t2 = "string" == typeof e3 ? e3 : e3.text, n2 = new ys({ text: t2 });
          this._elements.push(n2);
        } }, { key: "setImageElement", value: function(e3, t2) {
          var n2 = new Is(e3, t2);
          this._elements.push(n2);
        } }, { key: "setAudioElement", value: function(e3, t2) {
          var n2 = new Ds(e3, t2);
          this._elements.push(n2);
        } }, { key: "setFileElement", value: function(e3, t2) {
          var n2 = new Ss(e3, t2);
          this._elements.push(n2);
        } }, { key: "setVideoElement", value: function(e3, t2) {
          var n2 = new Es(e3, t2);
          this._elements.push(n2);
        } }, { key: "setLocationElement", value: function(e3) {
          var t2 = new Rs(e3);
          this._elements.push(t2);
        } }, { key: "setCustomElement", value: function(e3) {
          var t2 = new As(e3);
          this._elements.push(t2);
        } }, { key: "setGroupTipElement", value: function(e3) {
          var t2 = {}, n2 = e3.operationType;
          if (un(e3.memberInfoList) ? e3.operatorInfo && (t2 = e3.operatorInfo) : n2 !== L.GRP_TIP_MBR_JOIN && n2 !== L.GRP_TIP_MBR_KICKED_OUT && n2 !== L.GRP_TIP_MBR_SET_ADMIN && n2 !== L.GRP_TIP_MBR_CANCELED_ADMIN || (t2 = e3.memberInfoList[0]), !un(e3.memberExtraInfo)) {
            var o2 = e3.memberExtraInfo.reason;
            e3.msgMemberInfo.forEach(function(e4) {
              e4.reason = o2;
            });
          }
          var i2 = t2, a2 = i2.nick, s2 = i2.avatar;
          pt(a2) && (this.nick = a2), pt(s2) && (this.avatar = s2);
          var r2 = new ks(e3);
          this._elements.push(r2);
        } }, { key: "setGroupSystemNoticeElement", value: function(e3) {
          var t2 = new Ns(e3);
          this._elements.push(t2);
        } }, { key: "setFaceElement", value: function(e3) {
          var t2 = new Cs(e3);
          this._elements.push(t2);
        } }, { key: "setMergerElement", value: function(e3, t2) {
          var n2 = new Gs(e3, t2);
          this._elements.push(n2);
        } }, { key: "setIsRead", value: function(e3) {
          this.isRead = e3;
        } }, { key: "setRelayFlag", value: function(e3) {
          this._relayFlag = e3;
        } }, { key: "getRelayFlag", value: function() {
          return this._relayFlag;
        } }, { key: "_computePriority", value: function(e3) {
          if (ft(e3))
            return L.MSG_PRIORITY_NORMAL;
          if (pt(e3) && -1 !== Object.values(Us).indexOf(e3))
            return e3;
          if (dt(e3)) {
            var t2 = "" + e3;
            if (-1 !== Object.keys(Us).indexOf(t2))
              return Us[t2];
          }
          return L.MSG_PRIORITY_NORMAL;
        } }, { key: "setNickAndAvatar", value: function(e3) {
          var t2 = e3.nick, n2 = e3.avatar;
          pt(t2) && (this.nick = t2), pt(n2) && (this.avatar = n2);
        } }, { key: "setNameCard", value: function(e3) {
          pt(e3) && (this.nameCard = e3);
        } }, { key: "initC2CReadReceiptInfo", value: function(e3) {
          this.conversationType === L.CONV_C2C && true === this.needReadReceipt && (this.readReceiptInfo.isPeerRead = 1 === e3);
        } }]), e2;
      }(), bs = function(e2) {
        r(i2, e2);
        var n2 = f(i2);
        function i2(e3) {
          var t2;
          return o(this, i2), (t2 = n2.call(this, e3))._n = "C2CModule", t2._messageFromUnreadDBMap = /* @__PURE__ */ new Map(), t2._noticeFromUnreadDBList = [], t2;
        }
        return a(i2, [{ key: "onNewC2CMessage", value: function(e3) {
          var t2 = e3.dataList, n3 = e3.isInstantMessage, o2 = e3.C2CRemainingUnreadList, i3 = e3.C2CPairUnreadList, a2 = e3.isSyncingEnded;
          Ye.d("".concat(this._n, ".onNewC2CMessage count:").concat(t2.length, " isInstantMessage:").concat(n3));
          var s2 = this._newC2CMessageStoredAndSummary({ dataList: t2, C2CRemainingUnreadList: o2, C2CPairUnreadList: i3, isInstantMessage: n3 }), r2 = s2.conversationOptionsList, c2 = s2.messageList, u2 = s2.isUnreadC2CMessage;
          this.filterModifiedMessage(c2), this.getModule(to).onNewMessage({ conversationOptionsList: r2, isInstantMessage: n3, isUnreadC2CMessage: u2, isSyncingEnded: a2 });
          var l2 = this.filterUnmodifiedMessage(c2);
          n3 && l2.length > 0 && this.emitOuterEvent(k.MESSAGE_RECEIVED, l2), c2.length = 0;
        } }, { key: "_newC2CMessageStoredAndSummary", value: function(e3) {
          for (var t2 = e3.dataList, n3 = e3.C2CRemainingUnreadList, o2 = e3.C2CPairUnreadList, i3 = e3.isInstantMessage, a2 = null, s2 = [], r2 = [], c2 = {}, u2 = this.getModule(fo), l2 = false, d2 = this.getModule(to), p2 = this.getModule(Xn), g2 = this.getFileDownloadProxy(), h2 = 0, _2 = t2.length; h2 < _2; h2++)
            if (this._isC2CNotice(t2[h2]))
              this._noticeFromUnreadDBList.push(t2[h2].eventArray[0].c2CNotifyMsgArray[0]);
            else {
              var f2 = t2[h2];
              f2.currentUser = this.getMyUserID(), f2.conversationType = L.CONV_C2C, f2.isSystemMessage = !!f2.isSystemMessage, (ft(f2.nick) || ft(f2.avatar)) && (l2 = true, Ye.d("".concat(this._n, "._newC2CMessageStoredAndSummary nick or avatar missing!"))), (a2 = new Ps(f2)).setElement(f2.elements, g2), a2.setNickAndAvatar({ nick: f2.nick, avatar: f2.avatar });
              var v2 = a2.conversationID;
              if (i3) {
                if (1 === this._messageFromUnreadDBMap.get(a2.ID))
                  continue;
                var m2 = false;
                if (a2.from !== this.getMyUserID()) {
                  var M2 = d2.getLatestMessageSentByPeer(v2);
                  if (M2) {
                    var y2 = M2.nick, I2 = M2.avatar;
                    l2 ? a2.setNickAndAvatar({ nick: y2, avatar: I2 }) : y2 === a2.nick && I2 === a2.avatar || (m2 = true);
                  }
                } else {
                  var C2 = d2.getLatestMessageSentByMe(v2);
                  if (C2) {
                    var D2 = C2.nick, T2 = C2.avatar;
                    D2 === a2.nick && T2 === a2.avatar || (d2.modifyMessageSentByMe({ conversationID: v2, latestNick: a2.nick, latestAvatar: a2.avatar }), p2.mockOnNickAvatarModified(a2.nick, a2.avatar));
                  }
                }
                var k2 = 1 === t2[h2].isModified;
                if (d2.isMessageSentByCurrentInstance(a2) ? a2.isModified = k2 : k2 = false, 0 === f2.msgLifeTime)
                  a2._onlineOnlyFlag = true, d2.isMessageSentByCurrentInstance(a2) || r2.push(a2);
                else {
                  if (!d2.pushIntoMessageList(r2, a2, k2))
                    continue;
                  m2 && (d2.modifyMessageSentByPeer({ conversationID: v2, latestNick: a2.nick, latestAvatar: a2.avatar }), d2.updateUserProfileSpecifiedKey({ conversationID: v2, nick: a2.nick, avatar: a2.avatar }));
                }
                i3 && a2.clientTime > 0 && u2.addMessageDelay(a2.clientTime);
              } else
                this._messageFromUnreadDBMap.set(a2.ID, 1);
              if (0 !== f2.msgLifeTime) {
                if (false === a2._onlineOnlyFlag) {
                  var N2 = d2.getLastMessageTime(v2);
                  if (dt(N2) && a2.time < N2)
                    continue;
                  if (ft(c2[v2])) {
                    var S2 = 0;
                    "in" === a2.flow && (a2._isExcludedFromUnreadCount || (S2 = 1)), c2[v2] = s2.push({ conversationID: v2, unreadCount: S2, type: a2.conversationType, subType: a2.conversationSubType, lastMessage: a2._isExcludedFromLastMessage ? "" : a2 }) - 1;
                  } else {
                    var A2 = c2[v2];
                    s2[A2].type = a2.conversationType, s2[A2].subType = a2.conversationSubType, s2[A2].lastMessage = a2._isExcludedFromLastMessage ? "" : a2, "in" === a2.flow && (a2._isExcludedFromUnreadCount || s2[A2].unreadCount++);
                  }
                }
              } else
                a2._onlineOnlyFlag = true;
            }
          this._handleRevokedNoticeFromUnreadDB();
          var E2 = false;
          if (_t(o2))
            for (var R2 = function(e4, t3) {
              if (o2[e4].unreadCount > 0) {
                E2 = true;
                var n4 = s2.find(function(t4) {
                  return t4.conversationID === "C2C".concat(o2[e4].from);
                });
                n4 ? n4.unreadCount = o2[e4].unreadCount : s2.push({ conversationID: "C2C".concat(o2[e4].from), unreadCount: o2[e4].unreadCount, type: L.CONV_C2C });
              }
            }, O2 = 0, G2 = o2.length; O2 < G2; O2++)
              R2(O2);
          if (_t(n3))
            for (var U2 = function(e4, t3) {
              s2.find(function(t4) {
                return t4.conversationID === "C2C".concat(n3[e4].from);
              }) || s2.push({ conversationID: "C2C".concat(n3[e4].from), type: L.CONV_C2C, lastMsgTime: n3[e4].lastMsgTime });
            }, P2 = 0, b2 = n3.length; P2 < b2; P2++)
              U2(P2);
          return { conversationOptionsList: s2, messageList: r2, isUnreadC2CMessage: E2 };
        } }, { key: "_isC2CNotice", value: function(e3) {
          var t2 = e3.eventArray;
          return !(!_t(t2) || 10 !== t2[0].event);
        } }, { key: "_handleRevokedNoticeFromUnreadDB", value: function() {
          var e3 = this._noticeFromUnreadDBList.length;
          if (0 !== e3) {
            Ye.l("".concat(this._n, "._handleRevokedNoticeFromUnreadDB count:").concat(e3));
            var t2 = [];
            this._noticeFromUnreadDBList.forEach(function(e4) {
              e4.hasOwnProperty("c2cMessageRevokedNotify") && t2.push(e4);
            }), this.onC2CMessageRevoked({ dataList: t2 }), this._noticeFromUnreadDBList.length = 0, t2.length = 0;
          }
        } }, { key: "onC2CMessageRevoked", value: function(e3) {
          var t2 = this, n3 = this.getModule(to), o2 = [], i3 = null, a2 = true;
          e3.dataList.forEach(function(e4) {
            if (e4.c2cMessageRevokedNotify) {
              var s2 = e4.c2cMessageRevokedNotify.revokedInfos;
              ft(s2) || s2.forEach(function(e5) {
                var s3 = t2.getMyUserID() === e5.from ? "".concat(L.CONV_C2C).concat(e5.to) : "".concat(L.CONV_C2C).concat(e5.from);
                i3 = n3.revoke(s3, e5.sequence, e5.random);
                var r2 = e5.revokerInfo && e5.revokerInfo.revoker, c2 = e5.revokerInfo && e5.revokerInfo.reason;
                if (i3)
                  i3.revokeReason = c2 || "", i3.revoker || (i3.revoker = r2, o2.push(i3));
                else {
                  var u2 = { conversationID: s3, sequence: e5.sequence, time: e5.time, revoker: r2 };
                  n3.isLastMessageRevoked(u2) && (o2.push(u2), a2 = false);
                }
              });
            }
          }), 0 !== o2.length && (n3.onMessageRevoked(o2), true === a2 && (Ye.l("".concat(this._n, ".onC2CMessageRevoked count:").concat(o2.length)), n3.emitMessageRevokedEvent(o2)));
        } }, { key: "onC2CMessageReadReceipt", value: function(e3) {
          var t2 = this;
          e3.dataList.forEach(function(e4) {
            if (!un(e4.c2cMessageReadReceipt)) {
              var n3 = e4.c2cMessageReadReceipt.to;
              e4.c2cMessageReadReceipt.uinPairReadArray.forEach(function(e5) {
                var o2 = e5.peerReadTime;
                Ye.d("".concat(t2._n, "._onC2CMessageReadReceipt to:").concat(n3, " peerReadTime:").concat(o2));
                var i3 = "".concat(L.CONV_C2C).concat(n3), a2 = t2.getModule(to);
                a2.recordPeerReadTime(i3, o2), a2.updateMessageIsPeerReadProperty(i3, o2);
              });
            }
          });
        } }, { key: "onC2CMessageReadNotice", value: function(e3) {
          var t2 = this;
          e3.dataList.forEach(function(e4) {
            if (!un(e4.c2cMessageReadNotice)) {
              var n3 = t2.getModule(to);
              e4.c2cMessageReadNotice.uinPairReadArray.forEach(function(e5) {
                var o2 = e5.from, i3 = e5.peerReadTime;
                Ye.d("".concat(t2._n, ".onC2CMessageReadNotice from:").concat(o2, " lastReadTime:").concat(i3));
                var a2 = "".concat(L.CONV_C2C).concat(o2);
                n3.updateIsReadAfterReadReport({ conversationID: a2, lastMessageTime: i3 }), n3.updateUnreadCount(a2);
              });
            }
          });
        } }, { key: "onC2CMessageModified", value: function(e3) {
          Ye.d("".concat(this._n, ".onC2CMessageModified options:"), JSON.stringify(e3));
          var n3 = this.getModule(to);
          e3.dataList.forEach(function(e4) {
            n3.onMessageModified(t(t({}, e4), {}, { conversationType: L.CONV_C2C }));
          });
        } }, { key: "onReadReceiptList", value: function(e3) {
          Ye.d("".concat(this._n, ".onReadReceiptList options:"), JSON.stringify(e3));
          var t2 = e3.dataList, n3 = t2.userID, o2 = t2.readReceiptList;
          this.getModule(to).updateReadReceiptInfo({ userID: n3, readReceiptList: o2 });
        } }, { key: "sendMessage", value: function(e3, t2) {
          var n3 = this._createC2CMessagePack(e3, t2);
          return this.request(n3);
        } }, { key: "_createC2CMessagePack", value: function(e3, t2) {
          var n3 = null;
          t2 && (t2.offlinePushInfo && (n3 = t2.offlinePushInfo), true === t2.onlineUserOnly && (n3 ? n3.disablePush = true : n3 = { disablePush: true }));
          var o2 = "";
          pt(e3.cloudCustomData) && e3.cloudCustomData.length > 0 && (o2 = e3.cloudCustomData);
          var i3 = [];
          if (ht(t2) && ht(t2.messageControlInfo)) {
            var a2 = t2.messageControlInfo, s2 = a2.excludedFromUnreadCount, r2 = a2.excludedFromLastMessage, c2 = a2.excludedFromContentModeration;
            true === s2 && i3.push("NoUnread"), true === r2 && i3.push("NoLastMsg"), true === c2 && i3.push("NoMsgCheck");
          }
          var u2 = this.isOnlineMessage(e3, t2) ? 0 : void 0;
          return { protocolName: Fo, tjgID: this.generateTjgID(e3), requestData: { fromAccount: this.getMyUserID(), toAccount: e3.to, msgBody: e3.getElements(), cloudCustomData: o2, msgSeq: e3.sequence, msgRandom: e3.random, msgLifeTime: u2, nick: e3.nick, avatar: e3.avatar, offlinePushInfo: n3 ? { pushFlag: true === n3.disablePush ? 1 : 0, title: n3.title || "", desc: n3.description || "", ext: n3.extension || "", apnsInfo: { badgeMode: true === n3.ignoreIOSBadge ? 1 : 0, isVoipPush: this._isVoipPush(n3) }, androidInfo: { OPPOChannelID: n3.androidOPPOChannelID || "" } } : void 0, messageControlInfo: 0 !== u2 ? i3 : void 0, clientTime: e3.clientTime, needReadReceipt: true === e3.needReadReceipt ? 1 : 0, isSupportExtension: true === e3.isSupportExtension ? 1 : 0, isRelayMessage: true === e3._relayFlag ? 1 : 0 } };
        } }, { key: "_isVoipPush", value: function(e3) {
          var t2 = void 0;
          return ft(e3.disableVoipPush) || (t2 = false === e3.disableVoipPush ? 1 : 0), t2;
        } }, { key: "isOnlineMessage", value: function(e3, t2) {
          return !(!t2 || true !== t2.onlineUserOnly);
        } }, { key: "revokeMessage", value: function(e3) {
          return this.request({ protocolName: ai, requestData: { msgInfo: { fromAccount: e3.from, toAccount: e3.to, msgSeq: e3.sequence, msgRandom: e3.random, msgTimeStamp: e3.time } } });
        } }, { key: "deleteMessage", value: function(e3) {
          var t2 = e3.to, n3 = e3.keyList;
          return Ye.l("".concat(this._n, ".deleteMessage toAccount:").concat(t2, " count:").concat(n3.length)), this.request({ protocolName: di, requestData: { fromAccount: this.getMyUserID(), to: t2, keyList: n3 } });
        } }, { key: "modifyRemoteMessage", value: function(e3) {
          var t2 = e3.from, n3 = e3.to, o2 = e3.version, i3 = void 0 === o2 ? 0 : o2, a2 = e3.sequence, s2 = e3.random, r2 = e3.time, c2 = e3.payload, u2 = e3.type, l2 = e3.cloudCustomData, d2 = void 0;
          return $t(u2) && (d2 = []).push({ type: u2, content: c2 }), this.request({ protocolName: pi, requestData: { from: t2, to: n3, version: i3, sequence: a2, random: s2, time: r2, elements: d2, cloudCustomData: l2 } });
        } }, { key: "setMessageRead", value: function(e3) {
          var t2 = this, n3 = e3.conversationID, o2 = e3.lastMessageTime, i3 = "".concat(this._n, ".setMessageRead");
          Ye.l("".concat(i3, " conversationID:").concat(n3, " lastMessageTime:").concat(o2)), dt(o2) || this.outputWarning("DoNotModifyLastTime");
          var a2 = new Ms("setC2CMessageRead");
          return a2.setMessage("conversationID:".concat(n3, " lastMessageTime:").concat(o2)), this.request({ protocolName: si, requestData: { C2CMsgReaded: { cookie: "", C2CMsgReadedItem: [{ toAccount: n3.replace("C2C", ""), lastMessageTime: o2, receipt: 1 }] } } }).then(function() {
            a2.setNetworkType(t2.getNetworkType()).end(), Ye.l("".concat(i3, " ok"));
            var e4 = t2.getModule(to);
            return e4.updateIsReadAfterReadReport({ conversationID: n3, lastMessageTime: o2 }), e4.updateUnreadCount(n3), ko();
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              a2.setError(e4, o3, i4).end();
            }), Ye.l("".concat(i3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getRoamingMessage", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".getRoamingMessage"), o2 = e3.peerAccount, i3 = e3.conversationID, a2 = e3.count, s2 = e3.lastMessageTime, r2 = e3.messageKey, c2 = "peerAccount:".concat(o2, " count:").concat(a2 || 15, " lastMessageTime:").concat(s2 || 0, " messageKey:").concat(r2);
          Ye.l("".concat(n3, " ").concat(c2));
          var u2 = new Ms("getC2CRoamingMessages");
          return this.request({ protocolName: ui, requestData: { peerAccount: o2, count: a2 || 15, lastMessageTime: s2 || 0, messageKey: r2 } }).then(function(e4) {
            var o3 = e4.data, a3 = o3.complete, s3 = o3.messageList, r3 = o3.messageKey, l2 = o3.lastMessageTime;
            ft(s3) ? Ye.l("".concat(n3, " ok. complete:").concat(a3, " but messageList is undefined!")) : Ye.l("".concat(n3, " ok. complete:").concat(a3, " count:").concat(s3.length)), u2.setNetworkType(t2.getNetworkType()).setMessage("".concat(c2, " complete:").concat(a3, " length:").concat(s3.length)).end();
            var d2 = t2.getModule(to);
            1 === a3 && d2.setCompleted(i3);
            var p2 = d2.onRoamingMessage(s3, i3);
            d2.modifyMessageList(i3), d2.updateIsRead(i3), d2.updateRoamingMessageKeyAndTime(i3, r3, l2);
            var g2 = d2.getPeerReadTime(i3);
            if (Ye.l("".concat(n3, " update isPeerRead property. conversationID:").concat(i3, " peerReadTime:").concat(g2)), g2)
              d2.updateMessageIsPeerReadProperty(i3, g2);
            else {
              var h2 = i3.replace(L.CONV_C2C, "");
              t2.getRemotePeerReadTime([h2]).then(function() {
                d2.updateMessageIsPeerReadProperty(i3, d2.getPeerReadTime(i3));
              });
            }
            var _2 = "";
            if (p2.length > 0)
              _2 = p2[0].ID;
            else {
              var f2 = d2.getLocalOldestMessage(i3);
              f2 && (_2 = f2.ID);
            }
            return Ye.l("".concat(n3, " nextReqID:").concat(_2, " stored message count:").concat(p2.length)), { nextReqID: _2, storedMessageList: p2 };
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              u2.setMessage(c2).setError(e4, o3, i4).end();
            }), Ye.w("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getRoamingMessagesHopping", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".getRoamingMessagesHopping"), o2 = e3.peerAccount, i3 = e3.time, a2 = void 0 === i3 ? 0 : i3, s2 = e3.count, r2 = e3.direction, c2 = "".concat(L.CONV_C2C).concat(o2), u2 = "peerAccount:".concat(o2, " count:").concat(s2, " time:").concat(a2, " direction:").concat(r2);
          Ye.l("".concat(n3, " ").concat(u2));
          var l2 = new Ms("getC2CRoamingMessagesHopping");
          return this.request({ protocolName: ui, requestData: { peerAccount: o2, count: s2 + 1, lastMessageTime: a2, direction: r2 } }).then(function(e4) {
            var o3 = e4.data, i4 = o3.complete, a3 = o3.messageList, s3 = void 0 === a3 ? [] : a3, d2 = o3.lastMessageTime;
            Ye.l("".concat(n3, " ok. complete:").concat(i4, " count:").concat(s3.length)), l2.setNetworkType(t2.getNetworkType()).setMessage("".concat(u2, " complete:").concat(i4, " length:").concat(s3.length)).end(), 1 !== i4 && (1 === r2 ? s3.pop() : s3.shift());
            var p2 = t2.getModule(to).onRoamingMessage(s3, c2, false);
            t2._modifyMessageList(c2, p2);
            var g2 = t2._computeResult({ complete: i4, lastMessageTime: d2, resultList: p2 });
            return ko(g2);
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              l2.setMessage(u2).setError(e4, o3, i4).end();
            }), Ye.w("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_computeResult", value: function(e3) {
          var t2 = e3.complete, n3 = void 0 === t2 ? 0 : t2, o2 = e3.lastMessageTime, i3 = e3.resultList, a2 = { messageList: m(void 0 === i3 ? [] : i3), isCompleted: false, nextMessageTime: "" };
          return 1 === n3 ? (a2.isCompleted = true, a2) : (a2.nextMessageTime = o2, a2);
        } }, { key: "_modifyMessageList", value: function(e3, t2) {
          var n3 = this.getModule(to).getLocalConversation(e3);
          if (n3)
            for (var o2 = n3.userProfile.nick, i3 = n3.userProfile.avatar, a2 = this.getModule(Xn).getNickAndAvatarByUserID(this.getMyUserID()), s2 = a2.nick, r2 = a2.avatar, c2 = t2.length - 1; c2 >= 0; c2--) {
              var u2 = t2[c2];
              "in" === u2.flow && (u2.nick !== o2 && u2.setNickAndAvatar({ nick: o2 }), u2.avatar !== i3 && u2.setNickAndAvatar({ avatar: i3 })), "out" === u2.flow && (u2.nick !== s2 && u2.setNickAndAvatar({ nick: s2 }), u2.avatar !== r2 && u2.setNickAndAvatar({ avatar: r2 }));
            }
        } }, { key: "getRemotePeerReadTime", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".getRemotePeerReadTime");
          if (un(e3))
            return Ye.w("".concat(n3, " userIDList is empty!")), Promise.resolve();
          var o2 = new Ms("getPeerReadTime");
          return Ye.l("".concat(n3, " userIDList:").concat(e3)), this.request({ protocolName: li, requestData: { userIDList: e3 } }).then(function(i3) {
            var a2 = i3.data.peerReadTimeList;
            Ye.l("".concat(n3, " ok. peerReadTimeList:").concat(a2));
            for (var s2 = "", r2 = t2.getModule(to), c2 = 0; c2 < e3.length; c2++)
              s2 += "".concat(e3[c2], "-").concat(a2[c2], " "), a2[c2] > 0 && r2.recordPeerReadTime("C2C".concat(e3[c2]), a2[c2]);
            o2.setNetworkType(t2.getNetworkType()).setMessage(s2).end();
          }).catch(function(e4) {
            t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), i3 = n4[0], a2 = n4[1];
              o2.setError(e4, i3, a2).end();
            }), Ye.w("".concat(n3, " failed. error:"), e4);
          });
        } }, { key: "sendReadReceipt", value: function(e3) {
          var t2 = this, n3 = e3[0].conversationID.replace(L.CONV_C2C, ""), o2 = new Ms("sendC2CReadReceipt");
          o2.setMessage("peerAccount:".concat(n3));
          var i3 = this.getMyUserID(), a2 = e3.filter(function(e4) {
            return e4.from !== i3 && true === e4.needReadReceipt;
          }).map(function(e4) {
            return { fromAccount: e4.from, toAccount: e4.to, sequence: e4.sequence, random: e4.random, time: e4.time, clientTime: e4.clientTime };
          });
          if (0 === a2.length)
            return Ro({ code: No.READ_RECEIPT_MSG_LIST_EMPTY });
          var s2 = "".concat(this._n, ".sendReadReceipt");
          return Ye.l("".concat(s2, ". peerAccount:").concat(n3, " messageInfoList length:").concat(a2.length)), this.request({ protocolName: Qi, requestData: { peerAccount: n3, messageInfoList: a2 } }).then(function(e4) {
            return o2.end(), Ye.l("".concat(s2, " ok")), ko();
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), i4 = n4[0], a3 = n4[1];
              o2.setError(e4, i4, a3).end();
            }), Ye.w("".concat(s2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getReadReceiptList", value: function(e3) {
          var t2 = "".concat(this._n, ".getReadReceiptList"), n3 = this.getMyUserID(), o2 = e3.filter(function(e4) {
            return e4.from === n3 && true === e4.needReadReceipt;
          });
          return Ye.l("".concat(t2, " userID:").concat(n3, " messageList length:").concat(o2.length)), Eo({ messageList: o2 });
        } }, { key: "getMessageExtensions", value: function(e3, t2) {
          return Ye.l("".concat(this._n, ".getMessageExtensions startSequence:").concat(t2)), this.request({ protocolName: hi, requestData: { from: e3.from, to: e3.to, messageKey: this.getMessageKey(e3), startSequence: t2 } });
        } }, { key: "modifyMessageExtensions", value: function(e3, t2) {
          var n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
          return Ye.l("".concat(this._n, ".modifyMessageExtensions operateType:").concat(n3)), this.request({ protocolName: gi, requestData: { from: e3.from, to: e3.to, messageKey: this.getMessageKey(e3), extensionList: t2, operateType: n3 } });
        } }, { key: "getMessageKey", value: function(e3) {
          var t2 = e3.clientSequence, n3 = e3.random, o2 = e3.time;
          return "".concat(t2, "_").concat(n3, "_").concat(o2);
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._messageFromUnreadDBMap.clear(), this._noticeFromUnreadDBList.length = 0;
        } }]), i2;
      }(Oo), ws = function() {
        function e2() {
          o(this, e2), this.list = /* @__PURE__ */ new Map(), this._n = "MessageListHandler", this._latestMessageSentByPeerMap = /* @__PURE__ */ new Map(), this._latestMessageSentByMeMap = /* @__PURE__ */ new Map();
        }
        return a(e2, [{ key: "getLocalOldestMessageByConversationID", value: function(e3) {
          if (!e3)
            return null;
          if (!this.list.has(e3))
            return null;
          var t2 = this.list.get(e3).values();
          return t2 ? t2.next().value : null;
        } }, { key: "pushIn", value: function(e3) {
          var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n2 = e3.conversationID, o2 = true;
          this.list.has(n2) || this.list.set(n2, /* @__PURE__ */ new Map());
          var i2 = this._getUniqueIDOfMessage(e3), a2 = this.list.get(n2).has(i2);
          if (a2) {
            var s2 = this.list.get(n2).get(i2);
            if (!t2 || true === s2.isModified)
              return o2 = false;
          }
          return this.list.get(n2).set(i2, e3), this._setLatestMessageSentByPeer(n2, e3), this._setLatestMessageSentByMe(n2, e3), o2;
        } }, { key: "unshift", value: function(e3, t2) {
          var n2;
          if (_t(e3) ? e3.length > 0 && (n2 = e3[0].conversationID, this._unshiftMultipleMessages(e3, t2)) : (n2 = e3.conversationID, this._unshiftSingleMessage(e3, t2)), n2) {
            var o2 = Array.from(this.list.get(n2).values()), i2 = o2.length;
            if (0 === i2)
              return;
            for (var a2 = i2 - 1; a2 >= 0; a2--)
              if ("out" === o2[a2].flow) {
                this._setLatestMessageSentByMe(n2, o2[a2]);
                break;
              }
            if (n2.startsWith(L.CONV_C2C)) {
              for (var s2 = i2 - 1; s2 >= 0; s2--)
                if ("in" === o2[s2].flow) {
                  this._setLatestMessageSentByPeer(n2, o2[s2]);
                  break;
                }
            }
          }
        } }, { key: "_unshiftSingleMessage", value: function(e3, t2) {
          var n2 = e3.conversationID, o2 = this._getUniqueIDOfMessage(e3);
          if (!this.list.has(n2))
            return this.list.set(n2, /* @__PURE__ */ new Map()), this.list.get(n2).set(o2, e3), void t2.push(e3);
          var i2 = this.list.get(n2), a2 = Array.from(i2);
          i2.has(o2) || (a2.unshift([o2, e3]), this.list.set(n2, new Map(a2)), t2.push(e3));
        } }, { key: "_unshiftMultipleMessages", value: function(e3, t2) {
          for (var n2 = e3.length, o2 = [], i2 = e3[0].conversationID, a2 = this.list.get(i2), s2 = this.list.has(i2) ? Array.from(a2) : [], r2 = 0; r2 < n2; r2++) {
            var c2 = this._getUniqueIDOfMessage(e3[r2]);
            a2 && a2.has(c2) || (o2.push([c2, e3[r2]]), t2.push(e3[r2]));
          }
          this.list.set(i2, new Map(o2.concat(s2)));
        } }, { key: "remove", value: function(e3) {
          var t2 = e3.conversationID, n2 = this._getUniqueIDOfMessage(e3);
          this.list.has(t2) && this.list.get(t2).delete(n2);
        } }, { key: "revoke", value: function(e3, t2, n2) {
          if (Ye.d("revoke message", e3, t2, n2), this.list.has(e3)) {
            var o2, i2 = T(this.list.get(e3));
            try {
              for (i2.s(); !(o2 = i2.n()).done; ) {
                var a2 = v(o2.value, 2)[1];
                if (a2.sequence === t2 && (ft(n2) || a2.random === n2))
                  return a2.isRevoked || (a2.isRevoked = true), a2;
              }
            } catch (s2) {
              i2.e(s2);
            } finally {
              i2.f();
            }
          }
          return null;
        } }, { key: "removeByConversationID", value: function(e3) {
          var t2 = this.list.has(e3);
          Ye.l("".concat(this._n, ".removeByConversationID conversationID:").concat(e3, " has:").concat(t2)), t2 && (this.list.delete(e3), this._latestMessageSentByPeerMap.delete(e3), this._latestMessageSentByMeMap.delete(e3));
        } }, { key: "findMessage", value: function(e3) {
          var t2, n2 = null, o2 = T(this.list);
          try {
            for (o2.s(); !(t2 = o2.n()).done; )
              for (var i2 = m(v(t2.value, 2)[1].values()), a2 = i2.length, s2 = 0; s2 < a2; s2++)
                if (i2[s2].ID === e3) {
                  n2 = i2[s2];
                  break;
                }
          } catch (r2) {
            o2.e(r2);
          } finally {
            o2.f();
          }
          return n2;
        } }, { key: "updateMessageIsPeerReadProperty", value: function(e3, t2) {
          var n2 = [];
          if (this.list.has(e3)) {
            var o2, i2 = T(this.list.get(e3));
            try {
              for (i2.s(); !(o2 = i2.n()).done; ) {
                var a2 = v(o2.value, 2)[1];
                a2.time <= t2 && !a2.isPeerRead && "out" === a2.flow && (a2.isPeerRead = true, n2.push(a2));
              }
            } catch (s2) {
              i2.e(s2);
            } finally {
              i2.f();
            }
            Ye.l("".concat(this._n, ".updateMessageIsPeerReadProperty conversationID:").concat(e3, " peerReadTime:").concat(t2, " count:").concat(n2.length));
          }
          return n2;
        } }, { key: "updateMessageIsModifiedProperty", value: function(e3) {
          var t2 = e3.conversationID;
          if (this.list.has(t2)) {
            var n2 = this._getUniqueIDOfMessage(e3), o2 = this.list.get(t2).get(n2);
            o2 && (o2.isModified = true);
          }
        } }, { key: "hasLocalMessageList", value: function(e3) {
          return this.list.has(e3);
        } }, { key: "getLocalMessageList", value: function(e3) {
          return this.hasLocalMessageList(e3) ? m(this.list.get(e3).values()) : [];
        } }, { key: "hasLocalMessage", value: function(e3, t2) {
          for (var n2 = false, o2 = this.getLocalMessageList(e3), i2 = o2.length, a2 = 0; a2 < i2; a2++)
            o2[a2].ID === t2 && (n2 = true);
          return n2;
        } }, { key: "getLocalMessage", value: function(e3, t2) {
          for (var n2 = null, o2 = this.getLocalMessageList(e3), i2 = o2.length, a2 = 0; a2 < i2; a2++)
            if (o2[a2].ID === t2) {
              n2 = o2[a2];
              break;
            }
          return n2;
        } }, { key: "getLocalLastMessage", value: function(e3) {
          var t2 = this.getLocalMessageList(e3);
          return t2[t2.length - 1];
        } }, { key: "getLocalOldestMessage", value: function(e3) {
          return this.getLocalMessageList(e3)[0];
        } }, { key: "_setLatestMessageSentByPeer", value: function(e3, t2) {
          e3.startsWith(L.CONV_C2C) && "in" === t2.flow && this._latestMessageSentByPeerMap.set(e3, t2);
        } }, { key: "_setLatestMessageSentByMe", value: function(e3, t2) {
          "out" === t2.flow && this._latestMessageSentByMeMap.set(e3, t2);
        } }, { key: "getLatestMessageSentByPeer", value: function(e3) {
          return this._latestMessageSentByPeerMap.get(e3);
        } }, { key: "getLatestMessageSentByMe", value: function(e3) {
          return this._latestMessageSentByMeMap.get(e3);
        } }, { key: "modifyMessageSentByPeer", value: function(e3) {
          var t2 = e3.conversationID, n2 = e3.latestNick, o2 = e3.latestAvatar, i2 = this.list.get(t2);
          if (!un(i2)) {
            var a2 = Array.from(i2.values()), s2 = a2.length;
            if (0 !== s2) {
              for (var r2 = null, c2 = 0, u2 = false, l2 = s2 - 1; l2 >= 0; l2--)
                "in" === a2[l2].flow && ((r2 = a2[l2]).nick !== n2 && (r2.setNickAndAvatar({ nick: n2 }), u2 = true), r2.avatar !== o2 && (r2.setNickAndAvatar({ avatar: o2 }), u2 = true), u2 && (c2 += 1));
              Ye.l("".concat(this._n, ".modifyMessageSentByPeer conversationID:").concat(t2, " count:").concat(c2));
            }
          }
        } }, { key: "modifyMessageSentByMe", value: function(e3) {
          var t2 = e3.conversationID, n2 = e3.latestNick, o2 = e3.latestAvatar, i2 = this.list.get(t2);
          if (!un(i2)) {
            var a2 = Array.from(i2.values()), s2 = a2.length;
            if (0 !== s2) {
              for (var r2 = null, c2 = 0, u2 = false, l2 = s2 - 1; l2 >= 0; l2--)
                "out" === a2[l2].flow && ((r2 = a2[l2]).nick !== n2 && (r2.setNickAndAvatar({ nick: n2 }), u2 = true), r2.avatar !== o2 && (r2.setNickAndAvatar({ avatar: o2 }), u2 = true), u2 && (c2 += 1));
              Ye.l("".concat(this._n, ".modifyMessageSentByMe conversationID:").concat(t2, " count:").concat(c2));
            }
          }
        } }, { key: "getTopicConversationIDList", value: function(e3) {
          return m(this.list.keys()).filter(function(t2) {
            return t2.startsWith("".concat(L.CONV_GROUP).concat(e3));
          });
        } }, { key: "traversal", value: function() {
          if (0 !== this.list.size && -1 === Ye.getLevel()) {
            console.group("conversationID-messageCount");
            var e3, t2 = T(this.list);
            try {
              for (t2.s(); !(e3 = t2.n()).done; ) {
                var n2 = v(e3.value, 2), o2 = n2[0], i2 = n2[1];
                console.log("".concat(o2, "-").concat(i2.size));
              }
            } catch (a2) {
              t2.e(a2);
            } finally {
              t2.f();
            }
            console.groupEnd();
          }
        } }, { key: "onMessageModified", value: function(e3, t2) {
          if (!this.list.has(e3))
            return { isUpdated: false, message: null };
          var n2 = "".concat(this._n, ".onMessageModified"), o2 = this._getUniqueIDOfMessage(t2), i2 = this.list.get(e3).has(o2);
          if (Ye.l("".concat(n2, " conversationID:").concat(e3, " uniqueID:").concat(o2, " has:").concat(i2)), i2) {
            var a2 = this.list.get(e3).get(o2), s2 = t2.messageVersion, r2 = t2.elements, c2 = t2.cloudCustomData, u2 = t2.checkResult;
            return Ye.l("".concat(n2, " localVersion:").concat(a2.version, " remoteVersion:").concat(s2)), a2.version < s2 ? (a2.version = s2, a2._elements = JSON.parse(JSON.stringify(r2)), a2.payload = JSON.parse(JSON.stringify(r2[0].content)), a2.type = r2[0].type, a2.cloudCustomData = c2, a2.isModified = true, a2.hasRiskContent = rn(u2), { isUpdated: true, message: a2 }) : { isUpdated: false, message: a2 };
          }
          return { isUpdated: false, message: null };
        } }, { key: "_getUniqueIDOfMessage", value: function(e3) {
          var t2 = e3.from, n2 = e3.to, o2 = e3.random, i2 = e3.sequence, a2 = e3.time;
          return "".concat(t2, "-").concat(n2, "-").concat(o2, "-").concat(i2, "-").concat(a2);
        } }, { key: "reset", value: function() {
          this.list.clear(), this._latestMessageSentByPeerMap.clear(), this._latestMessageSentByMeMap.clear();
        } }]), e2;
      }(), Fs = { A2KEY_AND_TINYID_UPDATED: "_inner".concat(1), CLOUD_CONFIG_UPDATED: "_inner".concat(2), PROFILE_UPDATED: "_inner".concat(3), CONV_SYNC_COMPLETED: "_inner".concat(4), C2C_UNREAD_HANDLE_COMPLETED: "_inner".concat(5) };
      function qs(e2) {
        this.mixin(e2);
      }
      qs.mixin = function(e2) {
        var t2 = e2.prototype || e2;
        t2._isReady = false, t2.ready = function(e3) {
          var t3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          if (e3)
            return this._isReady ? void (t3 ? e3.call(this) : setTimeout(e3, 1)) : (this._readyQueue = this._readyQueue || [], void this._readyQueue.push(e3));
        }, t2.triggerReady = function() {
          var e3 = this;
          this._isReady = true, setTimeout(function() {
            var t3 = e3._readyQueue;
            e3._readyQueue = [], t3 && t3.length > 0 && t3.forEach(function(e4) {
              e4.call(this);
            }, e3);
          }, 1);
        }, t2.resetReady = function() {
          this._isReady = false, this._readyQueue = [];
        }, t2.isReady = function() {
          return this._isReady;
        };
      };
      var xs = ["jpg", "jpeg", "gif", "png", "bmp", "image", "webp"], Vs = ["mp4", "quicktime", "mov"], Hs = 1, Bs = 2, Ks = 3, Ws = 255, Ys = function() {
        function e2(t2) {
          var n2 = this;
          o(this, e2), un(t2) || (this.userID = t2.userID || "", this.nick = t2.nick || "", this.gender = t2.gender || "", this.birthday = t2.birthday || 0, this.location = t2.location || "", this.selfSignature = t2.selfSignature || "", this.allowType = t2.allowType || L.ALLOW_TYPE_ALLOW_ANY, this.language = t2.language || 0, this.avatar = t2.avatar || "", this.messageSettings = t2.messageSettings || 0, this.adminForbidType = t2.adminForbidType || L.FORBID_TYPE_NONE, this.level = t2.level || 0, this.role = t2.role || 0, this.lastUpdatedTime = 0, this.profileCustomField = [], un(t2.profileCustomField) || t2.profileCustomField.forEach(function(e3) {
            n2.profileCustomField.push({ key: e3.key, value: e3.value });
          }));
        }
        return a(e2, [{ key: "validate", value: function(e3) {
          var t2 = true, n2 = "";
          if (un(e3))
            return { valid: false, tips: "empty options" };
          if (e3.profileCustomField)
            for (var o2 = e3.profileCustomField.length, i2 = null, a2 = 0; a2 < o2; a2++) {
              if (i2 = e3.profileCustomField[a2], !pt(i2.key) || -1 === i2.key.indexOf("Tag_Profile_Custom"))
                return { valid: false, tips: "The prefix of keys of the custom profile key-value pairs (which is profileCustomField) must be Tag_Profile_Custom" };
              if (!pt(i2.value))
                return { valid: false, tips: "The type of values of the custom profile key-value pairs (which is profileCustomField) must be String" };
            }
          for (var s2 in e3)
            if (Object.prototype.hasOwnProperty.call(e3, s2)) {
              if ("profileCustomField" === s2)
                continue;
              if (un(e3[s2]) && !pt(e3[s2]) && !dt(e3[s2])) {
                n2 = "key:" + s2 + ", invalid value:" + e3[s2], t2 = false;
                continue;
              }
              switch (s2) {
                case "nick":
                  pt(e3[s2]) || (n2 = "nick must be a string", t2 = false), kt(e3[s2]) > 500 && (n2 = "nick name limited: must less than or equal to ".concat(500, " bytes, current size: ").concat(kt(e3[s2]), " bytes"), t2 = false);
                  break;
                case "gender":
                  At(et, e3.gender) || (n2 = "key:gender, invalid value:" + e3.gender, t2 = false);
                  break;
                case "birthday":
                  dt(e3.birthday) || (n2 = "birthday must be a number", t2 = false);
                  break;
                case "location":
                  pt(e3.location) || (n2 = "location must be a string", t2 = false);
                  break;
                case "selfSignature":
                  pt(e3.selfSignature) || (n2 = "selfSignature must be a string", t2 = false);
                  break;
                case "allowType":
                  At(ot, e3.allowType) || (n2 = "key:allowType, invalid value:" + e3.allowType, t2 = false);
                  break;
                case "language":
                  dt(e3.language) || (n2 = "language must be a number", t2 = false);
                  break;
                case "avatar":
                  pt(e3.avatar) || (n2 = "avatar must be a string", t2 = false);
                  break;
                case "messageSettings":
                  0 !== e3.messageSettings && 1 !== e3.messageSettings && (n2 = "messageSettings must be 0 or 1", t2 = false);
                  break;
                case "adminForbidType":
                  At(nt, e3.adminForbidType) || (n2 = "key:adminForbidType, invalid value:" + e3.adminForbidType, t2 = false);
                  break;
                case "level":
                  dt(e3.level) || (n2 = "level must be a number", t2 = false);
                  break;
                case "role":
                  dt(e3.role) || (n2 = "role must be a number", t2 = false);
                  break;
                default:
                  n2 = "unknown key:" + s2 + "  " + e3[s2], t2 = false;
              }
            }
          return { valid: t2, tips: n2 };
        } }]), e2;
      }(), js = a(function e2(t2) {
        o(this, e2), this.value = t2, this.next = null;
      }), Js = function() {
        function e2(t2) {
          o(this, e2), this.MAX_LENGTH = t2, this.pTail = null, this.pNodeToDel = null, this.map = /* @__PURE__ */ new Map();
        }
        return a(e2, [{ key: "set", value: function(e3) {
          var t2 = new js(e3);
          if (this.map.size < this.MAX_LENGTH)
            null === this.pTail ? (this.pTail = t2, this.pNodeToDel = t2) : (this.pTail.next = t2, this.pTail = t2), this.map.set(e3, 1);
          else {
            var n2 = this.pNodeToDel;
            this.pNodeToDel = this.pNodeToDel.next, this.map.delete(n2.value), n2.next = null, n2 = null, this.pTail.next = t2, this.pTail = t2, this.map.set(e3, 1);
          }
        } }, { key: "has", value: function(e3) {
          return this.map.has(e3);
        } }, { key: "delete", value: function(e3) {
          this.has(e3) && this.map.delete(e3);
        } }, { key: "tail", value: function() {
          return this.pTail;
        } }, { key: "size", value: function() {
          return this.map.size;
        } }, { key: "data", value: function() {
          return Array.from(this.map.keys());
        } }, { key: "reset", value: function() {
          for (var e3; null !== this.pNodeToDel; )
            e3 = this.pNodeToDel, this.pNodeToDel = this.pNodeToDel.next, e3.next = null, e3 = null;
          this.pTail = null, this.map.clear();
        } }]), e2;
      }(), zs = ["groupID", "name", "avatar", "type", "introduction", "notification", "ownerID", "selfInfo", "createTime", "infoSequence", "lastInfoTime", "lastMessage", "nextMessageSeq", "memberNum", "maxMemberNum", "memberList", "joinOption", "groupCustomField", "muteAllMembers", "isSupportTopic", "inviteOption", "_lastRevokedTime"], Xs = function() {
        function e2(t2) {
          o(this, e2), this.groupID = "", this.name = "", this.avatar = "", this.type = "", this.introduction = "", this.notification = "", this.ownerID = "", this.createTime = "", this.infoSequence = "", this.lastInfoTime = "", this.selfInfo = { messageRemindType: "", joinTime: "", nameCard: "", role: "", userID: "", memberCustomField: void 0, readedSequence: 0, excludedUnreadSequenceList: void 0 }, this.lastMessage = { lastTime: "", lastSequence: "", fromAccount: "", messageForShow: "" }, this.nextMessageSeq = "", this.memberNum = "", this.memberCount = "", this.maxMemberNum = "", this.maxMemberCount = "", this.joinOption = "", this.inviteOption = "", this.groupCustomField = [], this.muteAllMembers = false, this.isSupportTopic = false, this._lastRevokedTime = 0, this._initGroup(t2);
        }
        return a(e2, [{ key: "memberNum", get: function() {
          return this.memberCount;
        }, set: function(e3) {
        } }, { key: "maxMemberNum", get: function() {
          return this.maxMemberCount;
        }, set: function(e3) {
        } }, { key: "_initGroup", value: function(e3) {
          for (var t2 in e3)
            zs.indexOf(t2) < 0 || ("selfInfo" !== t2 ? ("memberNum" === t2 && (this.memberCount = e3[t2]), "maxMemberNum" === t2 && (this.maxMemberCount = e3[t2]), "isSupportTopic" !== t2 ? this[t2] = e3[t2] : this.isSupportTopic = 1 === e3[t2]) : this.updateSelfInfo(e3[t2]));
        } }, { key: "updateGroup", value: function(e3) {
          var t2 = this;
          e3.appid = void 0, e3.grossTopicNextMsgSeq = void 0, e3.selfInfo && (e3.selfInfo.grossTopicReadSeq = void 0);
          var n2 = JSON.parse(JSON.stringify(e3));
          n2.lastMsgTime && (this.lastMessage.lastTime = n2.lastMsgTime), ft(n2.muteAllMembers) || ("On" === n2.muteAllMembers ? n2.muteAllMembers = true : n2.muteAllMembers = false), n2.groupCustomField && Gt(this.groupCustomField, n2.groupCustomField), ft(n2.memberNum) || (this.memberCount = n2.memberNum), ft(n2.maxMemberNum) || (this.maxMemberCount = n2.maxMemberNum), ft(n2.isSupportTopic) || (this.isSupportTopic = dt(n2.isSupportTopic) ? 1 === n2.isSupportTopic : n2.isSupportTopic), Dt(this, n2, ["members", "errorCode", "lastMsgTime", "groupCustomField", "memberNum", "maxMemberNum", "isSupportTopic"]), _t(n2.members) && n2.members.length > 0 && n2.members.forEach(function(e4) {
            e4.userID === t2.selfInfo.userID && Dt(t2.selfInfo, e4, ["sequence"]);
          });
        } }, { key: "updateSelfInfo", value: function(e3) {
          var n2 = { nameCard: e3.nameCard, joinTime: e3.joinTime, role: e3.role, messageRemindType: e3.messageRemindType, readedSequence: e3.readedSequence, excludedUnreadSequenceList: e3.excludedUnreadSequenceList };
          Dt(this.selfInfo, t({}, n2), [], ["", null, void 0, 0, NaN]);
        } }, { key: "setSelfNameCard", value: function(e3) {
          this.selfInfo.nameCard = e3;
        } }]), e2;
      }(), Qs = function(e2, n2) {
        return ft(e2) ? { lastTime: 0, lastSequence: 0, fromAccount: 0, messageForShow: "", payload: null, type: "", isRevoked: false, cloudCustomData: "", onlineOnlyFlag: false, nick: "", nameCard: "", version: 0, isPeerRead: false, revoker: null } : e2 instanceof Ps ? { lastTime: e2.time || 0, lastSequence: e2.sequence || 0, fromAccount: e2.from || "", messageForShow: Zt(e2.type, e2.payload, n2), payload: e2.payload || null, type: e2.type || null, isRevoked: e2.isRevoked || false, cloudCustomData: e2.cloudCustomData || "", onlineOnlyFlag: e2._onlineOnlyFlag || false, nick: e2.nick || "", nameCard: e2.nameCard || "", version: e2.version || 0, isPeerRead: e2.isPeerRead || false, revoker: e2.revoker || null } : t(t({}, e2), {}, { messageForShow: Zt(e2.type, e2.payload, n2) });
      }, Zs = function() {
        function e2(t2, n2) {
          o(this, e2), this.conversationID = t2.conversationID || "", this.unreadCount = t2.unreadCount || 0, this.type = t2.type || "", this.lastMessage = Qs(t2.lastMessage, n2), t2.lastMsgTime && (this.lastMessage.lastTime = t2.lastMsgTime), this._isInfoCompleted = false, this.peerReadTime = t2.peerReadTime || 0, this.groupAtInfoList = [], this.remark = "", this.isPinned = t2.isPinned || false, this.messageRemindType = t2.messageRemindType, this.markList = t2.markList || [], this.customData = t2.customData || "", this.conversationGroupList = t2.conversationGroupList || [], this.draftText = t2.draftText || "", this._initProfile(t2);
        }
        return a(e2, [{ key: "toAccount", get: function() {
          return this.conversationID.startsWith(L.CONV_C2C) ? this.conversationID.replace(L.CONV_C2C, "") : this.conversationID.startsWith(L.CONV_GROUP) ? this.conversationID.replace(L.CONV_GROUP, "") : "";
        } }, { key: "subType", get: function() {
          return this.groupProfile ? this.groupProfile.type : "";
        } }, { key: "_initProfile", value: function(e3) {
          var t2 = this;
          Object.keys(e3).forEach(function(n2) {
            switch (n2) {
              case "userProfile":
                t2.userProfile = e3.userProfile;
                break;
              case "groupProfile":
                t2.groupProfile = e3.groupProfile;
            }
          }), ft(this.userProfile) && this.type === L.CONV_C2C ? this.userProfile = new Ys({ userID: e3.conversationID.replace("C2C", "") }) : ft(this.groupProfile) && this.type === L.CONV_GROUP && (this.groupProfile = new Xs({ groupID: e3.conversationID.replace("GROUP", "") }));
        } }, { key: "updateUnreadCount", value: function(e3) {
          var t2 = e3.nextUnreadCount, n2 = e3.isFromGetConversations, o2 = e3.isUnreadC2CMessage;
          ft(t2) || (Ut(this.subType) ? this.unreadCount = 0 : n2 && this.type === L.CONV_GROUP || n2 && this.type === L.CONV_TOPIC || o2 && this.type === L.CONV_C2C ? this.unreadCount = t2 : this.unreadCount = this.unreadCount + t2);
        } }, { key: "updateLastMessage", value: function(e3) {
          this.lastMessage = Qs(e3);
        } }, { key: "updateGroupAtInfoList", value: function(e3) {
          if (!this._isNeedMergeGroupAtInfo(e3)) {
            var t2, n2 = (M(t2 = e3.groupAtType) || y(t2) || I(t2) || D()).slice(0);
            -1 !== n2.indexOf(L.CONV_AT_ME) && -1 !== n2.indexOf(L.CONV_AT_ALL) && (n2 = [L.CONV_AT_ALL_AT_ME]);
            var o2 = { from: e3.from, groupID: e3.groupID, topicID: e3.topicID, messageSequence: e3.sequence, atTypeArray: n2, __random: e3.__random, __sequence: e3.__sequence };
            this.groupAtInfoList.push(o2);
          }
        } }, { key: "_isNeedMergeGroupAtInfo", value: function(e3) {
          var t2 = e3.groupID, n2 = e3.sequence;
          if (!Pt({ groupID: t2 }))
            return false;
          var o2 = false;
          return this.groupAtInfoList.forEach(function(t3) {
            t3.messageSequence === n2 && (t3.atTypeArray.indexOf(L.CONV_AT_ME) > -1 && e3.groupAtType.indexOf(L.CONV_AT_ALL) > -1 && (t3.atTypeArray = [L.CONV_AT_ALL_AT_ME]), t3.atTypeArray.indexOf(L.CONV_AT_ALL) > -1 && e3.groupAtType.indexOf(L.CONV_AT_ME) > -1 && (t3.atTypeArray = [L.CONV_AT_ALL_AT_ME], t3.__random = e3.__random, t3.__sequence = e3.__sequence), o2 = true);
          }), o2;
        } }, { key: "clearGroupAtInfoList", value: function() {
          this.groupAtInfoList.length = 0;
        } }, { key: "reduceUnreadCount", value: function() {
          return this.unreadCount >= 1 && (this.unreadCount -= 1, true);
        } }, { key: "isLastMessageRevoked", value: function(e3) {
          var t2 = e3.sequence, n2 = e3.time;
          return this.type === L.CONV_C2C && t2 === this.lastMessage.lastSequence && n2 === this.lastMessage.lastTime || this.type === L.CONV_GROUP && t2 === this.lastMessage.lastSequence;
        } }, { key: "setLastMessageRevoked", value: function(e3) {
          this.lastMessage.isRevoked = e3;
        } }, { key: "setLastMessageRevoker", value: function(e3) {
          this.lastMessage.revoker = e3;
        } }, { key: "setDraftText", value: function(e3) {
          this.draftText = e3;
        } }]), e2;
      }(), $s = function() {
        function e2(t2) {
          o(this, e2), this._conversationModule = t2, this._n = "MessageRemindHandler";
        }
        return a(e2, [{ key: "getC2CMessageRemindType", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".getC2CMessageRemindType");
          return this._conversationModule.request({ protocolName: ci, requestData: { toAccount: this._conversationModule.getMyUserID(), userIDList: e3 } }).then(function(o2) {
            Ye.l("".concat(n2, " ok. userIDList:").concat(e3));
            var i2 = o2.data.muteFlagList;
            t2._conversationModule.onC2CMessageRemindTypeFetched(i2);
          }).catch(function(e4) {
            Ye.e("".concat(n2, " failed. error:"), e4);
          });
        } }, { key: "set", value: function(e3) {
          return e3.groupID ? this._setGroupMessageRemindType(e3) : _t(e3.userIDList) ? this._setC2CMessageRemindType(e3) : void 0;
        } }, { key: "_setGroupMessageRemindType", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, "._setGroupMessageRemindType"), o2 = e3.groupID, i2 = e3.messageRemindType, a2 = "groupID:".concat(o2, " messageRemindType:").concat(i2), s2 = new Ms("setMessageRemindType");
          s2.setMessage(a2);
          var r2 = this._getModule(Zn);
          return r2 ? r2.modifyGroupMemberInfo({ groupID: o2, messageRemindType: i2, userID: this._conversationModule.getMyUserID() }).then(function() {
            s2.setNetworkType(t2._conversationModule.getNetworkType()).end(), Ye.l("".concat(n2, " ok. ").concat(a2));
            var o3 = t2.onGroupMessageRemindTypeUpdated(e3);
            return t2._conversationModule.emitTotalUnreadMessageCountUpdate(), ko(o3);
          }).catch(function(e4) {
            return t2._conversationModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              s2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          }) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "onGroupMessageRemindTypeUpdated", value: function(e3) {
          var t2 = e3.groupID, n2 = e3.messageRemindType;
          Ye.l("".concat(this._n, ".onGroupMessageRemindTypeUpdated groupID:").concat(t2, " messageRemindType:").concat(n2));
          var o2 = this._getModule(Zn).getLocalGroupProfile(t2);
          if (o2 && (o2.selfInfo.messageRemindType = n2), bt(t2)) {
            var i2 = t2, a2 = Qt(i2), s2 = this._getModule(eo).getLocalTopic(a2, i2);
            return s2 && (s2.updateSelfInfo({ messageRemindType: n2 }), this._conversationModule.emitOuterEvent(k.TOPIC_UPDATED, { groupID: a2, topic: s2 })), { topic: s2 };
          }
          return this._conversationModule.patchMessageRemindType({ ID: t2, isC2CConversation: false, messageRemindType: n2 }) && this._emitConversationUpdate(), { group: o2 };
        } }, { key: "_setC2CMessageRemindType", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, "._setC2CMessageRemindType"), o2 = e3.userIDList, i2 = e3.messageRemindType, a2 = o2.slice(0, 30), s2 = 0;
          i2 === L.MSG_REMIND_DISCARD ? s2 = 1 : i2 === L.MSG_REMIND_ACPT_NOT_NOTE && (s2 = 2);
          var r2 = "userIDList:".concat(a2, " messageRemindType:").concat(i2), c2 = new Ms("setMessageRemindType");
          return c2.setMessage(r2), this._conversationModule.request({ protocolName: ri, requestData: { userIDList: a2, muteFlag: s2 } }).then(function(e4) {
            c2.setNetworkType(t2._conversationModule.getNetworkType()).end();
            var o3 = e4.data.errorList, s3 = [], u2 = [];
            _t(o3) && o3.forEach(function(e5) {
              s3.push(e5.userID), u2.push({ userID: e5.userID, code: e5.errorCode });
            });
            var l2 = a2.filter(function(e5) {
              return -1 === s3.indexOf(e5);
            });
            Ye.l("".concat(n2, " ok. ").concat(r2, " successUserIDList:").concat(l2, " failureUserIDList:").concat(JSON.stringify(u2)));
            var d2 = 0;
            return l2.forEach(function(e5) {
              t2._conversationModule.patchMessageRemindType({ ID: e5, isC2CConversation: true, messageRemindType: i2 }) && (d2 += 1);
            }), d2 >= 1 && t2._emitConversationUpdate(), a2.length = s3.length = 0, t2._conversationModule.emitTotalUnreadMessageCountUpdate(), Eo({ successUserIDList: l2.map(function(e5) {
              return { userID: e5 };
            }), failureUserIDList: u2 });
          }).catch(function(e4) {
            return t2._conversationModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              c2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_getModule", value: function(e3) {
          return this._conversationModule.getModule(e3);
        } }, { key: "_emitConversationUpdate", value: function() {
          this._conversationModule.emitConversationUpdate(true, false);
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset"));
        } }]), e2;
      }(), er = function() {
        function e2(t2) {
          o(this, e2), this._conversationModule = t2, this._n = "ConvGroupHandler", this._convGroupMap = /* @__PURE__ */ new Map(), this._startIndex = 0, this._pagingStatus = hn.NOT_START;
        }
        return a(e2, [{ key: "setConvCustomData", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("setConvCustomData"), o2 = e3.conversationIDList, i2 = e3.customData;
          Ye.l("".concat(n2, " options:"), e3);
          var a2 = new Ms("setConvCustomData");
          a2.setMessage(JSON.stringify(e3));
          var s2 = { fromAccount: this._getMyUserID(), itemList: [] }, r2 = [], c2 = [];
          return o2.forEach(function(e4) {
            if (!t2._hasLocalConversation(e4))
              return t2._onConversationNotFound(c2, e4), true;
            if (!wt(e4) && !Ft(e4))
              return t2._onConversationIDInvalid(c2, e4), true;
            var n3 = { operationType: 2, contactItem: void 0, customMark: i2 };
            wt(e4) ? n3.contactItem = { type: 1, toAccount: e4.replace(L.CONV_C2C, "") } : Ft(e4) && (n3.contactItem = { type: 2, groupID: e4.replace(L.CONV_GROUP, "") }), s2.itemList.push(n3);
          }), c2.length === o2.length ? Eo({ successConversationIDList: r2, failureConversationIDList: c2 }) : this._conversationModule.request({ protocolName: Ti, requestData: s2 }).then(function(e4) {
            a2.setNetworkType(t2._conversationModule.getNetworkType()).end(), Ye.l("".concat(n2, " ok"));
            var o3 = e4.data.resultItem;
            if (_t(o3)) {
              var s3, u2, l2 = false;
              o3.forEach(function(e5) {
                s3 = t2._concatConversationID(e5.contactItem), 0 === e5.resultCode ? (r2.push(s3), (u2 = t2._getLocalConversation(s3)) && u2.customData !== i2 && (u2.customData = i2, l2 = true)) : c2.push({ conversationID: s3, code: e5.resultCode, message: e5.resultInfo });
              }), true === l2 && t2._emitConversationUpdate();
            }
            return ko({ successConversationIDList: r2, failureConversationIDList: c2 });
          }).catch(function(e4) {
            return t2._conversationModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              a2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "markConversation", value: function(e3) {
          var t2 = this;
          if (!this._conversationModule.canIUse(B.CONV_MARK))
            return this._conversationModule.cannotUseCommercialAbility("markConversation");
          var n2 = "".concat(this._n, ".").concat("markConversation"), o2 = e3.conversationIDList, i2 = e3.markType, a2 = e3.enableMark;
          Ye.l("".concat(n2, " options:"), e3);
          var s2 = new Ms("markConversation");
          s2.setMessage(JSON.stringify(e3));
          var r2 = void 0, c2 = void 0, u2 = this._getFlagBit(i2);
          true === a2 ? c2 = [u2] : r2 = [u2];
          var l2 = { fromAccount: this._getMyUserID(), itemList: [] }, d2 = [], p2 = [];
          return o2.forEach(function(e4) {
            if (!t2._hasLocalConversation(e4))
              return t2._onConversationNotFound(p2, e4), true;
            if (!wt(e4) && !Ft(e4))
              return t2._onConversationIDInvalid(p2, e4), true;
            var n3 = { operationType: 1, contactItem: void 0, clearMark: r2, setMark: c2 };
            wt(e4) ? n3.contactItem = { type: 1, toAccount: e4.replace(L.CONV_C2C, "") } : Ft(e4) && (n3.contactItem = { type: 2, groupID: e4.replace(L.CONV_GROUP, "") }), l2.itemList.push(n3);
          }), p2.length === o2.length ? Eo({ successConversationIDList: d2, failureConversationIDList: p2 }) : this._conversationModule.request({ protocolName: ki, requestData: l2 }).then(function(e4) {
            s2.setNetworkType(t2._conversationModule.getNetworkType()).end(), Ye.l("".concat(n2, " ok"));
            var o3 = e4.data.resultItem;
            if (_t(o3)) {
              var r3, c3, u3 = false;
              o3.forEach(function(e5) {
                if (r3 = t2._concatConversationID(e5.contactItem), 0 === e5.resultCode) {
                  if (d2.push(r3), c3 = t2._getLocalConversation(r3)) {
                    var n3 = c3.markList.indexOf(i2);
                    true === a2 ? -1 === n3 && (c3.markList.push(i2), u3 = true) : -1 !== n3 && (c3.markList.splice(n3, 1), u3 = true);
                  }
                } else
                  p2.push({ conversationID: r3, code: e5.resultCode, message: e5.resultInfo });
              }), true === u3 && t2._emitConversationUpdate();
            }
            return ko({ successConversationIDList: d2, failureConversationIDList: p2 });
          }).catch(function(e4) {
            return t2._conversationModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              s2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getLocalConvGroupList", value: function() {
          var e3 = this;
          return Ye.l("".concat(this._n, ".getLocalConvGroupList pagingStatus:").concat(this._pagingStatus)), this._pagingStatus === hn.REJECTED ? this.getRemoteConvGroupList().then(function() {
            return ko(m(e3._convGroupMap.values()));
          }) : Eo(m(this._convGroupMap.values()));
        } }, { key: "getRemoteConvGroupList", value: function() {
          var e3 = this, t2 = "".concat(this._n, ".getRemoteConvGroupList");
          return this._pagingStatus = hn.PENDING, this._conversationModule.request({ protocolName: Ri, requestData: { fromAccount: this._getMyUserID(), startIndex: this._startIndex, startTime: He() } }).then(function(n2) {
            var o2, i2, a2 = n2.data, s2 = a2.completeFlag, r2 = a2.contactItem, c2 = a2.nextStartIndex, u2 = void 0 === c2 ? 0 : c2, l2 = a2.groupItem;
            (e3._startIndex = u2, Ye.l("".concat(t2, " completeFlag:").concat(s2, " nextStartIndex:").concat(u2)), _t(l2) && l2.forEach(function(t3) {
              var n3 = t3.convGroupID, o3 = t3.groupName;
              e3._convGroupMap.set(n3, o3);
            }), _t(r2)) && r2.forEach(function(t3) {
              var n3 = t3.standardMark, a3 = t3.customData, s3 = t3.convGroupIDList;
              if (o2 = e3._concatConversationID(t3), (i2 = e3._getLocalConversation(o2)) && (i2.markList = en(n3), i2.customData = a3 || "", _t(s3))) {
                var r3 = [];
                s3.forEach(function(t4) {
                  e3._convGroupMap.has(t4) && r3.push(e3._convGroupMap.get(t4));
                }), i2.conversationGroupList = [].concat(r3), r3.length = 0;
              }
            });
            if (0 === s2)
              return e3.getRemoteConvGroupList();
            1 === s2 && (e3._pagingStatus = hn.RESOLVED, e3._emitConversationUpdate(), e3._emitConvGroupListUpdate());
          }).catch(function(n2) {
            e3._pagingStatus = hn.REJECTED, Ye.w("".concat(t2, " failed. error:"), n2);
          });
        } }, { key: "createConvGroup", value: function(e3) {
          var t2 = this, n2 = "createConversationGroup";
          if (!this._conversationModule.canIUse(B.CONV_GROUP))
            return this._conversationModule.cannotUseCommercialAbility(n2);
          var o2 = "".concat(this._n, ".").concat(n2);
          Ye.l("".concat(o2, " options:"), e3);
          var i2 = new Ms(n2);
          i2.setMessage(JSON.stringify(e3));
          var a2 = e3.groupName, s2 = e3.conversationIDList, r2 = { fromAccount: this._getMyUserID(), itemList: [{ groupName: a2, contactItem: [] }] }, c2 = [], u2 = [];
          return s2.forEach(function(e4) {
            return t2._hasLocalConversation(e4) ? wt(e4) || Ft(e4) ? void (wt(e4) ? r2.itemList[0].contactItem.push({ type: 1, toAccount: e4.replace(L.CONV_C2C, "") }) : Ft(e4) && r2.itemList[0].contactItem.push({ type: 2, groupID: e4.replace(L.CONV_GROUP, "") })) : (t2._onConversationIDInvalid(u2, e4), true) : (t2._onConversationNotFound(u2, e4), true);
          }), u2.length === s2.length ? Eo({ successConversationIDList: c2, failureConversationIDList: u2 }) : this._conversationModule.request({ protocolName: Li, requestData: r2 }).then(function(e4) {
            i2.setNetworkType(t2._conversationModule.getNetworkType()).end(), Ye.l("".concat(o2, " ok"));
            var n3 = e4.data.groupResultItem[0], s3 = n3.groupItem, r3 = n3.resultItem;
            if (ht(s3) && (t2._convGroupMap.set(s3.convGroupID, s3.groupName), t2._emitConvGroupListUpdate()), _t(r3)) {
              var l2, d2, p2 = false;
              r3.forEach(function(e5) {
                l2 = t2._concatConversationID(e5.contactItem), 0 === e5.resultCode ? (c2.push(l2), (d2 = t2._getLocalConversation(l2)) && -1 === d2.conversationGroupList.indexOf(a2) && (d2.conversationGroupList.push(a2), p2 = true)) : u2.push({ conversationID: l2, code: e5.resultCode, message: e5.resultInfo });
              }), true === p2 && (t2._emitConversationUpdate(), t2._emitConvGroupListUpdate());
            }
            return ko({ successConversationIDList: c2, failureConversationIDList: u2 });
          }).catch(function(e4) {
            return t2._conversationModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], a3 = n3[1];
              i2.setError(e4, o3, a3).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "deleteConvGroup", value: function(e3) {
          var t2 = this, n2 = "deleteConversationGroup";
          if (!this._conversationModule.canIUse(B.CONV_GROUP))
            return this._conversationModule.cannotUseCommercialAbility(n2);
          var o2 = "".concat(this._n, ".").concat(n2);
          Ye.l("".concat(o2, " groupName:").concat(e3));
          var i2 = new Ms(n2);
          return i2.setMessage(e3), this._conversationModule.request({ protocolName: Ni, requestData: { fromAccount: this._getMyUserID(), groupName: [e3] } }).then(function(n3) {
            i2.setNetworkType(t2._conversationModule.getNetworkType()).end(), Ye.l("".concat(o2, " ok"));
            var a2 = n3.data.groupItem;
            if (_t(a2)) {
              var s2 = false;
              a2.forEach(function(e4) {
                t2._convGroupMap.has(e4.convGroupID) && (t2._convGroupMap.delete(e4.convGroupID), s2 = true);
              }), true === s2 && t2._emitConvGroupListUpdate();
            }
            t2._eraseFromConversationGroupList([e3]);
          }).catch(function(e4) {
            return t2._conversationModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], a2 = n3[1];
              i2.setError(e4, o3, a2).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "renameConvGroup", value: function(e3) {
          var t2 = this, n2 = "renameConversationGroup";
          if (!this._conversationModule.canIUse(B.CONV_GROUP))
            return this._conversationModule.cannotUseCommercialAbility(n2);
          var o2 = "".concat(this._n, ".").concat(n2);
          Ye.l("".concat(o2, " options:"), e3);
          var i2 = new Ms(n2);
          i2.setMessage(JSON.stringify(e3));
          var a2 = e3.oldName, s2 = e3.newName;
          return this._conversationModule.request({ protocolName: Si, requestData: { fromAccount: this._getMyUserID(), updateType: 1, updateGroup: { updateGroupType: 1, oldName: a2, newName: s2 } } }).then(function(e4) {
            i2.setNetworkType(t2._conversationModule.getNetworkType()).end(), Ye.l("".concat(o2, " ok"));
            var n3 = e4.data.updateGroupResult.convGroupID;
            t2._convGroupMap.set(n3, s2), t2._emitConvGroupListUpdate();
            var r2, c2, u2 = t2._conversationModule.getLocalConversationList(), l2 = false;
            u2.forEach(function(e5) {
              r2 = e5.conversationGroupList, -1 !== (c2 = r2.indexOf(a2)) && (r2.splice(c2, 1, s2), l2 = true);
            }), true === l2 && t2._emitConversationUpdate();
          }).catch(function(e4) {
            return t2._conversationModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], a3 = n3[1];
              i2.setError(e4, o3, a3).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "addConvsToGroup", value: function(e3) {
          var t2 = this, n2 = "addConversationsToGroup";
          if (!this._conversationModule.canIUse(B.CONV_GROUP))
            return this._conversationModule.cannotUseCommercialAbility(n2);
          var o2 = "".concat(this._n, ".").concat(n2);
          Ye.l("".concat(o2, " options:"), e3);
          var i2 = new Ms(n2);
          i2.setMessage(JSON.stringify(e3));
          var a2 = e3.conversationIDList, s2 = e3.groupName, r2 = { fromAccount: this._getMyUserID(), updateType: 1, updateGroup: { updateGroupType: 2, groupName: s2, updateItem: [] } }, c2 = [], u2 = [];
          return a2.forEach(function(e4) {
            return t2._hasLocalConversation(e4) ? wt(e4) || Ft(e4) ? void (wt(e4) ? r2.updateGroup.updateItem.push({ operationType: 1, contactItem: { type: 1, toAccount: e4.replace(L.CONV_C2C, "") } }) : Ft(e4) && r2.updateGroup.updateItem.push({ operationType: 1, contactItem: { type: 2, groupID: e4.replace(L.CONV_GROUP, "") } })) : (t2._onConversationIDInvalid(u2, e4), true) : (t2._onConversationNotFound(u2, e4), true);
          }), u2.length === a2.length ? Eo({ successConversationIDList: c2, failureConversationIDList: u2 }) : this._conversationModule.request({ protocolName: Ai, requestData: r2 }).then(function(e4) {
            i2.setNetworkType(t2._conversationModule.getNetworkType()).end(), Ye.l("".concat(o2, " ok"));
            var n3 = e4.data.updateGroupResult.contactResultItem;
            if (_t(n3)) {
              var a3, r3, l2 = false;
              n3.forEach(function(e5) {
                a3 = t2._concatConversationID(e5.contactItem), 0 === e5.resultCode ? (r3 = t2._getLocalConversation(a3)) && -1 === r3.conversationGroupList.indexOf(s2) && (r3.conversationGroupList.push(s2), c2.push(a3), l2 = true) : u2.push({ conversationID: a3, code: e5.resultCode, message: e5.resultInfo });
              }), true === l2 && (t2._emitConversationUpdate(), t2._emitConvInGroupUpdate(s2));
            }
            return ko({ successConversationIDList: c2, failureConversationIDList: u2 });
          }).catch(function(e4) {
            return t2._conversationModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], a3 = n3[1];
              i2.setError(e4, o3, a3).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "deleteConvsFromGroup", value: function(e3) {
          var t2 = this, n2 = "deleteConversationsFromGroup";
          if (!this._conversationModule.canIUse(B.CONV_GROUP))
            return this._conversationModule.cannotUseCommercialAbility(n2);
          var o2 = "".concat(this._n, ".").concat(n2);
          Ye.l("".concat(o2, " options:"), e3);
          var i2 = new Ms(n2);
          i2.setMessage(JSON.stringify(e3));
          var a2 = e3.conversationIDList, s2 = e3.groupName, r2 = { fromAccount: this._getMyUserID(), updateType: 1, updateGroup: { updateGroupType: 2, groupName: s2, updateItem: [] } }, c2 = [], u2 = [];
          return a2.forEach(function(e4) {
            return t2._hasLocalConversation(e4) ? wt(e4) || Ft(e4) ? void (wt(e4) ? r2.updateGroup.updateItem.push({ operationType: 2, contactItem: { type: 1, toAccount: e4.replace(L.CONV_C2C, "") } }) : Ft(e4) && r2.updateGroup.updateItem.push({ operationType: 2, contactItem: { type: 2, groupID: e4.replace(L.CONV_GROUP, "") } })) : (t2._onConversationIDInvalid(u2, e4), true) : (t2._onConversationNotFound(u2, e4), true);
          }), u2.length === a2.length ? Eo({ successConversationIDList: c2, failureConversationIDList: u2 }) : this._conversationModule.request({ protocolName: Ei, requestData: r2 }).then(function(e4) {
            i2.setNetworkType(t2._conversationModule.getNetworkType()).end(), Ye.l("".concat(o2, " ok"));
            var n3 = e4.data.updateGroupResult.contactResultItem;
            if (_t(n3)) {
              var a3, r3, l2 = false;
              n3.forEach(function(e5) {
                if (a3 = t2._concatConversationID(e5.contactItem), 0 === e5.resultCode) {
                  if (r3 = t2._getLocalConversation(a3)) {
                    var n4 = r3.conversationGroupList.indexOf(s2);
                    -1 !== n4 && (r3.conversationGroupList.splice(n4, 1), c2.push(a3), l2 = true);
                  }
                } else
                  u2.push({ conversationID: a3, code: e5.resultCode, message: e5.resultInfo });
              }), true === l2 && (t2._emitConversationUpdate(), t2._emitConvInGroupUpdate(s2));
            }
            return ko({ successConversationIDList: c2, failureConversationIDList: u2 });
          }).catch(function(e4) {
            return t2._conversationModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], a3 = n3[1];
              i2.setError(e4, o3, a3).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "onConvMarkUpdated", value: function(e3) {
          var t2 = this;
          if (!un(e3)) {
            var n2, o2;
            Ye.d("".concat(this._n, ".onConvMarkUpdated markItemList:"), e3);
            var i2 = false;
            e3.forEach(function(e4) {
              var a2 = e4.recentContactItem, s2 = e4.optType, r2 = e4.standardMark, c2 = e4.customMark;
              if (n2 = t2._concatConversationID(a2), o2 = t2._getLocalConversation(n2))
                if (1 === s2) {
                  var u2 = en(r2);
                  true !== function(e5, t3) {
                    if (e5 === t3)
                      return true;
                    if (!e5 || !t3)
                      return false;
                    if (e5.length !== t3.length)
                      return false;
                    for (var n3 = 0, o3 = e5.length; n3 < o3; n3++)
                      if (e5[n3] !== t3[n3])
                        return false;
                    return true;
                  }(o2.markList, u2) && (o2.markList = u2, i2 = true);
                } else
                  2 === s2 && o2.customData !== c2 && void 0 !== c2 && (o2.customData = c2, i2 = true);
            }), true === i2 && this._emitConversationUpdate();
          }
        } }, { key: "onConvGroupCreated", value: function(e3) {
          var t2 = this;
          Ye.d("".concat(this._n, ".onConvGroupCreated resultList:"), e3);
          var n2 = false, o2 = false;
          _t(e3) && (e3.forEach(function(e4) {
            var i2 = e4.msgGroupItem, a2 = i2.groupID, s2 = i2.groupName;
            t2._convGroupMap.get(a2) !== s2 && (t2._convGroupMap.set(a2, s2), o2 = true);
            var r2, c2, u2 = e4.msgRecentContactItem;
            _t(u2) && u2.forEach(function(e5) {
              r2 = t2._concatConversationID(e5), (c2 = t2._getLocalConversation(r2)) && -1 === c2.conversationGroupList.indexOf(s2) && (c2.conversationGroupList.push(s2), n2 = true);
            });
          }), true === n2 && this._emitConversationUpdate(), true === o2 && this._emitConvGroupListUpdate());
        } }, { key: "onConvGroupDeleted", value: function(e3) {
          var t2 = this;
          Ye.d("".concat(this._n, ".onConvGroupDeleted groupItemList:"), e3);
          var n2 = [];
          if (_t(e3)) {
            var o2 = false;
            e3.forEach(function(e4) {
              var i2 = e4.groupID, a2 = e4.groupName;
              t2._convGroupMap.has(i2) && (t2._convGroupMap.delete(i2), o2 = true, n2.push(a2));
            }), true === o2 && this._emitConvGroupListUpdate();
          }
          this._eraseFromConversationGroupList(n2);
        } }, { key: "_eraseFromConversationGroupList", value: function(e3) {
          un(e3) || (this._conversationModule.getLocalConversationList().forEach(function(t2) {
            t2.conversationGroupList = t2.conversationGroupList.filter(function(t3) {
              return !e3.includes(t3);
            });
          }), this._emitConversationUpdate());
        } }, { key: "onConvGroupNameUpdated", value: function(e3) {
          Ye.d("".concat(this._n, ".onConvGroupNameUpdated options:"), e3);
          var t2 = e3.groupID, n2 = e3.groupName, o2 = e3.oldGroupName;
          if (this._convGroupMap.get(t2) !== n2) {
            this._convGroupMap.set(t2, n2), this._emitConvGroupListUpdate();
            var i2, a2, s2 = this._conversationModule.getLocalConversationList(), r2 = false;
            s2.forEach(function(e4) {
              i2 = e4.conversationGroupList, -1 !== (a2 = i2.indexOf(o2)) && (i2.splice(a2, 1, n2), r2 = true);
            }), true === r2 && this._emitConversationUpdate();
          }
        } }, { key: "onConvInGroupUpdated", value: function(e3) {
          var t2 = this;
          Ye.d("".concat(this._n, ".onConvInGroupUpdated options:"), e3);
          var n2 = e3.oldGroupName, o2 = e3.recentContactUpdateGroupItem;
          if (_t(o2)) {
            var i2, a2, s2, r2 = false;
            o2.forEach(function(e4) {
              var o3 = e4.contactOptType, c2 = e4.recentContactItem;
              i2 = t2._concatConversationID(c2), (a2 = t2._getLocalConversation(i2)) && (s2 = a2.conversationGroupList.indexOf(n2), 1 === o3 ? -1 === s2 && (a2.conversationGroupList.push(n2), r2 = true) : 2 === o3 && -1 !== s2 && (a2.conversationGroupList.splice(s2, 1), r2 = true));
            }), true === r2 && (this._emitConversationUpdate(), this._emitConvInGroupUpdate(n2));
          }
        } }, { key: "onConvAddedToOrDeletedFromGroup", value: function(e3) {
          var t2 = this;
          Ye.d("".concat(this._n, ".onConvAddedToOrDeletedFromGroup options:"), e3);
          var n2 = e3.msgRecentContactItem, o2 = e3.msgRecentContactUpdateContactItem, i2 = this._concatConversationID(n2), a2 = this._getLocalConversation(i2);
          if (a2 && _t(o2)) {
            var s2, r2 = false;
            o2.forEach(function(e4) {
              var n3 = e4.groupOptType, o3 = e4.recentContactGroupItem.groupName;
              s2 = a2.conversationGroupList.indexOf(o3), 1 === n3 ? -1 === s2 && (a2.conversationGroupList.push(o3), r2 = true) : 2 === n3 && -1 !== s2 && (a2.conversationGroupList.splice(s2, 1), r2 = true), true === r2 && t2._emitConvInGroupUpdate(o3);
            }), true === r2 && this._emitConversationUpdate();
          }
        } }, { key: "onConvGroupListSynced", value: function(e3) {
          var t2 = this;
          _t(e3) && 0 !== e3.length && (Ye.l("".concat(this._n, ".onConvGroupListSynced groupItemList:"), e3), e3.forEach(function(e4) {
            t2._convGroupMap.set(e4.convGroupID, e4.groupName);
          }));
        } }, { key: "getConvGroupListByID", value: function(e3) {
          var t2 = this;
          if (!un(e3)) {
            var n2 = [];
            return e3.forEach(function(e4) {
              t2._convGroupMap.has(e4) && n2.push(t2._convGroupMap.get(e4));
            }), n2;
          }
        } }, { key: "_onConversationNotFound", value: function(e3, t2) {
          e3.push({ conversationID: t2, code: No.CONV_NOT_FOUND, message: this._conversationModule.getErrorMessage(No.CONV_NOT_FOUND) });
        } }, { key: "_onConversationIDInvalid", value: function(e3, t2) {
          e3.push({ conversationID: t2, code: No.INVALID_CONV_ID, message: this._conversationModule.getErrorMessage(No.INVALID_CONV_ID) });
        } }, { key: "_getFlagBit", value: function(e3) {
          for (var t2 = e3.toString(2), n2 = t2.length, o2 = n2 - 1; o2 >= 0; o2--)
            if ("1" === t2[o2])
              return n2 - o2 - 1;
        } }, { key: "_concatConversationID", value: function(e3) {
          var t2, n2 = e3.type, o2 = e3.to, i2 = e3.groupID, a2 = e3.userID;
          return 1 === n2 ? ft(a2) ? ft(o2) || (t2 = "".concat(L.CONV_C2C).concat(o2)) : t2 = "".concat(L.CONV_C2C).concat(a2) : 2 === n2 && (t2 = "".concat(L.CONV_GROUP).concat(i2)), t2;
        } }, { key: "_getMyUserID", value: function() {
          return this._conversationModule.getMyUserID();
        } }, { key: "_insertConversationGroup", value: function(e3, t2) {
          var n2 = this._getLocalConversation(e3);
          if (n2) {
            var o2 = n2.conversationGroupList;
            -1 === o2.indexOf(t2) && o2.push(t2);
          }
        } }, { key: "_getLocalConversation", value: function(e3) {
          return this._conversationModule.getLocalConversation(e3);
        } }, { key: "_hasLocalConversation", value: function(e3) {
          return this._conversationModule.hasLocalConversation(e3);
        } }, { key: "_emitConversationUpdate", value: function() {
          this._conversationModule.emitConversationUpdate(true, false);
        } }, { key: "_emitConvGroupListUpdate", value: function() {
          this._conversationModule.emitOuterEvent(k.CONVERSATION_GROUP_LIST_UPDATED, m(this._convGroupMap.values()));
        } }, { key: "_emitConvInGroupUpdate", value: function(e3) {
          var t2 = { groupName: e3, conversationList: [] }, n2 = this._conversationModule.getLocalConversationList();
          t2.conversationList = n2.filter(function(t3) {
            return t3.conversationGroupList.includes(e3);
          }), this._conversationModule.emitOuterEvent(k.CONVERSATION_IN_GROUP_UPDATED, t2);
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._convGroupMap.clear(), this._startIndex = 0, this._pagingStatus = hn.NOT_START;
        } }]), e2;
      }(), tr = function(e2) {
        r(i2, e2);
        var n2 = f(i2);
        function i2(e3) {
          var t2;
          return o(this, i2), (t2 = n2.call(this, e3))._n = "ConversationModule", qs.mixin(h(t2)), t2._messageListHandler = new ws(), t2._messageRemindHandler = new $s(h(t2)), t2._convGroupHandler = new er(h(t2)), t2.singlyLinkedList = new Js(100), t2._pagingStatus = hn.NOT_START, t2._pagingTimeStamp = 0, t2._pagingStartIndex = 0, t2._pagingPinnedTimeStamp = 0, t2._pagingPinnedStartIndex = 0, t2._pagingConvIDMap = /* @__PURE__ */ new Map(), t2._convIDFromUnreadDBMap = /* @__PURE__ */ new Map(), t2._conversationMap = /* @__PURE__ */ new Map(), t2._tmpGroupList = [], t2._tmpGroupAtTipsList = [], t2._peerReadTimeMap = /* @__PURE__ */ new Map(), t2._completedMap = /* @__PURE__ */ new Map(), t2._roamingMessageKeyAndTimeMap = /* @__PURE__ */ new Map(), t2._roamingMessageSequenceMap = /* @__PURE__ */ new Map(), t2._remoteGroupReadSequenceMap = /* @__PURE__ */ new Map(), t2._convTotalUnreadCount = 0, t2._pagingGetCostList = [], t2._initListeners(), t2;
        }
        return a(i2, [{ key: "_initListeners", value: function() {
          var e3 = this.getInnerEmitterInstance();
          e3.on(Fs.A2KEY_AND_TINYID_UPDATED, this._init, this), e3.on(Fs.PROFILE_UPDATED, this._onProfileUpdated, this);
        } }, { key: "onCheckTimer", value: function(e3) {
          e3 % 60 == 0 && this._messageListHandler.traversal();
        } }, { key: "_init", value: function() {
          var e3 = this;
          Ye.l("".concat(this._n, "._init"));
          var t2 = this.getModule(oo).getItem("conversationMap"), n3 = this.isIntl();
          if (t2) {
            for (var o2 = t2.length, i3 = 0; i3 < o2; i3++) {
              var a2 = t2[i3];
              if (a2) {
                if (this._isNonExistentAccount(a2.conversationID))
                  continue;
                if (a2.groupProfile) {
                  var s2 = a2.groupProfile.type;
                  if (Ut(s2))
                    continue;
                }
              }
              this._conversationMap.set(a2.conversationID, new Zs(t2[i3], n3));
            }
            this.emitConversationUpdate(true, false);
          }
          this.ready(function() {
            e3._tmpGroupList.length > 0 && (e3.updateConversationGroupProfile(e3._tmpGroupList), e3._tmpGroupList.length = 0);
          }), this.syncConversationList();
        } }, { key: "_isNonExistentAccount", value: function(e3) {
          var t2;
          return e3.startsWith(L.CONV_C2C) && (t2 = e3.replace(L.CONV_C2C, "")), "@TLS#ERROR" === t2 || "@TLS#NOT_FOUND" === t2;
        } }, { key: "onMessageSent", value: function(e3) {
          this._onSendOrReceiveMessage({ conversationOptionsList: e3.conversationOptionsList, isInstantMessage: true });
        } }, { key: "onNewMessage", value: function(e3) {
          this._onSendOrReceiveMessage(e3);
        } }, { key: "_onSendOrReceiveMessage", value: function(e3) {
          var t2 = this, n3 = e3.conversationOptionsList, o2 = e3.isInstantMessage, i3 = void 0 === o2 || o2, a2 = e3.isUnreadC2CMessage, s2 = void 0 !== a2 && a2, r2 = e3.updateUnreadCount, c2 = void 0 === r2 || r2, u2 = e3.isSyncingEnded, l2 = void 0 !== u2 && u2;
          this._isReady ? 0 !== n3.length ? (true === i3 && this._checkNewConversation(n3), this._updateLocalConversationList({ conversationOptionsList: n3, isInstantMessage: i3, isUnreadC2CMessage: s2, isFromGetConversations: false, updateUnreadCount: c2 }), i3 || (this._convIDFromUnreadDBMap = new Map([].concat(m(this._convIDFromUnreadDBMap), m(n3.map(function(e4) {
            return [e4.conversationID, 1];
          })))), this._diffAndDeleteConversation(), l2 && this.emitInnerEvent(Fs.C2C_UNREAD_HANDLE_COMPLETED)), n3.filter(function(e4) {
            return e4.type === L.CONV_TOPIC;
          }).length > 0 || this.emitConversationUpdate()) : l2 && this.emitInnerEvent(Fs.C2C_UNREAD_HANDLE_COMPLETED) : this.ready(function() {
            t2._onSendOrReceiveMessage(e3);
          });
        } }, { key: "updateConversationGroupProfile", value: function(e3) {
          var t2 = this;
          if (!_t(e3) || 0 !== e3.length)
            if (0 !== this._conversationMap.size) {
              var n3 = false;
              e3.forEach(function(e4) {
                var o2 = "GROUP".concat(e4.groupID);
                if (t2._conversationMap.has(o2)) {
                  n3 = true;
                  var i3 = t2._conversationMap.get(o2);
                  i3.groupProfile = JSON.parse(JSON.stringify(e4)), i3.lastMessage.lastSequence < e4.nextMessageSeq && (i3.lastMessage.lastSequence = e4.nextMessageSeq - 1), i3.subType || (i3.subType = e4.type);
                }
              }), n3 && this.emitConversationUpdate(true, false);
            } else
              this._tmpGroupList = e3;
        } }, { key: "_updateConversationUserProfile", value: function(e3) {
          var t2 = this;
          e3.data.forEach(function(e4) {
            var n3 = "C2C".concat(e4.userID);
            t2._conversationMap.has(n3) && (t2._conversationMap.get(n3).userProfile = e4);
          }), this.emitConversationUpdate(true, false);
        } }, { key: "onMessageRevoked", value: function(e3) {
          var t2 = this;
          if (0 !== e3.length) {
            var n3 = null, o2 = false, i3 = [];
            e3.forEach(function(e4) {
              (n3 = t2._conversationMap.get(e4.conversationID)) && (n3.type === L.CONV_TOPIC ? i3.push(e4) : (n3.reduceUnreadCount() && (o2 = true), n3.isLastMessageRevoked({ sequence: e4.sequence, time: e4.time }) && (n3.setLastMessageRevoked(true), n3.setLastMessageRevoker(e4.revoker), o2 = true)));
            }), this.getModule(eo).onMessageRevoked(i3), o2 && (this.emitConversationUpdate(true, false), this.emitTotalUnreadMessageCountUpdate());
          }
        } }, { key: "emitMessageRevokedEvent", value: function(e3) {
          var t2 = this;
          this._genRevokerInfo(e3).then(function(n3) {
            e3 = e3.map(function(e4) {
              var t3 = n3.find(function(t4) {
                return t4.userID === e4.revoker;
              });
              return e4.revokerInfo = t3 || e4.revokerInfo, e4;
            }), t2.emitOuterEvent(k.MESSAGE_REVOKED, e3);
          });
        } }, { key: "_genRevokerInfo", value: function(e3) {
          for (var t2 = [], n3 = 0; n3 < e3.length; n3++) {
            var o2 = e3[n3].revoker;
            -1 === t2.indexOf(o2) && t2.push(o2);
          }
          var i3 = t2.map(function(e4) {
            return { userID: e4, nick: "", avatar: "" };
          }), a2 = this.getModule(Xn);
          return new Promise(function(e4) {
            a2.getUserProfile({ userIDList: t2 }).then(function(t3) {
              var n4 = t3.data;
              if (!_t(n4) || 0 === n4.length)
                return e4(i3);
              var o3, a3 = T(n4);
              try {
                var s2 = function() {
                  var e5 = o3.value, t4 = e5.userID, n5 = e5.nick, a4 = e5.avatar, s3 = i3.find(function(e6) {
                    return e6.userID === t4;
                  });
                  s3 && (s3.nick = n5, s3.avatar = a4);
                };
                for (a3.s(); !(o3 = a3.n()).done; )
                  s2();
              } catch (r2) {
                a3.e(r2);
              } finally {
                a3.f();
              }
              e4(i3);
            }).catch(function() {
              e4(i3);
            });
          });
        } }, { key: "isLastMessageRevoked", value: function(e3) {
          var t2 = false, n3 = e3.conversationID, o2 = e3.sequence, i3 = e3.time, a2 = this._conversationMap.get(n3);
          a2 && (t2 = a2.type === L.CONV_TOPIC ? this.getModule(eo).isLastMessageRevoked({ topicID: n3.replace(L.CONV_GROUP, ""), sequence: o2 }) : a2.isLastMessageRevoked({ sequence: o2, time: i3 }));
          return Ye.l("".concat(this._n, ".isLastMessageRevoked options:").concat(JSON.stringify(e3), " ret:").concat(t2)), t2;
        } }, { key: "onMessageDeleted", value: function(e3) {
          var t2 = this;
          if (0 !== e3.length) {
            var n3 = null;
            e3.forEach(function(e4) {
              (n3 = t2._messageListHandler.getLocalMessage(e4.conversationID, e4.ID)) && (n3.isDeleted = true), e4 !== n3 && (e4.isDeleted = true);
            });
            for (var o2 = e3[0].conversationID, i3 = this._messageListHandler.getLocalMessageList(o2), a2 = {}, s2 = i3.length - 1; s2 >= 0; s2--)
              if (!i3[s2].isDeleted) {
                a2 = i3[s2];
                break;
              }
            var r2 = this._conversationMap.get(o2);
            if (r2) {
              var c2 = false;
              r2.lastMessage.lastSequence === a2.sequence && r2.lastMessage.lastTime === a2.time || (un(a2) && (a2 = void 0), r2.updateLastMessage(a2), r2.type !== L.CONV_TOPIC && (c2 = true), Ye.l("".concat(this._n, ".onMessageDeleted. update conversationID:").concat(o2, " with lastMessage:"), r2.lastMessage)), o2.startsWith(L.CONV_C2C) && this.updateUnreadCount(o2), c2 && this.emitConversationUpdate(true, false);
            }
          }
        } }, { key: "onMessageModified", value: function(e3) {
          var t2 = "".concat(this._n, ".onMessageModified"), n3 = e3.conversationType, o2 = e3.from, i3 = e3.to, a2 = e3.time, s2 = e3.sequence, r2 = e3.elements, c2 = e3.cloudCustomData, u2 = e3.messageVersion, l2 = this.getMyUserID(), d2 = "".concat(n3).concat(i3);
          i3 === l2 && n3 === L.CONV_C2C && (d2 = "".concat(n3).concat(o2));
          var p2 = this._messageListHandler.onMessageModified(d2, e3), g2 = p2.isUpdated, h2 = p2.message;
          true === g2 && this.emitOuterEvent(k.MESSAGE_MODIFIED, [h2]);
          var _2 = this._isTopicConversation(d2);
          if (null === h2 ? Ye.l("".concat(t2, " message is null! options:").concat(JSON.stringify(e3), "}")) : Ye.l("".concat(t2, " isUpdated:").concat(g2, " isTopicMessage:").concat(_2, " from:").concat(o2, " to:").concat(i3, " sequence:").concat(h2.sequence, " time:").concat(h2.time)), _2) {
            this.getModule(eo).onMessageModified(e3);
          } else {
            var f2 = this._conversationMap.get(d2);
            if (f2) {
              var v2 = f2.lastMessage;
              v2 && v2.lastTime === a2 && v2.lastSequence === s2 && v2.version !== u2 && (Ye.l("".concat(t2, " conversationID:").concat(d2, " lastMessage updated")), v2.type = r2[0].type, v2.payload = r2[0].content, v2.messageForShow = Zt(v2.type, v2.payload, this.isIntl()), v2.cloudCustomData = c2, v2.version = u2, this.emitConversationUpdate(true, false));
            }
          }
          return h2;
        } }, { key: "onNewGroupAtTips", value: function(e3) {
          var n3 = this, o2 = e3.dataList, i3 = null;
          o2.forEach(function(e4) {
            e4.groupAtTips ? i3 = e4.groupAtTips : e4.elements ? i3 = t(t({}, e4.elements), {}, { sync: true }) : e4.groupAtType && (i3 = t(t({}, e4), {}, { sync: true })), i3.__random = e4.random, i3.__sequence = e4.clientSequence, n3._tmpGroupAtTipsList.push(i3);
          }), Ye.d("".concat(this._n, ".onNewGroupAtTips isReady:").concat(this._isReady), this._tmpGroupAtTipsList), this._isReady && this._handleGroupAtTipsList();
        } }, { key: "_handleGroupAtTipsList", value: function() {
          var e3 = this;
          if (0 !== this._tmpGroupAtTipsList.length) {
            var t2 = false;
            this._tmpGroupAtTipsList.forEach(function(n3) {
              var o2 = n3.groupID, i3 = n3.from, a2 = n3.topicID, s2 = void 0 === a2 ? void 0 : a2, r2 = n3.sync, c2 = void 0 !== r2 && r2;
              if (i3 !== e3.getMyUserID())
                if (ft(s2)) {
                  var u2 = e3._conversationMap.get("".concat(L.CONV_GROUP).concat(o2));
                  u2 && (u2.updateGroupAtInfoList(n3), t2 = true);
                } else {
                  var l2 = e3._conversationMap.get("".concat(L.CONV_GROUP).concat(s2));
                  if (l2) {
                    l2.updateGroupAtInfoList(n3);
                    var d2 = e3.getModule(eo), p2 = l2.groupAtInfoList;
                    d2.onConversationProxy({ topicID: s2, groupAtInfoList: p2 });
                  }
                  if (un(l2) && c2)
                    e3.updateTopicConversation([{ conversationID: "".concat(L.CONV_GROUP).concat(s2), type: L.CONV_TOPIC }]), e3._conversationMap.get("".concat(L.CONV_GROUP).concat(s2)).updateGroupAtInfoList(n3);
                }
            }), t2 && this.emitConversationUpdate(true, false), this._tmpGroupAtTipsList.length = 0;
          }
        } }, { key: "_checkNewConversation", value: function(e3) {
          var t2 = this, n3 = [], o2 = [];
          e3.forEach(function(e4) {
            t2._conversationMap.has(e4.conversationID) || (e4.type === L.CONV_C2C ? n3.push(e4.conversationID.replace(L.CONV_C2C, "")) : e4.type === L.CONV_GROUP && o2.push(e4.conversationID.replace(L.CONV_GROUP, "")));
          }), n3.length > 0 && (this._onNewC2CConversation(n3), n3 = null), o2.length > 0 && (this._onNewGroupConversation(o2), o2 = null);
        } }, { key: "_onNewC2CConversation", value: function(e3) {
          this.getModule(Qn).getRemotePeerReadTime(e3), this._messageRemindHandler.getC2CMessageRemindType(e3);
        } }, { key: "_onNewGroupConversation", value: function(e3) {
          var t2 = this.getModule(Zn);
          t2 && t2.getMessageRemindType(e3);
        } }, { key: "_setStorageConversationList", value: function() {
          var e3 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t2 = this.getLocalConversationList(), n3 = t2.filter(function(e4) {
            return e4.type === L.CONV_C2C || e4.type === L.CONV_GROUP && e4.lastMessage.type !== L.MSG_GRP_TIP;
          }).slice(0, 20).map(function(e4) {
            return { conversationID: e4.conversationID, type: e4.type, subType: e4.subType, lastMessage: e4.lastMessage, groupProfile: e4.groupProfile, userProfile: e4.userProfile };
          }), o2 = this.getModule(oo);
          o2.setItem("conversationMap", n3, e3);
        } }, { key: "emitConversationUpdate", value: function() {
          var e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n3 = this.getLocalConversationList();
          if (t2) {
            var o2 = this.getModule(Zn);
            o2 && o2.updateGroupLastMessage(n3);
          }
          e3 && this.emitOuterEvent(k.CONVERSATION_LIST_UPDATED);
        } }, { key: "getLocalConversationList", value: function() {
          return m(this._conversationMap.values()).filter(function(e3) {
            return e3.type !== L.CONV_TOPIC;
          });
        } }, { key: "getLocalConversation", value: function(e3) {
          return this._conversationMap.get(e3);
        } }, { key: "hasLocalConversation", value: function(e3) {
          return this._conversationMap.has(e3);
        } }, { key: "getLocalOldestMessage", value: function(e3) {
          return this._messageListHandler.getLocalOldestMessage(e3);
        } }, { key: "syncConversationList", value: function() {
          var e3 = this, t2 = new Ms("syncConversationList");
          return this._pagingStatus === hn.NOT_START && this._conversationMap.clear(), this._pagingGetConversationList().then(function(n3) {
            var o2 = sn(e3._pagingGetCostList), i3 = an(e3._pagingGetCostList);
            e3._pagingGetCostList.length = 0, e3._pagingStatus = hn.RESOLVED, e3._diffAndDeleteConversation(), e3.emitConversationUpdate(true, false), e3._setStorageConversationList(), e3._handleC2CPeerReadTime(), e3.emitInnerEvent(Fs.CONV_SYNC_COMPLETED);
            var a2 = "count:".concat(e3._conversationMap.size, " sum:").concat(i3, " avg:").concat(o2);
            return Ye.l("".concat(e3._n, ".").concat("syncConversationList", ". ").concat(a2)), t2.setMessage(a2).setNetworkType(e3.getNetworkType()).end(), n3;
          }).catch(function(n3) {
            return e3._pagingStatus = hn.REJECTED, t2.setMessage(e3._pagingTimeStamp), e3.probeNetwork().then(function(e4) {
              var o2 = v(e4, 2), i3 = o2[0], a2 = o2[1];
              t2.setError(n3, i3, a2).end();
            }), Ro(n3);
          });
        } }, { key: "_diffAndDeleteConversation", value: function() {
          var e3 = this;
          if (this._isSyncCompleted()) {
            var t2 = [];
            this._conversationMap.forEach(function(n3, o2) {
              !e3._pagingConvIDMap.has(o2) && e3._convIDFromUnreadDBMap.has(o2) && (e3._conversationMap.delete(o2), t2.push(o2));
            }), Ye.l("".concat(this._n, "._diffAndDeleteConversation list:").concat(t2)), t2 = null;
          }
        } }, { key: "_pagingGetConversationList", value: function() {
          var e3 = this, t2 = "".concat(this._n, "._pagingGetConversationList");
          Ye.l("".concat(t2, " timeStamp:").concat(this._pagingTimeStamp, " startIndex:").concat(this._pagingStartIndex) + " pinnedTimeStamp:".concat(this._pagingPinnedTimeStamp, " pinnedStartIndex:").concat(this._pagingPinnedStartIndex));
          var n3 = Date.now();
          return this._pagingStatus = hn.PENDING, this.request({ protocolName: Mi, requestData: { fromAccount: this.getMyUserID(), timeStamp: this._pagingTimeStamp, startIndex: this._pagingStartIndex, pinnedTimeStamp: this._pagingPinnedTimeStamp, pinnedStartIndex: this._pagingPinnedStartIndex, orderType: 1 } }).then(function(o2) {
            var i3 = o2.data, a2 = i3.completeFlag, s2 = i3.conversations, r2 = void 0 === s2 ? [] : s2, c2 = i3.timeStamp, u2 = i3.startIndex, l2 = i3.pinnedTimeStamp, d2 = i3.pinnedStartIndex, p2 = i3.groupItem, g2 = Date.now() - n3;
            if (e3._pagingGetCostList.push(g2), Ye.l("".concat(t2, " ok. completeFlag:").concat(a2, " count:").concat(r2.length, " cost ").concat(g2, " ms")), e3._convGroupHandler.onConvGroupListSynced(p2), r2.length > 0) {
              var h2 = e3._getConversationOptions(r2);
              e3._pagingConvIDMap = new Map([].concat(m(e3._pagingConvIDMap), m(h2.map(function(e4) {
                return [e4.conversationID, 1];
              })))), e3._updateLocalConversationList({ conversationOptionsList: h2, isFromGetConversations: true }), e3.isLoggedIn() && e3.emitConversationUpdate();
            }
            if (!e3._isReady) {
              if (!e3.isLoggedIn())
                return Eo();
              e3.triggerReady();
            }
            return e3._pagingTimeStamp = c2, e3._pagingStartIndex = u2, e3._pagingPinnedTimeStamp = l2, e3._pagingPinnedStartIndex = d2, 1 !== a2 ? e3._pagingGetConversationList() : (e3._handleGroupAtTipsList(), e3._convGroupHandler.getRemoteConvGroupList(), Eo());
          }).catch(function(n4) {
            throw e3.isLoggedIn() && (e3._isReady || (Ye.w("".concat(t2, " failed. error:"), n4), e3.triggerReady())), n4;
          });
        } }, { key: "_updateLocalConversationList", value: function(e3) {
          var t2, n3 = e3.isFromGetConversations, o2 = e3.isInstantMessage, i3 = Date.now();
          t2 = this._getTmpConversationListMapping(e3), this._conversationMap = new Map(this._sortConversationList([].concat(m(t2.toBeUpdatedConversationList), m(this._conversationMap)))), n3 || (this._updateUserOrGroupProfile(t2.newConversationList), o2 && this.emitTotalUnreadMessageCountUpdate()), Ye.d("".concat(this._n, "._updateLocalConversationList cost ").concat(Date.now() - i3, " ms"));
        } }, { key: "_getTmpConversationListMapping", value: function(e3) {
          for (var t2 = e3.conversationOptionsList, n3 = e3.isFromGetConversations, o2 = e3.isInstantMessage, i3 = e3.isUnreadC2CMessage, a2 = void 0 !== i3 && i3, s2 = e3.updateUnreadCount, r2 = [], c2 = [], u2 = this.getModule(Zn), l2 = this.getModule($n), d2 = this.isIntl(), p2 = 0, g2 = t2.length; p2 < g2; p2++) {
            var h2 = new Zs(t2[p2], d2), _2 = h2.conversationID;
            if (!this._isNonExistentAccount(_2))
              if (this._conversationMap.has(_2)) {
                var f2 = this._conversationMap.get(_2), v2 = ["unreadCount", "allowType", "adminForbidType", "payload", "isPinned"];
                false === o2 && v2.push("lastMessage");
                var m2 = t2[p2].lastMessage, M2 = !ft(m2);
                M2 || t2[p2].type === L.CONV_TOPIC || this._onLastMessageNotExist(t2[p2]), ft(o2) && M2 && null === f2.lastMessage.payload && (f2.lastMessage.payload = m2.payload), un(f2.lastMessage.revoker) || (f2.lastMessage.revoker = null), Dt(f2, h2, v2, [null, void 0, "", 0, NaN]), true === s2 && f2.updateUnreadCount({ nextUnreadCount: h2.unreadCount, isFromGetConversations: n3, isUnreadC2CMessage: a2 }), o2 && M2 && (m2.payload && (f2.lastMessage.payload = m2.payload), f2.type === L.CONV_GROUP && (f2.lastMessage.nameCard = m2.nameCard, f2.lastMessage.nick = m2.nick)), M2 && f2.lastMessage.cloudCustomData !== m2.cloudCustomData && (f2.lastMessage.cloudCustomData = m2.cloudCustomData || ""), this._conversationMap.delete(_2), r2.push([_2, f2]);
              } else {
                if (h2.type === L.CONV_GROUP && u2) {
                  var y2 = h2.groupProfile.groupID, I2 = u2.getLocalGroupProfile(y2);
                  I2 && (h2.groupProfile = I2, true === s2 && h2.updateUnreadCount({ nextUnreadCount: 0 }));
                } else if (h2.type === L.CONV_C2C) {
                  var C2 = _2.replace(L.CONV_C2C, "");
                  l2 && l2.isMyFriend(C2) && (h2.remark = l2.getFriendRemark(C2));
                }
                c2.push(h2), r2.push([_2, h2]);
              }
          }
          for (var D2 = this.getModule(eo), T2 = r2.length, k2 = 0; k2 < T2; k2++)
            if (r2[k2][1].type === L.CONV_TOPIC) {
              var N2 = r2[k2][1], S2 = N2.conversationID, A2 = N2.unreadCount, E2 = N2.groupAtInfoList;
              D2.onConversationProxy({ topicID: S2.replace(L.CONV_GROUP, ""), unreadCount: A2, groupAtInfoList: un(E2) ? void 0 : E2 });
            }
          return { toBeUpdatedConversationList: r2, newConversationList: c2 };
        } }, { key: "_onLastMessageNotExist", value: function(e3) {
          new Ms("lastMessageNotExist").setMessage(JSON.stringify(e3)).setNetworkType(this.getNetworkType()).end();
        } }, { key: "_sortConversationList", value: function(e3) {
          var t2 = [], n3 = [], o2 = [], i3 = [];
          return e3.forEach(function(e4) {
            true === e4[1].isPinned ? un(e4[1].lastMessage.lastTime) ? n3.push(e4) : t2.push(e4) : un(e4[1].lastMessage.lastTime) ? i3.push(e4) : o2.push(e4);
          }), t2.sort(function(e4, t3) {
            return t3[1].lastMessage.lastTime - e4[1].lastMessage.lastTime;
          }).concat(n3).concat(o2.sort(function(e4, t3) {
            return t3[1].lastMessage.lastTime - e4[1].lastMessage.lastTime;
          })).concat(i3);
        } }, { key: "_sortConversationListAndEmitEvent", value: function() {
          this._conversationMap = new Map(this._sortConversationList(m(this._conversationMap))), this.emitConversationUpdate(true, false);
        } }, { key: "_updateUserOrGroupProfile", value: function(e3) {
          var t2 = this;
          if (0 !== e3.length) {
            var n3 = [], o2 = [], i3 = this.getModule(Xn), a2 = this.getModule(Zn);
            e3.forEach(function(e4) {
              if (e4.type === L.CONV_C2C)
                n3.push(e4.toAccount);
              else if (e4.type === L.CONV_GROUP) {
                var t3 = e4.toAccount;
                a2.hasLocalGroup(t3) ? e4.groupProfile = a2.getLocalGroupProfile(t3) : o2.push(t3);
              }
            }), Ye.l("".concat(this._n, "._updateUserOrGroupProfile c2cUserIDList:").concat(n3, " groupIDList:").concat(o2)), n3.length > 0 && i3.getUserProfile({ userIDList: n3 }).then(function(e4) {
              var n4 = e4.data;
              _t(n4) ? n4.forEach(function(e5) {
                t2._doUpdateUserProfile("C2C".concat(e5.userID), e5);
              }) : t2._doUpdateUserProfile("C2C".concat(n4.userID), n4);
            }), o2.length > 0 && a2.getGroupProfileAdvance({ groupIDList: o2, responseFilter: { groupBaseInfoFilter: ["Type", "Name", "FaceUrl"] } }).then(function(e4) {
              e4.data.successGroupList.forEach(function(e5) {
                var n4 = "GROUP".concat(e5.groupID);
                if (t2._conversationMap.has(n4)) {
                  var o3 = t2._conversationMap.get(n4);
                  Dt(o3.groupProfile, e5, [], [null, void 0, "", 0, NaN]), !o3.subType && e5.type && (o3.subType = e5.type);
                }
              });
            });
          }
        } }, { key: "_doUpdateUserProfile", value: function(e3, t2) {
          this.hasLocalConversation(e3) && (this.getLocalConversation(e3).userProfile = t2);
        } }, { key: "_getConversationOptions", value: function(e3) {
          var n3 = this, o2 = [], i3 = e3.filter(function(e4) {
            var t2 = e4.type, o3 = e4.userID;
            return 1 === t2 && !n3._isNonExistentAccount(o3) || 2 === t2;
          }), a2 = this.getMyUserID(), s2 = i3.map(function(e4) {
            if (ft(e4.lastMsg) && (e4.lastMsg = { elements: [] }), 1 === e4.type) {
              var i4 = { userID: e4.userID, nick: e4.peerNick, avatar: e4.peerAvatar };
              return o2.push(i4), { conversationID: "C2C".concat(e4.userID), type: "C2C", lastMessage: { lastTime: e4.time, lastSequence: e4.sequence, fromAccount: e4.lastC2CMsgFromAccount, type: e4.lastMsg.elements[0] ? e4.lastMsg.elements[0].type : null, payload: e4.lastMsg.elements[0] ? n3._amendLayersOverLimitProperty(e4.lastMsg.elements[0].content) : null, cloudCustomData: e4.lastMsg.cloudCustomData || "", isRevoked: 8 === e4.lastMessageFlag, onlineOnlyFlag: false, nick: "", nameCard: "", version: 0, isPeerRead: e4.lastC2CMsgFromAccount === a2 && e4.time <= e4.c2cPeerReadTime, revoker: e4.lastMsg.revokerInfo ? e4.lastMsg.revokerInfo.revoker : null }, userProfile: new Ys(i4), peerReadTime: e4.c2cPeerReadTime, isPinned: 1 === e4.isPinned, customData: e4.customMark || "", markList: en(e4.standardMark), conversationGroupList: n3._convGroupHandler.getConvGroupListByID(e4.contactGroupId), remark: e4.friendRemark || "", messageRemindType: n3._transMessageRemindType(e4.messageRemindType) };
            }
            return { conversationID: "GROUP".concat(e4.groupID), type: "GROUP", lastMessage: t(t({ lastTime: e4.time, lastSequence: e4.sequence, fromAccount: e4.msgGroupFromAccount }, n3._patchTypeAndPayload(e4)), {}, { cloudCustomData: e4.lastMsg.cloudCustomData || "", isRevoked: 2 === e4.lastMessageFlag, onlineOnlyFlag: false, nick: e4.senderNick || "", nameCard: e4.senderNameCard || "", revoker: e4.lastMsg.revokerInfo ? e4.lastMsg.revokerInfo.revoker : null }), groupProfile: new Xs({ groupID: e4.groupID, name: e4.groupNick, avatar: e4.groupImage, type: e4.groupType, nextMessageSeq: e4.nextMessageSeq }), unreadCount: n3._computeGroupUnreadCount(e4), peerReadTime: 0, isPinned: 1 === e4.isPinned, version: 0, customData: e4.customMark || "", markList: en(e4.standardMark), conversationGroupList: n3._convGroupHandler.getConvGroupListByID(e4.contactGroupId), messageRemindType: n3._transMessageRemindType(e4.messageRemindType) };
          });
          o2.length > 0 && this.getModule(Xn).onConversationsProfileUpdated(o2);
          return s2;
        } }, { key: "_transMessageRemindType", value: function(e3) {
          var t2 = "";
          return 0 === e3 ? t2 = L.MSG_REMIND_ACPT_AND_NOTE : 1 === e3 ? t2 = L.MSG_REMIND_DISCARD : 2 === e3 && (t2 = L.MSG_REMIND_ACPT_NOT_NOTE), t2;
        } }, { key: "_computeGroupUnreadCount", value: function(e3) {
          var t2 = e3.unreadCount, n3 = void 0 === t2 ? 0 : t2, o2 = e3.noUnreadCount, i3 = n3 - (void 0 === o2 ? 0 : o2);
          return i3 > 0 ? i3 : 0;
        } }, { key: "_patchTypeAndPayload", value: function(e3) {
          var n3 = e3.lastMsg, o2 = n3.event, i3 = void 0 === o2 ? void 0 : o2, a2 = n3.elements, s2 = void 0 === a2 ? [] : a2, r2 = n3.groupTips, c2 = void 0 === r2 ? {} : r2;
          if (!ft(i3) && !un(c2)) {
            var u2 = new Ps(c2);
            u2.setElement({ type: L.MSG_GRP_TIP, content: t(t({}, c2.elements), {}, { groupProfile: c2.groupProfile }) });
            var l2 = JSON.parse(JSON.stringify(u2.payload));
            return u2 = null, { type: L.MSG_GRP_TIP, payload: l2 };
          }
          return { type: s2[0] ? s2[0].type : null, payload: s2[0] ? this._amendLayersOverLimitProperty(s2[0].content) : null };
        } }, { key: "_amendLayersOverLimitProperty", value: function(e3) {
          var t2 = e3.layersOverLimit;
          return 0 === t2 ? e3.layersOverLimit = false : 1 === t2 && (e3.layersOverLimit = true), e3;
        } }, { key: "getLocalMessageList", value: function(e3) {
          return this._messageListHandler.getLocalMessageList(e3);
        } }, { key: "deleteLocalMessage", value: function(e3) {
          e3 instanceof Ps && this._messageListHandler.remove(e3);
        } }, { key: "onConversationDeleted", value: function(e3) {
          if (_t(e3)) {
            var t2 = e3.map(function(e4) {
              var t3 = e4.type, n3 = e4.userID, o2 = e4.groupID;
              return 1 === t3 ? "".concat(L.CONV_C2C).concat(n3) : 2 === t3 ? "".concat(L.CONV_GROUP).concat(o2) : void 0;
            });
            Ye.l("".concat(this._n, ".onConversationDeleted conversationIDList:").concat(t2)), this.deleteLocalConversationList(t2);
          }
        } }, { key: "onConversationPinned", value: function(e3) {
          var t2 = this;
          if (_t(e3)) {
            var n3 = false;
            e3.forEach(function(e4) {
              var o2, i3 = e4.type, a2 = e4.userID, s2 = e4.groupID;
              1 === i3 ? o2 = t2.getLocalConversation("".concat(L.CONV_C2C).concat(a2)) : 2 === i3 && (o2 = t2.getLocalConversation("".concat(L.CONV_GROUP).concat(s2))), o2 && (Ye.l("".concat(t2._n, ".onConversationPinned conversationID:").concat(o2.conversationID, " isPinned:").concat(o2.isPinned)), o2.isPinned || (o2.isPinned = true, n3 = true));
            }), n3 && this._sortConversationListAndEmitEvent();
          }
        } }, { key: "onConversationUnpinned", value: function(e3) {
          var t2 = this;
          if (_t(e3)) {
            var n3 = false;
            e3.forEach(function(e4) {
              var o2, i3 = e4.type, a2 = e4.userID, s2 = e4.groupID;
              1 === i3 ? o2 = t2.getLocalConversation("".concat(L.CONV_C2C).concat(a2)) : 2 === i3 && (o2 = t2.getLocalConversation("".concat(L.CONV_GROUP).concat(s2))), o2 && (Ye.l("".concat(t2._n, ".onConversationUnpinned conversationID:").concat(o2.conversationID, " isPinned:").concat(o2.isPinned)), o2.isPinned && (o2.isPinned = false, n3 = true));
            }), n3 && this._sortConversationListAndEmitEvent();
          }
        } }, { key: "getMessageList", value: function(e3) {
          var t2 = this, n3 = e3.conversationID, o2 = e3.nextReqMessageID, i3 = e3.count, a2 = "".concat(this._n, ".getMessageList"), s2 = this.getLocalConversation(n3), r2 = "";
          if (s2 && s2.groupProfile && (r2 = s2.groupProfile.type), Ut(r2))
            return Ye.l("".concat(a2, " not available in avchatroom. conversationID:").concat(n3)), Eo({ messageList: [], nextReqMessageID: "", isCompleted: true });
          (ft(i3) || i3 > 15) && (i3 = 15), !o2 && this._isNotInCommunity(n3) && (this._messageListHandler.removeByConversationID(n3), this._completedMap.delete(n3), this._roamingMessageSequenceMap.delete(n3));
          var c2 = this._computeRemainingCount({ conversationID: n3, nextReqMessageID: o2 }), u2 = this._completedMap.has(n3);
          if (Ye.l("".concat(a2, " conversationID:").concat(n3, " nextReqMessageID:").concat(o2) + " remainingCount:".concat(c2, " count:").concat(i3, " isCompleted:").concat(u2)), this._needGetHistory({ conversationID: n3, remainingCount: c2, count: i3 }))
            return this.getHistoryMessages({ conversationID: n3, nextReqMessageID: o2, count: 20 }).then(function(e4) {
              var o3 = e4.nextReqID, i4 = e4.storedMessageList, s3 = t2._completedMap.has(n3), r3 = i4;
              c2 > 0 && (r3 = t2._messageListHandler.getLocalMessageList(n3).slice(0, i4.length + c2));
              var u3 = { nextReqMessageID: s3 ? "" : o3, messageList: r3, isCompleted: s3 }, l3 = u3.messageList.filter(function(e5) {
                return e5.isRevoked;
              }) || [], d2 = r3.map(function(e5) {
                return e5.sequence;
              });
              return Ye.l("".concat(a2, " ret.nextReqMessageID:").concat(u3.nextReqMessageID, " ret.isCompleted:").concat(u3.isCompleted, " ret.length:").concat(r3.length, " sequenceList:").concat(d2)), _t(l3) && 0 !== l3.length ? t2._genRevokerInfo(l3).then(function(e5) {
                return l3.forEach(function(t3) {
                  var n4 = e5.find(function(e6) {
                    return e6.userID === t3.revoker;
                  }), o4 = t3.revokerInfo && t3.revokerInfo.reason;
                  u3.messageList = u3.messageList.map(function(e6) {
                    return e6.ID === t3.ID && (e6.revokeReason = o4 || "", e6.revokerInfo = n4), e6;
                  });
                }), ko(u3);
              }) : ko(u3);
            });
          this.modifyMessageList(n3);
          var l2 = this._getMessageListFromMemory({ conversationID: n3, nextReqMessageID: o2, count: i3 });
          return Eo(l2);
        } }, { key: "_getMessageListFromMemory", value: function(e3) {
          var t2 = e3.conversationID, n3 = e3.nextReqMessageID, o2 = e3.count, i3 = "".concat(this._n, "._getMessageListFromMemory"), a2 = this._messageListHandler.getLocalMessageList(t2), s2 = a2.length, r2 = 0, c2 = { isCompleted: false, nextReqMessageID: "", messageList: [] };
          return n3 ? (r2 = a2.findIndex(function(e4) {
            return e4.ID === n3;
          })) > o2 ? (c2.messageList = a2.slice(r2 - o2, r2), c2.nextReqMessageID = a2[r2 - o2].ID) : (c2.messageList = a2.slice(0, r2), c2.isCompleted = true) : s2 > o2 ? (r2 = s2 - o2, c2.messageList = a2.slice(r2, s2), c2.nextReqMessageID = a2[r2].ID) : (c2.messageList = a2.slice(0, s2), c2.isCompleted = true), Ye.l("".concat(i3, " conversationID:").concat(t2) + " ret.nextReqMessageID:".concat(c2.nextReqMessageID, " ret.isCompleted:").concat(c2.isCompleted, " ret.length:").concat(c2.messageList.length)), c2;
        } }, { key: "getMessageListHopping", value: function(e3) {
          var t2 = e3.conversationID, n3 = e3.sequence, o2 = e3.time, i3 = e3.count, a2 = e3.direction, s2 = void 0 === a2 ? 0 : a2;
          if ((ft(i3) || i3 > 15) && (i3 = 15), t2.startsWith(L.CONV_C2C)) {
            var r2 = this.getModule(Qn), c2 = t2.replace(L.CONV_C2C, "");
            return r2.getRoamingMessagesHopping({ peerAccount: c2, time: o2, count: i3, direction: s2 });
          }
          if (t2.startsWith(L.CONV_GROUP)) {
            var u2 = this.getModule(Zn), l2 = t2.replace(L.CONV_GROUP, "");
            return u2.getRoamingMessagesHopping({ groupID: l2, sequence: n3, count: i3, direction: s2 });
          }
        } }, { key: "_computeRemainingCount", value: function(e3) {
          var t2 = e3.conversationID, n3 = e3.nextReqMessageID, o2 = this._messageListHandler.getLocalMessageList(t2), i3 = o2.length;
          if (!n3)
            return i3;
          var a2 = 0;
          return wt(t2) ? a2 = o2.findIndex(function(e4) {
            return e4.ID === n3;
          }) : Ft(t2) && (a2 = -1 !== n3.indexOf("-") ? o2.findIndex(function(e4) {
            return e4.ID === n3;
          }) : o2.findIndex(function(e4) {
            return e4.sequence === n3;
          })), -1 === a2 && (a2 = 0), a2;
        } }, { key: "_getMessageListSize", value: function(e3) {
          return this._messageListHandler.getLocalMessageList(e3).length;
        } }, { key: "_needGetHistory", value: function(e3) {
          var t2 = e3.conversationID, n3 = e3.remainingCount, o2 = e3.count, i3 = this.getLocalConversation(t2), a2 = "";
          return i3 && i3.groupProfile && (a2 = i3.groupProfile.type), !qt(t2) && !Ut(a2) && (!(Ft(t2) && this._isPagingGetGroupListCompleted() && this._getLocalGroupCount() <= 4e3 && !this._hasLocalGroup(t2) && !this._isTopicConversation(t2)) && (n3 <= o2 && !this._completedMap.has(t2)));
        } }, { key: "_isTopicConversation", value: function(e3) {
          var t2 = e3.replace(L.CONV_GROUP, "");
          return bt(t2);
        } }, { key: "getHistoryMessages", value: function(e3) {
          var t2 = e3.conversationID, n3 = e3.count;
          if (t2 === L.CONV_SYSTEM)
            return Eo();
          var o2 = 15;
          n3 > 20 && (o2 = 20);
          var i3 = null;
          if (wt(t2)) {
            var a2 = this._roamingMessageKeyAndTimeMap.has(t2);
            return (i3 = this.getModule(Qn)) ? i3.getRoamingMessage({ conversationID: t2, peerAccount: t2.replace(L.CONV_C2C, ""), count: o2, lastMessageTime: a2 ? this._roamingMessageKeyAndTimeMap.get(t2).lastMessageTime : 0, messageKey: a2 ? this._roamingMessageKeyAndTimeMap.get(t2).messageKey : "" }) : Ro({ code: No.CANNOT_FIND_MODULE });
          }
          if (Ft(t2)) {
            if (!(i3 = this.getModule(Zn)))
              return Ro({ code: No.CANNOT_FIND_MODULE });
            var s2 = t2.replace(L.CONV_GROUP, ""), r2 = null;
            this._conversationMap.has(t2) && !bt(s2) && (r2 = this._conversationMap.get(t2).lastMessage);
            var c2 = 0;
            r2 && (c2 = r2.lastSequence);
            var u2 = this._roamingMessageSequenceMap.get(t2);
            return i3.getRoamingMessage({ conversationID: t2, groupID: s2, count: o2, sequence: u2 || c2 });
          }
          return Eo();
        } }, { key: "patchConversationLastMessage", value: function(e3) {
          var t2 = this.getLocalConversation(e3);
          if (t2) {
            var n3 = t2.lastMessage, o2 = n3.messageForShow, i3 = n3.payload;
            if (un(o2) || un(i3)) {
              var a2 = this._messageListHandler.getLocalMessageList(e3);
              if (0 === a2.length)
                return;
              var s2 = a2[a2.length - 1];
              Ye.l("".concat(this._n, ".patchConversationLastMessage conversationID:").concat(e3, " payload:"), s2.payload), t2.updateLastMessage(s2);
            }
          }
        } }, { key: "onRoamingMessage", value: function() {
          var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n3 = arguments.length > 1 ? arguments[1] : void 0, o2 = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], i3 = n3.startsWith(L.CONV_C2C) ? L.CONV_C2C : L.CONV_GROUP, a2 = null, s2 = [], r2 = [], c2 = 0, u2 = e3.length, l2 = null, d2 = i3 === L.CONV_GROUP, p2 = this.getFileDownloadProxy(), g2 = function() {
            c2 = d2 ? e3.length - 1 : 0, u2 = d2 ? 0 : e3.length;
          }, h2 = function() {
            d2 ? --c2 : ++c2;
          }, _2 = function() {
            return d2 ? c2 >= u2 : c2 < u2;
          };
          for (g2(); _2(); h2())
            if (d2 && 1 === e3[c2].sequence && o2 && this.setCompleted(n3), 1 !== e3[c2].isPlaceMessage)
              if ((a2 = new Ps(e3[c2])).to = e3[c2].to, i3 !== L.CONV_GROUP || ft(e3[c2].topicID) || (a2.to = e3[c2].topicID), a2.isSystemMessage = !!e3[c2].isSystemMessage, a2.conversationType = i3, l2 = 4 === e3[c2].event ? { type: L.MSG_GRP_TIP, content: t(t({}, e3[c2].elements), {}, { groupProfile: e3[c2].groupProfile }) } : e3[c2].elements, d2 || a2.setNickAndAvatar({ nick: e3[c2].nick, avatar: e3[c2].avatar }), un(l2)) {
                var f2 = new Ms("emptyMessageBody");
                f2.setMessage("from:".concat(a2.from, " to:").concat(a2.to, " sequence:").concat(a2.sequence, " event:").concat(e3[c2].event)), f2.setNetworkType(this.getNetworkType()).setLevel("warning").end();
              } else
                a2.setElement(l2, p2), a2.reInitialize(this.getMyUserID()), s2.push(a2);
          return g2 = h2 = _2 = null, o2 ? (this._messageListHandler.unshift(s2, r2), s2 = null, r2) : (r2 = null, s2);
        } }, { key: "findMessage", value: function(e3) {
          return this._messageListHandler.findMessage(e3);
        } }, { key: "_isNotInCommunity", value: function(e3) {
          var t2 = false;
          if (e3.startsWith(L.CONV_GROUP) && this._isTopicConversation(e3)) {
            var n3 = Qt(e3.replace(L.CONV_GROUP, ""));
            this.getModule(Zn).hasLocalGroup(n3) || (t2 = true);
          }
          return t2;
        } }, { key: "deleteTopicRoamingMessageInfo", value: function(e3) {
          var t2 = this;
          Pt({ groupID: e3 }) && this._messageListHandler.getTopicConversationIDList(e3).forEach(function(e4) {
            t2._completedMap.delete(e4), t2._roamingMessageSequenceMap.delete(e4);
          });
        } }, { key: "deleteGroupRomaingMessageInfo", value: function(e3) {
          var t2 = "".concat(L.CONV_GROUP).concat(e3);
          this._completedMap.delete(t2), this._roamingMessageSequenceMap.delete(t2);
        } }, { key: "setMessageRead", value: function(e3) {
          var t2 = e3.conversationID, n3 = this.getLocalConversation(t2);
          if (Ye.l("".concat(this._n, ".setMessageRead conversationID:").concat(t2, " unreadCount:").concat(n3 ? n3.unreadCount : 0)), !n3)
            return Eo();
          if (n3.type !== L.CONV_GROUP && n3.type !== L.CONV_TOPIC || un(n3.groupAtInfoList) || this.deleteGroupAtTips(t2), 0 === n3.unreadCount)
            return Eo();
          if (n3.type === L.CONV_GROUP && !this._hasLocalGroup(t2))
            return 0 !== n3.unreadCount && (n3.unreadCount = 0, this.emitConversationUpdate(true, false)), Eo();
          var o2 = this._messageListHandler.getLocalLastMessage(t2), i3 = n3.lastMessage.lastTime;
          o2 && i3 < o2.time && (i3 = o2.time);
          var a2 = n3.lastMessage.lastSequence;
          if (o2 && a2 < o2.sequence && (a2 = o2.sequence), n3.type === L.CONV_TOPIC && ft(o2)) {
            var s2 = this.getModule(eo), r2 = t2.replace(L.CONV_GROUP, ""), c2 = Qt(r2), u2 = s2.getLocalTopic(c2, r2);
            u2 && (a2 = u2.nextMessageSeq - 1);
          }
          var l2 = null;
          switch (n3.type) {
            case L.CONV_C2C:
              return (l2 = this.getModule(Qn)) ? l2.setMessageRead({ conversationID: t2, lastMessageTime: i3 }) : Ro({ code: No.CANNOT_FIND_MODULE });
            case L.CONV_GROUP:
            case L.CONV_TOPIC:
              return (l2 = this.getModule(Zn)) ? l2.setMessageRead({ conversationID: t2, lastMessageSeq: a2 }) : Ro({ code: No.CANNOT_FIND_MODULE });
            case L.CONV_SYSTEM:
              return n3.unreadCount = 0, this.emitConversationUpdate(true, false), Eo();
            default:
              return Eo();
          }
        } }, { key: "setAllMessageRead", value: function() {
          var e3 = this, t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n3 = "setAllMessageRead", o2 = "".concat(this._n, ".").concat(n3);
          t2.scope || (t2.scope = L.READ_ALL_MSG), Ye.l("".concat(o2, " options:"), t2);
          var i3 = this._createSetAllMessageReadPack(t2);
          if (0 === i3.readAllC2CMessage && 0 === i3.groupMessageReadInfoList.length)
            return Eo();
          var a2 = new Ms(n3);
          return this.request({ protocolName: ji, requestData: i3 }).then(function(n4) {
            var o3 = n4.data, i4 = e3._handleAllMessageRead(o3);
            return a2.setMessage("scope:".concat(t2.scope, " failureGroups:").concat(JSON.stringify(i4))).setNetworkType(e3.getNetworkType()).end(), Eo();
          }).catch(function(t3) {
            return e3.probeNetwork().then(function(e4) {
              var n4 = v(e4, 2), o3 = n4[0], i4 = n4[1];
              a2.setError(t3, o3, i4).end();
            }), Ye.w("".concat(o2, " failed. error:"), t3), Ro({ code: t3 && t3.code ? t3.code : No.MSG_UNREAD_ALL_FAIL, message: t3 && t3.message ? t3.message : void 0 });
          });
        } }, { key: "setConversationCustomData", value: function(e3) {
          return this._convGroupHandler.setConvCustomData(e3);
        } }, { key: "markConversation", value: function(e3) {
          return this._convGroupHandler.markConversation(e3);
        } }, { key: "getConversationGroupList", value: function() {
          return this._convGroupHandler.getLocalConvGroupList();
        } }, { key: "createConversationGroup", value: function(e3) {
          return this._convGroupHandler.createConvGroup(e3);
        } }, { key: "deleteConversationGroup", value: function(e3) {
          return this._convGroupHandler.deleteConvGroup(e3);
        } }, { key: "renameConversationGroup", value: function(e3) {
          return this._convGroupHandler.renameConvGroup(e3);
        } }, { key: "addConversationsToGroup", value: function(e3) {
          return this._convGroupHandler.addConvsToGroup(e3);
        } }, { key: "deleteConversationsFromGroup", value: function(e3) {
          return this._convGroupHandler.deleteConvsFromGroup(e3);
        } }, { key: "onConversationMarkUpdated", value: function(e3) {
          this._convGroupHandler.onConvMarkUpdated(e3);
        } }, { key: "onConversationGroupCreated", value: function(e3) {
          this._convGroupHandler.onConvGroupCreated(e3);
        } }, { key: "onConversationGroupDeleted", value: function(e3) {
          this._convGroupHandler.onConvGroupDeleted(e3);
        } }, { key: "onConversationGroupNameUpdated", value: function(e3) {
          this._convGroupHandler.onConvGroupNameUpdated(e3);
        } }, { key: "onConversationInGroupUpdated", value: function(e3) {
          this._convGroupHandler.onConvInGroupUpdated(e3);
        } }, { key: "onConversationAddedToOrDeletedFromGroup", value: function(e3) {
          this._convGroupHandler.onConvAddedToOrDeletedFromGroup(e3);
        } }, { key: "_getConversationLastMessageSequence", value: function(e3) {
          var t2 = this._messageListHandler.getLocalLastMessage(e3.conversationID), n3 = e3.lastMessage.lastSequence;
          return t2 && n3 < t2.sequence && (n3 = t2.sequence), n3;
        } }, { key: "_getConversationLastMessageTime", value: function(e3) {
          var t2 = this._messageListHandler.getLocalLastMessage(e3.conversationID), n3 = e3.lastMessage.lastTime;
          return t2 && n3 < t2.time && (n3 = t2.time), n3;
        } }, { key: "_createSetAllMessageReadPack", value: function(e3) {
          var t2, n3 = { readAllC2CMessage: 0, groupMessageReadInfoList: [] }, o2 = e3.scope, i3 = T(this._conversationMap);
          try {
            for (i3.s(); !(t2 = i3.n()).done; ) {
              var a2 = v(t2.value, 2)[1];
              if (a2.unreadCount > 0) {
                if (a2.type === L.CONV_C2C && 0 === n3.readAllC2CMessage) {
                  if (o2 === L.READ_ALL_MSG)
                    n3.readAllC2CMessage = 1;
                  else if (o2 === L.READ_ALL_C2C_MSG) {
                    n3.readAllC2CMessage = 1;
                    break;
                  }
                } else if (a2.type === L.CONV_GROUP && (o2 === L.READ_ALL_GROUP_MSG || o2 === L.READ_ALL_MSG)) {
                  var s2 = this._getConversationLastMessageSequence(a2);
                  n3.groupMessageReadInfoList.push({ groupID: a2.groupProfile.groupID, messageSequence: s2 });
                }
              }
            }
          } catch (r2) {
            i3.e(r2);
          } finally {
            i3.f();
          }
          return n3;
        } }, { key: "onPushedAllMessageRead", value: function(e3) {
          this._handleAllMessageRead(e3);
        } }, { key: "_handleAllMessageRead", value: function(e3) {
          var t2 = e3.groupMessageReadInfoList, n3 = e3.readAllC2CMessage, o2 = this._parseGroupReadInfo(t2);
          return this._updateAllConversationUnreadCount({ readAllC2CMessage: n3 }) >= 1 && (this.emitConversationUpdate(true, false), this.emitTotalUnreadMessageCountUpdate()), o2;
        } }, { key: "_parseGroupReadInfo", value: function(e3) {
          var t2 = [];
          if (e3 && e3.length)
            for (var n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var i3 = e3[n3], a2 = i3.groupID, s2 = i3.sequence, r2 = i3.retCode, c2 = i3.lastMessageSeq;
              ft(r2) ? this._remoteGroupReadSequenceMap.set(a2, c2) : (this._remoteGroupReadSequenceMap.set(a2, s2), 0 !== r2 && t2.push("".concat(a2, "-").concat(s2, "-").concat(r2)));
            }
          return t2;
        } }, { key: "_updateAllConversationUnreadCount", value: function(e3) {
          var t2, n3 = e3.readAllC2CMessage, o2 = 0, i3 = T(this._conversationMap);
          try {
            for (i3.s(); !(t2 = i3.n()).done; ) {
              var a2 = v(t2.value, 2), s2 = a2[0], r2 = a2[1];
              if (r2.unreadCount >= 1) {
                if (1 === n3 && r2.type === L.CONV_C2C) {
                  var c2 = this._getConversationLastMessageTime(r2);
                  this.updateIsReadAfterReadReport({ conversationID: s2, lastMessageTime: c2 });
                } else if (r2.type === L.CONV_GROUP) {
                  var u2 = s2.replace(L.CONV_GROUP, "");
                  if (this._remoteGroupReadSequenceMap.has(u2)) {
                    var l2 = this._remoteGroupReadSequenceMap.get(u2), d2 = this._getConversationLastMessageSequence(r2);
                    this.updateIsReadAfterReadReport({ conversationID: s2, remoteReadSequence: l2 }), d2 >= l2 && this._remoteGroupReadSequenceMap.delete(u2);
                  }
                }
                this.updateUnreadCount(s2, false) && (o2 += 1);
              }
            }
          } catch (p2) {
            i3.e(p2);
          } finally {
            i3.f();
          }
          return o2;
        } }, { key: "isRemoteRead", value: function(e3) {
          var t2 = e3.conversationID, n3 = e3.sequence, o2 = t2.replace(L.CONV_GROUP, ""), i3 = false;
          if (this._remoteGroupReadSequenceMap.has(o2)) {
            var a2 = this._remoteGroupReadSequenceMap.get(o2);
            n3 <= a2 && (i3 = true, Ye.l("".concat(this._n, ".isRemoteRead conversationID:").concat(t2, " messageSequence:").concat(n3, " remoteReadSequence:").concat(a2))), n3 >= a2 + 10 && this._remoteGroupReadSequenceMap.delete(o2);
          }
          return i3;
        } }, { key: "updateIsReadAfterReadReport", value: function(e3) {
          var t2 = e3.conversationID, n3 = e3.lastMessageSeq, o2 = e3.lastMessageTime, i3 = this._messageListHandler.getLocalMessageList(t2);
          if (0 !== i3.length) {
            for (var a2, s2 = i3.length - 1; s2 >= 0; s2--)
              if (a2 = i3[s2], !(o2 && a2.time > o2 || n3 && a2.sequence > n3)) {
                if ("in" === a2.flow && a2.isRead)
                  break;
                a2.setIsRead(true);
              }
          }
        } }, { key: "updateUnreadCount", value: function(e3) {
          var t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n3 = false, o2 = this.getLocalConversation(e3), i3 = this._messageListHandler.getLocalMessageList(e3);
          if (o2) {
            var a2 = o2.unreadCount, s2 = i3.filter(function(e4) {
              return !e4.isRead && !e4._onlineOnlyFlag && !e4.isDeleted;
            }).length;
            if (a2 !== s2 && (o2.unreadCount = s2, n3 = true, Ye.l("".concat(this._n, ".updateUnreadCount from ").concat(a2, " to ").concat(s2, ", conversationID:").concat(e3)), true === t2 && (this.emitConversationUpdate(true, false), this.emitTotalUnreadMessageCountUpdate())), n3 && o2.type === L.CONV_TOPIC) {
              var r2 = o2.unreadCount, c2 = this.getModule(eo), u2 = e3.replace(L.CONV_GROUP, "");
              c2.onConversationProxy({ topicID: u2, unreadCount: r2 });
            }
            return n3;
          }
        } }, { key: "clearGroupAtInfoList", value: function(e3) {
          var t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n3 = this.getLocalConversation(e3);
          if (n3 && n3.groupAtInfoList.length > 0) {
            if (n3.clearGroupAtInfoList(), Ye.l("".concat(this._n, ".clearGroupAtInfoList conversationID:").concat(e3)), n3.type === L.CONV_TOPIC) {
              var o2 = n3.groupAtInfoList, i3 = this.getModule(eo), a2 = e3.replace(L.CONV_GROUP, "");
              i3.onConversationProxy({ topicID: a2, groupAtInfoList: o2 });
            }
            true === t2 && this.emitConversationUpdate(true, false);
          }
        } }, { key: "updateReadReceiptInfo", value: function(e3) {
          var t2 = this, n3 = e3.userID, o2 = void 0 === n3 ? void 0 : n3, i3 = e3.groupID, a2 = void 0 === i3 ? void 0 : i3, s2 = e3.readReceiptList;
          if (!un(s2)) {
            var r2 = [];
            if (ft(o2)) {
              if (!ft(a2)) {
                var c2 = "".concat(L.CONV_GROUP).concat(a2);
                s2.forEach(function(e4) {
                  var n4 = e4.tinyID, o3 = e4.clientTime, i4 = e4.random, s3 = e4.readCount, u3 = e4.unreadCount, l2 = "".concat(n4, "-").concat(o3, "-").concat(i4), d2 = t2._messageListHandler.getLocalMessage(c2, l2), p2 = { groupID: a2, messageID: l2, readCount: 0, unreadCount: 0 };
                  d2 && (dt(s3) && (d2.readReceiptInfo.readCount = s3, p2.readCount = s3), dt(u3) && (d2.readReceiptInfo.unreadCount = u3, p2.unreadCount = u3), r2.push(p2));
                });
              }
            } else {
              var u2 = "".concat(L.CONV_C2C).concat(o2);
              s2.forEach(function(e4) {
                var n4 = e4.tinyID, i4 = e4.clientTime, a3 = e4.random, s3 = "".concat(n4, "-").concat(i4, "-").concat(a3), c3 = t2._messageListHandler.getLocalMessage(u2, s3);
                if (c3) {
                  c3.readReceiptInfo.isPeerRead = true;
                  var l2 = { userID: o2, messageID: s3, isPeerRead: true };
                  r2.push(l2);
                }
              });
            }
            r2.length > 0 && this.emitOuterEvent(k.MESSAGE_READ_RECEIPT_RECEIVED, r2);
          }
        } }, { key: "updateIsRead", value: function(e3) {
          var t2 = this.getLocalConversation(e3), n3 = this.getLocalMessageList(e3);
          if (t2 && 0 !== n3.length && !qt(t2.type)) {
            for (var o2 = [], i3 = 0, a2 = n3.length; i3 < a2; i3++)
              "in" !== n3[i3].flow ? "out" !== n3[i3].flow || n3[i3].isRead || n3[i3].setIsRead(true) : o2.push(n3[i3]);
            var s2 = 0;
            if (t2.type === L.CONV_C2C) {
              var r2 = o2.slice(-t2.unreadCount).filter(function(e4) {
                return e4.isRevoked;
              }).length;
              s2 = o2.length - t2.unreadCount - r2;
            } else
              s2 = o2.length - t2.unreadCount;
            for (var c2 = 0; c2 < s2 && !o2[c2].isRead; c2++)
              o2[c2].setIsRead(true);
          }
        } }, { key: "deleteGroupAtTips", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".deleteGroupAtTips");
          Ye.l("".concat(n3));
          var o2 = this._conversationMap.get(e3);
          if (!o2)
            return Promise.resolve();
          var i3 = o2.groupAtInfoList;
          if (0 === i3.length)
            return Promise.resolve();
          var a2 = void 0;
          e3.startsWith(L.CONV_GROUP) && (a2 = e3.replace(L.CONV_GROUP, ""));
          var s2 = m(i3);
          if ((Pt({ groupID: a2 }) || bt(a2)) && 0 === (s2 = i3.filter(function(e4) {
            return !e4.atTypeArray.includes(L.CONV_AT_ALL);
          })).length)
            return this.clearGroupAtInfoList(e3, false), Promise.resolve();
          var r2 = this.getMyUserID();
          return this.request({ protocolName: Di, requestData: { messageListToDelete: s2.map(function(e4) {
            return { from: e4.from, to: r2, messageSeq: e4.__sequence, messageRandom: e4.__random, groupID: ft(e4.topicID) ? e4.groupID : e4.topicID };
          }) } }).then(function() {
            return Ye.l("".concat(n3, " ok. count:").concat(i3.length)), t2.clearGroupAtInfoList(e3, false), Promise.resolve();
          }).catch(function(e4) {
            return Ye.e("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "appendToMessageList", value: function(e3) {
          return this._messageListHandler.pushIn(e3);
        } }, { key: "setMessageRandom", value: function(e3) {
          this.singlyLinkedList.set(e3.random);
        } }, { key: "deleteMessageRandom", value: function(e3) {
          this.singlyLinkedList.delete(e3.random);
        } }, { key: "pushIntoMessageList", value: function(e3, t2, n3) {
          return !(!this._messageListHandler.pushIn(t2, n3) || this._isMessageFromCurrentInstance(t2) && !n3) && (e3.push(t2), true);
        } }, { key: "_isMessageFromCurrentInstance", value: function(e3) {
          return this.singlyLinkedList.has(e3.random);
        } }, { key: "revoke", value: function(e3, t2, n3) {
          return this._messageListHandler.revoke(e3, t2, n3);
        } }, { key: "getPeerReadTime", value: function(e3) {
          return this._peerReadTimeMap.get(e3);
        } }, { key: "recordPeerReadTime", value: function(e3, t2) {
          this._peerReadTimeMap.has(e3) ? this._peerReadTimeMap.get(e3) < t2 && this._peerReadTimeMap.set(e3, t2) : this._peerReadTimeMap.set(e3, t2);
        } }, { key: "updateMessageIsPeerReadProperty", value: function(e3, t2) {
          if (e3.startsWith(L.CONV_C2C) && t2 > 0) {
            var n3 = this._messageListHandler.updateMessageIsPeerReadProperty(e3, t2);
            if (n3.length > 0 && this.emitOuterEvent(k.MESSAGE_READ_BY_PEER, n3), this._conversationMap.has(e3)) {
              var o2 = this._conversationMap.get(e3).lastMessage;
              un(o2) || o2.fromAccount === this.getMyUserID() && o2.lastTime <= t2 && !o2.isPeerRead && (o2.isPeerRead = true, this.emitConversationUpdate(true, false));
            }
          }
        } }, { key: "updateMessageIsModifiedProperty", value: function(e3) {
          this._messageListHandler.updateMessageIsModifiedProperty(e3);
        } }, { key: "setCompleted", value: function(e3) {
          Ye.l("".concat(this._n, ".setCompleted. conversationID:").concat(e3)), this._completedMap.set(e3, true);
        } }, { key: "updateRoamingMessageKeyAndTime", value: function(e3, t2, n3) {
          this._roamingMessageKeyAndTimeMap.set(e3, { messageKey: t2, lastMessageTime: n3 });
        } }, { key: "updateRoamingMessageSequence", value: function(e3, t2) {
          this._roamingMessageSequenceMap.set(e3, t2);
        } }, { key: "getConversationList", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".").concat("getConversationList"), o2 = "pagingStatus:".concat(this._pagingStatus, ", local conversation count:").concat(this._conversationMap.size, ", options:").concat(e3);
          if (Ye.l("".concat(n3, ". ").concat(o2)), this._pagingStatus === hn.REJECTED) {
            var i3 = new Ms("getConversationList");
            return i3.setMessage(o2), this.syncConversationList().then(function() {
              i3.setNetworkType(t2.getNetworkType()).end();
              var n4 = t2._getConversationList(e3);
              return ko({ conversationList: n4, isSyncCompleted: t2._isSyncCompleted() });
            }).catch(function(e4) {
              return t2.probeNetwork().then(function(t3) {
                var n4 = v(t3, 2), o3 = n4[0], a3 = n4[1];
                i3.setError(e4, o3, a3).end();
              }), Ye.e("".concat(n3, " failed. error:"), e4), Ro(e4);
            });
          }
          var a2 = this._getConversationList(e3);
          return Ye.l("".concat(n3, ". returned conversation count:").concat(a2.length)), Eo({ conversationList: a2, isSyncCompleted: this._isSyncCompleted() });
        } }, { key: "_getConversationList", value: function(e3) {
          if (ft(e3))
            return this.getLocalConversationList();
          if (_t(e3))
            return 0 === e3.length ? [] : this.getLocalConversationList().filter(function(t3) {
              return e3.includes(t3.conversationID);
            });
          if (ht(e3)) {
            var t2 = e3.type, n3 = e3.markType, o2 = e3.groupName;
            return this.getLocalConversationList().filter(function(e4) {
              return (t2 !== L.CONV_C2C && t2 !== L.CONV_GROUP || e4.type === t2) && (!pt(o2) || e4.conversationGroupList.includes(o2)) && (!dt(n3) || e4.markList.includes(n3));
            });
          }
          return [];
        } }, { key: "_handleC2CPeerReadTime", value: function() {
          var e3, t2 = T(this._conversationMap);
          try {
            for (t2.s(); !(e3 = t2.n()).done; ) {
              var n3 = v(e3.value, 2), o2 = n3[0], i3 = n3[1];
              i3.type === L.CONV_C2C && (Ye.d("".concat(this._n, "._handleC2CPeerReadTime conversationID:").concat(o2, " peerReadTime:").concat(i3.peerReadTime)), this.recordPeerReadTime(o2, i3.peerReadTime));
            }
          } catch (a2) {
            t2.e(a2);
          } finally {
            t2.f();
          }
        } }, { key: "_isPagingGetGroupListCompleted", value: function() {
          var e3 = this.getModule(Zn);
          return !e3 || e3.isPagingGetCompleted();
        } }, { key: "_getLocalGroupCount", value: function() {
          var e3 = this.getModule(Zn);
          return e3 ? e3.getLocalGroupList().length : 0;
        } }, { key: "_hasLocalGroup", value: function(e3) {
          var t2 = this.getModule(Zn);
          return !!t2 && t2.hasLocalGroup(e3.replace(L.CONV_GROUP, ""));
        } }, { key: "getConversationProfile", value: function(e3) {
          var t2, n3 = this;
          if ((t2 = this._conversationMap.has(e3) ? this._conversationMap.get(e3) : new Zs({ conversationID: e3, type: e3.slice(0, 3) === L.CONV_C2C ? L.CONV_C2C : L.CONV_GROUP }, this.isIntl()))._isInfoCompleted || t2.type === L.CONV_SYSTEM)
            return Eo({ conversation: t2 });
          if (Ft(e3) && !this._hasLocalGroup(e3))
            return Eo({ conversation: t2 });
          var o2 = "".concat(this._n, ".").concat("getConversationProfile"), i3 = new Ms("getConversationProfile");
          return Ye.l("".concat(o2, ". conversationID:").concat(e3, " remark:").concat(t2.remark, " lastMessage:"), t2.lastMessage), this._updateUserOrGroupProfileCompletely(t2).then(function(a2) {
            i3.setNetworkType(n3.getNetworkType()).setMessage("conversationID:".concat(e3, " unreadCount:").concat(a2.data.conversation.unreadCount)).end();
            var s2 = n3.getModule($n);
            if (s2 && t2.type === L.CONV_C2C) {
              var r2 = e3.replace(L.CONV_C2C, "");
              if (s2.isMyFriend(r2)) {
                var c2 = s2.getFriendRemark(r2);
                t2.remark !== c2 && (t2.remark = c2, Ye.l("".concat(o2, ". conversationID:").concat(e3, " patch remark:").concat(t2.remark)));
              }
            }
            return Ye.l("".concat(o2, " ok. conversationID:").concat(e3)), a2;
          }).catch(function(t3) {
            return n3.probeNetwork().then(function(n4) {
              var o3 = v(n4, 2), a2 = o3[0], s2 = o3[1];
              i3.setError(t3, a2, s2).setMessage("conversationID:".concat(e3)).end();
            }), Ye.e("".concat(o2, " failed. error:"), t3), Ro(t3);
          });
        } }, { key: "_updateUserOrGroupProfileCompletely", value: function(e3) {
          var t2 = this;
          return e3.type === L.CONV_C2C ? this.getModule(Xn).getUserProfile({ userIDList: [e3.toAccount] }).then(function(n3) {
            var o2 = n3.data;
            return 0 === o2.length ? Ro(new Lo({ code: No.USER_OR_GRP_NOT_FOUND })) : (e3.userProfile = o2[0], e3._isInfoCompleted = true, t2._unshiftConversation(e3), Eo({ conversation: e3 }));
          }) : this.getModule(Zn).getGroupProfile({ groupID: e3.toAccount }).then(function(n3) {
            return e3.groupProfile = n3.data.group, e3._isInfoCompleted = true, t2._unshiftConversation(e3), Eo({ conversation: e3 });
          });
        } }, { key: "_unshiftConversation", value: function(e3) {
          e3 instanceof Zs && !this._conversationMap.has(e3.conversationID) && (this._conversationMap = new Map([[e3.conversationID, e3]].concat(m(this._conversationMap))), this._setStorageConversationList(), this.emitConversationUpdate(true, false));
        } }, { key: "_onProfileUpdated", value: function(e3) {
          var t2 = this;
          e3.data.forEach(function(e4) {
            var n3 = e4.userID;
            if (n3 === t2.getMyUserID())
              t2._onMyProfileModified({ latestNick: e4.nick, latestAvatar: e4.avatar });
            else {
              var o2 = t2._conversationMap.get("".concat(L.CONV_C2C).concat(n3));
              o2 && (o2.userProfile = e4);
            }
          });
        } }, { key: "_isSyncCompleted", value: function() {
          return this._pagingStatus === hn.RESOLVED;
        } }, { key: "_errorLog", value: function(e3, t2, n3, o2) {
          var i3 = new Error("Params validate failed."), a2 = "".concat(this.getErrorMessage("API_REFER")).concat(e3);
          throw Ye.w("[".concat(e3, "] | ").concat(t2, " | ").concat(this.getErrorMessage(n3, o2), ", ").concat(a2)), Ye.e("[".concat(e3, "] Invalid ").concat(t2, ": type check failed for ").concat(t2, ".")), i3;
        } }, { key: "_isValidConversationID", value: function(e3) {
          return wt(e3) || Ft(e3) || qt(e3);
        } }, { key: "deleteConversation", value: function(e3) {
          var t2 = this, n3 = "deleteConversation";
          return pt(e3) || gt(e3) || this._errorLog(n3, "options", "StringOrObjectRequiredLog"), pt(e3) ? (this._isValidConversationID(e3) || this._errorLog(n3, "options", "InvalidConversationID", e3), Ye.l("".concat(this._n, ".").concat(n3, " conversationID:").concat(e3)), this.deleteConversationList({ conversationIDList: [e3], flag: 1 })) : (_t(e3.conversationIDList) || this._errorLog(n3, "conversationIDList", "ArrayRequiredLog"), 0 === e3.conversationIDList.length && this._errorLog(n3, "conversationIDList", "NonEmptyArrayLog"), e3.conversationIDList.forEach(function(e4) {
            t2._isValidConversationID(e4) || t2._errorLog(n3, "conversationIDList", "InvalidConversationID", e4);
          }), "clearHistoryMessage" in e3 && "boolean" != typeof e3.clearHistoryMessage && this._errorLog(n3, "clearHistoryMessage", "BooleanRequiredLog"), e3.conversationIDList.length > 100 && (e3.conversationIDList = e3.conversationIDList.slice(0, 100)), this.deleteConversationList(e3));
        } }, { key: "deleteConversationList", value: function(e3) {
          var t2 = this, n3 = e3.conversationIDList, o2 = void 0 === n3 ? [] : n3, i3 = e3.clearHistoryMessage, a2 = void 0 === i3 || i3, s2 = e3.flag, r2 = void 0 === s2 ? 0 : s2, c2 = "".concat(this._n, ".").concat("deleteConversationList");
          Ye.l("".concat(c2, " conversationIDList.length:").concat(o2.length, " clearHistoryMessage:").concat(a2));
          var u2 = new Ms("deleteConversationList");
          return u2.setMessage("conversationIDList:".concat(o2)), Promise.all([this.rmLocalOnlyConversationList(o2), this.rmLocalAndRemoteConversationList(o2, a2)]).then(function(e4) {
            u2.setNetworkType(t2.getNetworkType()).end();
            var n4 = [].concat(m(e4[0]), m(e4[1]));
            return 0 === n4.length ? Ro(new Lo({ code: No.CONV_NOT_FOUND })) : (Ye.l("".concat(c2, " ok")), Eo(1 === r2 ? { conversationID: n4[0] } : { conversationIDList: n4 }));
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              u2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(c2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "rmLocalOnlyConversationList", value: function(e3) {
          var t2 = this;
          return e3.filter(function(e4) {
            if (!t2._conversationMap.has(e4))
              return false;
            var n3 = t2.getLocalConversation(e4).type;
            return n3 !== L.CONV_GROUP || t2._hasLocalGroup(e4) ? n3 === L.CONV_SYSTEM && (t2.getModule(Zn).deleteGroupSystemNotice({ messageList: t2._messageListHandler.getLocalMessageList(e4) }), t2.deleteLocalConversation(e4), true) : (t2.deleteLocalConversation(e4), true);
          });
        } }, { key: "rmLocalAndRemoteConversationList", value: function(e3, t2) {
          var n3 = this, o2 = { fromAccount: this.getMyUserID(), conversationList: [], clearHistoryMessage: t2 ? 1 : 0 };
          return e3.forEach(function(e4) {
            if (n3._conversationMap.has(e4)) {
              var t3 = n3.getLocalConversation(e4).type;
              t3 === L.CONV_C2C ? o2.conversationList.push({ toAccount: e4.replace(t3, ""), type: 1 }) : t3 === L.CONV_GROUP && n3._hasLocalGroup(e4) && o2.conversationList.push({ toGroupID: e4.replace(t3, ""), type: 2 });
            }
          }), 0 === o2.conversationList.length ? [] : this.request({ protocolName: yi, requestData: o2 }).then(function(e4) {
            var t3 = [];
            return e4.data.resultList.length > 0 && e4.data.resultList.map(function(e5) {
              if (0 === e5.code) {
                var n4 = 1 === e5.type ? "".concat(L.CONV_C2C).concat(e5.to) : "".concat(L.CONV_GROUP).concat(e5.groupID);
                t3.push(n4);
              }
            }), n3.deleteLocalConversationList(t3), t3;
          });
        } }, { key: "setConversationDraft", value: function(e3) {
          var t2 = e3.conversationID, n3 = e3.draftText, o2 = "".concat(this._n, ".").concat("setConversationDraft");
          if (Ye.l("".concat(o2, " conversationID:").concat(t2, " draftText:").concat(n3)), !this._conversationMap.has(t2))
            return Ro({ code: No.CONV_NOT_FOUND });
          var i3 = this._conversationMap.get(t2);
          return i3.setDraftText(n3), Eo({ code: 0, conversation: i3 });
        } }, { key: "clearHistoryMessage", value: function(e3) {
          var t2 = this, n3 = { fromAccount: this.getMyUserID(), toAccount: void 0, type: void 0, toGroupID: void 0 };
          if (!this._conversationMap.has(e3))
            return Ro({ code: No.CONV_NOT_FOUND });
          var o2 = this._conversationMap.get(e3).type;
          if (o2 === L.CONV_C2C)
            n3.type = 1, n3.toAccount = e3.replace(L.CONV_C2C, "");
          else {
            if (o2 !== L.CONV_GROUP)
              return o2 === L.CONV_SYSTEM ? (this.getModule(Zn).deleteGroupSystemNotice({ messageList: this._messageListHandler.getLocalMessageList(e3) }), Eo({ conversationID: e3 })) : Ro({ code: No.CONV_UN_RECORDED_TYPE });
            n3.type = 2, n3.toGroupID = e3.replace(L.CONV_GROUP, "");
          }
          var i3 = "".concat(this._n, ".").concat("clearHistoryMessage"), a2 = new Ms("clearHistoryMessage");
          return a2.setMessage("conversationID:".concat(e3)), Ye.l("".concat(i3, ". conversationID:").concat(e3)), this.setMessageRead({ conversationID: e3 }).then(function() {
            return t2.request({ protocolName: Ii, requestData: n3 });
          }).then(function() {
            a2.setNetworkType(t2.getNetworkType()).end(), Ye.l("".concat(i3, " ok")), t2._messageListHandler.removeByConversationID(e3), t2.setCompleted(e3);
            var n4 = t2.getLocalConversation(e3);
            return n4 && (n4.updateLastMessage(), t2._sortConversationListAndEmitEvent()), Eo({ conversationID: e3 });
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              a2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(i3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "pinConversation", value: function(e3) {
          var t2 = this, n3 = e3.conversationID, o2 = e3.isPinned;
          if (!this._conversationMap.has(n3))
            return Ro({ code: No.CONV_NOT_FOUND });
          var i3 = this.getLocalConversation(n3);
          if (i3.isPinned === o2)
            return Eo({ conversationID: n3 });
          var a2 = "".concat(this._n, ".").concat("pinConversation"), s2 = new Ms("pinConversation");
          s2.setMessage("conversationID:".concat(n3, " isPinned:").concat(o2)), Ye.l("".concat(a2, ". conversationID:").concat(n3, " isPinned:").concat(o2));
          var r2 = null;
          return wt(n3) ? r2 = { type: 1, toAccount: n3.replace(L.CONV_C2C, "") } : Ft(n3) && (r2 = { type: 2, groupID: n3.replace(L.CONV_GROUP, "") }), this.request({ protocolName: Ci, requestData: { fromAccount: this.getMyUserID(), operationType: true === o2 ? 1 : 2, itemList: [r2] } }).then(function() {
            return s2.setNetworkType(t2.getNetworkType()).end(), Ye.l("".concat(a2, " ok")), i3.isPinned !== o2 && (i3.isPinned = o2, t2._sortConversationListAndEmitEvent()), ko({ conversationID: n3 });
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              s2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(a2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "setMessageRemindType", value: function(e3) {
          return this._messageRemindHandler.set(e3);
        } }, { key: "patchMessageRemindType", value: function(e3) {
          var t2 = e3.ID, n3 = e3.isC2CConversation, o2 = e3.messageRemindType, i3 = false, a2 = this.getLocalConversation(n3 ? "".concat(L.CONV_C2C).concat(t2) : "".concat(L.CONV_GROUP).concat(t2));
          return a2 && a2.messageRemindType !== o2 && (a2.messageRemindType = o2, i3 = true), Ye.d("".concat(this._n, ".patchMessageRemindType options:"), e3, "ret:".concat(i3)), i3;
        } }, { key: "onC2CMessageRemindTypeFetched", value: function(e3) {
          var t2 = this;
          if (_t(e3) && e3.length > 0) {
            var n3 = 0;
            e3.forEach(function(e4) {
              var o2 = e4.userID, i3 = e4.muteFlag, a2 = t2._transMessageRemindType(i3);
              true === t2.patchMessageRemindType({ ID: o2, isC2CConversation: true, messageRemindType: a2 }) && (n3 += 1);
            }), Ye.l("".concat(this._n, ".onC2CMessageRemindTypeFetched updateCount:").concat(n3)), n3 >= 1 && this.emitConversationUpdate(true, false);
          }
        } }, { key: "onC2CMessageRemindTypeSynced", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".onC2CMessageRemindTypeSynced");
          Ye.d(n3, e3), e3.dataList.forEach(function(e4) {
            if (!un(e4.muteNotificationsSync)) {
              var o2 = e4.muteNotificationsSync, i3 = o2.to, a2 = o2.muteFlag, s2 = t2._transMessageRemindType(a2), r2 = 0;
              t2.patchMessageRemindType({ ID: i3, isC2CConversation: true, messageRemindType: s2 }) && (r2 += 1), Ye.l("".concat(n3, " updateCount:").concat(r2)), r2 >= 1 && t2.emitConversationUpdate(true, false);
            }
          });
        } }, { key: "onGroupMessageRemindTypeUpdated", value: function(e3) {
          Ye.d("".concat(this._n, ".onGroupMessageRemindTypeUpdated options:"), e3), this._messageRemindHandler.onGroupMessageRemindTypeUpdated(e3);
        } }, { key: "deleteLocalConversation", value: function(e3) {
          var t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n3 = this._conversationMap.has(e3);
          if (Ye.d("".concat(this._n, ".deleteLocalConversation conversationID:").concat(e3, " has:").concat(n3)), n3 && (this._conversationMap.delete(e3), this._roamingMessageKeyAndTimeMap.has(e3) && this._roamingMessageKeyAndTimeMap.delete(e3), this._roamingMessageSequenceMap.has(e3) && this._roamingMessageSequenceMap.delete(e3), this._setStorageConversationList(), this._messageListHandler.removeByConversationID(e3), this._completedMap.delete(e3), t2)) {
            var o2 = !this._isTopicConversation(e3);
            this.emitConversationUpdate(o2, false);
          }
        } }, { key: "deleteLocalConversationList", value: function(e3) {
          var t2 = this, n3 = 0, o2 = false;
          e3.forEach(function(e4) {
            t2._conversationMap.has(e4) && (n3 += t2._conversationMap.get(e4).unreadCount || 0, t2.deleteLocalConversation(e4, false), o2 = true);
          }), Ye.l("".concat(this._n, ".deleteLocalConversationList conversationIDList.length:").concat(e3.length, " isConvIDExisted:").concat(o2)), o2 && (this.emitConversationUpdate(true, false), n3 > 0 && this.emitTotalUnreadMessageCountUpdate());
        } }, { key: "isMessageSentByCurrentInstance", value: function(e3) {
          return !(!this._messageListHandler.hasLocalMessage(e3.conversationID, e3.ID) && !this.singlyLinkedList.has(e3.random));
        } }, { key: "modifyMessageList", value: function(e3) {
          if (e3.startsWith(L.CONV_C2C) && this._conversationMap.has(e3)) {
            var t2 = this._conversationMap.get(e3), n3 = Date.now();
            this._messageListHandler.modifyMessageSentByPeer({ conversationID: e3, latestNick: t2.userProfile.nick, latestAvatar: t2.userProfile.avatar });
            var o2 = this.getModule(Xn).getNickAndAvatarByUserID(this.getMyUserID());
            this._messageListHandler.modifyMessageSentByMe({ conversationID: e3, latestNick: o2.nick, latestAvatar: o2.avatar }), Ye.l("".concat(this._n, ".modifyMessageList conversationID:").concat(e3, " cost ").concat(Date.now() - n3, " ms"));
          }
        } }, { key: "updateUserProfileSpecifiedKey", value: function(e3) {
          Ye.l("".concat(this._n, ".updateUserProfileSpecifiedKey options:"), e3);
          var t2 = e3.conversationID, n3 = e3.nick, o2 = e3.avatar;
          if (this._conversationMap.has(t2)) {
            var i3 = this._conversationMap.get(t2).userProfile;
            pt(n3) && i3.nick !== n3 && (i3.nick = n3), pt(o2) && i3.avatar !== o2 && (i3.avatar = o2), this.emitConversationUpdate(true, false);
          }
        } }, { key: "_onMyProfileModified", value: function(e3) {
          var n3 = this, o2 = this.getLocalConversationList(), i3 = Date.now();
          o2.forEach(function(o3) {
            n3.modifyMessageSentByMe(t({ conversationID: o3.conversationID }, e3));
          }), Ye.l("".concat(this._n, "._onMyProfileModified. modify all messages sent by me, cost ").concat(Date.now() - i3, " ms"));
        } }, { key: "modifyMessageSentByMe", value: function(e3) {
          this._messageListHandler.modifyMessageSentByMe(e3);
        } }, { key: "getLatestMessageSentByMe", value: function(e3) {
          return this._messageListHandler.getLatestMessageSentByMe(e3);
        } }, { key: "modifyMessageSentByPeer", value: function(e3) {
          this._messageListHandler.modifyMessageSentByPeer(e3);
        } }, { key: "getLatestMessageSentByPeer", value: function(e3) {
          return this._messageListHandler.getLatestMessageSentByPeer(e3);
        } }, { key: "pushIntoNoticeResult", value: function(e3, t2) {
          return !(!this._messageListHandler.pushIn(t2) || this.singlyLinkedList.has(t2.random)) && (e3.push(t2), true);
        } }, { key: "getLocalLastMessage", value: function(e3) {
          return this._messageListHandler.getLocalLastMessage(e3);
        } }, { key: "checkAndPatchRemark", value: function() {
          var e3 = this.getModule($n);
          if (0 !== this._conversationMap.size && e3) {
            var t2 = m(this._conversationMap.values()).filter(function(e4) {
              return e4.type === L.CONV_C2C;
            });
            if (0 !== t2.length) {
              var n3 = 0;
              t2.forEach(function(t3) {
                var o2 = t3.conversationID.replace(L.CONV_C2C, "");
                if (e3.isMyFriend(o2)) {
                  var i3 = e3.getFriendRemark(o2);
                  t3.remark !== i3 && (t3.remark = i3, n3 += 1);
                }
              }), Ye.l("".concat(this._n, ".checkAndPatchRemark. c2c conversation count:").concat(t2.length, ", patched count:").concat(n3));
            }
          }
        } }, { key: "updateTopicConversation", value: function(e3) {
          this._updateLocalConversationList({ conversationOptionsList: e3, isFromGetConversations: true });
        } }, { key: "sendReadReceipt", value: function(e3) {
          var t2 = e3[0], n3 = null;
          return t2.conversationType === L.CONV_C2C ? n3 = this._m.getModule(Qn) : t2.conversationType === L.CONV_GROUP && (n3 = this._m.getModule(Zn)), n3 ? n3.sendReadReceipt(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getReadReceiptList", value: function(e3) {
          var t2 = e3[0], n3 = null;
          return t2.conversationType === L.CONV_C2C ? n3 = this._m.getModule(Qn) : t2.conversationType === L.CONV_GROUP && (n3 = this._m.getModule(Zn)), n3 ? n3.getReadReceiptList(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getLastMessageTime", value: function(e3) {
          var t2 = this.getLocalConversation(e3);
          return t2 ? t2.lastMessage.lastTime : 0;
        } }, { key: "getTotalUnreadMessageCount", value: function() {
          var e3 = this.getLocalConversationList(), t2 = 0;
          return e3.forEach(function(e4) {
            e4.type !== L.CONV_SYSTEM && ("" !== e4.messageRemindType && e4.messageRemindType !== L.MSG_REMIND_ACPT_AND_NOTE || (t2 += e4.unreadCount));
          }), t2;
        } }, { key: "emitTotalUnreadMessageCountUpdate", value: function() {
          var e3 = this.getTotalUnreadMessageCount();
          this._convTotalUnreadCount !== e3 && (Ye.l("".concat(this._n, ".emitTotalUnreadMessageCountUpdate from ").concat(this._convTotalUnreadCount, " to ").concat(e3)), this._convTotalUnreadCount = e3, this.emitOuterEvent(k.TOTAL_UNREAD_MESSAGE_COUNT_UPDATED));
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._setStorageConversationList(true), this._pagingStatus = hn.NOT_START, this._messageListHandler.reset(), this._messageRemindHandler.reset(), this._roamingMessageKeyAndTimeMap.clear(), this._roamingMessageSequenceMap.clear(), this.singlyLinkedList.reset(), this._peerReadTimeMap.clear(), this._completedMap.clear(), this._conversationMap.clear(), this._pagingTimeStamp = 0, this._pagingStartIndex = 0, this._pagingPinnedTimeStamp = 0, this._pagingPinnedStartIndex = 0, this._remoteGroupReadSequenceMap.clear(), this._convTotalUnreadCount = 0, this._pagingGetCostList.length = 0, this._pagingConvIDMap.clear(), this._convIDFromUnreadDBMap.clear(), this._pagingGetCostList.length = 0, this.resetReady();
        } }]), i2;
      }(Oo), nr = function() {
        function e2(t2) {
          o(this, e2), this._groupModule = t2, this._n = "GroupTipsHandler", this._cachedGroupTipsMap = /* @__PURE__ */ new Map(), this._checkCountMap = /* @__PURE__ */ new Map(), this.MAX_CHECK_COUNT = 4, this._getTopicPendingMap = /* @__PURE__ */ new Map();
        }
        return a(e2, [{ key: "onCheckTimer", value: function(e3) {
          e3 % 1 == 0 && this._cachedGroupTipsMap.size > 0 && this._checkCachedGroupTips();
        } }, { key: "_checkCachedGroupTips", value: function() {
          var e3 = this;
          this._cachedGroupTipsMap.forEach(function(t2, n2) {
            var o2 = e3._checkCountMap.get(n2), i2 = e3._groupModule.hasLocalGroup(n2);
            Ye.l("".concat(e3._n, "._checkCachedGroupTips groupID:").concat(n2, " hasLocalGroup:").concat(i2, " checkCount:").concat(o2)), i2 ? (e3._notifyCachedGroupTips(n2), e3._checkCountMap.delete(n2), e3._groupModule.deleteUnjoinedAVChatRoom(n2)) : o2 >= e3.MAX_CHECK_COUNT ? (e3._deleteCachedGroupTips(n2), e3._checkCountMap.delete(n2)) : (o2++, e3._checkCountMap.set(n2, o2));
          });
        } }, { key: "onNewGroupTips", value: function(e3) {
          Ye.d("".concat(this._n, ".onReceiveGroupTips count:").concat(e3.dataList.length));
          var t2 = this.newGroupTipsStoredAndSummary(e3), n2 = t2.eventDataList, o2 = t2.result, i2 = t2.AVChatRoomMessageList;
          (i2.length > 0 && this._groupModule.onAVChatRoomMessage(i2), n2.length > 0) && (this._groupModule.updateNextMessageSeq(n2), this._groupModule.getModule(to).onNewMessage({ conversationOptionsList: n2, isInstantMessage: true }));
          o2.length > 0 && (this._groupModule.emitOuterEvent(k.MESSAGE_RECEIVED, o2), this.handleMessageList(o2));
        } }, { key: "newGroupTipsStoredAndSummary", value: function(e3) {
          for (var n2 = this, o2 = e3.event, i2 = e3.dataList, a2 = null, s2 = [], r2 = [], c2 = {}, u2 = [], l2 = function(e4, l3) {
            var d3 = Ot(i2[e4]);
            if (6 === o2) {
              if (n2._groupModule.isGroupAttributesUpdatedNotice(d3))
                return "continue";
              if (n2._groupModule.isGroupCountersNotice(d3))
                return "continue";
            }
            var p3 = d3.groupProfile, g2 = p3.groupID, h2 = p3.communityType, _2 = void 0 === h2 ? 0 : h2, f2 = p3.topicID, v2 = void 0 === f2 ? void 0 : f2, m2 = p3.invisible, M2 = void 0, y2 = n2._groupModule.isMessageFromTopic(_2, v2);
            if (y2) {
              M2 = L.CONV_TOPIC, d3.to = v2;
              var I2 = n2._groupModule.getModule(eo);
              I2.hasLocalTopic(g2, v2) || n2._getTopicPendingMap.has(v2) || (n2._getTopicPendingMap.set(v2, 1), I2.getTopicList({ groupID: g2, topicIDList: [v2] }).finally(function() {
                n2._getTopicPendingMap.delete(v2);
              }));
            }
            var C2 = n2._groupModule.hasLocalGroup(g2);
            if (!C2 && n2._groupModule.isUnjoinedAVChatRoom(g2))
              return "continue";
            if (!C2 && !y2)
              return n2._cacheGroupTipsAndProbe({ groupID: g2, event: o2, item: d3 }), "continue";
            if (n2._groupModule.isMessageFromOrToAVChatroom(g2))
              return d3.event = o2, u2.push(d3), "continue";
            if (d3.currentUser = n2._groupModule.getMyUserID(), d3.conversationType = L.CONV_GROUP, (a2 = new Ps(d3)).setElement({ type: L.MSG_GRP_TIP, content: t(t({}, d3.elements), {}, { groupProfile: d3.groupProfile }) }), a2.isSystemMessage = false, 1 === m2)
              return n2._qualityStat(a2), "continue";
            var D2 = n2._groupModule.getModule(to), T2 = a2, k2 = T2.conversationID, N2 = T2.sequence;
            if (6 === o2)
              a2._onlineOnlyFlag = true, r2.push(a2);
            else if (!D2.pushIntoNoticeResult(r2, a2))
              return "continue";
            if (n2._groupModule.isMessageFromCommunityOfTopic(_2, v2))
              return "continue";
            if (6 === o2 && D2.getLocalConversation(k2))
              return "continue";
            6 !== o2 && n2._qualityStat(a2);
            var S2 = D2.isRemoteRead({ conversationID: k2, sequence: N2 });
            if (ft(c2[k2])) {
              var A2 = 0;
              "in" === a2.flow && (a2._isExcludedFromUnreadCount || a2._onlineOnlyFlag || S2 || (A2 = 1)), c2[k2] = s2.push({ conversationID: k2, unreadCount: A2, type: ft(M2) ? a2.conversationType : M2, subType: a2.conversationSubType, lastMessage: a2._isExcludedFromLastMessage ? "" : a2 }) - 1;
            } else {
              var E2 = c2[k2];
              s2[E2].type = a2.conversationType, s2[E2].subType = a2.conversationSubType, s2[E2].lastMessage = a2._isExcludedFromLastMessage ? "" : a2, "in" === a2.flow && (a2._isExcludedFromUnreadCount || a2._onlineOnlyFlag || S2 || s2[E2].unreadCount++);
            }
          }, d2 = 0, p2 = i2.length; d2 < p2; d2++)
            l2(d2);
          return { eventDataList: s2, result: r2, AVChatRoomMessageList: u2 };
        } }, { key: "_qualityStat", value: function(e3) {
          this._groupModule.getModule(fo).addMessageSequence({ key: ps, message: e3 });
        } }, { key: "handleMessageList", value: function(e3) {
          var t2 = this;
          e3.forEach(function(e4) {
            switch (e4.payload.operationType) {
              case 1:
                t2._onNewMemberComeIn(e4);
                break;
              case 2:
                t2._onMemberQuit(e4);
                break;
              case 3:
                t2._onMemberKickedOut(e4);
                break;
              case 4:
                t2._onMemberSetAdmin(e4);
                break;
              case 5:
                t2._onMemberCancelledAdmin(e4);
                break;
              case 6:
                t2._onGroupProfileModified(e4);
                break;
              case 7:
                t2._onMemberInfoModified(e4);
                break;
              case 8:
                t2._onTopicProfileUpdated(e4);
                break;
              default:
                Ye.w("".concat(t2._n, ".handleMessageList unknown operationType:").concat(e4.payload.operationType));
            }
          });
        } }, { key: "_onNewMemberComeIn", value: function(e3) {
          var t2 = e3.payload, n2 = t2.memberNum, o2 = t2.groupProfile.groupID, i2 = this._groupModule.getLocalGroupProfile(o2);
          i2 && dt(n2) && i2.memberCount !== n2 && (i2.memberCount = n2, this._updateConversationGroupProfile(i2));
        } }, { key: "_onMemberQuit", value: function(e3) {
          var t2 = e3.payload, n2 = t2.memberNum, o2 = t2.groupProfile.groupID, i2 = this._groupModule.getLocalGroupProfile(o2);
          i2 && dt(n2) && i2.memberCount !== n2 && (i2.memberCount = n2, this._updateConversationGroupProfile(i2)), this._groupModule.getGroupMemberHandler().deleteLocalGroupMembers(o2, e3.payload.userIDList);
        } }, { key: "_onMemberKickedOut", value: function(e3) {
          var t2 = e3.payload, n2 = t2.memberNum, o2 = t2.groupProfile.groupID, i2 = this._groupModule.getLocalGroupProfile(o2);
          i2 && dt(n2) && i2.memberCount !== n2 && (i2.memberCount = n2, this._updateConversationGroupProfile(i2)), this._groupModule.getGroupMemberHandler().deleteLocalGroupMembers(o2, e3.payload.userIDList);
        } }, { key: "_updateConversationGroupProfile", value: function(e3) {
          this._groupModule.getModule(to).updateConversationGroupProfile([e3]);
        } }, { key: "_onMemberSetAdmin", value: function(e3) {
          var t2 = e3.payload.groupProfile.groupID, n2 = e3.payload.userIDList, o2 = this._groupModule.getGroupMemberHandler();
          n2.forEach(function(e4) {
            var n3 = o2.getLocalGroupMemberInfo(t2, e4);
            n3 && n3.updateRole(L.GRP_MBR_ROLE_ADMIN);
          });
        } }, { key: "_onMemberCancelledAdmin", value: function(e3) {
          var t2 = e3.payload.groupProfile.groupID, n2 = e3.payload.userIDList, o2 = this._groupModule.getGroupMemberHandler();
          n2.forEach(function(e4) {
            var n3 = o2.getLocalGroupMemberInfo(t2, e4);
            n3 && n3.updateRole(L.GRP_MBR_ROLE_MEMBER);
          });
        } }, { key: "_onGroupProfileModified", value: function(e3) {
          var t2 = this, n2 = e3.payload, o2 = n2.newGroupProfile, i2 = n2.groupProfile.groupID, a2 = this._groupModule.getLocalGroupProfile(i2);
          Object.keys(o2).forEach(function(e4) {
            switch (e4) {
              case "ownerID":
                t2._ownerChanged(a2, o2);
                break;
              case "groupName":
                a2.name = o2[e4];
                break;
              default:
                a2[e4] = o2[e4];
            }
          });
          var s2 = !a2.isSupportTopic;
          this._groupModule.emitGroupListUpdate(true, s2);
        } }, { key: "_ownerChanged", value: function(e3, t2) {
          var n2 = e3.groupID, o2 = this._groupModule.getLocalGroupProfile(n2), i2 = this._groupModule.getMyUserID();
          if (i2 === t2.ownerID) {
            o2.updateGroup({ selfInfo: { role: L.GRP_MBR_ROLE_OWNER } });
            var a2 = this._groupModule.getGroupMemberHandler(), s2 = a2.getLocalGroupMemberInfo(n2, i2), r2 = this._groupModule.getLocalGroupProfile(n2).ownerID, c2 = a2.getLocalGroupMemberInfo(n2, r2);
            s2 && s2.updateRole(L.GRP_MBR_ROLE_OWNER), c2 && c2.updateRole(L.GRP_MBR_ROLE_MEMBER);
          }
        } }, { key: "_onMemberInfoModified", value: function(e3) {
          var t2 = e3.to, n2 = e3.payload, o2 = n2.groupProfile, i2 = n2.memberList, a2 = o2.groupID;
          bt(t2) && this._updateTopicMuteTime(e3);
          var s2 = this._groupModule.getGroupMemberHandler();
          i2.forEach(function(e4) {
            var t3 = s2.getLocalGroupMemberInfo(a2, e4.userID);
            t3 && dt(e4.muteTime) && t3.updateMuteUntil(e4.muteTime);
          });
        } }, { key: "_updateTopicMuteTime", value: function(e3) {
          var t2 = e3.to, n2 = e3.payload, o2 = n2.groupProfile, i2 = n2.memberList, a2 = void 0 === i2 ? [] : i2, s2 = this._groupModule.getModule(eo), r2 = o2.groupID, c2 = s2.getLocalTopic(r2, t2);
          if (c2) {
            for (var u2 = false, l2 = 0; l2 < a2.length; l2++) {
              var d2 = a2[l2];
              if (d2.userID === this._groupModule.getMyUserID() && d2.muteTime >= 0) {
                c2.updateSelfInfo({ muteTime: d2.muteTime }), u2 = true;
                break;
              }
            }
            u2 && this._groupModule.emitOuterEvent(k.TOPIC_UPDATED, { groupID: r2, topic: c2 });
          }
        } }, { key: "_onTopicProfileUpdated", value: function(e3) {
          var n2 = e3.payload, o2 = n2.groupProfile.groupID, i2 = n2.newTopicInfo;
          this._groupModule.getModule(eo).onTopicProfileUpdated(t({ groupID: o2, topicID: e3.to }, i2));
        } }, { key: "_cacheGroupTips", value: function(e3, t2) {
          this._cachedGroupTipsMap.has(e3) || this._cachedGroupTipsMap.set(e3, []), this._cachedGroupTipsMap.get(e3).push(t2);
        } }, { key: "_deleteCachedGroupTips", value: function(e3) {
          this._cachedGroupTipsMap.has(e3) && this._cachedGroupTipsMap.delete(e3);
        } }, { key: "_notifyCachedGroupTips", value: function(e3) {
          var t2 = this, n2 = this._cachedGroupTipsMap.get(e3) || [];
          n2.forEach(function(e4) {
            t2.onNewGroupTips(e4);
          }), this._deleteCachedGroupTips(e3), Ye.l("".concat(this._n, "._notifyCachedGroupTips groupID:").concat(e3, " count:").concat(n2.length));
        } }, { key: "_cacheGroupTipsAndProbe", value: function(e3) {
          var t2 = this, n2 = e3.groupID, o2 = e3.event, i2 = e3.item;
          this._cacheGroupTips(n2, { event: o2, dataList: [i2] }), this._groupModule.getGroupSimplifiedInfo(n2).then(function(e4) {
            e4.type === L.GRP_AVCHATROOM ? t2._groupModule.hasLocalGroup(n2) ? t2._notifyCachedGroupTips(n2) : t2._groupModule.setUnjoinedAVChatRoom(n2) : (t2._groupModule.updateGroupMap([e4]), t2._notifyCachedGroupTips(n2));
          }), this._checkCountMap.has(n2) || this._checkCountMap.set(n2, 0), Ye.l("".concat(this._n, "._cacheGroupTipsAndProbe groupID:").concat(n2));
        } }, { key: "reset", value: function() {
          this._cachedGroupTipsMap.clear(), this._checkCountMap.clear(), this._getTopicPendingMap.clear();
        } }]), e2;
      }(), or = function() {
        function e2(t2) {
          o(this, e2), this._groupModule = t2, this._n = "CommonGroupHandler", this.tempConversationList = null, this._cachedGroupMessageMap = /* @__PURE__ */ new Map(), this._checkCountMap = /* @__PURE__ */ new Map(), this.MAX_CHECK_COUNT = 4, this.PAGING_GRP_COUNT_LIMIT = 200, this._getTopicPendingMap = /* @__PURE__ */ new Map(), this._pagingStatus = hn.NOT_START, this._pagingGetCostList = [], t2.getInnerEmitterInstance().on(Fs.A2KEY_AND_TINYID_UPDATED, this.syncGroupList, this);
        }
        return a(e2, [{ key: "onCheckTimer", value: function(e3) {
          e3 % 1 == 0 && this._cachedGroupMessageMap.size > 0 && this._checkCachedGroupMessage();
        } }, { key: "_checkCachedGroupMessage", value: function() {
          var e3 = this;
          this._cachedGroupMessageMap.forEach(function(t2, n2) {
            var o2 = e3._checkCountMap.get(n2), i2 = e3._groupModule.hasLocalGroup(n2);
            Ye.l("".concat(e3._n, "._checkCachedGroupMessage groupID:").concat(n2, " hasLocalGroup:").concat(i2, " checkCount:").concat(o2)), i2 ? (e3._notifyCachedGroupMessage(n2), e3._checkCountMap.delete(n2), e3._groupModule.deleteUnjoinedAVChatRoom(n2)) : o2 >= e3.MAX_CHECK_COUNT ? (e3._deleteCachedGroupMessage(n2), e3._checkCountMap.delete(n2)) : (o2++, e3._checkCountMap.set(n2, o2));
          });
        } }, { key: "handleUpdateGroupLastMessage", value: function(e3) {
          var n2 = "".concat(this._n, ".handleUpdateGroupLastMessage");
          if (Ye.l("".concat(n2, " conversation count:").concat(e3.length, ", local group count:").concat(this._groupModule.getLocalGroupList().length)), 0 !== this._groupModule.getGroupMap().size) {
            for (var o2, i2, a2, s2 = false, r2 = 0, c2 = e3.length; r2 < c2; r2++)
              (o2 = e3[r2]).type === L.CONV_GROUP && (i2 = o2.conversationID.split(/^GROUP/)[1], (a2 = this._groupModule.getLocalGroupProfile(i2)) && (a2.lastMessage = t({}, o2.lastMessage), s2 = true));
            Ye.l("".concat(n2, " groupUpdated:").concat(s2)), s2 && (this._groupModule.sortLocalGroupList(), this._groupModule.emitGroupListUpdate(true, false));
          } else
            this.tempConversationList = e3;
        } }, { key: "onNewGroupMessage", value: function(e3) {
          Ye.d("".concat(this._n, ".onNewGroupMessage count:").concat(e3.dataList.length));
          var t2 = this._newGroupMessageStoredAndSummary(e3), n2 = t2.conversationOptionsList, o2 = t2.messageList, i2 = t2.AVChatRoomMessageList;
          (i2.length > 0 && this._groupModule.onAVChatRoomMessage(i2), this._groupModule.filterModifiedMessage(o2), n2.length > 0) && (this._groupModule.updateNextMessageSeq(n2), this._groupModule.getModule(to).onNewMessage({ conversationOptionsList: n2, isInstantMessage: e3.isInstantMessage || true, updateUnreadCount: e3.updateUnreadCount || true }));
          var a2 = this._groupModule.filterUnmodifiedMessage(o2);
          a2.length > 0 && this._groupModule.emitOuterEvent(k.MESSAGE_RECEIVED, a2), o2.length = 0;
        } }, { key: "_newGroupMessageStoredAndSummary", value: function(e3) {
          var t2 = this, n2 = e3.dataList, o2 = e3.event, i2 = e3.isInstantMessage, a2 = null, s2 = [], r2 = [], c2 = [], u2 = {}, l2 = this._groupModule.getFileDownloadProxy(), d2 = n2.length;
          d2 > 1 && n2.sort(function(e4, t3) {
            return e4.sequence - t3.sequence;
          });
          for (var p2 = this._groupModule.getModule(to), g2 = this._groupModule.getModule(Xn), h2 = function(e4) {
            var d3 = Ot(n2[e4]), h3 = d3.groupProfile, _3 = h3.groupID, f2 = h3.communityType, v2 = void 0 === f2 ? 0 : f2, m2 = h3.topicID, M2 = void 0 === m2 ? void 0 : m2, y2 = h3.invisible, I2 = void 0, C2 = t2._groupModule.isMessageFromTopic(v2, M2);
            if (C2) {
              I2 = L.CONV_TOPIC, d3.to = M2;
              var D2 = t2._groupModule.getModule(eo);
              D2.hasLocalTopic(_3, M2) || t2._getTopicPendingMap.has(M2) || (t2._getTopicPendingMap.set(M2, 1), D2.getTopicList({ groupID: _3, topicIDList: [M2] }).finally(function() {
                t2._getTopicPendingMap.delete(M2);
              }));
            }
            var T2 = t2._groupModule.hasLocalGroup(_3);
            if (!T2 && t2._groupModule.isUnjoinedAVChatRoom(_3))
              return "continue";
            if (!T2 && !C2)
              return t2._cacheGroupMessageAndProbe({ groupID: _3, event: o2, item: d3 }), "continue";
            if (t2._groupModule.isMessageFromOrToAVChatroom(_3))
              return d3.event = o2, c2.push(d3), "continue";
            if (d3.currentUser = t2._groupModule.getMyUserID(), d3.conversationType = L.CONV_GROUP, d3.isSystemMessage = !!d3.isSystemMessage, (a2 = new Ps(d3)).setElement(d3.elements, l2), 1 === y2)
              return t2._qualityStat(i2, a2), "continue";
            var k2 = 1 === n2[e4].isModified;
            if (p2.isMessageSentByCurrentInstance(a2) ? a2.isModified = k2 : k2 = false, 1 === d3.onlineOnlyFlag)
              a2._onlineOnlyFlag = true, p2.isMessageSentByCurrentInstance(a2) || r2.push(a2);
            else {
              if (t2._groupModule.isMessageFromCommunityOfTopic(v2, M2))
                return r2.push(a2), "continue";
              if (a2.from === t2._groupModule.getMyUserID()) {
                var N2 = p2.getLatestMessageSentByMe(a2.conversationID);
                if (N2) {
                  var S2 = N2.nick, A2 = N2.avatar;
                  S2 === a2.nick && A2 === a2.avatar || (p2.modifyMessageSentByMe({ conversationID: R2, latestNick: a2.nick, latestAvatar: a2.avatar }), g2.mockOnNickAvatarModified(a2.nick, a2.avatar));
                }
              }
              if (!p2.pushIntoMessageList(r2, a2, k2))
                return "continue";
              t2._qualityStat(i2, a2);
              var E2 = a2, R2 = E2.conversationID, O2 = E2.sequence, G2 = p2.isRemoteRead({ conversationID: R2, sequence: O2 });
              if (ft(u2[R2])) {
                var U2 = 0;
                "in" === a2.flow && (a2._isExcludedFromUnreadCount || G2 || (U2 = 1)), u2[R2] = s2.push({ conversationID: R2, unreadCount: U2, type: ft(I2) ? a2.conversationType : I2, subType: a2.conversationSubType, lastMessage: a2._isExcludedFromLastMessage ? "" : a2 }) - 1;
              } else {
                var P2 = u2[R2];
                s2[P2].type = ft(I2) ? a2.conversationType : I2, s2[P2].subType = a2.conversationSubType, s2[P2].lastMessage = a2._isExcludedFromLastMessage ? "" : a2, "in" === a2.flow && (a2._isExcludedFromUnreadCount || G2 || s2[P2].unreadCount++);
              }
            }
          }, _2 = 0; _2 < d2; _2++)
            h2(_2);
          return { conversationOptionsList: s2, messageList: r2, AVChatRoomMessageList: c2 };
        } }, { key: "_qualityStat", value: function(e3, t2) {
          var n2 = this._groupModule.getModule(fo);
          n2.addMessageSequence({ key: ps, message: t2 }), e3 && t2.clientTime > 0 && n2.addMessageDelay(t2.clientTime);
        } }, { key: "onGroupMessageRevoked", value: function(e3) {
          var t2 = this._groupModule.getModule(to), n2 = [], o2 = null, i2 = true;
          e3.dataList.forEach(function(e4) {
            var a2 = e4.elements.revokedInfos, s2 = e4.revokerInfo;
            ft(a2) || a2.forEach(function(e5) {
              var a3 = un(e5.topicID) ? "GROUP".concat(e5.groupID) : "GROUP".concat(e5.topicID);
              o2 = t2.revoke(a3, e5.sequence, e5.random);
              var r2 = e5.revokerInfo && e5.revokerInfo.revoker || s2 && s2.revoker, c2 = s2 && s2.reason;
              if (o2)
                o2.revoker = r2, o2.revokeReason = c2 || "", n2.push(o2);
              else {
                var u2 = { conversationID: a3, to: e5.topicID || "", sequence: e5.sequence, time: e5.time, revoker: r2 };
                t2.isLastMessageRevoked(u2) && (n2.push(u2), i2 = false);
              }
            });
          }), 0 !== n2.length && (t2.onMessageRevoked(n2), true === i2 && (Ye.l("".concat(this._n, ".onGroupMessageRevoked count:").concat(n2.length)), t2.emitMessageRevokedEvent(n2)));
        } }, { key: "_groupListTreeShaking", value: function(e3) {
          for (var t2 = new Map(m(this._groupModule.getGroupMap())), n2 = 0, o2 = e3.length; n2 < o2; n2++)
            t2.delete(e3[n2].groupID);
          this._groupModule.hasJoinedAVChatRoom() && this._groupModule.getJoinedAVChatRoom().forEach(function(e4) {
            t2.delete(e4);
          });
          this._groupModule.getGroupMap().forEach(function(e4, n3) {
            e4.isSupportTopic && t2.delete(n3);
          });
          for (var i2 = m(t2.keys()), a2 = 0, s2 = i2.length; a2 < s2; a2++)
            this._groupModule.deleteGroup(i2[a2]);
        } }, { key: "syncGroupList", value: function() {
          var e3 = this, t2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          this._pagingStatus === hn.NOT_START && this._groupModule.clearGroupMap();
          var n2 = ["Type", "Name", "FaceUrl", "NextMsgSeq", "LastMsgTime", "AtInfoList", "LastRecallTime"], o2 = this.PAGING_GRP_COUNT_LIMIT, i2 = 0, a2 = [];
          if (true === t2)
            return this._pagingGetGroupListWithTopic({ limit: o2, offset: i2, groupBaseInfoFilter: n2, groupList: a2 });
          var s2 = "syncGroupList", r2 = "".concat(this._n, ".").concat(s2), c2 = new Ms(s2);
          return this._pagingGetGroupList({ limit: o2, offset: i2, groupBaseInfoFilter: n2, groupList: a2 }).then(function() {
            var t3 = sn(e3._pagingGetCostList), n3 = an(e3._pagingGetCostList);
            e3._pagingGetCostList.length = 0, e3._pagingStatus = hn.RESOLVED, e3._groupListTreeShaking(a2), e3._groupModule.updateGroupMap(a2);
            var o3 = e3._groupModule.getLocalGroupList().length, i3 = "count:".concat(o3, " sum:").concat(n3, " avg:").concat(t3);
            return Ye.l("".concat(r2, " ok. ").concat(i3)), c2.setNetworkType(e3._groupModule.getNetworkType()).setMessage(i3).end(), e3.tempConversationList && (e3.handleUpdateGroupLastMessage(e3.tempConversationList), e3.tempConversationList = null), e3._groupModule.emitGroupListUpdate(true, true), ko({ groupList: e3._groupModule.getLocalGroupList() });
          }).catch(function(t3) {
            return e3._pagingStatus = hn.REJECTED, e3._groupModule.probeNetwork().then(function(e4) {
              var n3 = v(e4, 2), o3 = n3[0], i3 = n3[1];
              c2.setError(t3, o3, i3).end();
            }), Ye.e("".concat(r2, " failed. error:"), t3), Ro(t3);
          });
        } }, { key: "getGroupList", value: function() {
          var e3 = this, t2 = "".concat(this._n, ".").concat("getGroupList");
          if (Ye.l("".concat(t2, " pagingStatus:").concat(this._pagingStatus)), this._pagingStatus === hn.REJECTED || this._pagingStatus === hn.NOT_START)
            return this.syncGroupList().then(function() {
              var t3 = e3._groupModule.getLocalGroupList();
              return ko({ groupList: t3, isSyncCompleted: e3.isPagingGetCompleted() });
            }).catch(function(e4) {
              return Ye.e("".concat(t2, " failed. error:"), e4), Ro(e4);
            });
          var n2 = this._groupModule.getLocalGroupList();
          return Ye.l("".concat(t2, ". returned group count:").concat(n2.length)), Eo({ groupList: n2, isSyncCompleted: this.isPagingGetCompleted() });
        } }, { key: "isPagingGetCompleted", value: function() {
          return this._pagingStatus === hn.RESOLVED;
        } }, { key: "_pagingGetGroupList", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("_pagingGetGroupList"), o2 = e3.isCommunityRelay, i2 = void 0 !== o2 && o2, a2 = e3.limit, s2 = e3.offset, r2 = e3.groupBaseInfoFilter, c2 = e3.groupList, u2 = Date.now();
          return this._groupModule.request({ protocolName: Oi, requestData: { type: i2 ? L.GRP_COMMUNITY : void 0, memberAccount: this._groupModule.getMyUserID(), limit: a2, offset: s2, responseFilter: { groupBaseInfoFilter: r2, selfInfoFilter: ["Role", "JoinTime", "MsgFlag", "MsgSeq"] } } }).then(function(e4) {
            var o3 = e4.data, l2 = o3.groups, d2 = void 0 === l2 ? [] : l2, p2 = o3.totalCount;
            c2.push.apply(c2, m(d2)), t2._handleGroupAtInfoWithoutTopic(i2, d2);
            var g2 = s2 + a2, h2 = !(p2 > g2), _2 = "offset:".concat(s2, " limit:").concat(a2, " totalCount:").concat(p2, " isCompleted:").concat(h2, " ") + "currentCount:".concat(c2.length, " isCommunityRelay:").concat(i2), f2 = Date.now() - u2;
            return t2._pagingGetCostList.push(f2), Ye.l("".concat(n2, " ok. ").concat(_2, " cost ").concat(f2, " ms")), i2 || h2 ? !i2 && h2 ? (Ye.l("".concat(n2, " start to get community list")), s2 = 0, t2._pagingGetGroupList({ limit: a2, offset: s2, groupBaseInfoFilter: r2, groupList: c2, isCommunityRelay: true })) : i2 && !h2 ? (s2 = g2, t2._pagingGetGroupList({ limit: a2, offset: s2, groupBaseInfoFilter: r2, groupList: c2, isCommunityRelay: true })) : ko({ groupList: c2 }) : (s2 = g2, t2._pagingGetGroupList({ limit: a2, offset: s2, groupBaseInfoFilter: r2, groupList: c2 }));
          }).catch(function(e4) {
            return 10018 === e4.code ? (Ye.w("".concat(t2.logPrefix, " response size exceeds the limit, request count:").concat(a2)), a2 = 50, t2._pagingGetGroupList({ limit: a2, offset: s2, groupBaseInfoFilter: r2, groupList: c2, isCommunityRelay: i2 })) : i2 ? (11e3 === e4.code && Ye.l("".concat(n2, " ok. community unavailable")), Eo({ groupList: c2 })) : Ro(e4);
          });
        } }, { key: "_pagingGetGroupListWithTopic", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, "._pagingGetGroupListWithTopic"), o2 = e3.limit, i2 = e3.offset, a2 = e3.groupBaseInfoFilter, s2 = e3.groupList, r2 = Date.now();
          return this._groupModule.request({ protocolName: Oi, requestData: { type: L.GRP_COMMUNITY, memberAccount: this._groupModule.getMyUserID(), limit: o2, offset: i2, responseFilter: { groupBaseInfoFilter: a2, selfInfoFilter: ["Role", "JoinTime", "MsgFlag", "MsgSeq"] }, isSupportTopic: 1 } }).then(function(e4) {
            var c2 = e4.data, u2 = c2.groups, l2 = void 0 === u2 ? [] : u2, d2 = c2.totalCount;
            s2.push.apply(s2, m(l2));
            var p2 = i2 + o2, g2 = !(d2 > p2);
            if (Ye.l("".concat(n2, " ok. offset:").concat(i2, " limit:").concat(o2, " totalCount:").concat(d2, " isCompleted:").concat(g2, " currentCount:").concat(s2.length, " cost ").concat(Date.now() - r2, " ms")), !g2)
              return i2 = p2, t2._pagingGetGroupListWithTopic({ limit: o2, offset: i2, groupBaseInfoFilter: a2, groupList: s2 });
            t2._groupModule.updateGroupMap(s2), t2._groupModule.emitGroupListUpdate(true, false);
            var h2 = t2._groupModule.getLocalGroupList().filter(function(e5) {
              return true === e5.isSupportTopic;
            });
            return ko({ groupList: h2 });
          }).catch(function(e4) {
            return 10018 === e4.code ? (Ye.w("".concat(t2.logPrefix, " response size exceeds the limit, request count:").concat(o2)), o2 = 50, t2._pagingGetGroupListWithTopic({ limit: o2, offset: i2, groupBaseInfoFilter: a2, groupList: s2 })) : Ro(e4);
          });
        } }, { key: "_cacheGroupMessage", value: function(e3, t2) {
          this._cachedGroupMessageMap.has(e3) || this._cachedGroupMessageMap.set(e3, []), this._cachedGroupMessageMap.get(e3).push(t2);
        } }, { key: "_deleteCachedGroupMessage", value: function(e3) {
          this._cachedGroupMessageMap.has(e3) && this._cachedGroupMessageMap.delete(e3);
        } }, { key: "_notifyCachedGroupMessage", value: function(e3) {
          var t2 = this, n2 = this._cachedGroupMessageMap.get(e3) || [];
          n2.forEach(function(e4) {
            t2.onNewGroupMessage(e4);
          }), this._deleteCachedGroupMessage(e3), Ye.l("".concat(this._n, "._notifyCachedGroupMessage groupID:").concat(e3, " count:").concat(n2.length));
        } }, { key: "_cacheGroupMessageAndProbe", value: function(e3) {
          var t2 = this, n2 = e3.groupID, o2 = e3.event, i2 = e3.item;
          this._cacheGroupMessage(n2, { event: o2, dataList: [i2] }), this._groupModule.getGroupSimplifiedInfo(n2).then(function(e4) {
            e4.type === L.GRP_AVCHATROOM ? t2._groupModule.hasLocalGroup(n2) ? t2._notifyCachedGroupMessage(n2) : t2._groupModule.setUnjoinedAVChatRoom(n2) : (t2._groupModule.updateGroupMap([e4]), t2._notifyCachedGroupMessage(n2));
          }), this._checkCountMap.has(n2) || this._checkCountMap.set(n2, 0), Ye.l("".concat(this._n, "._cacheGroupMessageAndProbe groupID:").concat(n2));
        } }, { key: "_handleGroupAtInfoWithoutTopic", value: function(e3, n2) {
          var o2 = this;
          e3 && 0 !== n2.length && n2.forEach(function(e4) {
            var n3 = e4.groupID, i2 = e4.groupAtInfoList, a2 = [];
            ft(i2) || (i2.forEach(function(e5) {
              a2.push(t(t({}, e5), {}, { groupID: n3 }));
            }), o2._groupModule.getModule(to).onNewGroupAtTips({ dataList: a2 }));
          });
        } }, { key: "setPagingGroupCount", value: function(e3) {
          ft(e3) || (this.PAGING_GRP_COUNT_LIMIT = parseInt(e3, 10));
        } }, { key: "reset", value: function() {
          this.PAGING_GRP_COUNT_LIMIT = 200, this._cachedGroupMessageMap.clear(), this._checkCountMap.clear(), this._getTopicPendingMap.clear(), this._pagingStatus = hn.NOT_START, this._pagingGetCostList = [];
        } }]), e2;
      }(), ir = 1, ar = 2, sr = 3, rr = 4, cr = 5, ur = function() {
        function e2(t2) {
          o(this, e2), this._groupModule = t2, this._n = "GroupAttributesHandler", this._groupAttributesMap = /* @__PURE__ */ new Map(), this._groupAttributesCopy = {}, this.CACHE_EXPIRE_TIME = 3e4, this._groupModule.getInnerEmitterInstance().on(Fs.CLOUD_CONFIG_UPDATED, this._onCloudConfigUpdated, this);
        }
        return a(e2, [{ key: "_onCloudConfigUpdated", value: function() {
          var e3 = this._groupModule.getCloudConfig("grp_attr_cache_time");
          ft(e3) || (this.CACHE_EXPIRE_TIME = Number(e3));
        } }, { key: "updateLocalMainSequenceOnReconnected", value: function() {
          this._groupAttributesMap.forEach(function(e3) {
            e3.localMainSequence = 0;
          });
        } }, { key: "isGroupAttributesUpdatedNotice", value: function(e3) {
          var t2 = e3.to, n2 = e3.elements.newGroupProfile, o2 = !ft(n2) && !un(n2.groupAttributeOption);
          return o2 && this._onGroupAttributesUpdated({ groupID: t2, groupAttributeOption: n2.groupAttributeOption }), o2;
        } }, { key: "_onGroupAttributesUpdated", value: function(e3) {
          var t2 = this, n2 = e3.groupID, o2 = e3.groupAttributeOption, i2 = o2.mainSequence, a2 = o2.isWithChangedAttributeInfo, s2 = o2.groupAttributeList, r2 = void 0 === s2 ? [] : s2, c2 = o2.operationType;
          if (Ye.l("".concat(this._n, ".onGroupAttributesUpdated. ") + "groupID:".concat(n2, " isWithChangedAttributeInfo:").concat(a2, " operationType:").concat(c2)), !ft(c2)) {
            this._groupAttributesCopy = this._getCachedAttributes({ groupID: n2 });
            var u2 = i2 - this._getLocalGroupAttributes(n2).localMainSequence;
            if (0 !== u2) {
              if (1 === a2 && 1 === u2)
                return this._refreshCachedGroupAttributes({ groupID: n2, remoteMainSequence: i2, groupAttributeList: r2, operationType: c2 }), void this._emitGroupAttributesUpdated(n2);
              if (this._hasLocalGroupAttributes(n2)) {
                var l2 = this._getLocalGroupAttributes(n2).avChatRoomKey;
                this._getGroupAttributes({ groupID: n2, avChatRoomKey: l2 }).then(function() {
                  t2._emitGroupAttributesUpdated(n2);
                });
              }
            }
          }
        } }, { key: "initGroupAttributesCache", value: function(e3) {
          var t2 = e3.groupID, n2 = e3.avChatRoomKey, o2 = void 0 === n2 ? void 0 : n2;
          this._groupAttributesMap.set(t2, { lastUpdateTime: 0, localMainSequence: 0, remoteMainSequence: 0, attributes: /* @__PURE__ */ new Map(), avChatRoomKey: o2 }), Ye.l("".concat(this._n, ".initGroupAttributesCache groupID:").concat(t2, " avChatRoomKey:").concat(o2));
        } }, { key: "initGroupAttributes", value: function(e3) {
          var t2 = this, n2 = e3.groupID, o2 = e3.groupAttributes, i2 = this._getLocalGroupAttributes(n2), a2 = i2.remoteMainSequence, s2 = i2.avChatRoomKey, r2 = new Ms("initGroupAttributes");
          return r2.setMessage("groupID:".concat(n2, " avChatRoomKey:").concat(s2, " mainSequence:").concat(a2)), this._groupModule.request({ protocolName: sa, requestData: { groupID: n2, avChatRoomKey: s2, mainSequence: a2, groupAttributeList: this._transformGroupAttributes(o2) } }).then(function(e4) {
            Ye.l("".concat(t2._n, ".").concat("initGroupAttributes", " ok. groupID:").concat(n2));
            var i3 = e4.data, a3 = i3.mainSequence, s3 = m(i3.groupAttributeList);
            return s3.forEach(function(e5) {
              e5.value = o2[e5.key];
            }), t2._groupAttributesCopy = t2._getCachedAttributes({ groupID: n2 }), t2._refreshCachedGroupAttributes({ groupID: n2, remoteMainSequence: a3, groupAttributeList: s3, operationType: ir }), t2._emitGroupAttributesUpdated(n2), r2.setNetworkType(t2._groupModule.getNetworkType()).end(), ko({ groupAttributes: o2 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              r2.setError(e4, o3, i3).end();
            }), Ro(e4);
          });
        } }, { key: "setGroupAttributes", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("setGroupAttributes"), o2 = e3.groupID, i2 = e3.groupAttributes, a2 = this._getLocalGroupAttributes(o2), s2 = a2.remoteMainSequence, r2 = a2.avChatRoomKey, c2 = a2.attributes, u2 = this._transformGroupAttributes(i2);
          u2.forEach(function(e4) {
            var t3 = e4.key;
            e4.sequence = 0, c2.has(t3) && (e4.sequence = c2.get(t3).sequence);
          });
          var l2 = new Ms("setGroupAttributes");
          return l2.setMessage("groupID:".concat(o2, " groupAttributes:").concat(JSON.stringify(i2))), Ye.l("".concat(n2, ". groupID:").concat(o2, " mainSequence:").concat(s2)), this._groupModule.request({ protocolName: ra, requestData: { groupID: o2, avChatRoomKey: r2, mainSequence: s2, groupAttributeList: u2 } }).then(function(e4) {
            Ye.l("".concat(n2, " ok."));
            var a3 = e4.data, s3 = a3.mainSequence, r3 = m(a3.groupAttributeList);
            return r3.forEach(function(e5) {
              e5.value = i2[e5.key];
            }), t2._groupAttributesCopy = t2._getCachedAttributes({ groupID: o2 }), t2._refreshCachedGroupAttributes({ groupID: o2, remoteMainSequence: s3, groupAttributeList: r3, operationType: ar }), t2._emitGroupAttributesUpdated(o2), l2.setNetworkType(t2._groupModule.getNetworkType()).end(), ko({ groupAttributes: i2 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              l2.setError(e4, o3, i3).end();
            }), Ro(e4);
          });
        } }, { key: "deleteGroupAttributes", value: function(e3) {
          var t2 = this, n2 = e3.groupID, o2 = e3.keyList, i2 = void 0 === o2 ? [] : o2, a2 = this._getLocalGroupAttributes(n2), s2 = a2.remoteMainSequence, r2 = a2.avChatRoomKey, c2 = a2.attributes, u2 = m(c2.keys()), l2 = ua, d2 = sr, p2 = { groupID: n2, avChatRoomKey: r2, mainSequence: s2 }, g2 = [];
          i2.length > 0 && (u2 = [], l2 = ca, d2 = rr, i2.forEach(function(e4) {
            var t3 = 0;
            c2.has(e4) && (t3 = c2.get(e4).sequence, u2.push(e4)), g2.push({ key: e4, sequence: t3 });
          }), p2.groupAttributeList = g2);
          var h2 = new Ms("deleteGroupAttributes");
          return h2.setMessage("groupID:".concat(n2, " mainSequence:").concat(s2, " keyList:").concat(i2, " protocolName:").concat(l2)), this._groupModule.request({ protocolName: l2, requestData: p2 }).then(function(e4) {
            Ye.l("".concat(t2._n, ".").concat("deleteGroupAttributes", " ok. groupID:").concat(n2));
            var o3 = e4.data.mainSequence;
            return t2._groupAttributesCopy = t2._getCachedAttributes({ groupID: n2 }), t2._refreshCachedGroupAttributes({ groupID: n2, remoteMainSequence: o3, groupAttributeList: g2, operationType: d2 }), t2._emitGroupAttributesUpdated(n2), h2.setNetworkType(t2._groupModule.getNetworkType()).end(), ko({ keyList: u2 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              h2.setError(e4, o3, i3).end();
            }), Ro(e4);
          });
        } }, { key: "getGroupAttributes", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("getGroupAttributes"), o2 = e3.groupID, i2 = this._getLocalGroupAttributes(o2), a2 = i2.avChatRoomKey, s2 = i2.lastUpdateTime, r2 = i2.localMainSequence, c2 = i2.remoteMainSequence, u2 = new Ms("getGroupAttributes");
          if (u2.setMessage("groupID:".concat(o2, " localMainSequence:").concat(r2, " remoteMainSequence:").concat(c2, " keyList:").concat(e3.keyList)), Date.now() - s2 >= this.CACHE_EXPIRE_TIME || r2 < c2)
            return this._getGroupAttributes({ groupID: o2, avChatRoomKey: a2 }).then(function(i3) {
              u2.setMoreMessage("get attributes from remote. count:".concat(i3.length)).setNetworkType(t2._groupModule.getNetworkType()).end(), Ye.l("".concat(n2, " from remote. groupID:").concat(o2));
              var a3 = t2._getCachedAttributes(e3);
              return ko({ groupAttributes: a3 });
            }).catch(function(e4) {
              return t2._groupModule.probeNetwork().then(function(t3) {
                var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
                u2.setError(e4, o3, i3).end();
              }), Ro(e4);
            });
          u2.setMoreMessage("get attributes from cache").setNetworkType(this._groupModule.getNetworkType()).end(), Ye.l("".concat(n2, " from cache. groupID:").concat(o2));
          var l2 = this._getCachedAttributes(e3);
          return Eo({ groupAttributes: l2 });
        } }, { key: "_getGroupAttributes", value: function(e3) {
          var n2 = this, o2 = 0;
          return ft(e3.avChatRoomKey) || (o2 = 1), this._groupModule.request({ protocolName: la, requestData: t(t({}, e3), {}, { groupType: o2 }) }).then(function(t2) {
            Ye.l("".concat(n2._n, "._getGroupAttributes ok. groupID:").concat(e3.groupID));
            var o3 = t2.data, i2 = o3.mainSequence, a2 = o3.groupAttributeList, s2 = m(a2);
            return ft(i2) || n2._refreshCachedGroupAttributes({ groupID: e3.groupID, remoteMainSequence: i2, groupAttributeList: s2, operationType: cr }), a2;
          }).catch(function(e4) {
            return Ro(e4);
          });
        } }, { key: "_refreshCachedGroupAttributes", value: function(e3) {
          var t2 = e3.groupID, n2 = e3.remoteMainSequence, o2 = e3.groupAttributeList, i2 = e3.operationType;
          if (this._hasLocalGroupAttributes(t2)) {
            var a2 = this._getLocalGroupAttributes(t2), s2 = a2.localMainSequence;
            if (i2 === cr || n2 - s2 == 1)
              a2.remoteMainSequence = n2, a2.localMainSequence = n2, a2.lastUpdateTime = Date.now(), this._updateCachedAttributes({ groupAttributes: a2, groupAttributeList: o2, operationType: i2 });
            else {
              if (s2 === n2)
                return;
              a2.remoteMainSequence = n2;
            }
            this._groupAttributesMap.set(t2, a2);
            var r2 = "operationType:".concat(i2, " localMainSequence:").concat(s2, " remoteMainSequence:").concat(n2);
            Ye.l("".concat(this._n, "._refreshCachedGroupAttributes. ").concat(r2));
          }
        } }, { key: "_getCachedAttributes", value: function(e3) {
          var t2 = e3.groupID, n2 = e3.keyList, o2 = void 0 === n2 ? [] : n2, i2 = {};
          if (this._hasLocalGroupAttributes(t2)) {
            var a2 = this._getLocalGroupAttributes(t2).attributes;
            if (o2.length > 0)
              o2.forEach(function(e4) {
                a2.has(e4) && (i2[e4] = a2.get(e4).value);
              });
            else {
              var s2, r2 = T(a2.keys());
              try {
                for (r2.s(); !(s2 = r2.n()).done; ) {
                  var c2 = s2.value;
                  i2[c2] = a2.get(c2).value;
                }
              } catch (u2) {
                r2.e(u2);
              } finally {
                r2.f();
              }
            }
          }
          return i2;
        } }, { key: "_updateCachedAttributes", value: function(e3) {
          var t2 = e3.groupAttributes, n2 = e3.groupAttributeList, o2 = e3.operationType;
          o2 !== sr ? o2 !== rr ? (o2 === ir && t2.attributes.clear(), n2.forEach(function(e4) {
            var n3 = e4.key, o3 = e4.value, i2 = e4.sequence;
            t2.attributes.set(n3, { value: o3, sequence: i2 });
          })) : n2.forEach(function(e4) {
            t2.attributes.delete(e4.key);
          }) : t2.attributes.clear();
        } }, { key: "_hasLocalGroupAttributes", value: function(e3) {
          return this._groupAttributesMap.has(e3);
        } }, { key: "_getLocalGroupAttributes", value: function(e3) {
          return this._hasLocalGroupAttributes(e3) || this.initGroupAttributesCache({ groupID: e3 }), this._groupAttributesMap.get(e3);
        } }, { key: "_transformGroupAttributes", value: function(e3) {
          var t2 = [];
          return Object.keys(e3).forEach(function(n2) {
            t2.push({ key: n2, value: e3[n2] });
          }), t2;
        } }, { key: "_emitGroupAttributesUpdated", value: function(e3) {
          var t2 = this._getCachedAttributes({ groupID: e3 }), n2 = this._computeAttrChangedInfo(t2), o2 = n2.updatedKeyList, i2 = n2.deletedKeyList;
          Ye.l("".concat(this._n, "._emitGroupAttributesUpdated update:").concat(o2.length, ", delete:").concat(i2.length)), 0 === o2.length && 0 === i2.length || this._groupModule.emitOuterEvent(k.GROUP_ATTRIBUTES_UPDATED, { groupID: e3, groupAttributes: t2, updatedKeyList: o2, deletedKeyList: i2 });
        } }, { key: "_computeAttrChangedInfo", value: function(e3) {
          var t2 = this, n2 = [], o2 = [];
          return Object.keys(e3).forEach(function(o3) {
            e3[o3] !== t2._groupAttributesCopy[o3] && n2.push(o3);
          }), Object.keys(this._groupAttributesCopy).forEach(function(t3) {
            ft(e3[t3]) && o2.push(t3);
          }), this._groupAttributesCopy = {}, { updatedKeyList: n2, deletedKeyList: o2 };
        } }, { key: "deleteLocalGroupAttributes", value: function(e3) {
          this._hasLocalGroupAttributes(e3) && this._groupAttributesMap.delete(e3);
        } }, { key: "reset", value: function() {
          this._groupAttributesMap.clear(), this._groupAttributesCopy = {}, this.CACHE_EXPIRE_TIME = 3e4;
        } }]), e2;
      }(), lr = "Set", dr = "Increase", pr = "Decrease", gr = function() {
        function e2(t2) {
          o(this, e2), this._groupModule = t2, this._n = "GroupCountersHandler", this._groupCountersMap = /* @__PURE__ */ new Map(), this.EXPIRE_TIME = 3e4, this._groupModule.getInnerEmitterInstance().on(Fs.CLOUD_CONFIG_UPDATED, this._onCloudConfigUpdated, this);
        }
        return a(e2, [{ key: "_onCloudConfigUpdated", value: function() {
          var e3 = this._groupModule.getCloudConfig("grp_counter_expire_time");
          ft(e3) || (this.EXPIRE_TIME = Number(e3));
        } }, { key: "isGroupCountersNotice", value: function(e3) {
          var t2 = e3.to, n2 = e3.elements.groupCounterInfo, o2 = false;
          return un(n2) || (this._onGroupCountersUpdated({ groupID: t2, groupCounterInfo: n2 }), o2 = true), o2;
        } }, { key: "_onGroupCountersUpdated", value: function(e3) {
          var t2 = this, n2 = e3.groupID;
          e3.groupCounterInfo.forEach(function(e4) {
            var o2 = e4.type, i2 = e4.groupCounterSeq, a2 = e4.counterList, s2 = void 0 === a2 ? [] : a2;
            0 !== o2 && 2 !== o2 || (t2._updateLocalGroupCounters({ groupID: n2, groupCounterSeq: i2, counterList: s2 }), s2.forEach(function(e5) {
              t2._groupModule.emitOuterEvent(k.GROUP_COUNTER_UPDATED, { groupID: n2, key: e5.key, value: e5.value });
            })), 1 === o2 && t2._deleteLocalGroupCounters({ groupID: n2, groupCounterSeq: i2, counterList: s2 });
          }), Ye.l("".concat(this._n, "._onGroupCountersUpdated groupID:").concat(n2));
        } }, { key: "initGroupCountersCache", value: function(e3) {
          var t2 = e3.groupID, n2 = e3.avChatRoomKey;
          this._groupCountersMap.set(t2, { lastUpdateTime: 0, groupCounterSeq: 0, counters: /* @__PURE__ */ new Map(), avChatRoomKey: n2 }), Ye.l("".concat(this._n, ".initGroupCountersCache groupID:").concat(t2, " avChatRoomKey:").concat(n2));
        } }, { key: "setGroupCounters", value: function(e3) {
          var t2 = this;
          if (!this._groupModule.canIUse(B.GRP_COUNTER))
            return this._groupModule.cannotUseCommercialAbility("setGroupCounters");
          var n2 = "".concat(this._n, ".").concat("setGroupCounters"), o2 = e3.groupID, i2 = e3.counters, a2 = this._convertObjectToList(i2), s2 = this._getLocalGroupCounters(o2).avChatRoomKey, r2 = "groupID:".concat(o2, " count:").concat(a2.length), c2 = new Ms("setGroupCounters");
          return c2.setMessage("".concat(r2)), Ye.l("".concat(n2, ". ").concat(r2)), this._updateGroupCounters({ groupID: o2, counterList: a2, avChatRoomKey: s2, mode: lr }).then(function(e4) {
            return c2.end(), Ye.l("".concat(n2, " ok.")), ko({ counters: e4 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              c2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "increaseGroupCounter", value: function(e3) {
          var t2 = this, n2 = "increaseGroupCounter";
          if (!this._groupModule.canIUse(B.GRP_COUNTER))
            return this._groupModule.cannotUseCommercialAbility(n2);
          var o2 = "".concat(this._n, ".").concat(n2), i2 = e3.groupID, a2 = e3.key, s2 = e3.value, r2 = this._getLocalGroupCounters(i2).avChatRoomKey, c2 = "groupID:".concat(i2, " key:").concat(a2, " value:").concat(s2), u2 = new Ms(n2);
          u2.setMessage("".concat(c2)), Ye.l("".concat(o2, ". ").concat(c2));
          var l2 = [{ key: a2, value: s2 }];
          return this._updateGroupCounters({ groupID: i2, counterList: l2, avChatRoomKey: r2, mode: dr }).then(function(e4) {
            return u2.end(), Ye.l("".concat(o2, " ok.")), ko({ counters: e4 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              u2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "decreaseGroupCounter", value: function(e3) {
          var t2 = this, n2 = "decreaseGroupCounter";
          if (!this._groupModule.canIUse(B.GRP_COUNTER))
            return this._groupModule.cannotUseCommercialAbility(n2);
          var o2 = "".concat(this._n, ".").concat(n2), i2 = e3.groupID, a2 = e3.key, s2 = e3.value, r2 = this._getLocalGroupCounters(i2).avChatRoomKey, c2 = "groupID:".concat(i2, " key:").concat(a2, " value:").concat(s2), u2 = new Ms(n2);
          u2.setMessage("".concat(c2)), Ye.l("".concat(o2, ". ").concat(c2));
          var l2 = [{ key: a2, value: s2 }];
          return this._updateGroupCounters({ groupID: i2, counterList: l2, avChatRoomKey: r2, mode: pr }).then(function(e4) {
            return u2.end(), Ye.l("".concat(o2, " ok.")), ko({ counters: e4 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              u2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getGroupCounters", value: function(e3) {
          var t2 = this;
          if (!this._groupModule.canIUse(B.GRP_COUNTER))
            return this._groupModule.cannotUseCommercialAbility("getGroupCounters");
          var n2 = "".concat(this._n, ".").concat("getGroupCounters"), o2 = e3.groupID, i2 = e3.keyList, a2 = void 0 === i2 ? [] : i2, s2 = this._getLocalGroupCounters(o2), r2 = s2.avChatRoomKey, c2 = s2.lastUpdateTime, u2 = new Ms("getGroupCounters");
          if (u2.setMessage("groupID:".concat(o2)), Date.now() - c2 >= this.EXPIRE_TIME)
            return this._getRemoteGroupCounters({ groupID: o2, avChatRoomKey: r2 }).then(function(e4) {
              u2.setMoreMessage("from remote. count:".concat(e4.length)).end(), Ye.l("".concat(n2, " from remote. groupID:").concat(o2));
              var i3 = t2._getLocalCounters(o2, a2);
              return ko({ counters: i3 });
            }).catch(function(e4) {
              return t2._groupModule.probeNetwork().then(function(t3) {
                var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
                u2.setError(e4, o3, i3).end();
              }), Ro(e4);
            });
          u2.setMoreMessage("from cache").end(), Ye.l("".concat(n2, " from cache. groupID:").concat(o2));
          var l2 = this._getLocalCounters(o2, a2);
          return Eo({ counters: l2 });
        } }, { key: "_getRemoteGroupCounters", value: function(e3) {
          var n2 = this;
          return this._groupModule.request({ protocolName: _a, requestData: t({}, e3) }).then(function(t2) {
            var o2 = t2.data, i2 = o2.counterList, a2 = void 0 === i2 ? [] : i2, s2 = o2.groupCounterSeq;
            return n2._updateLocalGroupCounters({ groupID: e3.groupID, counterList: a2, groupCounterSeq: s2 }), Ye.l("".concat(n2._n, "._getRemoteGroupCounters ok. groupID:").concat(e3.groupID)), a2;
          }).catch(function(e4) {
            return Ro(e4);
          });
        } }, { key: "_convertObjectToList", value: function(e3) {
          var t2 = [];
          return Object.keys(e3).forEach(function(n2) {
            t2.push({ key: n2, value: e3[n2] });
          }), t2;
        } }, { key: "_updateGroupCounters", value: function(e3) {
          var n2 = "".concat(this._n, "._updateGroupCounters"), o2 = e3.groupID, i2 = e3.avChatRoomKey, a2 = e3.mode;
          return Ye.l("".concat(n2, ". groupID:").concat(o2, " avChatRoomKey:").concat(i2, " mode:").concat(a2)), this._groupModule.request({ protocolName: ha, requestData: t({}, e3) }).then(function(e4) {
            Ye.l("".concat(n2, " ok."));
            var t2 = e4.data.counterList, o3 = {};
            return (void 0 === t2 ? [] : t2).forEach(function(e5) {
              var t3 = e5.key, n3 = e5.value;
              o3[t3] = n3;
            }), o3;
          }).catch(function(e4) {
            return Ro(e4);
          });
        } }, { key: "_hasLocalGroupCounters", value: function(e3) {
          return this._groupCountersMap.has(e3);
        } }, { key: "_getLocalGroupCounters", value: function(e3) {
          return this._hasLocalGroupCounters(e3) || this.initGroupCountersCache({ groupID: e3 }), this._groupCountersMap.get(e3);
        } }, { key: "_updateLocalGroupCounters", value: function(e3) {
          var t2 = e3.groupID, n2 = e3.counterList, o2 = void 0 === n2 ? [] : n2, i2 = e3.groupCounterSeq;
          if (this._hasLocalGroupCounters(t2)) {
            var a2 = this._getLocalGroupCounters(t2), s2 = a2.counters, r2 = a2.avChatRoomKey, c2 = a2.groupCounterSeq;
            if (i2 > 0 && i2 < c2)
              return;
            o2.forEach(function(e4) {
              var t3 = e4.key, n3 = e4.value;
              s2.set(t3, n3);
            }), this._groupCountersMap.set(t2, { lastUpdateTime: Date.now(), groupCounterSeq: i2, counters: s2, avChatRoomKey: r2 });
          }
        } }, { key: "_deleteLocalGroupCounters", value: function(e3) {
          var t2 = e3.groupID, n2 = e3.counterList, o2 = void 0 === n2 ? [] : n2, i2 = e3.groupCounterSeq;
          if (this._hasLocalGroupCounters(t2)) {
            var a2 = this._getLocalGroupCounters(t2), s2 = a2.counters, r2 = a2.avChatRoomKey;
            o2.forEach(function(e4) {
              s2.delete(e4.key);
            }), this._groupCountersMap.set(t2, { lastUpdateTime: Date.now(), groupCounterSeq: i2, counters: s2, avChatRoomKey: r2 });
          }
        } }, { key: "_getLocalCounters", value: function(e3, t2) {
          var n2 = {};
          if (!this._hasLocalGroupCounters(e3))
            return n2;
          var o2 = this._getLocalGroupCounters(e3).counters;
          if (t2.length > 0)
            t2.forEach(function(e4) {
              o2.has(e4) && (n2[e4] = o2.get(e4));
            });
          else {
            var i2, a2 = T(o2.keys());
            try {
              for (a2.s(); !(i2 = a2.n()).done; ) {
                var s2 = i2.value;
                n2[s2] = o2.get(s2);
              }
            } catch (r2) {
              a2.e(r2);
            } finally {
              a2.f();
            }
          }
          return n2;
        } }, { key: "reset", value: function() {
          this._groupCountersMap.clear(), this.EXPIRE_TIME = 3e4;
        } }]), e2;
      }(), hr = function() {
        function e2(t2) {
          o(this, e2);
          var n2 = t2.manager, i2 = t2.groupID, a2 = t2.onInit, s2 = t2.onSuccess, r2 = t2.onFail;
          this._n = "Polling", this._manager = n2, this._groupModule = n2._groupModule, this._onInit = a2, this._onSuccess = s2, this._onFail = r2, this._groupID = i2, this._timeoutID = -1, this._isRunning = false, this._protocolName = ta;
        }
        return a(e2, [{ key: "start", value: function() {
          var e3 = this._groupModule.isLoggedIn();
          e3 || (this._protocolName = na), Ye.l("".concat(this._n, ".start pollingInterval:").concat(this._manager.getPollingInterval(), " isLoggedIn:").concat(e3)), this._isRunning = true, this._request();
        } }, { key: "isRunning", value: function() {
          return this._isRunning;
        } }, { key: "_request", value: function() {
          var e3 = this, t2 = this._onInit(this._groupID);
          this._groupModule.request({ protocolName: this._protocolName, requestData: t2 }).then(function(t3) {
            e3._onSuccess(e3._groupID, t3), e3.isRunning() && (clearTimeout(e3._timeoutID), e3._timeoutID = setTimeout(e3._request.bind(e3), e3._manager.getPollingInterval()));
          }).catch(function(t3) {
            e3._onFail(e3._groupID, t3), e3.isRunning() && (clearTimeout(e3._timeoutID), e3._timeoutID = setTimeout(e3._request.bind(e3), e3._manager.MAX_POLLING_INTERVAL));
          });
        } }, { key: "stop", value: function() {
          Ye.l("".concat(this._n, ".stop")), this._timeoutID > 0 && (clearTimeout(this._timeoutID), this._timeoutID = -1), this._isRunning = false;
        } }, { key: "getPollingTimerID", value: function() {
          return this._timeoutID;
        } }]), e2;
      }(), _r = { 3: true, 4: true, 5: true, 6: true, 17: true, 20: true, 21: true }, fr = function() {
        function e2(t2) {
          o(this, e2), this._groupModule = t2, this._n = "AVChatRoomHandler", this._joinedGroupMap = /* @__PURE__ */ new Map(), this._pollingRequestInfoMap = /* @__PURE__ */ new Map(), this._pollingInstanceMap = /* @__PURE__ */ new Map(), this.sequencesLinkedList = new Js(200), this.messageIDLinkedList = new Js(100), this.receivedMessageCount = 0, this._reportMessageStackedCount = 0, this._onlineMemberCountMap = /* @__PURE__ */ new Map(), this.DEFAULT_EXPIRE_TIME = 60, this.DEFAULT_POLLING_INTERVAL = 300, this.MAX_POLLING_INTERVAL = 2e3, this._pollingInterval = this.DEFAULT_POLLING_INTERVAL, this.DEFAULT_POLLING_NO_MESSAGE_COUNT = 20, this.DEFAULT_POLLING_INTERVAL_PLUS = 2e3, this._pollingNoMessageCount = 0, this._startBroadcastSeq = 1, this._broadcastMessageIDMap = /* @__PURE__ */ new Map(), this.DEFAULT_POLLING_SIMPLIFIED_MSG = 0;
        }
        return a(e2, [{ key: "hasJoinedAVChatRoom", value: function() {
          return this._joinedGroupMap.size > 0;
        } }, { key: "checkJoinedAVChatRoomByID", value: function(e3) {
          return this._joinedGroupMap.has(e3);
        } }, { key: "getJoinedAVChatRoom", value: function() {
          return this._joinedGroupMap.size > 0 ? m(this._joinedGroupMap.keys()) : [];
        } }, { key: "_updateRequestData", value: function(e3) {
          var n2 = this._pollingRequestInfoMap.get(e3);
          return e3 === m(this._pollingInstanceMap.keys())[0] ? t(t({}, n2), {}, { startBroadcastSeq: this._startBroadcastSeq, simplifiedMessage: this.DEFAULT_POLLING_SIMPLIFIED_MSG }) : t(t({}, n2), {}, { simplifiedMessage: this.DEFAULT_POLLING_SIMPLIFIED_MSG });
        } }, { key: "_handleSuccess", value: function(e3, t2) {
          var n2 = t2.data, o2 = n2.key, i2 = n2.nextSeq, a2 = n2.rspMsgList, s2 = n2.errorCode, r2 = n2.nextBroadcastSeq, c2 = n2.broadcastMessageList;
          if (0 !== s2) {
            var u2 = this._pollingRequestInfoMap.get(e3), l2 = new Ms("longPollingAVError"), d2 = u2 ? "".concat(u2.key, "-").concat(u2.startSeq) : "requestInfo is undefined";
            l2.setMessage("".concat(e3, "-").concat(d2, "-").concat(t2.errorInfo)).setCode(t2.errorCode).setNetworkType(this._groupModule.getNetworkType()).end(true);
          } else {
            if (!this.checkJoinedAVChatRoomByID(e3))
              return;
            pt(o2) && dt(i2) && this._pollingRequestInfoMap.set(e3, { key: o2, startSeq: i2 }), dt(r2) && r2 > this._startBroadcastSeq && (this._startBroadcastSeq = r2), _t(a2) && a2.length > 0 ? (a2.forEach(function(e4) {
              e4.to = e4.groupID;
            }), this.onMessage(a2)) : (this._pollingNoMessageCount += 1, this._pollingNoMessageCount === this.DEFAULT_POLLING_NO_MESSAGE_COUNT && (this._pollingInterval = this.DEFAULT_POLLING_INTERVAL + this.DEFAULT_POLLING_INTERVAL_PLUS)), this._onBroadcastMessage(c2);
          }
        } }, { key: "_handleFailure", value: function(e3, t2) {
        } }, { key: "onMessage", value: function(e3) {
          if (_t(e3) && 0 !== e3.length) {
            0 !== this._pollingNoMessageCount && (this._pollingNoMessageCount = 0, this._pollingInterval = this.DEFAULT_POLLING_INTERVAL);
            var t2 = null, n2 = [], o2 = this._getModule(to), i2 = this._getModule(fo), a2 = e3.length;
            a2 > 1 && e3.sort(function(e4, t3) {
              return e4.sequence - t3.sequence;
            });
            for (var s2 = this._getModule(no), r2 = 0; r2 < a2; r2++) {
              var c2 = this.restoreMessageFromSimplified(e3[r2]);
              if (_r[c2.event]) {
                if (6 === c2.event) {
                  if (this._groupModule.isGroupAttributesUpdatedNotice(c2))
                    continue;
                  if (this._groupModule.isGroupCountersNotice(c2))
                    continue;
                }
                if (20 !== c2.event)
                  if (21 !== c2.event) {
                    this.receivedMessageCount += 1, t2 = this.packMessage(c2, c2.event);
                    var u2 = 1 === c2.isModified, l2 = 1 === c2.isHistoryMessage;
                    if ((s2.isUnlimitedAVChatRoom() || !this.sequencesLinkedList.has(t2.sequence)) && !this.messageIDLinkedList.has(t2.ID)) {
                      var d2 = t2.conversationID;
                      if (this.receivedMessageCount % 50 == 0 ? this._getModule(po).detectFirstRound(d2, this.sequencesLinkedList.data()) : this.receivedMessageCount % 80 == 0 && this._getModule(po).detectSecondRound(d2, this.sequencesLinkedList.data()), null !== this.sequencesLinkedList.tail()) {
                        var p2 = this.sequencesLinkedList.tail().value, g2 = t2.sequence - p2;
                        g2 > 1 && g2 <= 20 ? this._getModule(po).onMessageMaybeLost(d2, p2 + 1, g2 - 1) : g2 < -1 && g2 >= -20 && this._getModule(po).onMessageMaybeLost(d2, t2.sequence + 1, Math.abs(g2) - 1);
                      }
                      this.sequencesLinkedList.set(t2.sequence), this.messageIDLinkedList.set(t2.ID);
                      var h2 = false;
                      if (this._isMessageSentByCurrentInstance(t2) ? u2 && (h2 = true, t2.isModified = u2, o2.updateMessageIsModifiedProperty(t2)) : h2 = true, h2) {
                        if (t2.conversationType === L.CONV_SYSTEM && 5 === t2.payload.operationType && this._onGroupDismissed(t2.payload.groupProfile.groupID), !l2 && t2.conversationType !== L.CONV_SYSTEM) {
                          var _2 = t2.conversationID.replace(L.CONV_GROUP, "");
                          this._pollingInstanceMap.has(_2) ? this._groupModule.isLoggedIn() && i2.addMessageSequence({ key: hs, message: t2 }) : (t2.type !== L.MSG_GRP_TIP && t2.clientTime > 0 && i2.addMessageDelay(t2.clientTime), i2.addMessageSequence({ key: gs, message: t2 }));
                        }
                        n2.push(t2);
                      }
                    }
                  } else {
                    this._getModule(To).onMessageReactionNotify({ event: 21, dataList: c2.elements.messageReactionNotifyList });
                  }
                else
                  this.handleMessageRevokedNotice(c2);
              } else
                Ye.w("".concat(this._n, ".onMessage unknown event:").concat(c2.event));
            }
            if (0 !== n2.length) {
              this._groupModule.filterModifiedMessage(n2);
              var f2 = this.packConversationOption(n2);
              f2.length > 0 && o2.onNewMessage({ conversationOptionsList: f2, isInstantMessage: true }), Ye.d("".concat(this._n, ".onMessage count:").concat(n2.length)), this._checkMessageStacked(n2);
              var v2 = this._groupModule.filterUnmodifiedMessage(n2);
              v2.length > 0 && this._groupModule.emitOuterEvent(k.MESSAGE_RECEIVED, v2), n2.length = 0;
            }
          }
        } }, { key: "handleMessageRevokedNotice", value: function(e3) {
          var t2 = e3.groupID, n2 = e3.elements.revokeMsgList, o2 = e3.revokerInfo, i2 = [];
          (n2.forEach(function(e4) {
            var n3 = e4.tinyID, a2 = e4.clientTime, s2 = e4.random, r2 = { conversationID: "".concat(L.CONV_GROUP).concat(t2), ID: "".concat(n3, "-").concat(a2, "-").concat(s2), revoker: o2.revoker, revokeReason: o2.reason || "" };
            i2.push(r2);
          }), 0 !== i2.length) && this._getModule(to).emitMessageRevokedEvent(i2);
        } }, { key: "isBroadcastOrNormal", value: function(e3) {
          return 3 === e3 || 17 === e3;
        } }, { key: "isGroupTip", value: function(e3) {
          return 4 === e3 || 6 === e3;
        } }, { key: "isGroupSystemNotice", value: function(e3) {
          return 5 === e3;
        } }, { key: "restoreGroupTipElements", value: function() {
          var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = e3.operatorInfo, n2 = void 0 === t2 ? {} : t2, o2 = e3.operatorID, i2 = e3.userIDList, a2 = void 0 === i2 ? [] : i2, s2 = e3.operationType;
          dt(e3.groupJoinType) || 1 !== s2 && 2 !== s2 || (e3.groupJoinType = 2 === s2 ? 0 : 1);
          var r2 = n2.userID, c2 = void 0 === r2 ? o2 : r2, u2 = n2.avatar, l2 = void 0 === u2 ? "" : u2, d2 = n2.nick, p2 = void 0 === d2 ? "" : d2;
          e3.operatorInfo = { userID: c2, avatar: l2, nick: p2 };
          var g2 = a2.map(function(e4) {
            return { userID: e4 };
          });
          return e3.memberInfoList = e3.memberInfoList || g2, e3;
        } }, { key: "restoreMessageFromSimplified", value: function(e3) {
          var n2 = e3.event;
          if (this.isBroadcastOrNormal(n2) && (e3.cloudCustomData = e3.cloudCustomData || "", e3.elements = e3.elements.map(function(e4) {
            if (e4.type === L.MSG_CUSTOM) {
              var n3 = e4.content, o3 = void 0 === n3 ? {} : n3;
              e4.content = t({ data: "", description: "", extension: "" }, o3);
            }
            return e4;
          })), (this.isGroupTip(n2) || this.isGroupSystemNotice(n2)) && (e3.from = e3.from || "@TIM#SYSTEM"), this.isGroupTip(n2)) {
            e3.elements = this.restoreGroupTipElements(e3.elements);
            var o2 = e3.elements, i2 = void 0 === o2 ? {} : o2, a2 = i2.operationType, r2 = i2.operatorInfo;
            if (1 === a2) {
              var c2 = [{ userID: (void 0 === r2 ? {} : r2).userID }];
              i2.memberInfoList = i2.memberInfoList || c2;
            }
          }
          if (this.isGroupSystemNotice(n2)) {
            var u2 = e3.elements, l2 = u2.memberInfoList, d2 = u2.operatorInfo;
            l2 || (l2 = void 0 === d2 ? {} : d2), e3.elements.memberInfoList = t({ userID: e3.elements.operatorID, avatar: "", nick: "" }, l2), e3.elements = t({ authentication: "", remarkInfo: "", messageKey: 1e3 * e3.time }, e3.elements);
            var p2 = Object.keys(e3.elements).filter(function(e4) {
              return "operatorInfo" !== e4;
            }).reduce(function(n3, o3) {
              return t(t({}, n3), {}, s({}, o3, e3.elements[o3]));
            }, {});
            e3.elements = p2;
          }
          return e3;
        } }, { key: "_onGroupDismissed", value: function(e3) {
          Ye.l("".concat(this._n, "._onGroupDismissed groupID:").concat(e3)), this._groupModule.deleteLocalGroupAndConversation(e3), this.reset(e3);
        } }, { key: "_checkMessageStacked", value: function(e3) {
          var t2 = "MessageStacked", n2 = e3.length;
          n2 >= 100 && (this._groupModule.outputWarning(t2, n2), this._reportMessageStackedCount < 5 && (new Ms(t2).setNetworkType(this._groupModule.getNetworkType()).setMessage("count:".concat(n2, " groupID:").concat(m(this._joinedGroupMap.keys()))).setLevel("warning").end(), this._reportMessageStackedCount += 1));
        } }, { key: "_isMessageSentByCurrentInstance", value: function(e3) {
          return !!this._getModule(to).isMessageSentByCurrentInstance(e3);
        } }, { key: "packMessage", value: function(e3, t2) {
          e3.currentUser = this._groupModule.getMyUserID(), e3.conversationType = 5 === t2 ? L.CONV_SYSTEM : L.CONV_GROUP, e3.isSystemMessage = !!e3.isSystemMessage;
          var n2 = new Ps(e3), o2 = this.packElements(e3, t2);
          return n2.setElement(o2, this._groupModule.getFileDownloadProxy()), n2;
        } }, { key: "packElements", value: function(e3, n2) {
          return 4 === n2 || 6 === n2 ? (this._updateMemberCountByGroupTips(e3), { type: L.MSG_GRP_TIP, content: t(t({}, e3.elements), {}, { groupProfile: e3.groupProfile }) }) : 5 === n2 ? { type: L.MSG_GRP_SYS_NOTICE, content: t(t({}, e3.elements), {}, { groupProfile: t(t({}, e3.groupProfile), {}, { groupID: e3.groupID }) }) } : e3.elements;
        } }, { key: "packConversationOption", value: function(e3) {
          for (var t2 = /* @__PURE__ */ new Map(), n2 = 0; n2 < e3.length; n2++) {
            var o2 = e3[n2], i2 = o2.conversationID;
            if (t2.has(i2)) {
              var a2 = t2.get(i2);
              a2.lastMessage = o2, "in" === o2.flow && a2.unreadCount++;
            } else
              t2.set(i2, { conversationID: o2.conversationID, unreadCount: "out" === o2.flow ? 0 : 1, type: o2.conversationType, subType: o2.conversationSubType, lastMessage: o2 });
          }
          return m(t2.values());
        } }, { key: "_updateMemberCountByGroupTips", value: function(e3) {
          var t2 = e3.groupProfile.groupID, n2 = e3.elements.onlineMemberInfo, o2 = void 0 === n2 ? void 0 : n2;
          if (!un(o2)) {
            var i2 = o2.onlineMemberNum, a2 = void 0 === i2 ? 0 : i2, s2 = o2.expireTime, r2 = void 0 === s2 ? this.DEFAULT_EXPIRE_TIME : s2, c2 = this._onlineMemberCountMap.get(t2) || {}, u2 = Date.now();
            un(c2) ? Object.assign(c2, { lastReqTime: 0, lastSyncTime: 0, latestUpdateTime: u2, memberCount: a2, expireTime: r2 }) : (c2.latestUpdateTime = u2, c2.memberCount = a2), Ye.d("".concat(this._n, "._updateMemberCountByGroupTips info:"), c2), this._onlineMemberCountMap.set(t2, c2);
          }
        } }, { key: "_onBroadcastMessage", value: function(e3) {
          if (!un(e3)) {
            for (var t2 = [], n2 = e3.length, o2 = null, i2 = 0; i2 < n2; i2++) {
              var a2 = this.restoreMessageFromSimplified(e3[i2]);
              _r[a2.event] ? ((o2 = this.packMessage(a2, a2.event)).isBroadcastMessage = true, this._broadcastMessageIDMap.has(o2.ID) || (t2.push(o2), this._broadcastMessageIDMap.set(o2.ID, 1))) : Ye.w("".concat(this._n, "._onBroadcastMessage unknown event:").concat(a2.event));
            }
            t2.length > 0 && this._groupModule.emitOuterEvent(k.MESSAGE_RECEIVED, t2);
          }
        } }, { key: "start", value: function(e3) {
          if (this._pollingInstanceMap.has(e3)) {
            var t2 = this._pollingInstanceMap.get(e3);
            t2.isRunning() || t2.start();
          } else {
            var n2 = new hr({ manager: this, groupID: e3, onInit: this._updateRequestData.bind(this), onSuccess: this._handleSuccess.bind(this), onFail: this._handleFailure.bind(this) });
            n2.start(), this._pollingInstanceMap.set(e3, n2), Ye.l("".concat(this._n, ".start groupID:").concat(e3));
          }
        } }, { key: "handleJoinResult", value: function(e3) {
          var t2 = this;
          return this._preCheck().then(function() {
            var n2 = e3.longPollingKey, o2 = e3.group, i2 = o2.groupID;
            return t2._joinedGroupMap.set(i2, o2), t2._groupModule.updateGroupMap([o2]), t2._groupModule.deleteUnjoinedAVChatRoom(i2), t2._groupModule.emitGroupListUpdate(true, false), ft(n2) ? Eo({ status: it, group: o2 }) : Promise.resolve();
          });
        } }, { key: "startRunLoop", value: function(e3) {
          var t2 = this;
          return this.handleJoinResult(e3).then(function() {
            var n2 = e3.longPollingKey, o2 = e3.group, i2 = e3.startSeq, a2 = void 0 === i2 ? 0 : i2, s2 = o2.groupID;
            return t2._pollingRequestInfoMap.set(s2, { key: n2, startSeq: a2 }), t2.start(s2), t2._groupModule.isLoggedIn() ? Eo({ status: it, group: o2 }) : Eo({ status: it });
          });
        } }, { key: "_preCheck", value: function() {
          if (this._getModule(no).isUnlimitedAVChatRoom())
            return Promise.resolve();
          if (!this.hasJoinedAVChatRoom())
            return Promise.resolve();
          var e3 = v(this._joinedGroupMap.entries().next().value, 2), t2 = e3[0], n2 = e3[1];
          if (this._groupModule.isLoggedIn()) {
            if (!(n2.selfInfo.role === L.GRP_MBR_ROLE_OWNER || n2.ownerID === this._groupModule.getMyUserID()))
              return this._groupModule.quitGroup(t2);
            this._groupModule.deleteLocalGroupAndConversation(t2);
          } else
            this._groupModule.deleteLocalGroupAndConversation(t2);
          return this.reset(t2), Promise.resolve();
        } }, { key: "joinWithoutAuth", value: function(e3) {
          var t2 = this, n2 = e3.groupID, o2 = "".concat(this._n, ".").concat("joinWithoutAuth"), i2 = new Ms("joinWithoutAuth");
          return this._groupModule.request({ protocolName: Fi, requestData: e3 }).then(function(e4) {
            var a2 = e4.data.longPollingKey;
            if (t2._groupModule.probeNetwork().then(function(e5) {
              var t3 = v(e5, 2);
              t3[0];
              var o3 = t3[1];
              i2.setNetworkType(o3).setMessage("groupID:".concat(n2, " longPollingKey:").concat(a2)).end(true);
            }), ft(a2))
              return Ro({ code: No.CANNOT_JOIN_NON_AVCHATROOM_WITHOUT_LOGIN });
            Ye.l("".concat(o2, " ok. groupID:").concat(n2)), t2._getModule(to).setCompleted("".concat(L.CONV_GROUP).concat(n2));
            var s2 = new Xs({ groupID: n2 });
            return t2.startRunLoop({ group: s2, longPollingKey: a2 }), ko({ status: it });
          }).catch(function(e4) {
            return Ye.e("".concat(o2, " failed. groupID:").concat(n2, " error:"), e4), t2._groupModule.probeNetwork().then(function(t3) {
              var o3 = v(t3, 2), a2 = o3[0], s2 = o3[1];
              i2.setError(e4, a2, s2).setMessage("groupID:".concat(n2)).end(true);
            }), Ro(e4);
          }).finally(function() {
            t2._groupModule.getModule(io).reportAtOnce();
          });
        } }, { key: "getGroupOnlineMemberCount", value: function(e3) {
          var t2 = this._onlineMemberCountMap.get(e3) || {}, n2 = Date.now();
          return un(t2) || n2 - t2.lastSyncTime > 1e3 * t2.expireTime && n2 - t2.latestUpdateTime > 1e4 && n2 - t2.lastReqTime > 3e3 ? (t2.lastReqTime = n2, this._onlineMemberCountMap.set(e3, t2), this._getGroupOnlineMemberCount(e3).then(function(e4) {
            return ko({ memberCount: e4.memberCount });
          }).catch(function(e4) {
            return Ro(e4);
          })) : Eo({ memberCount: t2.memberCount });
        } }, { key: "_getGroupOnlineMemberCount", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("_getGroupOnlineMemberCount");
          return this._groupModule.requestOnlineCount(e3).then(function(o2) {
            var i2 = t2._onlineMemberCountMap.get(e3) || {}, a2 = o2.data, s2 = a2.memberCount, r2 = void 0 === s2 ? 0 : s2, c2 = a2.expireTime, u2 = void 0 === c2 ? t2.DEFAULT_EXPIRE_TIME : c2;
            Ye.l("".concat(n2, " ok. groupID:").concat(e3, " memberCount:").concat(r2, " expireTime:").concat(u2));
            var l2 = Date.now();
            return un(i2) && (i2.lastReqTime = l2), t2._onlineMemberCountMap.set(e3, Object.assign(i2, { lastSyncTime: l2, latestUpdateTime: l2, memberCount: r2, expireTime: u2 })), { memberCount: r2 };
          }).catch(function(o2) {
            return Ye.w("".concat(n2, " failed. error:"), o2), new Ms("_getGroupOnlineMemberCount").setCode(o2.code).setMessage("groupID:".concat(e3, " error:").concat(JSON.stringify(o2))).setNetworkType(t2._groupModule.getNetworkType()).end(), Promise.reject(o2);
          });
        } }, { key: "_getModule", value: function(e3) {
          return this._groupModule.getModule(e3);
        } }, { key: "setPollingInterval", value: function(e3) {
          ft(e3) || (dt(e3) ? this._pollingInterval = this.DEFAULT_POLLING_INTERVAL = e3 : this._pollingInterval = this.DEFAULT_POLLING_INTERVAL = parseInt(e3, 10));
        } }, { key: "setPollingIntervalPlus", value: function(e3) {
          ft(e3) || (dt(e3) ? this.DEFAULT_POLLING_INTERVAL_PLUS = e3 : this.DEFAULT_POLLING_INTERVAL_PLUS = parseInt(e3, 10));
        } }, { key: "setPollingNoMessageCount", value: function(e3) {
          ft(e3) || (dt(e3) ? this.DEFAULT_POLLING_NO_MESSAGE_COUNT = e3 : this.DEFAULT_POLLING_NO_MESSAGE_COUNT = parseInt(e3, 10));
        } }, { key: "setPollingSimplifiedMessage", value: function(e3) {
          ft(e3) || "0" !== e3 && "1" !== e3 || (this.DEFAULT_POLLING_SIMPLIFIED_MSG = parseInt(e3, 10));
        } }, { key: "getPollingInterval", value: function() {
          return this._pollingInterval;
        } }, { key: "onAVChatRoomMemberBanned", value: function(e3) {
          var t2 = e3.payload.groupProfile.groupID;
          Ye.l("".concat(this._n, ".onAVChatRoomMemberBanned groupID:").concat(t2)), this._groupModule.deleteLocalGroupAndConversation(t2), this.reset(t2);
        } }, { key: "restartPolling", value: function() {
          Ye.l("".concat(this._n, ".restartPolling count:").concat(this._pollingInstanceMap.size));
          var e3, t2 = T(this._pollingInstanceMap.values());
          try {
            for (t2.s(); !(e3 = t2.n()).done; ) {
              var n2 = e3.value;
              n2.stop(), n2.start();
            }
          } catch (o2) {
            t2.e(o2);
          } finally {
            t2.f();
          }
        } }, { key: "getPollingTimerID", value: function(e3) {
          if (!this._pollingInstanceMap.has(e3))
            return -1;
          var t2 = this._pollingInstanceMap.get(e3).getPollingTimerID();
          return Ye.l("".concat(this._n, ".getPollingTimerID groupID:").concat(e3, " timerID:").concat(t2)), t2;
        } }, { key: "reset", value: function(e3) {
          if (e3) {
            Ye.l("".concat(this._n, ".reset groupID:").concat(e3));
            var t2 = this._pollingInstanceMap.get(e3);
            t2 && t2.stop(), this._pollingInstanceMap.delete(e3), this._joinedGroupMap.delete(e3), this._pollingRequestInfoMap.delete(e3), this._onlineMemberCountMap.delete(e3);
          } else {
            Ye.l("".concat(this._n, ".reset all"));
            var n2, o2 = T(this._pollingInstanceMap.values());
            try {
              for (o2.s(); !(n2 = o2.n()).done; ) {
                n2.value.stop();
              }
            } catch (i2) {
              o2.e(i2);
            } finally {
              o2.f();
            }
            this._pollingInstanceMap.clear(), this._joinedGroupMap.clear(), this._pollingRequestInfoMap.clear(), this._onlineMemberCountMap.clear(), this._broadcastMessageIDMap.clear();
          }
          this.sequencesLinkedList.reset(), this.messageIDLinkedList.reset(), this.receivedMessageCount = 0, this._reportMessageStackedCount = 0, this._pollingInterval = this.DEFAULT_POLLING_INTERVAL = 300, this.DEFAULT_POLLING_NO_MESSAGE_COUNT = 20, this.DEFAULT_POLLING_INTERVAL_PLUS = 2e3, this._pollingNoMessageCount = 0;
        } }]), e2;
      }(), vr = function() {
        function e2(t2) {
          o(this, e2), this.userID = "", this.avatar = "", this.nick = "", this.role = "", this.joinTime = "", this.lastSendMsgTime = "", this.nameCard = "", this.muteUntil = 0, this.memberCustomField = [], this.isOnline = "Online" === t2.onlineStatus, this._initMember(t2);
        }
        return a(e2, [{ key: "_initMember", value: function(e3) {
          this.updateMember(e3);
        } }, { key: "updateMember", value: function(e3) {
          var t2 = [null, void 0, "", 0, NaN];
          e3.memberCustomField && Gt(this.memberCustomField, e3.memberCustomField), Dt(this, e3, ["memberCustomField", "marks", "onlineStatus"], t2);
        } }, { key: "updateRole", value: function(e3) {
          ["Owner", "Admin", "Member"].indexOf(e3) < 0 || (this.role = e3);
        } }, { key: "updateMuteUntil", value: function(e3) {
          ft(e3) || (this.muteUntil = Math.floor((Date.now() + 1e3 * e3) / 1e3));
        } }, { key: "updateNameCard", value: function(e3) {
          ft(e3) || (this.nameCard = e3);
        } }, { key: "updateMemberCustomField", value: function(e3) {
          e3 && Gt(this.memberCustomField, e3);
        } }]), e2;
      }(), mr = function() {
        function e2(t2) {
          o(this, e2), this._groupModule = t2, this._n = "GroupMemberHandler", this.groupMemberListMap = /* @__PURE__ */ new Map(), this.DEFAULT_MEMBER_INFO_FILTER = ["Role", "JoinTime", "NameCard", "ShutUpUntil", "OnlineStatus"], this._groupModule.getInnerEmitterInstance().on(Fs.PROFILE_UPDATED, this._onProfileUpdated, this);
        }
        return a(e2, [{ key: "_onProfileUpdated", value: function(e3) {
          for (var t2 = this, n2 = e3.data, o2 = function(e4) {
            var o3 = n2[e4];
            t2.groupMemberListMap.forEach(function(e5) {
              e5.has(o3.userID) && e5.get(o3.userID).updateMember({ nick: o3.nick, avatar: o3.avatar });
            });
          }, i2 = 0; i2 < n2.length; i2++)
            o2(i2);
        } }, { key: "deleteGroupMemberList", value: function(e3) {
          this.groupMemberListMap.delete(e3);
        } }, { key: "getGroupMemberList", value: function(e3) {
          var t2, n2 = this, o2 = e3.groupID, i2 = e3.role, a2 = void 0 === i2 ? void 0 : i2, s2 = e3.offset, r2 = void 0 === s2 ? 0 : s2, c2 = e3.count, u2 = void 0 === c2 ? 15 : c2, l2 = e3.filter, d2 = void 0 === l2 ? void 0 : l2, p2 = "".concat(this._n, ".").concat("getGroupMemberList"), g2 = this._groupModule.hasLocalGroup(o2);
          if (Ye.l("".concat(p2, " groupID:").concat(o2, " role:").concat(a2, " offset:").concat(r2, " count:").concat(u2, " hasLocalGroup:").concat(g2)), !g2)
            return Eo({ memberList: [], offset: 0 });
          if (this._groupModule.getLocalGroupProfile(o2).type === L.GRP_AVCHATROOM) {
            if (this._groupModule.canIUse(B.AVCHATROOM_MBR_LIST))
              return this._getAVChatRoomMemberList({ groupID: o2, offset: r2, filter: d2 });
            this._groupModule.outputWarning("LiveOnlineMember");
          }
          a2 !== L.GRP_MBR_ROLE_ADMIN && a2 !== L.GRP_MBR_ROLE_OWNER && a2 !== L.GRP_MBR_ROLE_MEMBER || (t2 = a2);
          var h2 = new Ms("getGroupMemberList"), _2 = 0, f2 = { groupID: o2, limit: u2 > 100 ? 100 : u2, memberRoleFilter: t2 ? [t2] : void 0, memberInfoFilter: this.DEFAULT_MEMBER_INFO_FILTER };
          Pt({ groupID: o2 }) ? f2.next = "".concat(r2) : (f2.offset = r2, _2 = r2 + u2);
          var m2 = [];
          return this._groupModule.request({ protocolName: ya, requestData: f2 }).then(function(e4) {
            var t3 = e4.data, i3 = t3.members, a3 = t3.memberNum, s3 = t3.next, r3 = void 0 === s3 ? void 0 : s3;
            return ft(r3) || (_2 = un(r3) ? 0 : r3), _t(i3) && 0 !== i3.length ? (n2._groupModule.hasLocalGroup(o2) && (n2._groupModule.getLocalGroupProfile(o2).memberNum = a3), m2 = n2._updateLocalGroupMemberMap(o2, i3), n2._groupModule.getModule(Xn).getUserProfile({ userIDList: i3.map(function(e5) {
              return e5.userID;
            }), tagList: [Je.NICK, Je.AVATAR] })) : (_2 = 0, Promise.resolve([]));
          }).then(function(e4) {
            var t3 = e4.data;
            if (!_t(t3) || 0 === t3.length)
              return Eo({ memberList: [], offset: _2 });
            var i3 = t3.map(function(e5) {
              return { userID: e5.userID, nick: e5.nick, avatar: e5.avatar };
            });
            return n2._updateLocalGroupMemberMap(o2, i3), m2.length < u2 && (_2 = 0), h2.setNetworkType(n2._groupModule.getNetworkType()).setMessage("groupID:".concat(o2, " offset:").concat(r2, " count:").concat(u2)).end(), Ye.l("".concat(p2, " ok.")), ko({ memberList: m2, offset: _2 });
          }).catch(function(e4) {
            return n2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              h2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(p2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_getAVChatRoomMemberList", value: function(e3) {
          var t2 = this, n2 = e3.groupID, o2 = e3.offset, i2 = e3.filter, a2 = "".concat(this._n, ".").concat("_getAVChatRoomMemberList"), s2 = new Ms("_getAVChatRoomMemberList");
          return s2.setMessage("groupID:".concat(n2, " offset:").concat(o2, " filter:").concat(i2)), this._groupModule.request({ protocolName: Ia, requestData: { groupID: n2, offset: o2, filter: i2 } }).then(function(e4) {
            var o3 = e4.data, i3 = o3.memberList, r2 = void 0 === i3 ? [] : i3, c2 = o3.offset, u2 = void 0 === c2 ? 0 : c2;
            s2.setNetworkType(t2._groupModule.getNetworkType()).end(), Ye.l("".concat(a2, " ok. member count:").concat(r2.length, ", next request timestamp:").concat(u2));
            var l2 = t2._updateLocalGroupMemberMap(n2, r2);
            return ko({ memberList: l2, offset: u2 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              s2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(a2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getGroupMemberProfile", value: function(e3) {
          var n2 = this, o2 = "getGroupMemberProfile", i2 = "".concat(this._n, ".").concat(o2), a2 = "groupID:".concat(e3.groupID);
          e3.userIDList.length > 5 ? a2 += " userIDList.length:".concat(e3.userIDList.length) : a2 += " userIDList:".concat(e3.userIDList), Ye.l("".concat(i2, " ").concat(a2)), e3.userIDList.length > 50 && (e3.userIDList = e3.userIDList.slice(0, 50));
          var s2 = e3.groupID, r2 = e3.userIDList, c2 = this._groupModule.getLocalGroupProfile(s2);
          if (c2 && Ut(c2.type)) {
            var u2 = No.OPERATION_NOT_SUPPORTED_IN_AVCHATROOM;
            return Ro({ code: u2, message: this._groupModule.getErrorMessage(u2, o2) });
          }
          var l2 = new Ms(o2);
          return l2.setMessage(a2), this._getGroupMemberProfileAdvance(t(t({}, e3), {}, { userIDList: r2 })).then(function(e4) {
            var t2 = e4.data.members;
            return _t(t2) && 0 !== t2.length ? (n2._updateLocalGroupMemberMap(s2, t2), n2._groupModule.getModule(Xn).getUserProfile({ userIDList: t2.map(function(e5) {
              return e5.userID;
            }), tagList: [Je.NICK, Je.AVATAR] })) : Eo([]);
          }).then(function(e4) {
            var t2 = e4.data.map(function(e5) {
              return { userID: e5.userID, nick: e5.nick, avatar: e5.avatar };
            });
            n2._updateLocalGroupMemberMap(s2, t2);
            var o3 = r2.filter(function(e5) {
              return n2.hasLocalGroupMember(s2, e5);
            }).map(function(e5) {
              return n2.getLocalGroupMemberInfo(s2, e5);
            });
            return l2.setNetworkType(n2._groupModule.getNetworkType()).end(), ko({ memberList: o3 });
          });
        } }, { key: "addGroupMember", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("addGroupMember"), o2 = e3.groupID, i2 = this._groupModule.getLocalGroupProfile(o2), a2 = i2.type, s2 = new Ms("addGroupMember");
          if (s2.setMessage("groupID:".concat(o2, " groupType:").concat(a2)), Ut(a2)) {
            var r2 = new Lo({ code: No.CANNOT_ADD_MEMBER_IN_AVCHATROOM });
            return s2.setError(r2, true, this._groupModule.getNetworkType()).end(), Ro(r2);
          }
          return e3.userIDList = e3.userIDList.map(function(e4) {
            return { userID: e4 };
          }), Ye.l("".concat(n2, " groupID:").concat(o2)), this._groupModule.request({ protocolName: Da, requestData: e3 }).then(function(o3) {
            var a3 = o3.data.members;
            Ye.l("".concat(n2, " ok"));
            var r3 = a3.filter(function(e4) {
              return 1 === e4.result;
            }).map(function(e4) {
              return e4.userID;
            }), c2 = a3.filter(function(e4) {
              return 0 === e4.result;
            }).map(function(e4) {
              return e4.userID;
            }), u2 = a3.filter(function(e4) {
              return 2 === e4.result;
            }).map(function(e4) {
              return e4.userID;
            }), l2 = a3.filter(function(e4) {
              return 4 === e4.result;
            }).map(function(e4) {
              return e4.userID;
            }), d2 = "groupID:".concat(e3.groupID, ", ") + "successUserIDList:".concat(r3, ", ") + "failureUserIDList:".concat(c2, ", ") + "existedUserIDList:".concat(u2, ", ") + "overLimitUserIDList:".concat(l2);
            return s2.setNetworkType(t2._groupModule.getNetworkType()).setMoreMessage(d2).end(), 0 === r3.length ? ko({ successUserIDList: r3, failureUserIDList: c2, existedUserIDList: u2, overLimitUserIDList: l2 }) : (i2.memberCount += r3.length, t2._updateConversationGroupProfile(i2), ko({ successUserIDList: r3, failureUserIDList: c2, existedUserIDList: u2, overLimitUserIDList: l2, group: i2 }));
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              s2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "deleteGroupMember", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("deleteGroupMember"), o2 = e3.groupID, i2 = e3.userIDList, a2 = this._groupModule.getLocalGroupProfile(o2);
          if (ft(a2))
            return Ro({ code: No.CANNOT_FIND_GRP });
          if (Ut(a2.type))
            return this._groupModule.canIUse(B.AVCHATROOM_BAN_MBR) ? this._banAVChatRoomMember(e3) : this._groupModule.cannotUseCommercialAbility("deleteGroupMember");
          var s2 = "groupID:".concat(o2, " ").concat(i2.length > 5 ? "userIDList.length:".concat(i2.length) : "userIDList:".concat(i2));
          Ye.l("".concat(n2, " groupID:").concat(o2, " userIDList:"), i2);
          var r2 = new Ms("deleteGroupMember");
          return r2.setMessage(s2), this._groupModule.request({ protocolName: Ta, requestData: e3 }).then(function() {
            return r2.setNetworkType(t2._groupModule.getNetworkType()).end(), Ye.l("".concat(n2, " ok")), a2.memberCount -= 1, t2._updateConversationGroupProfile(a2), t2.deleteLocalGroupMembers(o2, i2), ko({ group: a2, userIDList: i2 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              r2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_updateConversationGroupProfile", value: function(e3) {
          this._groupModule.getModule(to).updateConversationGroupProfile([e3]);
        } }, { key: "_banAVChatRoomMember", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("_banAVChatRoomMember"), o2 = e3.groupID, i2 = e3.userIDList, a2 = "groupID:".concat(o2, " ").concat(i2.length > 5 ? "userIDList.length:".concat(i2.length) : "userIDList:".concat(i2)), s2 = new Ms("_banAVChatRoomMember");
          s2.setMessage(a2), Ye.l("".concat(n2, " groupID:").concat(o2, " userIDList:"), i2);
          var r2 = this._groupModule.getLocalGroupProfile(o2);
          return ft(e3.duration) || 0 === e3.duration ? Ro({ code: No.BAN_DURATION_INVALID }) : this._groupModule.request({ protocolName: ka, requestData: e3 }).then(function() {
            return s2.setNetworkType(t2._groupModule.getNetworkType()).end(), Ye.l("".concat(n2, " ok")), t2.deleteLocalGroupMembers(o2, i2), ko({ group: r2, userIDList: i2 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              s2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "setGroupMemberMuteTime", value: function(e3) {
          var t2 = this, n2 = e3.groupID, o2 = e3.userID, i2 = e3.muteTime, a2 = "".concat(this._n, ".").concat("setGroupMemberMuteTime");
          if (o2 === this._groupModule.getMyUserID())
            return Ro({ code: No.CANNOT_MUTE_SELF });
          var s2 = "groupID:".concat(n2, " userID:").concat(o2, " muteTime:").concat(i2);
          Ye.l("".concat(a2, " ").concat(s2));
          var r2 = new Ms("setGroupMemberMuteTime");
          return r2.setMessage(s2), this.modifyGroupMemberInfo({ groupID: n2, userID: o2, muteTime: i2 }).then(function(e4) {
            r2.setNetworkType(t2._groupModule.getNetworkType()).end(), Ye.l("".concat(a2, " ok"));
            var o3 = t2._groupModule.getLocalGroupProfile(n2);
            return ko({ group: o3, member: e4 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              r2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(a2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "setGroupMemberRole", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("setGroupMemberRole"), o2 = e3.groupID, i2 = e3.userID, a2 = e3.role, s2 = "groupID:".concat(o2, " userID:").concat(i2, " role:").concat(a2), r2 = this._groupModule.getLocalGroupProfile(o2);
          if (!r2 || r2.type === L.GRP_WORK || r2.type === L.GRP_AVCHATROOM)
            return Ro({ code: No.CANNOT_SET_MEMBER_ROLE_IN_WORK_AND_AVCHATROOM });
          if (r2 && r2.selfInfo.role !== L.GRP_MBR_ROLE_OWNER)
            return Ro({ code: No.NOT_OWNER });
          var c2 = [L.GRP_MBR_ROLE_ADMIN, L.GRP_MBR_ROLE_MEMBER];
          if (Pt({ groupID: o2 }) && c2.push(L.GRP_MBR_ROLE_CUSTOM), c2.indexOf(a2) < 0)
            return Ro({ code: No.INVALID_MEMBER_ROLE });
          if (i2 === this._groupModule.getMyUserID())
            return Ro({ code: No.CANNOT_SET_SELF_MEMBER_ROLE });
          var u2 = new Ms("setGroupMemberRole");
          return u2.setMessage(s2), Ye.l("".concat(n2, " ").concat(s2)), this.modifyGroupMemberInfo({ groupID: o2, userID: i2, role: a2 }).then(function(e4) {
            return u2.setNetworkType(t2._groupModule.getNetworkType()).end(), Ye.l("".concat(n2, " ok")), ko({ group: r2, member: e4 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              u2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_filterProfanity", value: function(e3, t2) {
          var n2 = this._groupModule.getModule(Mo);
          if (!n2)
            return true;
          var o2 = n2.filterText(t2[e3], Q), i2 = o2.isAllowedToSend, a2 = o2.modifiedText;
          return true === i2 && (t2[e3] = a2, true);
        } }, { key: "setGroupMemberNameCard", value: function(e3) {
          var t2 = this, n2 = "setGroupMemberNameCard", o2 = "".concat(this._n, ".").concat(n2);
          if (e3.nameCard && false === this._filterProfanity("nameCard", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          var i2 = e3.groupID, a2 = e3.userID, s2 = void 0 === a2 ? this._groupModule.getMyUserID() : a2, r2 = e3.nameCard, c2 = "groupID:".concat(i2, " userID:").concat(s2, " nameCard:").concat(r2);
          Ye.l("".concat(o2, " ").concat(c2));
          var u2 = this._groupModule.getLocalGroupProfile(i2);
          if (u2 && Ut(u2.type)) {
            var l2 = No.OPERATION_NOT_SUPPORTED_IN_AVCHATROOM;
            return Ro({ code: l2, message: this._groupModule.getErrorMessage(l2, n2) });
          }
          var d2 = new Ms(n2);
          return d2.setMessage(c2), this.modifyGroupMemberInfo({ groupID: i2, userID: s2, nameCard: r2 }).then(function(e4) {
            Ye.l("".concat(o2, " ok")), d2.setNetworkType(t2._groupModule.getNetworkType()).end();
            var n3 = t2._groupModule.getLocalGroupProfile(i2);
            return s2 === t2._groupModule.getMyUserID() && n3 && n3.setSelfNameCard(r2), ko({ group: n3, member: e4 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              d2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "setGroupMemberCustomField", value: function(e3) {
          var t2 = this, n2 = "setGroupMemberCustomField", o2 = "".concat(this._n, ".").concat(n2), i2 = e3.groupID, a2 = e3.userID, s2 = void 0 === a2 ? this._groupModule.getMyUserID() : a2, r2 = e3.memberCustomField, c2 = "groupID:".concat(i2, " userID:").concat(s2, " memberCustomField:").concat(JSON.stringify(r2));
          Ye.l("".concat(o2, " ").concat(c2));
          var u2 = this._groupModule.getLocalGroupProfile(i2);
          if (u2 && Ut(u2.type)) {
            var l2 = No.OPERATION_NOT_SUPPORTED_IN_AVCHATROOM;
            return Ro({ code: l2, message: this._groupModule.getErrorMessage(l2, n2) });
          }
          var d2 = new Ms(n2);
          return d2.setMessage(c2), this.modifyGroupMemberInfo({ groupID: i2, userID: s2, memberCustomField: r2 }).then(function(e4) {
            d2.setNetworkType(t2._groupModule.getNetworkType()).end(), Ye.l("".concat(o2, " ok"));
            var n3 = t2._groupModule.getLocalGroupProfile(i2);
            return ko({ group: n3, member: e4 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              d2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "modifyGroupMemberInfo", value: function(e3) {
          var n2 = this, o2 = e3.groupID, i2 = e3.userID, a2 = void 0;
          return bt(o2) && (o2 = Qt(a2 = o2)), this._groupModule.request({ protocolName: La, requestData: t(t({}, e3), {}, { groupID: o2, topicID: a2 }) }).then(function() {
            if (n2.hasLocalGroupMember(o2, i2)) {
              var t2 = n2.getLocalGroupMemberInfo(o2, i2);
              return ft(e3.muteTime) || t2.updateMuteUntil(e3.muteTime), ft(e3.role) || t2.updateRole(e3.role), ft(e3.nameCard) || t2.updateNameCard(e3.nameCard), ft(e3.memberCustomField) || t2.updateMemberCustomField(e3.memberCustomField), t2;
            }
            var a3 = n2._groupModule.getLocalGroupProfile(o2);
            if (a3 && !Ut(a3.type))
              return n2.getGroupMemberProfile({ groupID: o2, userIDList: [i2] }).then(function(e4) {
                return v(e4.data.memberList, 1)[0];
              });
          });
        } }, { key: "markGroupMemberList", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("markGroupMemberList"), o2 = e3.groupID, i2 = e3.markType, a2 = e3.enableMark, s2 = e3.userIDList, r2 = void 0 === s2 ? [] : s2, c2 = "groupID:".concat(o2, " markType:").concat(i2, " enableMark:").concat(a2, " userIDList count:").concat(r2.length);
          Ye.l("".concat(n2, " ").concat(c2));
          var u2 = 2, l2 = [];
          true === a2 && (u2 = 1);
          var d2 = m(r2);
          r2.length > 500 && (d2 = r2.slice(0, 500), Ye.w("".concat(n2, " ").concat(nn(500)))), d2.forEach(function(e4) {
            l2.push({ userID: e4, markType: [i2] });
          }), d2 = null;
          var p2 = new Ms("markGroupMemberList");
          return p2.setMessage(c2), this._groupModule.request({ protocolName: Na, requestData: { groupID: o2, operationType: u2, memberList: l2 } }).then(function(e4) {
            var o3 = e4.data.memberList, i3 = void 0 === o3 ? [] : o3, a3 = [], s3 = [];
            i3.length === r2.length ? a3.push.apply(a3, m(r2)) : (i3.forEach(function(e5) {
              a3.push(e5.userID);
            }), r2.forEach(function(e5) {
              a3.includes(e5) || s3.push(e5);
            }));
            var c3 = "success count:".concat(a3.length, " fail count:").concat(s3.length);
            return p2.setNetworkType(t2._groupModule.getNetworkType()).setMessage(c3).end(), Ye.l("".concat(n2, " ok. ").concat(c3)), ko({ successUserIDList: a3, failureUserIDList: s3 });
          }).catch(function(e4) {
            return t2._groupModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              p2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_getGroupMemberProfileAdvance", value: function(e3) {
          return this._groupModule.request({ protocolName: Ca, requestData: t(t({}, e3), {}, { memberInfoFilter: e3.memberInfoFilter ? e3.memberInfoFilter : this.DEFAULT_MEMBER_INFO_FILTER }) });
        } }, { key: "_updateLocalGroupMemberMap", value: function(e3, t2) {
          var n2 = this;
          return _t(t2) && 0 !== t2.length ? t2.map(function(t3) {
            return n2.hasLocalGroupMember(e3, t3.userID) ? n2.getLocalGroupMemberInfo(e3, t3.userID).updateMember(t3) : n2.setLocalGroupMember(e3, new vr(t3)), n2.getLocalGroupMemberInfo(e3, t3.userID);
          }) : [];
        } }, { key: "deleteLocalGroupMembers", value: function(e3, t2) {
          var n2 = this.groupMemberListMap.get(e3);
          n2 && t2.forEach(function(e4) {
            n2.delete(e4);
          });
        } }, { key: "getLocalGroupMemberInfo", value: function(e3, t2) {
          return this.groupMemberListMap.has(e3) ? this.groupMemberListMap.get(e3).get(t2) : null;
        } }, { key: "setLocalGroupMember", value: function(e3, t2) {
          if (this.groupMemberListMap.has(e3))
            this.groupMemberListMap.get(e3).set(t2.userID, t2);
          else {
            var n2 = (/* @__PURE__ */ new Map()).set(t2.userID, t2);
            this.groupMemberListMap.set(e3, n2);
          }
        } }, { key: "getLocalGroupMemberList", value: function(e3) {
          return this.groupMemberListMap.get(e3);
        } }, { key: "hasLocalGroupMember", value: function(e3, t2) {
          return this.groupMemberListMap.has(e3) && this.groupMemberListMap.get(e3).has(t2);
        } }, { key: "hasLocalGroupMemberMap", value: function(e3) {
          return this.groupMemberListMap.has(e3);
        } }, { key: "reset", value: function() {
          this.groupMemberListMap.clear();
        } }]), e2;
      }(), Mr = 1, yr = 15, Ir = function() {
        function e2(t2) {
          o(this, e2), this._groupModule = t2, this._n = "GroupSystemNoticeHandler", this.pendencyMap = /* @__PURE__ */ new Map();
        }
        return a(e2, [{ key: "onNewGroupSystemNotice", value: function(e3) {
          var t2 = e3.dataList, n2 = e3.isSyncingEnded, o2 = e3.isInstantMessage;
          Ye.d("".concat(this._n, ".onReceiveSystemNotice count:").concat(t2.length));
          var i2 = this.newSystemNoticeStoredAndSummary({ notifiesList: t2, isInstantMessage: o2 }), a2 = i2.eventDataList, s2 = i2.result;
          a2.length > 0 && (this._groupModule.getModule(to).onNewMessage({ conversationOptionsList: a2, isInstantMessage: o2 }), this._onReceivedGroupSystemNotice({ result: s2, isInstantMessage: o2 }));
          o2 ? s2.length > 0 && this._groupModule.emitOuterEvent(k.MESSAGE_RECEIVED, s2) : true === n2 && this._clearGroupSystemNotice();
        } }, { key: "newSystemNoticeStoredAndSummary", value: function(e3) {
          var n2 = e3.notifiesList, o2 = e3.isInstantMessage, i2 = null, a2 = n2.length, s2 = 0, r2 = [], c2 = { conversationID: L.CONV_SYSTEM, unreadCount: 0, type: L.CONV_SYSTEM, subType: null, lastMessage: null };
          for (s2 = 0; s2 < a2; s2++) {
            var u2 = n2[s2], l2 = u2.groupProfile, d2 = l2.communityType, p2 = void 0 === d2 ? 0 : d2, g2 = l2.topicID, h2 = void 0 === g2 ? void 0 : g2, _2 = u2.elements, f2 = _2.topicIDList, v2 = void 0 === f2 ? void 0 : f2, m2 = _2.operationType;
            if (!(2 !== p2 || un(h2) && un(v2))) {
              if ([17, 18, 20].includes(m2)) {
                this._handleTopicSystemNotice(u2);
                continue;
              }
              un(h2) || (u2.to = h2);
            }
            if (u2.elements.operationType !== yr)
              u2.currentUser = this._groupModule.getMyUserID(), u2.conversationType = L.CONV_SYSTEM, u2.conversationID = L.CONV_SYSTEM, (i2 = new Ps(u2)).setElement({ type: L.MSG_GRP_SYS_NOTICE, content: t(t({}, u2.elements), {}, { groupProfile: t({}, u2.groupProfile) }) }), i2.isSystemMessage = true, (1 === i2.sequence && 1 === i2.random || 2 === i2.sequence && 2 === i2.random) && (i2.sequence = Lt(), i2.random = Lt(), i2.generateMessageID(), Ye.l("".concat(this._n, ".newSystemNoticeStoredAndSummary sequence and random maybe duplicated, regenerate. ID:").concat(i2.ID))), this._groupModule.getModule(to).pushIntoNoticeResult(r2, i2) && (o2 ? c2.unreadCount++ : i2.setIsRead(true), c2.subType = i2.conversationSubType);
          }
          return c2.lastMessage = r2[r2.length - 1], { eventDataList: r2.length > 0 ? [c2] : [], result: r2 };
        } }, { key: "_clearGroupSystemNotice", value: function() {
          var e3 = this;
          this._getPendencyList().then(function(t2) {
            t2.forEach(function(t3) {
              e3.pendencyMap.set("".concat(t3.from, "_").concat(t3.groupID, "_").concat(t3.to), t3);
            });
            var n2 = e3._groupModule.getModule(to).getLocalMessageList(L.CONV_SYSTEM), o2 = [];
            n2.forEach(function(t3) {
              var n3 = t3.payload, i2 = n3.operatorID, a2 = n3.operationType, s2 = n3.groupProfile;
              if (a2 === Mr) {
                var r2 = "".concat(i2, "_").concat(s2.groupID, "_").concat(s2.to), c2 = e3.pendencyMap.get(r2);
                c2 && dt(c2.handled) && 0 !== c2.handled && o2.push(t3);
              }
            }), e3.deleteGroupSystemNotice({ messageList: o2 });
          });
        } }, { key: "deleteGroupSystemNotice", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".deleteGroupSystemNotice");
          return _t(e3.messageList) && 0 !== e3.messageList.length ? (Ye.l("".concat(n2, " ") + e3.messageList.map(function(e4) {
            return e4.ID;
          })), this._groupModule.request({ protocolName: ea, requestData: { messageListToDelete: e3.messageList.map(function(e4) {
            return { from: L.CONV_SYSTEM, messageSeq: e4.clientSequence, messageRandom: e4.random };
          }) } }).then(function() {
            Ye.l("".concat(n2, " ok"));
            var o2 = t2._groupModule.getModule(to);
            return e3.messageList.forEach(function(e4) {
              o2.deleteLocalMessage(e4);
            }), ko();
          }).catch(function(e4) {
            return Ye.e("".concat(n2, " error:"), e4), Ro(e4);
          })) : Eo();
        } }, { key: "_getPendencyList", value: function() {
          var e3 = this, t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n2 = t2.type, o2 = void 0 === n2 ? void 0 : n2, i2 = t2.startTime, a2 = void 0 === i2 ? 0 : i2, s2 = t2.limit, r2 = void 0 === s2 ? 20 : s2;
          return this._groupModule.request({ protocolName: $i, requestData: { type: o2, startTime: a2, limit: r2, handleAccount: this._groupModule.getMyUserID() } }).then(function(t3) {
            var n3 = t3.data.pendencyList;
            return 0 !== t3.data.nextStartTime ? e3._getPendencyList({ startTime: t3.data.nextStartTime }).then(function(e4) {
              return [].concat(m(n3), m(e4));
            }) : n3;
          });
        } }, { key: "getGroupApplicationList", value: function() {
          var e3 = this;
          return this._getPendencyList().then(function(t2) {
            return e3._getPendencyList({ type: L.GRP_COMMUNITY }).then(function(n2) {
              return t2.push.apply(t2, m(n2)), e3._handlePendencyResult(t2);
            }).catch(function(n2) {
              return e3._handlePendencyResult(t2);
            });
          });
        } }, { key: "_handlePendencyResult", value: function(e3) {
          var t2 = this, n2 = [];
          return e3.forEach(function(e4) {
            t2.pendencyMap.set("".concat(e4.from, "_").concat(e4.groupID, "_").concat(e4.to), e4), 0 === e4.handled && n2.push({ applicant: e4.from, applicantNick: e4.fromUserNickName, groupName: e4.groupName, groupID: e4.groupID, authentication: e4.authentication, messageKey: e4.time, applicationType: e4.applicationType, userID: e4.userID, note: e4.note });
          }), Eo({ applicationList: n2 });
        } }, { key: "_onReceivedGroupSystemNotice", value: function(e3) {
          var t2 = this, n2 = e3.result;
          e3.isInstantMessage && n2.forEach(function(e4) {
            switch (e4.payload.operationType) {
              case 1:
                break;
              case 2:
                t2._onApplyGroupRequestAgreed(e4);
                break;
              case 3:
                break;
              case 4:
                t2._onMemberKicked(e4);
                break;
              case 5:
                t2._onGroupDismissed(e4);
                break;
              case 6:
                break;
              case 7:
                t2._onInviteGroup(e4);
                break;
              case 8:
                t2._onQuitGroup(e4);
                break;
              case 9:
                t2._onSetManager(e4);
                break;
              case 10:
                t2._onDeleteManager(e4);
                break;
              case 11:
              case 12:
              case 15:
                break;
              case 20:
                t2._onMessageRemindTypeSynced(e4);
                break;
              case 21:
                t2._groupModule.onAVChatRoomMemberBanned(e4);
            }
          });
        } }, { key: "_onApplyGroupRequestAgreed", value: function(e3) {
          var t2 = this, n2 = e3.payload.groupProfile.groupID;
          this._groupModule.hasLocalGroup(n2) || this._groupModule.getGroupProfile({ groupID: n2 }).then(function(e4) {
            var n3 = e4.data.group;
            if (n3) {
              t2._groupModule.updateGroupMap([n3]);
              var o2 = !n3.isSupportTopic;
              t2._groupModule.emitGroupListUpdate(true, o2);
            }
          });
        } }, { key: "_onMemberKicked", value: function(e3) {
          var t2 = e3.payload.groupProfile.groupID;
          this._groupModule.hasLocalGroup(t2) && this._groupModule.deleteLocalGroupAndConversation(t2);
        } }, { key: "_onGroupDismissed", value: function(e3) {
          var t2 = e3.payload.groupProfile.groupID;
          this._groupModule.hasLocalGroup(t2) && this._groupModule.deleteLocalGroupAndConversation(t2);
          var n2 = this._groupModule._AVChatRoomHandler;
          n2 && n2.checkJoinedAVChatRoomByID(t2) && n2.reset(t2);
        } }, { key: "_onInviteGroup", value: function(e3) {
          var t2 = this, n2 = e3.payload.groupProfile.groupID;
          this._groupModule.hasLocalGroup(n2) || this._groupModule.getGroupProfile({ groupID: n2 }).then(function(e4) {
            var n3 = e4.data.group;
            n3 && (t2._groupModule.updateGroupMap([n3]), t2._groupModule.emitGroupListUpdate());
          });
        } }, { key: "_onQuitGroup", value: function(e3) {
          var t2 = e3.payload.groupProfile.groupID;
          this._groupModule.hasLocalGroup(t2) && this._groupModule.deleteLocalGroupAndConversation(t2);
        } }, { key: "_onSetManager", value: function(e3) {
          var t2 = e3.payload.groupProfile, n2 = t2.to, o2 = t2.groupID, i2 = this._groupModule.getGroupMemberHandler().getLocalGroupMemberInfo(o2, n2);
          i2 && i2.updateRole(L.GRP_MBR_ROLE_ADMIN);
        } }, { key: "_onDeleteManager", value: function(e3) {
          var t2 = e3.payload.groupProfile, n2 = t2.to, o2 = t2.groupID, i2 = this._groupModule.getGroupMemberHandler().getLocalGroupMemberInfo(o2, n2);
          i2 && i2.updateRole(L.GRP_MBR_ROLE_MEMBER);
        } }, { key: "_onMessageRemindTypeSynced", value: function(e3) {
          var t2 = e3.payload.groupProfile.groupID, n2 = e3.payload.messageRemindType;
          this._groupModule.getModule(to).onGroupMessageRemindTypeUpdated({ groupID: t2, messageRemindType: n2 });
        } }, { key: "_handleTopicSystemNotice", value: function(e3) {
          var t2 = e3.groupProfile, n2 = t2.groupID, o2 = t2.topicID, i2 = e3.elements, a2 = i2.operationType, s2 = i2.topicIDList, r2 = i2.messageRemindType, c2 = this._groupModule.getModule(eo);
          17 === a2 ? c2.onTopicCreated({ groupID: n2, topicID: o2 }) : 18 === a2 ? c2.onTopicDeleted({ groupID: n2, topicIDList: s2 }) : 20 === a2 && c2.onTopicMessageRemindTypeUpdated({ groupID: n2, topicID: o2, messageRemindType: r2 });
        } }, { key: "reset", value: function() {
          this.pendencyMap.clear();
        } }]), e2;
      }(), Cr = ["relayFlag"], Dr = function(e2) {
        r(i2, e2);
        var n2 = f(i2);
        function i2(e3) {
          var t2;
          return o(this, i2), (t2 = n2.call(this, e3))._n = "GroupModule", t2._commonGroupHandler = new or(h(t2)), t2._groupAttributesHandler = new ur(h(t2)), t2._groupCountersHandler = new gr(h(t2)), t2._AVChatRoomHandler = new fr(h(t2)), t2._groupTipsHandler = new nr(h(t2)), t2._groupSystemNoticeHandler = new Ir(h(t2)), t2._groupMemberHandler = new mr(h(t2)), t2.groupMap = /* @__PURE__ */ new Map(), t2._unjoinedAVChatRoomList = /* @__PURE__ */ new Map(), t2._receiptDetailCompleteMap = /* @__PURE__ */ new Map(), t2._onlineMemberCountMap = /* @__PURE__ */ new Map(), t2.getInnerEmitterInstance().on(Fs.CLOUD_CONFIG_UPDATED, t2._onCloudConfigUpdated, h(t2)), t2;
        }
        return a(i2, [{ key: "_onCloudConfigUpdated", value: function() {
          var e3 = this.getCloudConfig("polling_interval"), t2 = this.getCloudConfig("polling_interval_plus"), n3 = this.getCloudConfig("polling_no_msg_count"), o2 = this.getCloudConfig("polling_simplified_msg"), i3 = this.getCloudConfig("paging_grp_count");
          Ye.l("".concat(this._n, "._onCloudConfigUpdated pollingInterval:").concat(e3) + " pollingIntervalPlus:".concat(t2, " pollingNoMessageCount:").concat(n3) + " pollingSimplifiedMessage:".concat(o2, " pagingGroupCount:").concat(i3)), this._AVChatRoomHandler.setPollingInterval(e3), this._AVChatRoomHandler.setPollingIntervalPlus(t2), this._AVChatRoomHandler.setPollingNoMessageCount(n3), this._AVChatRoomHandler.setPollingSimplifiedMessage(o2), this._commonGroupHandler.setPagingGroupCount(i3);
        } }, { key: "onCheckTimer", value: function(e3) {
          this.isLoggedIn() && (this._commonGroupHandler.onCheckTimer(e3), this._groupTipsHandler.onCheckTimer(e3));
        } }, { key: "guardForAVChatRoom", value: function(e3) {
          var t2 = this;
          if (e3.conversationType === L.CONV_GROUP) {
            var n3 = bt(e3.to) ? Qt(e3.to) : e3.to;
            return this.hasLocalGroup(n3) ? Eo() : this.getGroupProfile({ groupID: n3 }).then(function(o2) {
              var i3 = o2.data.group.type;
              if (Ye.l("".concat(t2._n, ".guardForAVChatRoom. groupID:").concat(n3, " type:").concat(i3)), i3 === L.GRP_AVCHATROOM) {
                var a2 = No.MSG_SEND_FAIL_NOT_IN_AVCHATROOM;
                return Ro(new Lo({ code: a2, message: t2.getErrorMessage(a2, e3.from, n3), data: { message: e3 } }));
              }
              return Eo();
            });
          }
          return Eo();
        } }, { key: "checkJoinedAVChatRoomByID", value: function(e3) {
          return this._AVChatRoomHandler.checkJoinedAVChatRoomByID(e3);
        } }, { key: "onNewGroupMessage", value: function(e3) {
          this._commonGroupHandler.onNewGroupMessage(e3);
        } }, { key: "updateNextMessageSeq", value: function(e3) {
          var t2 = this;
          if (_t(e3)) {
            var n3 = this.getModule(eo);
            e3.forEach(function(e4) {
              var o2 = e4.conversationID.replace(L.CONV_GROUP, "");
              bt(o2) && n3.updateLastMessage(o2, e4.lastMessage), t2.groupMap.has(o2) && (t2.groupMap.get(o2).nextMessageSeq = e4.lastMessage.sequence + 1);
            });
          }
        } }, { key: "onNewGroupTips", value: function(e3) {
          this._groupTipsHandler.onNewGroupTips(e3);
        } }, { key: "onGroupMessageRevoked", value: function(e3) {
          this._commonGroupHandler.onGroupMessageRevoked(e3);
        } }, { key: "onNewGroupSystemNotice", value: function(e3) {
          this._groupSystemNoticeHandler.onNewGroupSystemNotice(e3);
        } }, { key: "onGroupMessageReadNotice", value: function(e3) {
          var t2 = this;
          e3.dataList.forEach(function(e4) {
            var n3 = e4.elements.groupMessageReadNotice;
            if (!ft(n3)) {
              var o2 = t2.getModule(to);
              n3.forEach(function(e5) {
                var n4 = e5.groupID, i3 = e5.topicID, a2 = void 0 === i3 ? void 0 : i3, s2 = e5.lastMessageSeq;
                Ye.d("".concat(t2._n, ".onGroupMessageReadNotice groupID:").concat(n4, " lastMessageSeq:").concat(s2));
                var r2 = "".concat(L.CONV_GROUP).concat(n4), c2 = true;
                un(a2) || (r2 = "".concat(L.CONV_GROUP).concat(a2), c2 = false), o2.updateIsReadAfterReadReport({ conversationID: r2, lastMessageSeq: s2 }), o2.updateUnreadCount(r2, c2), o2.clearGroupAtInfoList(r2, c2);
              });
            }
          });
        } }, { key: "onReadReceiptList", value: function(e3) {
          var t2 = this;
          Ye.d("".concat(this._n, ".onReadReceiptList options:"), JSON.stringify(e3)), e3.dataList.forEach(function(e4) {
            var n3 = e4.groupProfile, o2 = e4.elements, i3 = n3.groupID, a2 = t2.getModule(to), s2 = o2.readReceiptList;
            a2.updateReadReceiptInfo({ groupID: i3, readReceiptList: s2 });
          });
        } }, { key: "onGroupMessageModified", value: function(e3) {
          Ye.d("".concat(this._n, ".onGroupMessageModified options:"), JSON.stringify(e3));
          var n3 = this.getModule(to);
          e3.dataList.forEach(function(e4) {
            n3.onMessageModified(t(t({}, e4), {}, { conversationType: L.CONV_GROUP, to: e4.topicID ? e4.topicID : e4.groupID }));
          });
        } }, { key: "deleteGroupSystemNotice", value: function(e3) {
          this._groupSystemNoticeHandler.deleteGroupSystemNotice(e3);
        } }, { key: "initGroupMap", value: function(e3) {
          this.groupMap.set(e3.groupID, new Xs(e3));
        } }, { key: "clearGroupMap", value: function() {
          this.groupMap.clear();
        } }, { key: "deleteGroup", value: function(e3) {
          this.groupMap.delete(e3);
        } }, { key: "updateGroupMap", value: function(e3) {
          var t2, n3 = this, o2 = this.getModule(to);
          e3.forEach(function(e4) {
            t2 = e4.groupID, n3.groupMap.has(t2) ? n3.groupMap.get(t2).updateGroup(e4) : (n3.groupMap.set(t2, new Xs(e4)), o2.deleteGroupRomaingMessageInfo(t2));
          });
          var i3, a2 = this.getMyUserID(), s2 = T(this.groupMap);
          try {
            for (s2.s(); !(i3 = s2.n()).done; ) {
              var r2 = v(i3.value, 2)[1];
              r2.selfInfo.userID = a2, "Owner" === r2.selfInfo.role && (r2.ownerID = a2);
            }
          } catch (c2) {
            s2.e(c2);
          } finally {
            s2.f();
          }
        } }, { key: "getGroupMap", value: function() {
          return this.groupMap;
        } }, { key: "getLocalGroupList", value: function() {
          return m(this.groupMap.values());
        } }, { key: "getLocalGroupProfile", value: function(e3) {
          return this.groupMap.get(e3);
        } }, { key: "sortLocalGroupList", value: function() {
          var e3 = m(this.groupMap).filter(function(e4) {
            var t2 = v(e4, 2);
            return t2[0], !un(t2[1].lastMessage);
          });
          e3.sort(function(e4, t2) {
            return t2[1].lastMessage.lastTime - e4[1].lastMessage.lastTime;
          }), this.groupMap = new Map(m(e3));
        } }, { key: "updateGroupLastMessage", value: function(e3) {
          this._commonGroupHandler.handleUpdateGroupLastMessage(e3);
        } }, { key: "emitGroupListUpdate", value: function() {
          var e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n3 = this.getLocalGroupList();
          if (e3 && this.emitOuterEvent(k.GROUP_LIST_UPDATED), t2) {
            var o2 = JSON.parse(JSON.stringify(n3)), i3 = this.getModule(to);
            i3.updateConversationGroupProfile(o2);
          }
        } }, { key: "getMyNameCardByGroupID", value: function(e3) {
          var t2 = this.getLocalGroupProfile(e3);
          return t2 ? t2.selfInfo.nameCard : "";
        } }, { key: "isPagingGetCompleted", value: function() {
          return this._commonGroupHandler.isPagingGetCompleted();
        } }, { key: "getMessageRemindType", value: function(e3) {
          var t2 = this;
          _t(e3) && 0 !== e3.length && (Ye.l("".concat(this._n, ".getMessageRemindType groupIDList:").concat(e3)), this.getGroupProfileAdvance({ groupIDList: e3, responseFilter: { memberInfoFilter: ["MsgFlag"] } }).then(function(e4) {
            var n3 = e4.data.successGroupList, o2 = t2.getModule(to);
            n3.forEach(function(e5) {
              o2.onGroupMessageRemindTypeUpdated({ groupID: e5.groupID, messageRemindType: _t(e5.members) ? e5.members[0].messageRemindType : "" });
            });
          }));
        } }, { key: "getGroupList", value: function() {
          return this._commonGroupHandler.getGroupList();
        } }, { key: "syncCommunityWithTopic", value: function() {
          return this._commonGroupHandler.syncGroupList(true);
        } }, { key: "getGroupProfile", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".").concat("getGroupProfile"), o2 = new Ms("getGroupProfile"), i3 = e3.groupID, a2 = e3.groupCustomFieldFilter;
          Ye.l("".concat(n3, " groupID:").concat(i3));
          var s2 = { groupIDList: [i3], responseFilter: { groupBaseInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "Owner_Account", "CreateTime", "InfoSeq", "LastInfoTime", "LastMsgTime", "MemberNum", "MaxMemberNum", "ApplyJoinOption", "NextMsgSeq", "ShutUpAllMember", "InviteJoinOption"], groupCustomFieldFilter: a2, memberInfoFilter: ["Role", "JoinTime", "MsgSeq", "MsgFlag", "NameCard"] } };
          return this.getGroupProfileAdvance(s2).then(function(e4) {
            var a3, s3 = e4.data, r2 = s3.successGroupList, c2 = s3.failureGroupList;
            if (Ye.l("".concat(n3, " ok")), c2.length > 0)
              return Ro(c2[0]);
            (Ut(r2[0].type) && !t2.hasLocalGroup(i3) ? a3 = new Xs(r2[0]) : (t2.updateGroupMap(r2), a3 = t2.getLocalGroupProfile(i3)), a3.isSupportTopic) || t2.getModule(to).updateConversationGroupProfile([a3]);
            return o2.setNetworkType(t2.getNetworkType()).setMessage("groupID:".concat(i3, " type:").concat(a3.type, " muteAllMembers:").concat(a3.muteAllMembers, " ownerID:").concat(a3.ownerID)).end(), ko({ group: a3 });
          }).catch(function(i4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), a3 = n4[0], s3 = n4[1];
              o2.setError(i4, a3, s3).setMessage("groupID:".concat(e3.groupID)).end();
            }), Ye.e("".concat(n3, " failed. error:"), i4), Ro(i4);
          });
        } }, { key: "getGroupProfileAdvance", value: function(e3) {
          var n3 = "".concat(this._n, ".getGroupProfileAdvance"), o2 = e3.groupIDList;
          _t(o2) && o2.length > 50 && (this.outputWarning("GetGroupProfileLimit"), o2.length = 50);
          var i3 = [], a2 = [];
          o2.forEach(function(e4) {
            Pt({ groupID: e4 }) ? a2.push(e4) : i3.push(e4);
          });
          var s2 = [];
          if (i3.length > 0) {
            var r2 = this._getGroupProfileAdvance(t(t({}, e3), {}, { groupIDList: i3 }));
            s2.push(r2);
          }
          if (a2.length > 0) {
            var c2 = this._getGroupProfileAdvance(t(t({}, e3), {}, { groupIDList: a2, relayFlag: i3.length > 0 }));
            s2.push(c2);
          }
          return Promise.all(s2).then(function(e4) {
            var t2 = [], n4 = [];
            return e4.forEach(function(e5) {
              t2.push.apply(t2, m(e5.successGroupList)), n4.push.apply(n4, m(e5.failureGroupList));
            }), ko({ successGroupList: t2, failureGroupList: n4 });
          }).catch(function(e4) {
            return Ye.e("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_getGroupProfileAdvance", value: function(e3) {
          var t2 = this, n3 = e3.relayFlag, o2 = void 0 !== n3 && n3, i3 = g(e3, Cr);
          return this.request({ protocolName: Gi, requestData: i3 }).then(function(e4) {
            Ye.l("".concat(t2._n, "._getGroupProfileAdvance ok."));
            var n4 = e4.data.groups;
            return { successGroupList: n4.filter(function(e5) {
              return ft(e5.errorCode) || 0 === e5.errorCode;
            }), failureGroupList: n4.filter(function(e5) {
              return e5.errorCode && 0 !== e5.errorCode;
            }).map(function(e5) {
              return new Lo({ code: e5.errorCode, message: e5.errorInfo, data: { groupID: e5.groupID } });
            }) };
          }).catch(function(t3) {
            return o2 && Pt({ groupID: e3.groupIDList[0] }) ? { successGroupList: [], failureGroupList: [] } : Ro(t3);
          });
        } }, { key: "createGroup", value: function(e3) {
          var n3 = this, o2 = [L.GRP_PUBLIC, L.GRP_WORK, L.GRP_MEETING, L.GRP_AVCHATROOM, L.GRP_COMMUNITY], i3 = "".concat(this._n, ".").concat("createGroup"), a2 = e3.type, s2 = e3.groupID;
          if (e3.name && false === this._filterProfanity("name", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          if (e3.introduction && false === this._filterProfanity("introduction", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          if (e3.notification && false === this._filterProfanity("notification", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          if (!o2.includes(a2))
            return Ro({ code: No.ILLEGAL_GRP_TYPE });
          if (!Pt({ type: a2 })) {
            if (!un(s2) && Pt({ groupID: s2 }))
              return Ro({ code: No.ILLEGAL_GRP_ID });
            e3.isSupportTopic = void 0;
          }
          if (Ut(a2) && !ft(e3.memberList) && e3.memberList.length > 0 && (e3.memberList = void 0), this._canIUseJoinOption(a2) || ft(e3.joinOption) || (e3.joinOption = void 0), Pt({ type: a2 })) {
            if (!un(s2) && !Pt({ groupID: s2 }))
              return Ro({ code: No.ILLEGAL_GRP_ID });
            e3.isSupportTopic = true === e3.isSupportTopic ? 1 : 0;
          }
          var r2 = new Ms("createGroup");
          Ye.l("".concat(i3, " options:"), e3);
          var c2 = null, u2 = [];
          return this.request({ protocolName: Ui, requestData: t(t({}, e3), {}, { ownerID: this.getMyUserID(), webPushFlag: 1 }) }).then(function(o3) {
            var a3 = o3.data, s3 = a3.groupID, l2 = a3.overLimitUserIDList, d2 = void 0 === l2 ? [] : l2;
            c2 = s3, u2 = d2;
            var p2 = "groupType:".concat(e3.type, " groupID:").concat(s3, " overLimitUserIDList:").concat(d2);
            if (r2.setNetworkType(n3.getNetworkType()).setMessage(p2).end(), Ye.l("".concat(i3, " ok. ").concat(p2)), e3.type === L.GRP_AVCHATROOM)
              return n3.getGroupProfile({ groupID: s3 });
            if (e3.type === L.GRP_COMMUNITY && 1 === e3.isSupportTopic)
              return n3.getGroupProfile({ groupID: s3 });
            un(e3.memberList) || un(d2) || (e3.memberList = e3.memberList.filter(function(e4) {
              return -1 === d2.indexOf(e4.userID);
            })), n3.updateGroupMap([t(t({}, e3), {}, { groupID: s3 })]);
            var g2 = n3.getModule(Jn), h2 = "", _2 = 0;
            e3.type === L.GRP_COMMUNITY ? (h2 = n3.isIntl() ? "Create Community" : "创建社群", _2 = 1) : h2 = n3.isIntl() ? "Create Group" : "创建群组";
            var f2 = n3.getModule(Xn).getMyNick(), v2 = g2.createCustomMessage({ to: s3, conversationType: L.CONV_GROUP, payload: { data: JSON.stringify({ businessID: "group_create", content: h2, cmd: _2, opUser: f2 || n3.getMyUserID(), version: 4 }) } });
            return g2.sendMessageInstance(v2), n3.emitGroupListUpdate(), n3.getGroupProfile({ groupID: s3 });
          }).then(function(e4) {
            var t2 = e4.data.group, n4 = t2.selfInfo, o3 = n4.nameCard, i4 = n4.joinTime;
            return t2.updateSelfInfo({ nameCard: o3, joinTime: i4, messageRemindType: L.MSG_REMIND_ACPT_AND_NOTE, role: L.GRP_MBR_ROLE_OWNER }), ko({ group: t2, overLimitUserIDList: u2 });
          }).catch(function(o3) {
            if (r2.setMessage("groupType:".concat(e3.type)), n3.probeNetwork().then(function(e4) {
              var t2 = v(e4, 2), n4 = t2[0], i4 = t2[1];
              r2.setError(o3, n4, i4).end();
            }), 10010 === o3.code || 10007 === o3.code) {
              n3.updateGroupMap([t(t({}, e3), {}, { groupID: c2 })]);
              var a3 = n3.getLocalGroupProfile(c2);
              return a3.selfInfo.role = L.GRP_MBR_ROLE_OWNER, Ye.l("".concat(i3, " success, but failed to get group profile.")), ko({ group: a3, overLimitUserIDList: u2 });
            }
            return Ye.e("".concat(i3, " failed. error:"), o3), Ro(o3);
          });
        } }, { key: "dismissGroup", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".").concat("dismissGroup"), o2 = "groupID:".concat(e3);
          if (this.hasLocalGroup(e3) && this.getLocalGroupProfile(e3).type === L.GRP_WORK)
            return Ro(new Lo({ code: No.CANNOT_DISMISS_WORK }));
          var i3 = new Ms("dismissGroup");
          return i3.setMessage(o2), Ye.l("".concat(n3, " ").concat(o2)), this.request({ protocolName: Pi, requestData: { groupID: e3 } }).then(function() {
            return i3.setNetworkType(t2.getNetworkType()).end(), Ye.l("".concat(n3, " ok")), t2.deleteLocalGroupAndConversation(e3), t2.checkJoinedAVChatRoomByID(e3) && t2._AVChatRoomHandler.reset(e3), t2._groupAttributesHandler.deleteLocalGroupAttributes(e3), ko({ groupID: e3 });
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], a2 = n4[1];
              i3.setError(e4, o3, a2).end();
            }), Ye.e("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "updateGroupProfile", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".").concat("updateGroupProfile");
          if (this.hasLocalGroup(e3.groupID)) {
            var o2 = this.getLocalGroupProfile(e3.groupID).type;
            this._canIUseJoinOption(o2) || ft(e3.joinOption) || (Ye.w("".concat(n3, " joinOption is unavailable for Work/Meeting/AVChatRoom")), e3.joinOption = void 0);
          }
          if (ft(e3.muteAllMembers) || (e3.muteAllMembers ? e3.muteAllMembers = "On" : e3.muteAllMembers = "Off"), e3.name && false === this._filterProfanity("name", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          if (e3.introduction && false === this._filterProfanity("introduction", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          if (e3.notification && false === this._filterProfanity("notification", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          var i3 = new Ms("updateGroupProfile");
          return i3.setMessage(JSON.stringify(e3)), Ye.l("".concat(n3, " groupID:").concat(e3.groupID)), this.request({ protocolName: bi, requestData: e3 }).then(function() {
            (i3.setNetworkType(t2.getNetworkType()).end(), Ye.l("".concat(n3, " ok")), t2.hasLocalGroup(e3.groupID)) && t2.groupMap.get(e3.groupID).updateGroup(e3);
            return ko({ group: t2.groupMap.get(e3.groupID) });
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], a2 = n4[1];
              i3.setError(e4, o3, a2).end();
            }), Ye.l("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_filterProfanity", value: function(e3, t2) {
          var n3 = this.getModule(Mo);
          if (!n3)
            return true;
          var o2 = n3.filterText(t2[e3], X), i3 = o2.isAllowedToSend, a2 = o2.modifiedText;
          return true === i3 && (t2[e3] = a2, true);
        } }, { key: "joinGroup", value: function(e3) {
          var t2 = this, n3 = e3.groupID, o2 = e3.type, i3 = "".concat(this._n, ".joinGroup");
          if (o2 === L.GRP_WORK)
            return Ro({ code: No.CANNOT_JOIN_WORK });
          if (this.deleteUnjoinedAVChatRoom(n3), this.hasLocalGroup(n3)) {
            if (!this.isLoggedIn())
              return Eo({ status: L.JOIN_STATUS_ALREADY_IN_GROUP });
            var a2 = new Ms("applyJoinGroup");
            return this.getGroupProfile({ groupID: n3 }).then(function() {
              return a2.setNetworkType(t2.getNetworkType()).setMessage("groupID:".concat(n3, " joinedStatus:").concat(L.JOIN_STATUS_ALREADY_IN_GROUP)).end(), Eo({ status: L.JOIN_STATUS_ALREADY_IN_GROUP });
            }).catch(function(o3) {
              return a2.setNetworkType(t2.getNetworkType()).setMessage("groupID:".concat(n3, " unjoined")).end(), Ye.w("".concat(i3, " ").concat(n3, " was unjoined, now join!")), t2.groupMap.delete(n3), t2.applyJoinGroup(e3);
            });
          }
          return Ye.l("".concat(i3, " groupID:").concat(n3)), this.isLoggedIn() ? this.applyJoinGroup(e3) : this._AVChatRoomHandler.joinWithoutAuth(e3);
        } }, { key: "applyJoinGroup", value: function(e3) {
          var n3 = this, o2 = "".concat(this._n, ".").concat("applyJoinGroup"), i3 = e3.groupID;
          if (!un(e3.applyMessage) && false === this._filterProfanity("applyMessage", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          var a2 = new Ms("applyJoinGroup"), s2 = t({}, e3), r2 = this.canIUse(B.AVCHATROOM_HISTORY_MSG);
          return r2 && (s2.historyMessageFlag = 1), this.getModule(to).deleteTopicRoamingMessageInfo(i3), this.request({ protocolName: wi, requestData: s2 }).then(function(e4) {
            var t2 = e4.data, s3 = t2.joinedStatus, c2 = t2.longPollingKey, u2 = t2.startSeq, l2 = t2.avChatRoomFlag, d2 = t2.avChatRoomKey, p2 = t2.messageList, g2 = "groupID:".concat(i3, " joinedStatus:").concat(s3, " longPollingKey:").concat(c2, " startSeq:").concat(u2) + " avChatRoomFlag:".concat(l2, " canGetAVChatRoomHistoryMessage:").concat(r2, ",") + " history message count:".concat(un(p2) ? 0 : p2.length);
            switch (a2.setNetworkType(n3.getNetworkType()).setMessage("".concat(g2)).end(), Ye.l("".concat(o2, " ok. ").concat(g2)), s3) {
              case at:
                return ko({ status: at });
              case it:
                return n3.getGroupProfile({ groupID: i3 }).then(function(e5) {
                  var t3 = e5.data.group;
                  return n3._handleJoinResult({ group: t3, avChatRoomFlag: l2, longPollingKey: c2, startSeq: u2, avChatRoomKey: d2, messageList: p2 });
                }).catch(function() {
                  var e5 = new Xs({ groupID: i3 });
                  return n3._handleJoinResult({ group: e5, avChatRoomFlag: l2, longPollingKey: c2, startSeq: u2, avChatRoomKey: d2, messageList: p2 });
                });
              default:
                var h2 = new Lo({ code: No.JOIN_GRP_FAIL });
                return Ye.e("".concat(o2, " failed. error:"), h2), Ro(h2);
            }
          }).catch(function(e4) {
            return a2.setMessage("groupID:".concat(i3)), n3.probeNetwork().then(function(t2) {
              var n4 = v(t2, 2), o3 = n4[0], i4 = n4[1];
              a2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_handleJoinResult", value: function(e3) {
          var t2, n3 = this, o2 = e3.group, i3 = e3.avChatRoomFlag, a2 = e3.longPollingKey, s2 = e3.startSeq, r2 = e3.avChatRoomKey, c2 = e3.messageList, u2 = o2.groupID;
          return 1 === i3 ? (this.getModule(to).setCompleted("".concat(L.CONV_GROUP).concat(u2)), this._groupAttributesHandler.initGroupAttributesCache({ groupID: u2, avChatRoomKey: r2 }), this._groupCountersHandler.initGroupCountersCache({ groupID: u2, avChatRoomKey: r2 }), (t2 = ft(a2) ? this._AVChatRoomHandler.handleJoinResult({ group: o2 }) : this._AVChatRoomHandler.startRunLoop({ group: o2, longPollingKey: a2, startSeq: s2 })).then(function() {
            n3._onAVChatRoomHistoryMessage(c2);
          }), t2) : (this.emitGroupListUpdate(true, false), ko({ status: it, group: o2 }));
        } }, { key: "quitGroup", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".").concat("quitGroup"), o2 = "groupID:".concat(e3);
          Ye.l("".concat(n3, " ").concat(o2));
          var i3 = this.checkJoinedAVChatRoomByID(e3);
          if (!i3 && !this.hasLocalGroup(e3))
            return Ro({ code: No.MEMBER_NOT_IN_GRP });
          if (i3 && !this.isLoggedIn())
            return Ye.l("".concat(n3, " anonymously ok. ").concat(o2)), this.deleteLocalGroupAndConversation(e3), this._AVChatRoomHandler.reset(e3), Eo({ groupID: e3 });
          var a2 = new Ms("quitGroup");
          return a2.setMessage(o2), this.request({ protocolName: qi, requestData: { groupID: e3 } }).then(function() {
            return a2.setNetworkType(t2.getNetworkType()).end(), Ye.l("".concat(n3, " ok")), t2.deleteLocalGroupAndConversation(e3), i3 && t2._AVChatRoomHandler.reset(e3), t2._groupAttributesHandler.deleteLocalGroupAttributes(e3), ko({ groupID: e3 });
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              a2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "searchGroupByID", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".").concat("searchGroupByID"), o2 = { groupIDList: [e3] }, i3 = new Ms("searchGroupByID");
          return i3.setMessage("groupID:".concat(e3)), Ye.l("".concat(n3, " groupID:").concat(e3)), this.request({ protocolName: xi, requestData: o2 }).then(function(e4) {
            var o3 = e4.data.groupProfile;
            if (0 !== o3[0].errorCode)
              throw new Lo({ code: o3[0].errorCode, message: o3[0].errorInfo });
            return i3.setNetworkType(t2.getNetworkType()).end(), Ye.l("".concat(n3, " ok")), ko({ group: new Xs(o3[0]) });
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], a2 = n4[1];
              i3.setError(e4, o3, a2).end();
            }), Ye.w("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "changeGroupOwner", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".").concat("changeGroupOwner");
          if (this.hasLocalGroup(e3.groupID) && this.getLocalGroupProfile(e3.groupID).type === L.GRP_AVCHATROOM)
            return Ro({ code: No.CANNOT_CHANGE_OWNER_IN_AVCHATROOM });
          if (e3.newOwnerID === this.getMyUserID())
            return Ro({ code: No.CANNOT_CHANGE_OWNER_TO_SELF });
          var o2 = new Ms("changeGroupOwner");
          return o2.setMessage("groupID:".concat(e3.groupID, " newOwnerID:").concat(e3.newOwnerID)), Ye.l("".concat(n3, " groupID:").concat(e3.groupID)), this.request({ protocolName: Vi, requestData: e3 }).then(function() {
            o2.setNetworkType(t2.getNetworkType()).end(), Ye.l("".concat(n3, " ok"));
            var i3 = e3.groupID, a2 = e3.newOwnerID;
            t2.groupMap.get(i3).ownerID = a2;
            var s2 = t2._groupMemberHandler.getLocalGroupMemberList(i3);
            if (s2 instanceof Map) {
              var r2 = s2.get(t2.getMyUserID());
              ft(r2) || (r2.updateRole("Member"), t2.groupMap.get(i3).selfInfo.role = "Member");
              var c2 = s2.get(a2);
              ft(c2) || c2.updateRole("Owner");
            }
            return t2.emitGroupListUpdate(true, false), ko({ group: t2.groupMap.get(i3) });
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), i3 = n4[0], a2 = n4[1];
              o2.setError(e4, i3, a2).end();
            }), Ye.e("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getGroupApplicationList", value: function() {
          return this._groupSystemNoticeHandler.getGroupApplicationList();
        } }, { key: "handleGroupApplication", value: function(e3) {
          var t2, n3, o2, i3, a2, s2 = this, r2 = "".concat(this._n, ".").concat("handleGroupApplication"), c2 = e3.handleAction, u2 = e3.handleMessage, l2 = e3.message, d2 = e3.application;
          l2 ? (t2 = l2.payload.operatorID, n3 = l2.payload.groupProfile.groupID, o2 = l2.payload.authentication, i3 = l2.payload.messageKey) : d2 && (t2 = d2.applicant, n3 = d2.groupID, o2 = d2.authentication, i3 = d2.messageKey);
          var p2 = Hi;
          d2 && 2 === d2.applicationType && (p2 = Bi, a2 = d2.userID);
          var g2 = new Ms("handleGroupApplication");
          return g2.setMessage("groupID:".concat(n3)), Ye.l("".concat(r2, " groupID:").concat(n3)), this.request({ protocolName: p2, requestData: { handleAction: c2, handleMessage: u2, applicant: t2, invitee: a2, groupID: n3, authentication: o2, messageKey: i3 } }).then(function() {
            return g2.setNetworkType(s2.getNetworkType()).end(), Ye.l("".concat(r2, " ok")), l2 && s2._groupSystemNoticeHandler.deleteGroupSystemNotice({ messageList: [e3.message] }), ko({ group: s2.getLocalGroupProfile(n3) });
          }).catch(function(e4) {
            return s2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              g2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(r2, " failed. error"), e4), Ro(e4);
          });
        } }, { key: "handleGroupInvitation", value: function(e3) {
          var n3 = this, o2 = "".concat(this._n, ".").concat("handleGroupInvitation"), i3 = e3.message.payload, a2 = i3.groupProfile.groupID, s2 = i3.authentication, r2 = i3.messageKey, c2 = i3.operatorID, u2 = e3.handleAction, l2 = new Ms("handleGroupInvitation");
          return l2.setMessage("groupID:".concat(a2, " inviter:").concat(c2, " handleAction:").concat(u2)), Ye.l("".concat(o2, " groupID:").concat(a2, " inviter:").concat(c2, " handleAction:").concat(u2)), this.request({ protocolName: Ki, requestData: t(t({}, e3), {}, { inviter: c2, groupID: a2, authentication: s2, messageKey: r2 }) }).then(function() {
            return l2.setNetworkType(n3.getNetworkType()).end(), Ye.l("".concat(o2, " ok")), n3._groupSystemNoticeHandler.deleteGroupSystemNotice({ messageList: [e3.message] }), ko({ group: n3.getLocalGroupProfile(a2) });
          }).catch(function(e4) {
            return n3.probeNetwork().then(function(t2) {
              var n4 = v(t2, 2), o3 = n4[0], i4 = n4[1];
              l2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(o2, " failed. error"), e4), Ro(e4);
          });
        } }, { key: "getGroupOnlineMemberCount", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".getGroupOnlineMemberCount"), o2 = this._AVChatRoomHandler.checkJoinedAVChatRoomByID(e3), i3 = this.hasLocalGroup(e3);
          if (Ye.l("".concat(n3, " groupID:").concat(e3, " isAVChatRoom:").concat(o2, " has:").concat(i3)), o2)
            return this._AVChatRoomHandler.getGroupOnlineMemberCount(e3);
          if (!i3)
            return Eo({ memberCount: 0 });
          var a2 = Date.now();
          if (this._onlineMemberCountMap.has(e3)) {
            var s2 = this._onlineMemberCountMap.get(e3);
            if (a2 - s2.lastReqTime <= 6e4)
              return Eo({ memberCount: s2.memberCount });
            s2.lastReqTime = a2;
          }
          return this.requestOnlineCount(e3).then(function(o3) {
            var i4 = o3.data.memberCount, a3 = void 0 === i4 ? 0 : i4;
            return t2._onlineMemberCountMap.set(e3, { lastReqTime: Date.now(), memberCount: a3 }), Ye.l("".concat(n3, " ok. groupID:").concat(e3, " memberCount:").concat(a3)), { memberCount: a3 };
          }).catch(function(e4) {
            return Ye.w("".concat(n3, " failed. error:"), e4), Promise.reject(e4);
          });
        } }, { key: "requestOnlineCount", value: function(e3) {
          return this.request({ protocolName: oa, requestData: { groupID: e3 } });
        } }, { key: "hasLocalGroup", value: function(e3) {
          return this.groupMap.has(e3);
        } }, { key: "deleteLocalGroupAndConversation", value: function(e3) {
          var t2 = this.checkJoinedAVChatRoomByID(e3);
          (Ye.l("".concat(this._n, ".deleteLocalGroupAndConversation isJoinedAVChatRoom:").concat(t2)), t2) && this.getModule(to).deleteLocalConversation("".concat(L.CONV_GROUP).concat(e3));
          if (Pt({ groupID: e3 })) {
            var n3 = this.getLocalGroupProfile(e3);
            if (n3 && true === n3.isSupportTopic)
              this.getModule(eo).deleteTopicListInCommunity(e3);
          }
          this._deleteLocalGroup(e3), this._onlineMemberCountMap.delete(e3), this.emitGroupListUpdate(true, false);
        } }, { key: "_deleteLocalGroup", value: function(e3) {
          this.groupMap.delete(e3), this._groupMemberHandler.deleteGroupMemberList(e3);
        } }, { key: "sendMessage", value: function(e3, t2) {
          if (_t(e3._receiverList) && e3._receiverList.length > 0 && !this.canIUse(B.MSG_TO_SPECIFIED_GRP_MBR))
            return this.cannotUseCommercialAbility("group direct messages");
          var n3 = this.createGroupMessagePack(e3, t2);
          return this.request(n3);
        } }, { key: "createGroupMessagePack", value: function(e3, t2) {
          var n3 = null;
          t2 && t2.offlinePushInfo && (n3 = t2.offlinePushInfo);
          var o2 = "";
          pt(e3.cloudCustomData) && e3.cloudCustomData.length > 0 && (o2 = e3.cloudCustomData);
          var i3 = [];
          if (ht(t2) && ht(t2.messageControlInfo)) {
            var a2 = t2.messageControlInfo, s2 = a2.excludedFromUnreadCount, r2 = a2.excludedFromLastMessage, c2 = a2.excludedFromContentModeration;
            true === s2 && i3.push("NoUnread"), true === r2 && i3.push("NoLastMsg"), true === c2 && i3.push("NoMsgCheck");
          }
          var u2 = void 0;
          _t(e3._receiverList) && e3._receiverList.length > 0 && (u2 = e3._receiverList, e3._receiverList.length > 50 && (u2 = e3._receiverList.slice(0, 50), this.outputWarning("ReceiverListLimit")));
          var l2 = this.isOnlineMessage(e3, t2) ? 1 : 0, d2 = e3.getGroupAtInfoList(), p2 = { fromAccount: this.getMyUserID(), groupID: e3.to, msgBody: e3.getElements(), cloudCustomData: o2, random: e3.random, priority: e3.priority, clientSequence: e3.clientSequence, groupAtInfo: e3.type !== L.MSG_TEXT || un(d2) ? void 0 : d2, onlineOnlyFlag: l2, clientTime: e3.clientTime, offlinePushInfo: n3 ? { pushFlag: true === n3.disablePush ? 1 : 0, title: n3.title || "", desc: n3.description || "", ext: n3.extension || "", apnsInfo: { badgeMode: true === n3.ignoreIOSBadge ? 1 : 0, isVoipPush: this._isVoipPush(n3) }, androidInfo: { OPPOChannelID: n3.androidOPPOChannelID || "" } } : void 0, messageControlInfo: 0 === l2 ? i3 : void 0, needReadReceipt: true !== e3.needReadReceipt || this.isMessageFromOrToAVChatroom(e3.to) ? 0 : 1, receiverList: u2, isSupportExtension: true === e3.isSupportExtension ? 1 : 0, isRelayMessage: true === e3._relayFlag ? 1 : 0 };
          return bt(e3.to) && (p2.groupID = Qt(e3.to), p2.topicID = e3.to), { protocolName: qo, tjgID: this.generateTjgID(e3), requestData: p2 };
        } }, { key: "_isVoipPush", value: function(e3) {
          var t2 = void 0;
          return ft(e3.disableVoipPush) || (t2 = false === e3.disableVoipPush ? 1 : 0), t2;
        } }, { key: "revokeMessage", value: function(e3) {
          var t2 = { groupID: e3.to, msgSeqList: [{ msgSeq: e3.sequence }] };
          return bt(e3.to) && (t2.groupID = Qt(e3.to), t2.topicID = e3.to), this.request({ protocolName: Wi, requestData: t2 });
        } }, { key: "deleteMessage", value: function(e3) {
          var t2 = e3.to, n3 = e3.keyList;
          Ye.l("".concat(this._n, ".deleteMessage groupID:").concat(t2, " count:").concat(n3.length));
          var o2 = { groupID: t2, deleter: this.getMyUserID(), keyList: n3 };
          return bt(t2) && (o2.groupID = Qt(t2), o2.topicID = t2), this.request({ protocolName: ia, requestData: o2 });
        } }, { key: "modifyRemoteMessage", value: function(e3) {
          var t2 = e3.to, n3 = e3.sequence, o2 = e3.payload, i3 = e3.type, a2 = e3.version, s2 = void 0 === a2 ? 0 : a2, r2 = e3.cloudCustomData, c2 = t2, u2 = void 0;
          bt(t2) && (c2 = Qt(t2), u2 = t2);
          var l2 = void 0;
          return $t(i3) && (l2 = []).push({ type: i3, content: o2 }), this.request({ protocolName: aa, requestData: { groupID: c2, topicID: u2, sequence: n3, version: s2, elements: l2, cloudCustomData: r2 } });
        } }, { key: "getRoamingMessage", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".getRoamingMessage"), o2 = e3.conversationID, i3 = e3.groupID, a2 = e3.sequence, s2 = new Ms("getGroupRoamingMessages"), r2 = 0, c2 = void 0;
          return bt(i3) && (i3 = Qt(c2 = i3)), this._computeLastSequence({ groupID: i3, topicID: c2, sequence: a2 }).then(function(e4) {
            return r2 = e4, Ye.l("".concat(n3, " groupID:").concat(i3, " startSequence:").concat(r2)), t2.request({ protocolName: Ji, requestData: { groupID: i3, count: 21, sequence: r2, topicID: c2 } });
          }).then(function(e4) {
            var a3 = e4.data, u2 = a3.messageList, l2 = a3.complete, d2 = a3.invisibleSequenceList, p2 = void 0 === d2 ? [] : d2;
            ft(u2) ? Ye.l("".concat(n3, " ok. complete:").concat(l2, " but messageList is undefined!")) : Ye.l("".concat(n3, " ok. complete:").concat(l2, " count:").concat(u2.length));
            var g2 = t2._getMinSequence(p2, u2) - 1;
            s2.setNetworkType(t2.getNetworkType()).setMessage("groupID:".concat(i3, " topicID:").concat(c2, " startSequence:").concat(r2, " complete:").concat(l2, " nextSequence:").concat(g2)).end();
            var h2 = t2.getModule(to), _2 = [];
            return un(u2) ? g2 >= 1 && h2.updateRoamingMessageSequence(o2, g2) : (h2.updateRoamingMessageSequence(o2, g2), _2 = h2.onRoamingMessage(u2, o2), h2.updateIsRead(o2), h2.patchConversationLastMessage(o2)), (2 === l2 || g2 < 1) && (h2.setCompleted(o2), g2 = ""), Ye.l("".concat(n3, " nextReqID:").concat(g2, ", stored message count:").concat(_2.length, ", invisible sequence count:").concat(p2.length)), { nextReqID: g2 + "", storedMessageList: _2 };
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], a3 = n4[1];
              s2.setError(e4, o3, a3).setMessage("groupID:".concat(i3, " topicID:").concat(c2, " startSequence:").concat(r2)).end();
            }), Ye.w("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_getGroupIDOfMessage", value: function(e3) {
          return e3.conversationID.replace(L.CONV_GROUP, "");
        } }, { key: "_getMinSequence", value: function(e3, t2) {
          var n3 = 0;
          un(t2) || (n3 = t2[t2.length - 1].sequence);
          var o2 = 0;
          un(e3) || (o2 = e3[e3.length - 1]);
          return Ye.l("".concat(this._n, "._getMinSequence minVisibleSequence:").concat(n3, " minInvisibleSequence:").concat(o2)), o2 > 0 && (0 === n3 || o2 < n3) ? o2 : n3;
        } }, { key: "getReadReceiptList", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".").concat("getReadReceiptList"), o2 = this._getGroupIDOfMessage(e3[0]), i3 = this.getMyUserID(), a2 = e3.filter(function(e4) {
            return e4.from === i3 && true === e4.needReadReceipt;
          }).map(function(e4) {
            return { sequence: e4.sequence };
          });
          if (Ye.l("".concat(n3, " groupID:").concat(o2, " sequenceList:").concat(JSON.stringify(a2))), 0 === a2.length)
            return Eo({ messageList: e3 });
          var s2 = new Ms("getReadReceiptList");
          return s2.setMessage("groupID:".concat(o2)), this.request({ protocolName: zi, requestData: { groupID: o2, sequenceList: a2 } }).then(function(t3) {
            s2.end(), Ye.l("".concat(n3, " ok"));
            var o3 = t3.data.readReceiptList;
            return _t(o3) && o3.forEach(function(t4) {
              e3.forEach(function(e4) {
                0 === t4.code && t4.sequence === e4.sequence && (e4.readReceiptInfo.readCount = t4.readCount, e4.readReceiptInfo.unreadCount = t4.unreadCount);
              });
            }), ko({ messageList: e3 });
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              s2.setError(e4, o3, i4).end();
            }), Ye.w("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "sendReadReceipt", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".").concat("sendReadReceipt"), o2 = this._getGroupIDOfMessage(e3[0]), i3 = new Ms("sendReadReceipt");
          i3.setMessage("groupID:".concat(o2));
          var a2 = this.getMyUserID(), s2 = e3.filter(function(e4) {
            return e4.from !== a2 && true === e4.needReadReceipt;
          }).map(function(e4) {
            return { sequence: e4.sequence };
          });
          return 0 === s2.length ? Ro({ code: No.READ_RECEIPT_MSG_LIST_EMPTY }) : (Ye.l("".concat(n3, ". sequenceList:").concat(JSON.stringify(s2))), this.request({ protocolName: Xi, requestData: { groupID: o2, sequenceList: s2 } }).then(function(e4) {
            return i3.end(), Ye.l("".concat(n3, " ok")), ko();
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], a3 = n4[1];
              i3.setError(e4, o3, a3).end();
            }), Ye.w("".concat(n3, " failed. error:"), e4), Ro(e4);
          }));
        } }, { key: "getReadReceiptDetail", value: function(e3) {
          var t2 = this, n3 = e3.message, o2 = e3.filter, i3 = e3.cursor, a2 = e3.count, s2 = this._getGroupIDOfMessage(n3), r2 = n3.ID, c2 = n3.sequence, u2 = "".concat(this._n, ".").concat("getReadReceiptDetail"), l2 = this._receiptDetailCompleteMap.get(r2) || false, d2 = 0 !== o2 && 1 !== o2 ? 0 : o2, p2 = pt(i3) ? i3 : "", g2 = !dt(a2) || a2 <= 0 || a2 >= 100 ? 100 : a2, h2 = "groupID:".concat(s2, " sequence:").concat(c2, " cursor:").concat(p2, " filter:").concat(d2, " completeFlag:").concat(l2);
          Ye.l("".concat(u2, " ").concat(h2));
          var _2 = { cursor: "", isCompleted: false, messageID: r2, unreadUserIDList: [], readUserIDList: [] }, f2 = new Ms("getReadReceiptDetail");
          return f2.setMessage(h2), this.request({ protocolName: Zi, requestData: { groupID: s2, sequence: c2, flag: d2, cursor: p2, count: g2 } }).then(function(e4) {
            f2.end();
            var n4 = e4.data, o3 = n4.cursor, i4 = n4.isCompleted, a3 = n4.unreadUserIDList, s3 = n4.readUserIDList;
            return _2.cursor = o3, 1 === i4 && (_2.isCompleted = true, t2._receiptDetailCompleteMap.set(r2, true)), 0 === d2 ? _2.readUserIDList = s3.map(function(e5) {
              return e5.userID;
            }) : 1 === d2 && (_2.unreadUserIDList = a3.map(function(e5) {
              return e5.userID;
            })), Ye.l("".concat(u2, " ok")), ko(_2);
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              f2.setError(e4, o3, i4).end();
            }), Ye.w("".concat(u2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getRoamingMessagesHopping", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".getRoamingMessagesHopping"), o2 = new Ms("getGroupRoamingMessagesHopping"), i3 = e3.groupID, a2 = e3.count, s2 = e3.sequence, r2 = e3.direction, c2 = s2;
          1 === r2 && (c2 = s2 + a2 - 1);
          var u2 = void 0;
          bt(i3) && (i3 = Qt(u2 = i3));
          var l2 = "".concat(u2 ? "topicID:".concat(u2) : "groupID:".concat(i3), " sequence:").concat(s2, " direction:").concat(r2);
          return Ye.l("".concat(n3, " ").concat(l2)), this.request({ protocolName: Ji, requestData: { groupID: i3, topicID: u2, count: a2, sequence: c2 } }).then(function(i4) {
            var a3 = i4.data, c3 = a3.messageList, u3 = a3.complete, d2 = "complete:".concat(u3, " count:").concat(c3 ? c3.length : 0);
            if (Ye.l("".concat(n3, " ok. ").concat(d2)), o2.setNetworkType(t2.getNetworkType()).setMessage("".concat(l2, " ").concat(d2)).end(), 2 === u3 || un(c3)) {
              var p2 = t2._computeResult();
              return ko(p2);
            }
            var g2 = "".concat(L.CONV_GROUP).concat(e3.groupID), h2 = t2.getModule(to).onRoamingMessage(c3, g2, false), _2 = t2._computeResult({ direction: r2, sequence: s2, remoteMessageList: c3, processedMessageList: h2 });
            return ko(_2);
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), r3 = n4[0], c3 = n4[1];
              o2.setError(e4, r3, c3).setMessage("groupID:".concat(i3, " sequence:").concat(s2, " count:").concat(a2)).end();
            }), Ye.w("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_computeResult", value: function(e3) {
          var t2 = { messageList: [], isCompleted: false, nextMessageSeq: "" };
          if (ft(e3))
            return t2.isCompleted = true, t2;
          var n3 = e3.direction, o2 = e3.sequence, i3 = e3.remoteMessageList, a2 = void 0 === i3 ? [] : i3, s2 = e3.processedMessageList, r2 = void 0 === s2 ? [] : s2, c2 = a2.length;
          return 1 === n3 ? (t2.nextMessageSeq = a2[0].sequence + 1, r2.forEach(function(e4) {
            e4.sequence >= o2 && t2.messageList.push(e4);
          }), 0 === t2.messageList.length && a2[0].sequence < o2 && (t2.isCompleted = true, t2.nextMessageSeq = ""), t2) : (t2.nextMessageSeq = a2[c2 - 1].sequence - 1, t2.messageList = m(r2), 0 === t2.nextMessageSeq && (t2.isCompleted = true, t2.nextMessageSeq = ""), t2);
        } }, { key: "setMessageRead", value: function(e3) {
          var t2 = this, n3 = e3.conversationID, o2 = e3.lastMessageSeq, i3 = "".concat(this._n, ".setMessageRead");
          Ye.l("".concat(i3, " conversationID:").concat(n3, " lastMessageSeq:").concat(o2)), dt(o2) || this.outputWarning("DoNotModifyLastSeq");
          var a2 = new Ms("setGroupMessageRead");
          a2.setMessage("".concat(n3, "-").concat(o2));
          var s2 = n3.replace(L.CONV_GROUP, ""), r2 = void 0;
          return bt(s2) && (s2 = Qt(r2 = s2)), this.request({ protocolName: Yi, requestData: { groupID: s2, topicID: r2, messageReadSeq: o2 } }).then(function() {
            a2.setNetworkType(t2.getNetworkType()).end(), Ye.l("".concat(i3, " ok."));
            var e4 = t2.getModule(to);
            e4.updateIsReadAfterReadReport({ conversationID: n3, lastMessageSeq: o2 });
            var c2 = true;
            if (!ft(r2)) {
              c2 = false;
              var u2 = t2.getModule(eo).getLocalTopic(s2, r2);
              u2 && u2.updateSelfInfo({ readedSequence: o2 });
            }
            return e4.updateUnreadCount(n3, c2), ko();
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              a2.setError(e4, o3, i4).end();
            }), Ye.l("".concat(i3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_computeLastSequence", value: function(e3) {
          var t2 = e3.groupID, n3 = e3.topicID, o2 = void 0 === n3 ? void 0 : n3, i3 = e3.sequence;
          return i3 > 0 ? Promise.resolve(i3) : ft(o2) ? this.getGroupLastSequence(t2) : Promise.resolve(0);
        } }, { key: "getGroupLastSequence", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".").concat("getGroupLastSequence"), o2 = new Ms("getGroupLastSequence"), i3 = 0, a2 = "", s2 = "groupID:".concat(e3);
          if (this.hasLocalGroup(e3)) {
            var r2 = this.getLocalGroupProfile(e3), c2 = r2.lastMessage;
            if (c2.lastSequence > 0 && false === c2.onlineOnlyFlag)
              return i3 = c2.lastSequence, a2 = "".concat(s2, ", ").concat(i3, " from group.lastMessage.lastSequence"), Ye.l("".concat(n3, " ").concat(a2)), o2.setNetworkType(this.getNetworkType()).setMessage(a2).end(), Promise.resolve(i3);
            if (r2.nextMessageSeq > 1)
              return i3 = r2.nextMessageSeq - 1, a2 = "".concat(s2, ", ").concat(i3, " from group.nextMessageSeq"), Ye.l("".concat(n3, " ").concat(a2)), o2.setNetworkType(this.getNetworkType()).setMessage(a2).end(), Promise.resolve(i3);
          }
          var u2 = this.getModule(to).getLocalConversation("GROUP".concat(e3));
          if (u2 && u2.lastMessage.lastSequence && false === u2.lastMessage.onlineOnlyFlag)
            return i3 = u2.lastMessage.lastSequence, a2 = "".concat(s2, ", ").concat(i3, " from conversation.lastMessage.lastSequence"), Ye.l("".concat(n3, " ").concat(a2)), o2.setNetworkType(this.getNetworkType()).setMessage(a2).end(), Promise.resolve(i3);
          var l2 = { groupIDList: [e3], responseFilter: { groupBaseInfoFilter: ["NextMsgSeq"] } };
          return this.getGroupProfileAdvance(l2).then(function(e4) {
            var r3 = e4.data.successGroupList;
            return un(r3) ? Ye.w("".concat(n3, " ").concat(s2, ", empty successGroupList")) : (i3 = r3[0].nextMessageSeq - 1, a2 = "".concat(s2, ", ").concat(i3, " from remote"), Ye.l("".concat(n3, " ").concat(a2))), o2.setNetworkType(t2.getNetworkType()).setMessage(a2).end(), i3;
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), i4 = n4[0], a3 = n4[1];
              o2.setError(e4, i4, a3).setMessage(s2).end();
            }), Ye.w("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "isMessageFromOrToAVChatroom", value: function(e3) {
          return this._AVChatRoomHandler.checkJoinedAVChatRoomByID(e3);
        } }, { key: "hasJoinedAVChatRoom", value: function() {
          return this._AVChatRoomHandler.hasJoinedAVChatRoom();
        } }, { key: "getJoinedAVChatRoom", value: function() {
          return this._AVChatRoomHandler.getJoinedAVChatRoom();
        } }, { key: "isOnlineMessage", value: function(e3, t2) {
          return !(!this._canIUseOnlineOnlyFlag(e3) || !t2 || true !== t2.onlineUserOnly);
        } }, { key: "_canIUseOnlineOnlyFlag", value: function(e3) {
          var t2 = this.getJoinedAVChatRoom();
          return !t2 || !t2.includes(e3.to) || e3.conversationType !== L.CONV_GROUP;
        } }, { key: "_onAVChatRoomHistoryMessage", value: function(e3) {
          if (!un(e3)) {
            Ye.l("".concat(this._n, "._onAVChatRoomHistoryMessage count:").concat(e3.length));
            var n3 = [];
            e3.forEach(function(e4) {
              n3.push(t(t({}, e4), {}, { isHistoryMessage: 1 }));
            }), this.onAVChatRoomMessage(n3);
          }
        } }, { key: "onAVChatRoomMessage", value: function(e3) {
          this._AVChatRoomHandler.onMessage(e3);
        } }, { key: "onAVChatRoomMemberBanned", value: function(e3) {
          this._AVChatRoomHandler.onAVChatRoomMemberBanned(e3);
        } }, { key: "getGroupSimplifiedInfo", value: function(e3) {
          var t2 = this, n3 = new Ms("getGroupSimplifiedInfo"), o2 = { groupIDList: [e3], responseFilter: { groupBaseInfoFilter: ["Type", "Name"] } };
          return this.getGroupProfileAdvance(o2).then(function(o3) {
            var i3 = o3.data.successGroupList;
            return n3.setNetworkType(t2.getNetworkType()).setMessage("groupID:".concat(e3, " type:").concat(i3[0].type)).end(), i3[0];
          }).catch(function(o3) {
            t2.probeNetwork().then(function(t3) {
              var i3 = v(t3, 2), a2 = i3[0], s2 = i3[1];
              n3.setError(o3, a2, s2).setMessage("groupID:".concat(e3)).end();
            });
          });
        } }, { key: "setUnjoinedAVChatRoom", value: function(e3) {
          this._unjoinedAVChatRoomList.set(e3, 1);
        } }, { key: "deleteUnjoinedAVChatRoom", value: function(e3) {
          this._unjoinedAVChatRoomList.has(e3) && this._unjoinedAVChatRoomList.delete(e3);
        } }, { key: "isUnjoinedAVChatRoom", value: function(e3) {
          return this._unjoinedAVChatRoomList.has(e3);
        } }, { key: "isGroupAttributesUpdatedNotice", value: function(e3) {
          return this._groupAttributesHandler.isGroupAttributesUpdatedNotice(e3);
        } }, { key: "updateLocalMainSequenceOnReconnected", value: function() {
          this._groupAttributesHandler.updateLocalMainSequenceOnReconnected();
        } }, { key: "initGroupAttributes", value: function(e3) {
          return this._groupAttributesHandler.initGroupAttributes(e3);
        } }, { key: "setGroupAttributes", value: function(e3) {
          return this._groupAttributesHandler.setGroupAttributes(e3);
        } }, { key: "deleteGroupAttributes", value: function(e3) {
          return this._groupAttributesHandler.deleteGroupAttributes(e3);
        } }, { key: "getGroupAttributes", value: function(e3) {
          return this._groupAttributesHandler.getGroupAttributes(e3);
        } }, { key: "isMessageFromTopic", value: function(e3, t2) {
          return 2 === e3 && !un(t2);
        } }, { key: "isMessageFromCommunityOfTopic", value: function(e3, t2) {
          return 2 === e3 && un(t2);
        } }, { key: "getMessageExtensions", value: function(e3, t2) {
          return Ye.l("".concat(this._n, ".getMessageExtensions startSequence:").concat(t2)), this.request({ protocolName: pa, requestData: { groupID: e3.to, messageSequence: e3.sequence, startSequence: t2 } });
        } }, { key: "modifyMessageExtensions", value: function(e3, t2) {
          var n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
          return Ye.l("".concat(this._n, ".modifyMessageExtensions operateType:").concat(n3)), this.request({ protocolName: da, requestData: { groupID: e3.to, messageSequence: e3.sequence, extensionList: t2, operateType: n3 } });
        } }, { key: "_genNotifyReqList", value: function(e3) {
          for (var t2 = [], n3 = 0, o2 = e3.length; n3 < o2; n3++) {
            var i3 = e3[n3], a2 = this.getLocalGroupProfile(i3).type, s2 = this._getGroupLastRevokedTime(i3), r2 = 1e3 * xe(), c2 = { notifyType: 1, limit: 20, type: Pt({ type: a2, groupID: i3 }) ? L.GRP_COMMUNITY : void 0, groupID: i3, beginTime: s2, endTime: r2 };
            t2.push(c2);
          }
          return t2;
        } }, { key: "getGroupNotify", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".getGroupNotify"), o2 = e3.filter(function(e4) {
            var n4 = t2.getLocalGroupProfile(e4), o3 = n4.type, i4 = n4.isSupportTopic;
            return t2.hasLocalGroup(e4) && !Ut(o3) && !i4;
          }), i3 = "filteredGroupIDList.length:".concat(o2.length);
          o2.length <= 10 && (i3 = "filteredGroupIDList:".concat(JSON.stringify(o2))), Ye.l("".concat(n3, " ").concat(i3)), 0 !== o2.length && this.request({ protocolName: ga, requestData: { notifyReqList: this._genNotifyReqList(e3) } }).then(function(e4) {
            var o3 = e4.data.notifyRspList, i4 = [];
            if (_t(o3)) {
              var a2 = { dataList: [] };
              o3.forEach(function(e5) {
                var n4 = e5.nextRevokedTime, o4 = e5.groupID;
                a2.dataList.push({ elements: { revokedInfos: t2._genRevokedInfos(e5) } }), 0 !== n4 ? (t2._setGroupLastRevokedTime(o4, n4), i4.push(o4)) : t2._setGroupLastRevokedTime(o4, 1e3 * xe());
              }), t2.onGroupMessageRevoked(a2);
            }
            i4.length > 0 && t2.getGroupNotify(i4);
            var s2 = "nextGroupIDList.length:".concat(i4.length);
            i4.length <= 10 && (s2 = "nextGroupIDList:".concat(JSON.stringify(i4))), Ye.l("".concat(n3, " ").concat(s2));
          }).catch(function(e4) {
            Ye.e("".concat(n3, " failed. error:"), e4);
          });
        } }, { key: "_genRevokedInfos", value: function(e3) {
          var n3 = e3.notifyList, o2 = e3.groupID, i3 = [];
          return _t(n3) && n3.forEach(function(e4) {
            i3.push({ groupID: o2, sequence: e4.sequence, random: e4.random, revokerInfo: t({}, e4.revokerInfo) });
          }), i3;
        } }, { key: "_getGroupLastRevokedTime", value: function(e3) {
          return this.hasLocalGroup(e3) ? this.getLocalGroupProfile(e3)._lastRevokedTime : 0;
        } }, { key: "_setGroupLastRevokedTime", value: function(e3, t2) {
          this.hasLocalGroup(e3) && (this.getLocalGroupProfile(e3)._lastRevokedTime = t2);
        } }, { key: "isGroupCountersNotice", value: function(e3) {
          return this._groupCountersHandler.isGroupCountersNotice(e3);
        } }, { key: "setGroupCounters", value: function(e3) {
          return this._groupCountersHandler.setGroupCounters(e3);
        } }, { key: "increaseGroupCounter", value: function(e3) {
          return this._groupCountersHandler.increaseGroupCounter(e3);
        } }, { key: "decreaseGroupCounter", value: function(e3) {
          return this._groupCountersHandler.decreaseGroupCounter(e3);
        } }, { key: "getGroupCounters", value: function(e3) {
          return this._groupCountersHandler.getGroupCounters(e3);
        } }, { key: "getGroupMemberHandler", value: function() {
          return this._groupMemberHandler;
        } }, { key: "getGroupMemberList", value: function(e3) {
          return this._groupMemberHandler.getGroupMemberList(e3);
        } }, { key: "getGroupMemberProfile", value: function(e3) {
          return this._groupMemberHandler.getGroupMemberProfile(e3);
        } }, { key: "addGroupMember", value: function(e3) {
          return this._groupMemberHandler.addGroupMember(e3);
        } }, { key: "deleteGroupMember", value: function(e3) {
          return this._groupMemberHandler.deleteGroupMember(e3);
        } }, { key: "setGroupMemberMuteTime", value: function(e3) {
          return this._groupMemberHandler.setGroupMemberMuteTime(e3);
        } }, { key: "setGroupMemberRole", value: function(e3) {
          return this._groupMemberHandler.setGroupMemberRole(e3);
        } }, { key: "setGroupMemberNameCard", value: function(e3) {
          return this._groupMemberHandler.setGroupMemberNameCard(e3);
        } }, { key: "setGroupMemberCustomField", value: function(e3) {
          return this._groupMemberHandler.setGroupMemberCustomField(e3);
        } }, { key: "markGroupMemberList", value: function(e3) {
          return this._groupMemberHandler.markGroupMemberList(e3);
        } }, { key: "modifyGroupMemberInfo", value: function(e3) {
          return this._groupMemberHandler.modifyGroupMemberInfo(e3);
        } }, { key: "restartPolling", value: function() {
          this._AVChatRoomHandler.restartPolling();
        } }, { key: "getPollingTimerID", value: function(e3) {
          if (!e3)
            return -1;
          var t2 = this.getLocalGroupProfile(e3);
          return t2 && Ut(t2.type) ? this._AVChatRoomHandler.getPollingTimerID(e3) : -1;
        } }, { key: "_canIUseJoinOption", value: function(e3) {
          return function(e4) {
            return e4 === L.GRP_PUBLIC;
          }(e3) || Pt({ type: e3 });
        } }, { key: "reset", value: function() {
          this.groupMap.clear(), this._unjoinedAVChatRoomList.clear(), this._receiptDetailCompleteMap.clear(), this._onlineMemberCountMap.clear(), this._commonGroupHandler.reset(), this._groupSystemNoticeHandler.reset(), this._groupTipsHandler.reset(), this._groupAttributesHandler.reset(), this._groupCountersHandler.reset(), this._AVChatRoomHandler.reset(), this._groupMemberHandler.reset();
        } }]), i2;
      }(Oo), Tr = ["topicID", "topicName", "avatar", "introduction", "notification", "unreadCount", "muteAllMembers", "customData", "groupAtInfoList", "nextMessageSeq", "selfInfo"], kr = function(e2, t2) {
        return un(e2) ? { lastTime: 0, lastSequence: 0, fromAccount: "", payload: null, type: "", messageForShow: "", nick: "", version: 0, cloudCustomData: "", isRevoked: false, revoker: null } : { lastTime: e2.time || 0, lastSequence: e2.sequence || 0, fromAccount: e2.from || "", payload: e2.payload || null, type: e2.type || "", messageForShow: Zt(e2.type, e2.payload, t2), nick: e2.nick || "", version: e2.version || 0, cloudCustomData: e2.cloudCustomData || "", isRevoked: e2.isRevoked || false, revoker: e2.revoker || null };
      }, Lr = function() {
        function e2(t2, n2) {
          o(this, e2), this.topicID = "", this.topicName = "", this.avatar = "", this.introduction = "", this.notification = "", this.unreadCount = 0, this.muteAllMembers = false, this.customData = "", this.groupAtInfoList = [], this.nextMessageSeq = 0, this.lastMessage = kr(t2.lastMessage, n2), this.selfInfo = { muteTime: 0, readedSequence: 0, messageRemindType: "", excludedUnreadSequenceList: void 0 }, this._initTopic(t2);
        }
        return a(e2, [{ key: "_initTopic", value: function(e3) {
          for (var t2 in e3)
            Tr.indexOf(t2) < 0 || ("selfInfo" === t2 ? this.updateSelfInfo(e3[t2]) : this[t2] = "muteAllMembers" === t2 ? 1 === e3[t2] : e3[t2]);
        } }, { key: "updateUnreadCount", value: function() {
          var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
          this.unreadCount = e3;
        } }, { key: "updateNextMessageSeq", value: function(e3) {
          this.nextMessageSeq = e3;
        } }, { key: "updateLastMessage", value: function(e3) {
          this.lastMessage = kr(e3);
        } }, { key: "updateGroupAtInfoList", value: function(e3) {
          this.groupAtInfoList = JSON.parse(JSON.stringify(e3));
        } }, { key: "updateTopic", value: function(e3) {
          ft(e3.selfInfo) || this.updateSelfInfo(e3.selfInfo), ft(e3.muteAllMembers) || (this.muteAllMembers = 1 === e3.muteAllMembers), Dt(this, e3, ["groupID", "lastMessageTime", "selfInfo", "muteAllMembers", "lastMsg"]);
        } }, { key: "updateSelfInfo", value: function(e3) {
          return 0 !== Dt(this.selfInfo, e3, [], [""]);
        } }, { key: "reduceUnreadCount", value: function() {
          return this.unreadCount >= 1 && (this.unreadCount -= 1, true);
        } }, { key: "isLastMessageRevoked", value: function(e3) {
          return e3.sequence === this.lastMessage.lastSequence;
        } }, { key: "setLastMessageRevoked", value: function(e3) {
          this.lastMessage.isRevoked = e3;
        } }, { key: "setLastMessageRevoker", value: function(e3) {
          this.lastMessage.revoker = e3;
        } }]), e2;
      }(), Nr = function(e2) {
        r(i2, e2);
        var n2 = f(i2);
        function i2(e3) {
          var t2;
          return o(this, i2), (t2 = n2.call(this, e3))._n = "TopicModule", t2._topicMap = /* @__PURE__ */ new Map(), t2._getTopicTimeMap = /* @__PURE__ */ new Map(), t2.TOPIC_CACHE_TIME = 300, t2.TOPIC_LAST_ACTIVE_TIME = 3600, t2.getInnerEmitterInstance().on(Fs.CLOUD_CONFIG_UPDATED, t2._onCloudConfigUpdated, h(t2)), t2;
        }
        return a(i2, [{ key: "_onCloudConfigUpdated", value: function() {
          var e3 = this.getCloudConfig("topic_cache_time"), t2 = this.getCloudConfig("topic_last_active_time");
          ft(e3) || (this.TOPIC_CACHE_TIME = Number(e3)), ft(t2) || (this.TOPIC_LAST_ACTIVE_TIME = Number(t2));
        } }, { key: "onTopicCreated", value: function(e3) {
          var t2 = e3.groupID;
          this.resetGetTopicTime(t2), this.emitOuterEvent(k.TOPIC_CREATED, e3);
        } }, { key: "onTopicDeleted", value: function(e3) {
          var t2 = this, n3 = e3.groupID, o2 = e3.topicIDList;
          (void 0 === o2 ? [] : o2).forEach(function(e4) {
            t2._deleteLocalTopic(n3, e4);
          }), this.emitOuterEvent(k.TOPIC_DELETED, e3);
        } }, { key: "onTopicMessageRemindTypeUpdated", value: function(e3) {
          var t2 = e3.groupID, n3 = e3.topicID, o2 = e3.messageRemindType, i3 = this.getLocalTopic(t2, n3);
          if (i3) {
            var a2 = i3.updateSelfInfo({ messageRemindType: o2 });
            a2 && this.emitOuterEvent(k.TOPIC_UPDATED, { groupID: t2, topic: i3 }), Ye.d("".concat(this._n, ".onTopicMessageRemindTypeUpdated topicID:").concat(n3) + " messageRemindType:".concat(o2, " isTopicUpdated:").concat(a2));
          }
        } }, { key: "onTopicProfileUpdated", value: function(e3) {
          var t2 = e3.groupID, n3 = e3.topicID, o2 = this.getLocalTopic(t2, n3);
          o2 && (o2.updateTopic(e3), this.emitOuterEvent(k.TOPIC_UPDATED, { groupID: t2, topic: o2 }));
        } }, { key: "onConversationProxy", value: function(e3) {
          var t2 = e3.topicID, n3 = e3.unreadCount, o2 = e3.groupAtInfoList, i3 = Qt(t2), a2 = this.getLocalTopic(i3, t2), s2 = false;
          a2 && (ft(n3) || a2.unreadCount === n3 || (a2.updateUnreadCount(n3), s2 = true), ft(o2) || (a2.updateGroupAtInfoList(o2), s2 = true)), s2 && this.emitOuterEvent(k.TOPIC_UPDATED, { groupID: i3, topic: a2 });
        } }, { key: "onMessageSent", value: function(e3) {
          var t2 = e3.groupID, n3 = e3.topicID, o2 = e3.lastMessage, i3 = this.getLocalTopic(t2, n3);
          i3 && (i3.nextMessageSeq += 1, i3.updateLastMessage(o2), this.emitOuterEvent(k.TOPIC_UPDATED, { groupID: t2, topic: i3 }));
        } }, { key: "onMessageModified", value: function(e3) {
          var t2 = e3.to, n3 = e3.time, o2 = e3.sequence, i3 = e3.elements, a2 = e3.cloudCustomData, s2 = e3.messageVersion, r2 = Qt(t2), c2 = this.getLocalTopic(r2, t2);
          if (c2) {
            var u2 = c2.lastMessage;
            Ye.d("".concat(this._n, ".onMessageModified topicID:").concat(t2, " lastMessage:"), JSON.stringify(u2), "options:", JSON.stringify(e3)), u2 && (null === u2.payload || u2.lastTime === n3 && u2.lastSequence === o2 && u2.version !== s2) && (u2.type = i3[0].type, u2.payload = i3[0].content, u2.messageForShow = Zt(u2.type, u2.payload, this.isIntl()), u2.cloudCustomData = a2, u2.version = s2, u2.lastSequence = o2, u2.lastTime = n3, this.emitOuterEvent(k.TOPIC_UPDATED, { groupID: r2, topic: c2 }));
          }
        } }, { key: "onMessageRevoked", value: function(e3) {
          var t2 = this;
          if (0 !== e3.length) {
            var n3 = null, o2 = null, i3 = false;
            e3.forEach(function(e4) {
              var a2 = e4.to;
              o2 = Qt(a2), (n3 = t2.getLocalTopic(o2, a2)) && (n3.reduceUnreadCount() && (i3 = true), n3.isLastMessageRevoked(e4) && (n3.setLastMessageRevoked(true), n3.setLastMessageRevoker(e4.revoker), i3 = true));
            }), i3 && this.emitOuterEvent(k.TOPIC_UPDATED, { groupID: o2, topic: n3 });
          }
        } }, { key: "isLastMessageRevoked", value: function(e3) {
          var t2 = e3.topicID, n3 = e3.sequence, o2 = Qt(t2), i3 = this.getLocalTopic(o2, t2), a2 = false;
          return i3 && (a2 = i3.isLastMessageRevoked({ sequence: n3 })), a2;
        } }, { key: "getJoinedCommunityList", value: function() {
          return this.getModule(Zn).syncCommunityWithTopic();
        } }, { key: "createTopicInCommunity", value: function(e3) {
          var n3 = this, o2 = "".concat(this._n, ".").concat("createTopicInCommunity"), i3 = e3.topicID;
          if (!ft(i3) && !bt(i3))
            return Ro({ code: No.ILLEGAL_TOPIC_ID });
          if (e3.topicName && false === this._filterProfanity("topicName", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          if (e3.introduction && false === this._filterProfanity("introduction", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          if (e3.notification && false === this._filterProfanity("notification", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          var a2 = new Ms("createTopicInCommunity");
          return this.request({ protocolName: Wa, requestData: t({}, e3) }).then(function(i4) {
            var s2 = i4.data.topicID;
            return a2.setMessage("topicID:".concat(s2)).setNetworkType(n3.getNetworkType()).end(), Ye.l("".concat(o2, " ok. topicID:").concat(s2)), n3._updateTopicMap([t(t({}, e3), {}, { topicID: s2 })]), ko({ topicID: s2 });
          }).catch(function(e4) {
            return n3.probeNetwork().then(function(t2) {
              var n4 = v(t2, 2), o3 = n4[0], i4 = n4[1];
              a2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "deleteTopicFromCommunity", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".").concat("deleteTopicFromCommunity"), o2 = e3.groupID, i3 = e3.topicIDList, a2 = void 0 === i3 ? [] : i3, s2 = new Ms("deleteTopicFromCommunity");
          return s2.setMessage("groupID:".concat(o2, " topicIDList:").concat(a2)), this.request({ protocolName: Ya, requestData: { groupID: o2, topicIDList: a2 } }).then(function(e4) {
            var i4 = e4.data.resultList, a3 = [], r2 = [];
            (void 0 === i4 ? [] : i4).forEach(function(e5) {
              var t3 = e5.topicID, n4 = e5.errorCode, o3 = e5.errorInfo;
              0 === n4 ? a3.push({ topicID: t3 }) : r2.push({ topicID: t3, code: n4, message: o3 });
            });
            var c2 = "success count:".concat(a3.length, ", fail count:").concat(r2.length);
            return s2.setMoreMessage(c2).setNetworkType(t2.getNetworkType()).end(), Ye.l("".concat(n3, " ok. ").concat(c2)), a3.forEach(function(e5) {
              t2._deleteLocalTopic(o2, e5.topicID);
            }), ko({ successTopicList: a3, failureTopicList: r2 });
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              s2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "updateTopicProfile", value: function(e3) {
          var n3 = this, o2 = "".concat(this._n, ".").concat("updateTopicProfile");
          if (Ye.l("".concat(o2, " options:"), e3), e3.topicName && false === this._filterProfanity("topicName", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          if (e3.introduction && false === this._filterProfanity("introduction", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          if (e3.notification && false === this._filterProfanity("notification", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          var i3 = new Ms("updateTopicProfile");
          return i3.setMessage("groupID:".concat(e3.groupID, " topicID:").concat(e3.topicID)), ft(e3.muteAllMembers) || (e3.muteAllMembers = true === e3.muteAllMembers ? "On" : "Off"), this.request({ protocolName: ja, requestData: t({}, e3) }).then(function() {
            return i3.setNetworkType(n3.getNetworkType()).end(), Ye.l("".concat(o2, " ok")), n3._updateTopicMap([e3]), ko({ topic: n3.getLocalTopic(e3.groupID, e3.topicID) });
          }).catch(function(e4) {
            return n3.probeNetwork().then(function(t2) {
              var n4 = v(t2, 2), o3 = n4[0], a2 = n4[1];
              i3.setError(e4, o3, a2).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getTopicList", value: function(e3) {
          var n3 = this, o2 = "".concat(this._n, ".").concat("getTopicList"), i3 = e3.groupID, a2 = e3.topicIDList, s2 = void 0 === a2 ? [] : a2, r2 = 0 === s2.length, c2 = new Ms("getTopicList");
          if (c2.setMessage("groupID:".concat(i3)), this._getTopicTimeMap.has(i3)) {
            var u2 = this._getTopicTimeMap.get(i3), l2 = u2.isGetAll, d2 = u2.time;
            if ((l2 || !l2 && !r2) && Date.now() - d2 < 1e3 * this.TOPIC_CACHE_TIME) {
              var p2 = this._getLocalTopicList(i3, s2);
              if (r2 || p2.length === s2.length)
                return c2.setNetworkType(this.getNetworkType()).setMoreMessage("from cache, topic count:".concat(p2.length)).end(), Ye.l("".concat(o2, " groupID:").concat(i3, " from cache, topic count:").concat(p2.length)), Eo({ successTopicList: p2, failureTopicList: [] });
            }
          }
          return this.request({ protocolName: Ja, requestData: { groupID: i3, topicIDList: s2 } }).then(function(e4) {
            var a3 = e4.data.topicInfoList, s3 = [], u3 = [], l3 = [];
            (void 0 === a3 ? [] : a3).forEach(function(e5) {
              var n4 = e5.topic, o3 = e5.selfInfo, i4 = e5.errorCode, a4 = e5.errorInfo, r3 = n4.topicID;
              0 === i4 ? (s3.push(t(t({}, n4), {}, { selfInfo: o3 })), u3.push(r3)) : l3.push({ topicID: r3, code: i4, message: a4 });
            }), n3._updateTopicMap(s3), n3._handleTopicAtInfo(s3);
            var d3 = "success count:".concat(u3.length, ", fail count:").concat(l3.length);
            c2.setNetworkType(n3.getNetworkType()).setMoreMessage(d3).end(), Ye.l("".concat(o2, " groupID:").concat(i3, " from remote, ").concat(d3));
            var p3 = [];
            return un(u3) || (n3._getTopicTimeMap.set(i3, { time: Date.now(), isGetAll: r2 }), p3 = n3._getLocalTopicList(i3, u3)), ko({ successTopicList: p3, failureTopicList: l3 });
          }).catch(function(e4) {
            return n3.probeNetwork(e4).then(function(t2) {
              var n4 = v(t2, 2), o3 = n4[0], i4 = n4[1];
              c2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "hasLocalTopic", value: function(e3, t2) {
          return !!this._topicMap.has(e3) && this._topicMap.get(e3).has(t2);
        } }, { key: "getLocalTopic", value: function(e3, t2) {
          var n3 = null;
          return this._topicMap.has(e3) && (n3 = this._topicMap.get(e3).get(t2)), n3;
        } }, { key: "_getLocalTopicList", value: function(e3) {
          var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], n3 = this._topicMap.get(e3), o2 = [];
          return n3 && (o2 = m(n3.values())), 0 === t2.length ? o2 : o2.filter(function(e4) {
            return t2.includes(e4.topicID);
          });
        } }, { key: "_deleteLocalTopic", value: function(e3, t2) {
          this._topicMap.has(e3) && this._topicMap.get(e3).has(t2) && (this._topicMap.get(e3).delete(t2), Ye.l("".concat(this._n, "._deleteLocalTopic groupID:").concat(e3, " topicID:").concat(t2)));
        } }, { key: "_updateTopicMap", value: function(e3) {
          var t2 = this, n3 = [];
          (e3.forEach(function(e4) {
            var o2 = e4.groupID, i3 = e4.topicID, a2 = null;
            t2._topicMap.has(o2) || t2._topicMap.set(o2, /* @__PURE__ */ new Map()), t2._topicMap.get(o2).has(i3) ? (a2 = t2._topicMap.get(o2).get(i3)).updateTopic(e4) : (t2._getTopicLastMessage(e4), a2 = new Lr(e4, t2.isIntl()), t2._topicMap.get(o2).set(i3, a2));
            var s2 = t2._computeUnreadCount(a2);
            a2.updateUnreadCount(s2), n3.push({ conversationID: "".concat(L.CONV_GROUP).concat(i3), type: L.CONV_TOPIC, unreadCount: s2 });
          }), n3.length > 0) && this.getModule(to).updateTopicConversation(n3);
        } }, { key: "resetGetTopicTime", value: function(e3) {
          var t2 = this;
          ft(e3) ? m(this._getTopicTimeMap.keys()).forEach(function(e4) {
            t2._getTopicTimeMap.set(e4, 0);
          }) : this._getTopicTimeMap.set(e3, 0);
        } }, { key: "getTopicListOnReconnected", value: function() {
          var e3 = this, t2 = m(this._topicMap.keys()), n3 = [], o2 = this.getModule(to);
          t2.forEach(function(t3) {
            var i3 = [], a2 = e3._getLocalTopicList(t3);
            o2.deleteTopicRoamingMessageInfo(t3), a2.forEach(function(t4) {
              var n4 = t4.lastMessage.lastTime, o3 = void 0 === n4 ? 0 : n4;
              Date.now() - 1e3 * o3 < 1e3 * e3.TOPIC_LAST_ACTIVE_TIME && i3.push(t4.topicID);
            }), i3.length > 0 && n3.push({ groupID: t3, topicIDList: i3 });
          }), Ye.l("".concat(this._n, ".getTopicListOnReconnected. active community count:").concat(n3.length)), this._relayGetTopicList(n3);
        } }, { key: "_relayGetTopicList", value: function(e3) {
          var t2 = this;
          if (0 !== e3.length) {
            var n3 = e3.shift(), o2 = n3.topicIDList.length > 5 ? "topicIDList.length:".concat(n3.topicIDList.length) : "topicIDList:".concat(n3.topicIDList), i3 = new Ms("relayGetTopicList");
            i3.setMessage(o2), Ye.l("".concat(this._n, "._relayGetTopicList. ").concat(o2)), this.getTopicList(n3).then(function() {
              i3.setNetworkType(t2.getNetworkType()).end(), t2._relayGetTopicList(e3);
            }).catch(function(n4) {
              t2.probeNetwork().then(function(e4) {
                var t3 = v(e4, 2), o3 = t3[0], a2 = t3[1];
                i3.setError(n4, o3, a2).end();
              }), t2._relayGetTopicList(e3);
            });
          }
        } }, { key: "_handleTopicAtInfo", value: function(e3) {
          var n3 = this;
          0 !== e3.length && e3.forEach(function(e4) {
            var o2 = e4.groupID, i3 = e4.topicID, a2 = e4.groupAtInfoList, s2 = [];
            ft(a2) || (a2.forEach(function(e5) {
              s2.push(t(t({}, e5), {}, { groupID: o2, topicID: i3 }));
            }), n3.getModule(to).onNewGroupAtTips({ dataList: s2 }));
          });
        } }, { key: "_getTopicLastMessage", value: function(e3) {
          if (!ft(e3.lastMsg)) {
            var t2 = { time: e3.lastMsg.time, sequence: e3.lastMsg.sequence, from: e3.lastMsg.from, payload: e3.lastMsg.elements[0] ? e3.lastMsg.elements[0].content : null, type: e3.lastMsg.elements[0] ? e3.lastMsg.elements[0].type : "", nick: e3.lastMsg.nick, version: e3.lastMsg.messageVersion, cloudCustomData: e3.lastMsg.cloudCustomData, isRevoked: 2 === e3.lastMsg.isPlaceMessage, revoker: un(e3.lastMsg.revokerInfo) ? null : e3.lastMsg.revokerInfo.revoker };
            e3.lastMessage = t2;
          }
        } }, { key: "deleteTopicListInCommunity", value: function(e3) {
          var t2 = this, n3 = this._getLocalTopicList(e3), o2 = this.getModule(to);
          n3.forEach(function(n4) {
            var i3 = n4.topicID;
            t2._deleteLocalTopic(e3, i3), t2._getTopicTimeMap.delete(e3), o2.deleteLocalConversation("".concat(L.CONV_GROUP).concat(i3));
          });
        } }, { key: "_computeUnreadCount", value: function(e3) {
          var t2 = e3.selfInfo, n3 = t2.excludedUnreadSequenceList, o2 = t2.readedSequence, i3 = e3.nextMessageSeq - e3.selfInfo.readedSequence - 1;
          if (_t(n3)) {
            var a2 = 0;
            n3.forEach(function(t3) {
              t3 >= o2 && t3 <= e3.nextMessageSeq - 1 && (a2 += 1);
            }), a2 >= 1 && (i3 -= a2);
          }
          return i3 < 0 ? 0 : i3;
        } }, { key: "_filterProfanity", value: function(e3, t2) {
          var n3 = this.getModule(Mo);
          if (!n3)
            return true;
          var o2 = n3.filterText(t2[e3], X), i3 = o2.isAllowedToSend, a2 = o2.modifiedText;
          return true === i3 && (t2[e3] = a2, true);
        } }, { key: "updateLastMessage", value: function(e3, t2) {
          var n3 = Qt(e3), o2 = this.getLocalTopic(n3, e3);
          if (o2) {
            var i3 = t2.sequence + 1;
            o2.updateNextMessageSeq(i3), o2.updateLastMessage(t2), this.emitOuterEvent(k.TOPIC_UPDATED, { groupID: n3, topic: o2 });
          }
        } }, { key: "getMessageExtensions", value: function(e3, t2) {
          Ye.l("".concat(this._n, ".getMessageExtensions startSequence:").concat(t2));
          var n3 = Qt(e3.to);
          return this.request({ protocolName: pa, requestData: { groupID: n3, topicID: e3.to, messageSequence: e3.sequence, startSequence: t2 } });
        } }, { key: "modifyMessageExtensions", value: function(e3, t2) {
          var n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
          Ye.l("".concat(this._n, ".modifyMessageExtensions operateType:").concat(n3));
          var o2 = Qt(e3.to);
          return this.request({ protocolName: da, requestData: { groupID: o2, topicID: e3.to, messageSequence: e3.sequence, extensionList: t2, operateType: n3 } });
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._topicMap.clear(), this._getTopicTimeMap.clear(), this.TOPIC_CACHE_TIME = 300, this.TOPIC_LAST_ACTIVE_TIME = 3600;
        } }]), i2;
      }(Oo), Sr = function() {
        function e2(t2) {
          o(this, e2), this._userModule = t2, this._n = "ProfileHandler", this.TAG = "profile", this.accountProfileMap = /* @__PURE__ */ new Map(), this.expirationTime = 864e5;
        }
        return a(e2, [{ key: "setExpirationTime", value: function(e3) {
          this.expirationTime = e3;
        } }, { key: "getUserProfile", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("getUserProfile"), o2 = e3.userIDList;
          e3.fromAccount = this._userModule.getMyAccount(), o2.length > 100 && (Ye.w("".concat(n2, " ").concat(nn(100))), o2.length = 100);
          for (var i2, a2 = [], s2 = [], r2 = 0, c2 = o2.length; r2 < c2; r2++)
            i2 = o2[r2], this._userModule.isMyFriend(i2) && this._contains(i2) ? s2.push(this._getProfileFromMap(i2)) : a2.push(i2);
          if (0 === a2.length)
            return Eo(s2);
          e3.toAccount = a2;
          var u2 = e3.bFromGetMyProfile || false, l2 = [];
          e3.toAccount.forEach(function(e4) {
            l2.push({ toAccount: e4, standardSequence: 0, customSequence: 0 });
          }), e3.userItem = l2;
          var d2 = new Ms("getUserProfile");
          return d2.setMessage(o2.length > 5 ? "userIDList.length:".concat(o2.length) : "userIDList:".concat(o2)), this._userModule.request({ protocolName: xo, requestData: e3 }).then(function(e4) {
            d2.setNetworkType(t2._userModule.getNetworkType()).end(), Ye.i("".concat(n2, " ok"));
            var o3 = t2._handleResponse(e4).concat(s2);
            return ko(u2 ? o3[0] : o3);
          }).catch(function(e4) {
            return t2._userModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              d2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getMyProfile", value: function() {
          var e3 = this._userModule.getMyAccount(), t2 = "".concat(this._n, ".getMyProfile");
          if (Ye.l("".concat(t2, " myAccount:").concat(e3)), this._fill(), this._contains(e3)) {
            var n2 = this._getProfileFromMap(e3);
            return Ye.d("".concat(t2, " from cache, myProfile:").concat(JSON.stringify(n2))), Eo(n2);
          }
          return this.getUserProfile({ fromAccount: e3, userIDList: [e3], bFromGetMyProfile: true });
        } }, { key: "_handleResponse", value: function(e3) {
          var t2 = e3.data.userProfileItem;
          if (!_t(t2))
            return [];
          for (var n2 = [], o2 = Date.now(), i2 = 0, a2 = t2.length; i2 < a2; i2++) {
            var s2 = t2[i2], r2 = s2.to, c2 = s2.profileItem;
            if ("@TLS#NOT_FOUND" !== r2 && "" !== r2) {
              var u2 = this._update(r2, this._getLatestProfileFromResponse(r2, c2)).latestProfile;
              n2.push(u2);
            }
          }
          return Ye.l("".concat(this._n, "._handleResponse cost ").concat(Date.now() - o2, " ms")), n2;
        } }, { key: "_getLatestProfileFromResponse", value: function(e3, t2) {
          var n2 = { userID: e3, profileCustomField: [] };
          if (!un(t2))
            for (var o2 = 0, i2 = t2.length; o2 < i2; o2++)
              if (t2[o2].tag.indexOf("Tag_Profile_Custom") > -1)
                n2.profileCustomField.push({ key: t2[o2].tag, value: t2[o2].value });
              else
                switch (t2[o2].tag) {
                  case Je.NICK:
                    n2.nick = t2[o2].value;
                    break;
                  case Je.GENDER:
                    n2.gender = t2[o2].value;
                    break;
                  case Je.BIRTHDAY:
                    n2.birthday = t2[o2].value;
                    break;
                  case Je.LOCATION:
                    n2.location = t2[o2].value;
                    break;
                  case Je.SELFSIGNATURE:
                    n2.selfSignature = t2[o2].value;
                    break;
                  case Je.ALLOWTYPE:
                    n2.allowType = t2[o2].value;
                    break;
                  case Je.LANGUAGE:
                    n2.language = t2[o2].value;
                    break;
                  case Je.AVATAR:
                    n2.avatar = t2[o2].value;
                    break;
                  case Je.MESSAGESETTINGS:
                    n2.messageSettings = t2[o2].value;
                    break;
                  case Je.ADMINFORBIDTYPE:
                    n2.adminForbidType = t2[o2].value;
                    break;
                  case Je.LEVEL:
                    n2.level = t2[o2].value;
                    break;
                  case Je.ROLE:
                    n2.role = t2[o2].value;
                    break;
                  default:
                    Ye.w("".concat(this._n, "._getLatestProfileFromResponse unknown tag:"), t2[o2].tag, t2[o2].value);
                }
          return n2;
        } }, { key: "updateMyProfile", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("updateMyProfile");
          if (e3.nick && false === this._userModule.filterProfanity("nick", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          if (e3.selfSignature && false === this._userModule.filterProfanity("selfSignature", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          var o2 = new Ms("updateMyProfile");
          o2.setMessage(JSON.stringify(e3));
          var i2 = new Ys().validate(e3);
          if (!i2.valid)
            return o2.setCode(No.UPDATE_PROFILE_INVALID_PARAM).setMoreMessage("info:".concat(i2.tips)).setNetworkType(this._userModule.getNetworkType()).end(), Ye.e("".concat(n2, " info:").concat(i2.tips)), Ro({ code: No.UPDATE_PROFILE_INVALID_PARAM });
          var a2 = [];
          for (var s2 in e3)
            Object.prototype.hasOwnProperty.call(e3, s2) && ("profileCustomField" === s2 ? e3.profileCustomField.forEach(function(e4) {
              a2.push({ tag: e4.key, value: e4.value });
            }) : a2.push({ tag: Je[s2.toUpperCase()], value: e3[s2] }));
          if (0 === a2.length) {
            var r2 = new Lo({ code: No.UPDATE_PROFILE_NO_KEY });
            return o2.setError(r2, true, this._userModule.getNetworkType()).end(), Ye.e("".concat(n2, " failed. error:"), r2), Ro(r2);
          }
          var c2 = this._userModule.getMyAccount();
          return this._userModule.request({ protocolName: Vo, requestData: { fromAccount: c2, profileItem: a2 } }).then(function(i3) {
            o2.setNetworkType(t2._userModule.getNetworkType()).end(), Ye.i("".concat(n2, " ok"));
            var a3 = t2._update(c2, e3), s3 = a3.isProfileUpdated, r3 = a3.latestProfile;
            return true === s3 && t2._userModule.emitOuterEvent(k.PROFILE_UPDATED, [r3]), Eo(r3);
          }).catch(function(e4) {
            return t2._userModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), i3 = n3[0], a3 = n3[1];
              o2.setError(e4, i3, a3).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "onProfileModified", value: function(e3) {
          var t2 = e3.dataList;
          if (!un(t2)) {
            var n2, o2 = t2.length;
            Ye.d("".concat(this._n, ".onProfileModified count:").concat(o2, " dataList:"), e3.dataList);
            for (var i2 = [], a2 = 0; a2 < o2; a2++) {
              n2 = t2[a2].userID;
              var s2 = this._update(n2, this._getLatestProfileFromResponse(n2, t2[a2].profileList)), r2 = s2.isProfileUpdated, c2 = s2.latestProfile;
              true === r2 && i2.push(c2);
            }
            i2.length > 0 && (this._userModule.emitInnerEvent(Fs.PROFILE_UPDATED, i2), this._userModule.emitOuterEvent(k.PROFILE_UPDATED, i2));
          }
        } }, { key: "_fill", value: function() {
          if (0 === this.accountProfileMap.size) {
            for (var e3 = this._getCachedProfiles(), t2 = Date.now(), n2 = 0, o2 = e3.length; n2 < o2; n2++)
              t2 - e3[n2].lastUpdatedTime < this.expirationTime && this.accountProfileMap.set(e3[n2].userID, e3[n2]);
            Ye.l("".concat(this._n, "._fill from cache, size:").concat(this.accountProfileMap.size));
          }
        } }, { key: "_update", value: function(e3, t2) {
          var n2, o2 = false, i2 = Date.now();
          this._contains(e3) ? (n2 = this._getProfileFromMap(e3), t2.profileCustomField && true === Gt(n2.profileCustomField, t2.profileCustomField) && (n2.lastUpdatedTime = i2, o2 = true), Dt(n2, t2, ["profileCustomField"]) > 0 && (n2.lastUpdatedTime = i2, o2 = true)) : (n2 = new Ys(t2), (this._userModule.isMyFriend(e3) || e3 === this._userModule.getMyAccount()) && (n2.lastUpdatedTime = i2, o2 = true, this.accountProfileMap.set(e3, n2)));
          return this._flush(e3 === this._userModule.getMyAccount()), true === o2 && Ye.l("".concat(this._n, "._update account:").concat(e3, " isProfileUpdated:").concat(o2)), { isProfileUpdated: o2, latestProfile: n2 };
        } }, { key: "_flush", value: function(e3) {
          var t2 = m(this.accountProfileMap.values()), n2 = this._userModule.getStorageModule();
          Ye.d("".concat(this._n, "._flush length:").concat(t2.length, " flushAtOnce:").concat(e3)), n2.setItem(this.TAG, t2, e3);
        } }, { key: "_contains", value: function(e3) {
          return this.accountProfileMap.has(e3);
        } }, { key: "_getProfileFromMap", value: function(e3) {
          return this.accountProfileMap.get(e3);
        } }, { key: "_getCachedProfiles", value: function() {
          var e3 = this._userModule.getStorageModule().getItem(this.TAG);
          return un(e3) ? [] : e3;
        } }, { key: "onConversationsProfileUpdated", value: function(e3) {
          for (var t2, n2, o2, i2 = [], a2 = 0, s2 = e3.length; a2 < s2; a2++)
            n2 = (t2 = e3[a2]).userID, this._userModule.isMyFriend(n2) && (this._contains(n2) ? (o2 = this._getProfileFromMap(n2), Dt(o2, t2) > 0 && i2.push(n2)) : i2.push(t2.userID));
          0 !== i2.length && (Ye.i("".concat(this._n, ".onConversationsProfileUpdated toAccountList:").concat(i2)), this.getUserProfile({ userIDList: i2 }));
        } }, { key: "getNickAndAvatarByUserID", value: function(e3) {
          if (this._contains(e3)) {
            var t2 = this._getProfileFromMap(e3);
            return { nick: t2.nick, avatar: t2.avatar };
          }
          return { nick: "", avatar: "" };
        } }, { key: "getUserNickAndAvatar", value: function(e3) {
          var t2 = this, n2 = m(new Set(e3));
          Ye.l("".concat(this._n, ".getUserNickAndAvatar userIDList.length:").concat(e3.length, " uniqueUserIDList.length:").concat(n2.length));
          var o2 = [];
          if (0 === e3.length)
            return Eo(o2);
          var i2 = this._createUserIDListGroup(n2), a2 = [];
          return i2.forEach(function(e4) {
            a2.push(t2.getUserProfile({ userIDList: e4 }));
          }), Promise.all(a2).then(function(e4) {
            return e4.forEach(function(e5) {
              var t3 = e5.data.map(function(e6) {
                return { userID: e6.userID, nick: e6.nick, avatar: e6.avatar };
              });
              o2.push.apply(o2, m(t3));
            }), o2;
          });
        } }, { key: "_createUserIDListGroup", value: function(e3) {
          for (var t2 = [], n2 = 0; n2 < e3.length; )
            t2.push(e3.slice(n2, n2 += 100));
          return t2;
        } }, { key: "reset", value: function() {
          this._flush(true), this.accountProfileMap.clear();
        } }]), e2;
      }(), Ar = a(function e2(t2) {
        o(this, e2), un || (this.userID = t2.userID || "", this.timeStamp = t2.timeStamp || 0);
      }), Er = function() {
        function e2(t2) {
          o(this, e2), this._userModule = t2, this._n = "BlacklistHandler", this._blacklistMap = /* @__PURE__ */ new Map(), this.startIndex = 0, this.maxLimited = 100, this.currentSequence = 0;
        }
        return a(e2, [{ key: "getLocalBlacklist", value: function() {
          return m(this._blacklistMap.keys());
        } }, { key: "getBlacklist", value: function() {
          var e3 = this, t2 = "".concat(this._n, ".getBlacklist"), n2 = { fromAccount: this._userModule.getMyAccount(), maxLimited: this.maxLimited, startIndex: 0, lastSequence: this.currentSequence }, o2 = new Ms("getBlacklist");
          return this._userModule.request({ protocolName: Ho, requestData: n2 }).then(function(n3) {
            var i2 = n3.data, a2 = i2.blackListItem, s2 = i2.currentSequence, r2 = un(a2) ? 0 : a2.length;
            o2.setNetworkType(e3._userModule.getNetworkType()).setMessage("count:".concat(r2)).end(), Ye.i("".concat(t2, " ok")), e3.currentSequence = s2, e3._handleResponse(a2, true), e3._userModule.emitOuterEvent(k.BLACKLIST_UPDATED, m(e3._blacklistMap.keys()));
          }).catch(function(n3) {
            return e3._userModule.probeNetwork().then(function(e4) {
              var t3 = v(e4, 2), i2 = t3[0], a2 = t3[1];
              o2.setError(n3, i2, a2).end();
            }), Ye.e("".concat(t2, " failed. error:"), n3), Ro(n3);
          });
        } }, { key: "addBlacklist", value: function(e3) {
          var t2 = this, n2 = new Ms("addToBlacklist"), o2 = "".concat(this._n, ".addBlacklist"), i2 = this._userModule.getMyAccount();
          if (1 === e3.userIDList.length && e3.userIDList[0] === i2) {
            var a2 = No.CANNOT_ADD_SELF_TO_BLACKLIST, s2 = this._userModule.getErrorMessage(a2);
            n2.setCode(a2).setMessage(s2).setNetworkType(this._userModule.getNetworkType()).end();
            var r2 = new Lo({ code: a2 });
            return Ye.e("".concat(o2, " failed. error:"), r2), Ro(r2);
          }
          return e3.userIDList.includes(i2) && (e3.userIDList = e3.userIDList.filter(function(e4) {
            return e4 !== i2;
          })), e3.fromAccount = this._userModule.getMyAccount(), e3.toAccount = e3.userIDList, this._userModule.request({ protocolName: Bo, requestData: e3 }).then(function(i3) {
            return n2.setNetworkType(t2._userModule.getNetworkType()).setMessage(e3.userIDList.length > 5 ? "userIDList.length:".concat(e3.userIDList.length) : "userIDList:".concat(e3.userIDList)).end(), Ye.i("".concat(o2, " ok")), t2._handleResponse(i3.resultItem, true), ko(m(t2._blacklistMap.keys()));
          }).catch(function(e4) {
            return t2._userModule.probeNetwork().then(function(t3) {
              var o3 = v(t3, 2), i3 = o3[0], a3 = o3[1];
              n2.setError(e4, i3, a3).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_handleResponse", value: function(e3, t2) {
          if (!un(e3))
            for (var n2, o2, i2, a2 = 0, s2 = e3.length; a2 < s2; a2++)
              o2 = e3[a2].to, i2 = e3[a2].resultCode, (ft(i2) || 0 === i2) && (t2 ? ((n2 = this._blacklistMap.has(o2) ? this._blacklistMap.get(o2) : new Ar()).userID = o2, !un(e3[a2].addBlackTimeStamp) && (n2.timeStamp = e3[a2].addBlackTimeStamp), this._blacklistMap.set(o2, n2)) : this._blacklistMap.has(o2) && (n2 = this._blacklistMap.get(o2), this._blacklistMap.delete(o2)));
          Ye.l("".concat(this._n, "._handleResponse total:").concat(this._blacklistMap.size, " bAdd:").concat(t2));
        } }, { key: "deleteBlacklist", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".deleteBlacklist"), o2 = new Ms("removeFromBlacklist");
          return e3.fromAccount = this._userModule.getMyAccount(), e3.toAccount = e3.userIDList, this._userModule.request({ protocolName: Ko, requestData: e3 }).then(function(i2) {
            return o2.setNetworkType(t2._userModule.getNetworkType()).setMessage(e3.userIDList.length > 5 ? "userIDList.length:".concat(e3.userIDList.length) : "userIDList:".concat(e3.userIDList)).end(), Ye.i("".concat(n2, " ok")), t2._handleResponse(i2.data.resultItem, false), ko(m(t2._blacklistMap.keys()));
          }).catch(function(e4) {
            return t2._userModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), i2 = n3[0], a2 = n3[1];
              o2.setError(e4, i2, a2).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "onAccountDeleted", value: function(e3) {
          for (var t2 = 0, n2 = e3.length; t2 < n2; t2++) {
            var o2 = e3[t2];
            this._blacklistMap.has(o2) && this._blacklistMap.delete(o2);
          }
          var i2 = e3.length;
          i2 > 0 && (Ye.l("".concat(this._n, ".onAccountDeleted count:").concat(i2, " ").concat(i2 < 30 ? "userIDList:".concat(e3) : "")), this._userModule.emitOuterEvent(k.BLACKLIST_UPDATED, m(this._blacklistMap.keys())));
        } }, { key: "onAccountAdded", value: function(e3) {
          for (var t2, n2 = [], o2 = 0, i2 = e3.length; o2 < i2; o2++)
            t2 = e3[o2], this._blacklistMap.has(t2) || (this._blacklistMap.set(t2, new Ar({ userID: t2 })), n2.push(t2));
          n2.length > 0 && (Ye.l("".concat(this._n, ".onAccountAdded count:").concat(n2.length, " userIDList:"), n2), this._userModule.emitOuterEvent(k.BLACKLIST_UPDATED, m(this._blacklistMap.keys())));
        } }, { key: "reset", value: function() {
          this._blacklistMap.clear(), this.startIndex = 0, this.maxLimited = 100, this.currentSequence = 0;
        } }]), e2;
      }(), Rr = function(e2) {
        var t2 = String(e2).replace(/[=]+$/, ""), n2 = "";
        if (t2.length % 4 == 1)
          return "";
        for (var o2, i2, a2 = 0, s2 = 0; i2 = t2.charAt(s2++); ~i2 && (o2 = a2 % 4 ? 64 * o2 + i2 : i2, a2++ % 4) ? n2 += String.fromCharCode(255 & o2 >> (-2 * a2 & 6)) : 0)
          i2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(i2);
        try {
          return decodeURIComponent(escape(n2));
        } catch (r2) {
          return "";
        }
      }, Or = function() {
        function e2(t2) {
          o(this, e2), this._userModule = t2, this._n = "UserStatusHandler", this.MAX_QUERY_USER_COUNT = 500, this.MAX_SUBSCRIBE_USER_COUNT = 100, this.MAX_UNSUBSCRIBE_USER_COUNT = 100, this._userModule.getInnerEmitterInstance().on(Fs.CLOUD_CONFIG_UPDATED, this._onCloudConfigUpdated, this);
        }
        return a(e2, [{ key: "_onCloudConfigUpdated", value: function() {
          var e3 = this._userModule.getCloudConfig("status_query_count"), t2 = this._userModule.getCloudConfig("status_sub_count"), n2 = this._userModule.getCloudConfig("status_unsub_count");
          Ye.l("".concat(this._n, "._onCloudConfigUpdated statusQueryCount:").concat(e3, " statusSubscribeCount:").concat(t2) + " statusUnsubscribeCount:".concat(n2)), ft(e3) || (this.MAX_QUERY_USER_COUNT = parseInt(e3, 10)), ft(e3) || (this.MAX_SUBSCRIBE_USER_COUNT = parseInt(t2, 10)), ft(e3) || (this.MAX_UNSUBSCRIBE_USER_COUNT = parseInt(n2, 10));
        } }, { key: "onUserStatusUpdated", value: function(e3) {
          var t2 = e3.dataList, n2 = this._userModule.getMyUserID(), o2 = this._userModule.getModule(no), i2 = t2.map(function(e4) {
            var t3 = e4.to, i3 = e4.statusType, a2 = e4.customStatus, s2 = Rr(a2);
            return t3 === n2 && o2.setCustomStatus(s2), { userID: t3, statusType: i3, customStatus: s2 };
          });
          this._userModule.emitOuterEvent(k.USER_STATUS_UPDATED, i2);
        } }, { key: "setSelfStatus", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".setSelfStatus");
          if (false === this._userModule.filterProfanity("customStatus", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          var o2 = new Ms("setSelfStatus"), i2 = e3.customStatus;
          return this._userModule.request({ protocolName: za, requestData: { customStatus: i2 } }).then(function(e4) {
            return o2.setNetworkType(t2._userModule.getNetworkType()).setMessage("customStatus:".concat(i2)).end(), Ye.l("".concat(n2, " ok. customStatus:").concat(i2)), t2._userModule.getModule(no).setCustomStatus(i2), ko({ userID: t2._userModule.getMyUserID(), statusType: 1, customStatus: i2 });
          }).catch(function(e4) {
            return t2._userModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), i3 = n3[0], a2 = n3[1];
              o2.setError(e4, i3, a2).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getUserStatus", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("getUserStatus"), o2 = e3.userIDList, i2 = void 0 === o2 ? [] : o2, a2 = this._userModule.getMyUserID(), s2 = m(i2), r2 = void 0, c2 = s2.indexOf(a2);
          if (c2 > -1) {
            s2.splice(c2, 1);
            var u2 = this._userModule.getModule(no).getCustomStatus();
            r2 = { userID: a2, statusType: 1, customStatus: u2 };
          }
          if (0 === s2.length)
            return Eo({ successUserList: [r2], failureUserList: [] });
          if (!this._userModule.canIUse(B.USER_STATUS))
            return this._userModule.cannotUseCommercialAbility("getUserStatus");
          s2.length > this.MAX_QUERY_USER_COUNT && (Ye.w("".concat(n2, " ").concat(nn(this.MAX_QUERY_USER_COUNT))), s2 = i2.slice(0, this.MAX_QUERY_USER_COUNT));
          var l2 = new Ms("getUserStatus");
          return this._userModule.request({ protocolName: Xa, requestData: { userIDList: s2 } }).then(function(e4) {
            var o3 = e4.data, a3 = o3.successUserList, s3 = void 0 === a3 ? [] : a3, c3 = o3.failureUserList, u3 = void 0 === c3 ? [] : c3, d2 = s3.map(function(e5) {
              var t3 = e5.userID, n3 = e5.statusType, o4 = e5.customStatus;
              return { userID: t3, statusType: n3, customStatus: Rr(o4) };
            }), p2 = u3.map(function(e5) {
              var t3 = e5.userID, n3 = e5.invalidUserID, o4 = e5.errorCode, i3 = e5.errorInfo;
              return { userID: un(n3) ? t3 : n3, code: o4, message: i3 };
            });
            ft(r2) || d2.unshift(r2);
            var g2 = "userID count:".concat(i2.length, ", success count:").concat(d2.length, ", fail count:").concat(p2.length);
            return l2.setNetworkType(t2._userModule.getNetworkType()).setMessage("".concat(g2)).end(), Ye.l("".concat(n2, " ok. ").concat(g2, ".")), ko({ successUserList: d2, failureUserList: p2 });
          }).catch(function(e4) {
            return t2._userModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], a3 = n3[1];
              l2.setMessage("userID count:".concat(i2.length)).setError(e4, o3, a3).end();
            }), Ye.e("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "subscribeUserStatus", value: function(e3) {
          var t2 = this, n2 = "subscribeUserStatus";
          if (!this._userModule.canIUse(B.USER_STATUS))
            return this._userModule.cannotUseCommercialAbility(n2);
          var o2 = "".concat(this._n, ".").concat(n2), i2 = e3.userIDList, a2 = void 0 === i2 ? [] : i2, s2 = m(a2);
          s2.length > this.MAX_SUBSCRIBE_USER_COUNT && (Ye.w("".concat(o2, " ").concat(nn(this.MAX_SUBSCRIBE_USER_COUNT))), s2 = a2.slice(0, this.MAX_SUBSCRIBE_USER_COUNT));
          var r2 = new Ms(n2), c2 = "userID count:".concat(a2.length);
          return Ye.l("".concat(o2, " ").concat(c2)), this._userModule.request({ protocolName: Qa, requestData: { userIDList: s2 } }).then(function(e4) {
            var n3 = e4.data.failureUserList, i3 = (void 0 === n3 ? [] : n3).map(function(e5) {
              var t3 = e5.userID, n4 = e5.invalidUserID, o3 = e5.errorCode, i4 = e5.errorInfo;
              return { userID: un(n4) ? t3 : n4, code: o3, message: i4 };
            });
            return r2.setNetworkType(t2._userModule.getNetworkType()).setMessage("".concat(c2, " fail count:").concat(i3.length)).end(), Ye.l("".concat(o2, " ok. fail count:").concat(i3.length, ".")), ko({ failureUserList: i3 });
          }).catch(function(e4) {
            return t2._userModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              r2.setMessage("".concat(c2)).setError(e4, o3, i3).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "unsubscribeUserStatus", value: function(e3) {
          var t2 = this, n2 = "unsubscribeUserStatus";
          if (!this._userModule.canIUse(B.USER_STATUS))
            return this._userModule.cannotUseCommercialAbility(n2);
          var o2 = "".concat(this._n, ".").concat(n2), i2 = (e3 || {}).userIDList, a2 = void 0 === i2 ? [] : i2, s2 = m(a2);
          a2.length > this.MAX_UNSUBSCRIBE_USER_COUNT && (Ye.w("".concat(o2, " ").concat(nn(this.MAX_UNSUBSCRIBE_USER_COUNT))), s2 = a2.slice(0, this.MAX_UNSUBSCRIBE_USER_COUNT));
          var r2 = new Ms(n2), c2 = "userID count:".concat(a2.length);
          Ye.l("".concat(o2, " ").concat(c2));
          var u2 = { userIDList: s2 };
          return 0 === s2.length && (u2.userIDList = void 0, u2.unsubscribeAll = 1), this._userModule.request({ protocolName: Za, requestData: u2 }).then(function(e4) {
            var n3 = e4.data.failureUserList, i3 = (void 0 === n3 ? [] : n3).map(function(e5) {
              var t3 = e5.userID, n4 = e5.invalidUserID, o3 = e5.errorCode, i4 = e5.errorInfo;
              return { userID: un(n4) ? t3 : n4, code: o3, message: i4 };
            });
            return r2.setNetworkType(t2._userModule.getNetworkType()).setMessage("".concat(c2, " fail count:").concat(i3.length)).end(), Ye.l("".concat(o2, " ok. fail count:").concat(i3.length, ".")), ko({ failureUserList: i3 });
          }).catch(function(e4) {
            return t2._userModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              r2.setMessage("".concat(c2)).setError(e4, o3, i3).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "reset", value: function() {
          this.MAX_QUERY_USER_COUNT = 500, this.MAX_SUBSCRIBE_USER_COUNT = 100, this.MAX_UNSUBSCRIBE_USER_COUNT = 100;
        } }]), e2;
      }(), Gr = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          return o(this, n2), (i2 = t2.call(this, e3))._n = "UserModule", i2._profileHandler = new Sr(h(i2)), i2._blacklistHandler = new Er(h(i2)), i2._userStatusHandler = new Or(h(i2)), i2.getInnerEmitterInstance().on(Fs.A2KEY_AND_TINYID_UPDATED, i2.onContextUpdated, h(i2)), i2;
        }
        return a(n2, [{ key: "onContextUpdated", value: function(e3) {
          this._profileHandler.getMyProfile(), this._blacklistHandler.getBlacklist();
        } }, { key: "mockOnNickAvatarModified", value: function(e3, t3) {
          Ye.l("".concat(this._n, "._mockOnNickAvatarModified nick:").concat(e3, " avatar:").concat(t3)), this.onProfileModified({ dataList: [{ pushType: 1, userID: this.getMyUserID(), profileList: [{ tag: Je.NICK, value: e3 }, { tag: Je.AVATAR, value: t3 }] }] });
        } }, { key: "onProfileModified", value: function(e3) {
          this._profileHandler.onProfileModified(e3);
        } }, { key: "onRelationChainModified", value: function(e3) {
          var t3 = e3.dataList;
          if (!un(t3)) {
            var n3 = [];
            t3.forEach(function(e4) {
              e4.blackListDelAccount && n3.push.apply(n3, m(e4.blackListDelAccount));
            }), n3.length > 0 && this._blacklistHandler.onAccountDeleted(n3);
            var o2 = [];
            t3.forEach(function(e4) {
              e4.blackListAddAccount && o2.push.apply(o2, m(e4.blackListAddAccount));
            }), o2.length > 0 && this._blacklistHandler.onAccountAdded(o2);
          }
        } }, { key: "onConversationsProfileUpdated", value: function(e3) {
          this._profileHandler.onConversationsProfileUpdated(e3);
        } }, { key: "getMyAccount", value: function() {
          return this.getMyUserID();
        } }, { key: "getMyNick", value: function() {
          return this._profileHandler.getNickAndAvatarByUserID(this.getMyUserID()).nick;
        } }, { key: "getMyProfile", value: function() {
          return this._profileHandler.getMyProfile();
        } }, { key: "getStorageModule", value: function() {
          return this.getModule(oo);
        } }, { key: "filterProfanity", value: function(e3, t3) {
          var n3 = this.getModule(Mo);
          if (!n3)
            return true;
          var o2 = n3.filterText(t3[e3], J), i2 = o2.isAllowedToSend, a2 = o2.modifiedText;
          return true === i2 && (t3[e3] = a2, true);
        } }, { key: "isMyFriend", value: function(e3) {
          var t3 = this.getModule($n);
          return !!t3 && t3.isMyFriend(e3);
        } }, { key: "getUserProfile", value: function(e3) {
          return this._profileHandler.getUserProfile(e3);
        } }, { key: "updateMyProfile", value: function(e3) {
          return this._profileHandler.updateMyProfile(e3);
        } }, { key: "getNickAndAvatarByUserID", value: function(e3) {
          return this._profileHandler.getNickAndAvatarByUserID(e3);
        } }, { key: "getUserNickAndAvatar", value: function(e3) {
          return this._profileHandler.getUserNickAndAvatar(e3);
        } }, { key: "getLocalBlacklist", value: function() {
          var e3 = this._blacklistHandler.getLocalBlacklist();
          return Eo(e3);
        } }, { key: "addBlacklist", value: function(e3) {
          return this._blacklistHandler.addBlacklist(e3);
        } }, { key: "deleteBlacklist", value: function(e3) {
          return this._blacklistHandler.deleteBlacklist(e3);
        } }, { key: "onUserStatusUpdated", value: function(e3) {
          this._userStatusHandler.onUserStatusUpdated(e3);
        } }, { key: "setSelfStatus", value: function(e3) {
          return this._userStatusHandler.setSelfStatus(e3);
        } }, { key: "getUserStatus", value: function(e3) {
          return this._userStatusHandler.getUserStatus(e3);
        } }, { key: "subscribeUserStatus", value: function(e3) {
          return this._userStatusHandler.subscribeUserStatus(e3);
        } }, { key: "unsubscribeUserStatus", value: function(e3) {
          return this._userStatusHandler.unsubscribeUserStatus(e3);
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._profileHandler.reset(), this._blacklistHandler.reset(), this._userStatusHandler.reset();
        } }]), n2;
      }(Oo), Ur = function() {
        function e2(t2, n2) {
          o(this, e2), this._m = t2, this._isLoggedIn = false, this._SDKAppID = n2.SDKAppID, this._userID = n2.userID || "", this._userSig = n2.userSig || "", this._version = "3.2.0", this._a2Key = "", this._tinyID = "", this._customStatus = "", this._contentType = "json", this._unlimitedAVChatRoom = n2.unlimitedAVChatRoom, this._scene = n2.scene || "", this._oversea = n2.oversea, this._instanceID = n2.instanceID, this._statusInstanceID = 0, this._isDevMode = n2.devMode, this._proxyServer = n2.proxyServer, this._fileUploadProxy = n2.fileUploadProxy, this._fileDownloadProxy = n2.fileDownloadProxy;
        }
        return a(e2, [{ key: "isLoggedIn", value: function() {
          return this._isLoggedIn;
        } }, { key: "isOversea", value: function() {
          return this._oversea;
        } }, { key: "isPrivateNetWork", value: function() {
          return this._proxyServer;
        } }, { key: "isDevMode", value: function() {
          return this._isDevMode;
        } }, { key: "isSingaporeSite", value: function() {
          return this._SDKAppID >= 2e7 && this._SDKAppID < 3e7 || this._SDKAppID >= 172e7 && this._SDKAppID < 173e7;
        } }, { key: "isKoreaSite", value: function() {
          return this._SDKAppID >= 3e7 && this._SDKAppID < 4e7 || this._SDKAppID >= 173e7 && this._SDKAppID < 174e7;
        } }, { key: "isGermanySite", value: function() {
          return this._SDKAppID >= 4e7 && this._SDKAppID < 5e7 || this._SDKAppID >= 174e7 && this._SDKAppID < 175e7;
        } }, { key: "isIndiaSite", value: function() {
          return this._SDKAppID >= 5e7 && this._SDKAppID < 6e7 || this._SDKAppID >= 175e7 && this._SDKAppID < 176e7;
        } }, { key: "isJapanSite", value: function() {
          return this._SDKAppID >= 6e7 && this._SDKAppID < 7e7 || this._SDKAppID >= 176e7 && this._SDKAppID < 177e7;
        } }, { key: "isUSASite", value: function() {
          return this._SDKAppID >= 7e7 && this._SDKAppID < 8e7 || this._SDKAppID >= 177e7 && this._SDKAppID < 178e7;
        } }, { key: "isIntl", value: function() {
          return 0 === (e3 = this._SDKAppID) || e3 >= 2e7 && e3 < 8e7 || e3 >= 172e7 && e3 < 178e7;
          var e3;
        } }, { key: "isUnlimitedAVChatRoom", value: function() {
          return this._unlimitedAVChatRoom;
        } }, { key: "setUserID", value: function(e3) {
          this._userID = e3;
        } }, { key: "getUserID", value: function() {
          return this._userID;
        } }, { key: "setUserSig", value: function(e3) {
          this._userSig = e3;
        } }, { key: "getUserSig", value: function() {
          return this._userSig;
        } }, { key: "getSDKAppID", value: function() {
          return this._SDKAppID;
        } }, { key: "setTinyID", value: function(e3) {
          this._tinyID = e3, this._isLoggedIn = true;
        } }, { key: "getTinyID", value: function() {
          return this._tinyID;
        } }, { key: "setCustomStatus", value: function(e3) {
          this._customStatus = e3;
        } }, { key: "getCustomStatus", value: function() {
          return this._customStatus;
        } }, { key: "getScene", value: function() {
          return Ge ? window.tencent_cloud_im_csig_flutter_for_web_25F_cy : this._isTUIKit() ? "tuikit" : this._scene;
        } }, { key: "getInstanceID", value: function() {
          return this._instanceID;
        } }, { key: "getStatusInstanceID", value: function() {
          return this._statusInstanceID;
        } }, { key: "setStatusInstanceID", value: function(e3) {
          this._statusInstanceID = e3;
        } }, { key: "getVersion", value: function() {
          return this._version;
        } }, { key: "getA2Key", value: function() {
          return this._a2Key;
        } }, { key: "setA2Key", value: function(e3) {
          this._a2Key = e3;
        } }, { key: "getContentType", value: function() {
          return this._contentType;
        } }, { key: "getProxyServer", value: function() {
          return this._proxyServer;
        } }, { key: "getFileUploadProxy", value: function() {
          return this._fileUploadProxy;
        } }, { key: "getFileDownloadProxy", value: function() {
          return this._fileDownloadProxy;
        } }, { key: "_isTUIKit", value: function() {
          var e3 = false, t2 = false, n2 = false, o2 = false, i2 = [];
          se && (i2 = Object.keys(ce)), re && (i2 = ae ? Object.keys(uni) : Object.keys(window));
          for (var a2 = 0, s2 = i2.length; a2 < s2; a2++)
            if (i2[a2].toLowerCase().includes("uikit")) {
              e3 = true;
              break;
            }
          if (i2 = null, se && !mt(ce.createGamePortal) && mt(getApp) && !ft(getApp())) {
            var r2 = getApp().globalData;
            ht(r2) && true === r2.isTUIKit && (t2 = true);
          }
          true === this._m.getModule(oo).getStorageSync("TIM_".concat(this._SDKAppID, "_isTUIKit")) && (n2 = true);
          var c2 = null;
          if (Z && !ee && "undefined" == typeof uni && __wxConfig && (c2 = __wxConfig.pages), $ && "undefined" == typeof uni && __qqConfig && (c2 = __qqConfig.pages), _t(c2) && c2.length > 0) {
            for (var u2 = 0, l2 = c2.length; u2 < l2; u2++)
              if (c2[u2].toLowerCase().includes("tui")) {
                o2 = true;
                break;
              }
            c2 = null;
          }
          return e3 || t2 || n2 || o2;
        } }, { key: "reset", value: function() {
          this._isLoggedIn = false, this._userSig = "", this._a2Key = "", this._tinyID = "", this._customStatus = "", this._statusInstanceID = 0;
        } }]), e2;
      }(), Pr = { "k-vue2-pc": 1, "k-vue2-h5": 2, "k-vue2-h5-uni": 3, "k-vue2-app-uni": 4, "k-vue2-mp-uni": 5, "k-vue2-pc-uni": 6, "k-vue3-pc": 7, "k-vue3-h5": 8, "k-vue3-h5-uni": 9, "k-vue3-app-uni": 10, "k-vue3-mp-uni": 11, "k-vue3-pc-uni": 12 }, br = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          return o(this, n2), (i2 = t2.call(this, e3))._n = "SignModule", i2._helloInterval = 120, i2._lastLoginTs = 0, i2._lastWsHelloTs = 0, i2._isWebUniapp = 0, qs.mixin(h(i2)), i2;
        }
        return a(n2, [{ key: "onCheckTimer", value: function(e3) {
          this.isLoggedIn() && e3 % this._helloInterval == 0 && this._hello();
        } }, { key: "login", value: function(e3) {
          var t3 = "";
          if (this.isLoggedIn()) {
            var n3 = this.getMyUserID();
            return (t3 = this.getErrorMessage("RepeatLogin", n3)) && Ye.w(t3), Eo({ actionStatus: "OK", errorCode: 0, errorInfo: t3, repeatLogin: true });
          }
          if (Date.now() - this._lastLoginTs <= 15e3)
            return this.outputWarning("LoggingIn", e3.userID), Ro({ code: No.REPEAT_LOGIN });
          Ye.l("".concat(this._n, ".login userID:").concat(e3.userID));
          var o2 = this._checkLoginInfo(e3);
          if (0 !== o2.code)
            return Ro(o2);
          var i2 = this.getModule(no), a2 = e3.userID, s2 = e3.userSig;
          return i2.setUserID(a2), i2.setUserSig(s2), this.getModule(uo).updateProtocolConfig(), this._login();
        } }, { key: "_login", value: function() {
          var e3 = this, t3 = this.getModule(no), n3 = t3.getScene(), o2 = 0, i2 = n3;
          n3 && n3.startsWith("k-") && (i2 = Pr[n3], n3 = "tuikit");
          var a2 = new Ms("login");
          a2.setMessage("".concat(i2)).setMoreMessage("identifier:".concat(this.getMyUserID()));
          var s2 = "tuikit" === n3;
          ae ? s2 ? 3 === i2 || 4 === i2 || 5 === i2 || 6 === i2 ? a2.setUIPlatform(31) : 9 === i2 || 10 === i2 || 11 === i2 || 12 === i2 ? a2.setUIPlatform(32) : a2.setUIPlatform(4) : a2.setUIPlatform(3) : se ? "tuikit" === n3 ? a2.setUIPlatform(12) : a2.setUIPlatform(11) : re && (Ge ? "flutter_web_uikit" === n3 ? a2.setUIPlatform(21) : a2.setUIPlatform(20) : this._isReactUIKit() ? Oe ? a2.setUIPlatform(25) : a2.setUIPlatform(24) : s2 ? 1 === i2 || 2 === i2 ? a2.setUIPlatform(29) : 7 === i2 || 8 === i2 ? a2.setUIPlatform(30) : Oe ? a2.setUIPlatform(17) : a2.setUIPlatform(14) : Oe ? a2.setUIPlatform(16) : a2.setUIPlatform(13));
          var r2 = this.getModule(mo);
          if (r2.canIUseOfflinePush()) {
            this._isWebUniapp = r2.getUniAppPlatform();
            var c2 = this._getStatusInstanceID();
            t3.setStatusInstanceID(c2), this.getModule(uo).updateProtocolConfig(), o2 = r2.getDeviceBrand();
          }
          var u2 = "".concat(this._n, "._login");
          return this._lastLoginTs = Date.now(), this.request({ protocolName: Go, requestData: { deviceBrand: o2, isWebUniapp: this._isWebUniapp } }).then(function(o3) {
            e3._lastLoginTs = 0;
            var i3 = Date.now(), s3 = null, r3 = o3.data, c3 = r3.a2Key, l2 = r3.tinyID, d2 = r3.helloInterval, p2 = r3.instanceID, g2 = r3.timeStamp, h2 = r3.customStatus, _2 = void 0 === h2 ? "" : h2, f2 = r3.purchaseBits;
            Ye.l("".concat(u2, " ok. scene:").concat(n3, " helloInterval:").concat(d2, " instanceID:").concat(p2, " timeStamp:").concat(g2));
            var v2 = 1e3 * g2, m2 = i3 - a2.getStartTs(), M2 = v2 + parseInt(m2 / 2) - i3, y2 = a2.getStartTs() + M2;
            if (a2.start(y2), function(e4, t4) {
              qe = t4;
              var n4 = /* @__PURE__ */ new Date();
              n4.setTime(e4), Ye.i("baseTime from server:".concat(n4, " offset:").concat(qe));
            }(v2, M2), !l2)
              throw s3 = new Lo({ code: No.NO_TINYID }), a2.setError(s3, true, e3.getNetworkType()).end(), s3;
            if (!c3)
              throw s3 = new Lo({ code: No.NO_A2KEY }), a2.setError(s3, true, e3.getNetworkType()).end(), s3;
            var I2 = Rr(_2);
            (a2.setNetworkType(e3.getNetworkType()).setMoreMessage("helloInterval:".concat(d2, " instanceID:").concat(p2, " offset:").concat(M2, " customStatus:").concat(I2)).end(), t3.setA2Key(c3), t3.setTinyID(l2), t3.setStatusInstanceID(p2), t3.setCustomStatus(I2), f2) && e3.getModule(vo).onPushedConfig({ errorCode: 0, expiredTime: 0, purchaseBits: f2 });
            e3.getModule(uo).updateProtocolConfig(), e3.emitInnerEvent(Fs.A2KEY_AND_TINYID_UPDATED), e3._helloInterval = d2, e3.triggerReady();
            var C2 = e3.getModule(mo);
            return C2.canIUseOfflinePush() && (uni.setStorageSync("timUniAppInstanceID", p2), C2.init()), e3._fetchCloudControlConfig(), e3.getModule(Mo).init(), o3;
          }).catch(function(t4) {
            return e3.probeNetwork().then(function(e4) {
              var n4 = v(e4, 2), o3 = n4[0], i3 = n4[1];
              a2.setError(t4, o3, i3).end(true);
            }), e3._m.setNotReadyReason(No.LOGIN_FAILED), Ye.e("".concat(u2, " failed. error:"), t4), e3._lastLoginTs = 0, e3._m.onLoginFailed(), Ro(t4);
          });
        } }, { key: "logout", value: function() {
          var e3 = this, t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
          if (!this.isLoggedIn())
            return Ro({ code: No.USER_NOT_LOGGED_IN });
          var n3 = new Ms("logout");
          n3.setNetworkType(this.getNetworkType()).setMessage("identifier:".concat(this.getMyUserID())).end(true);
          var o2 = "".concat(this._n, ".logout");
          return Ye.i("".concat(o2, " type:").concat(t3)), 0 === t3 && this._m.setNotReadyReason(No.LOGGED_OUT), this.request({ protocolName: Uo, requestData: { type: t3 } }).then(function() {
            return e3.resetReady(), Eo({});
          }).catch(function(t4) {
            return Ye.e("".concat(o2, " error:"), t4), e3.resetReady(), Eo({});
          });
        } }, { key: "_fetchCloudControlConfig", value: function() {
          this.getModule(go).fetchConfig();
        } }, { key: "_getStatusInstanceID", value: function() {
          return uni.getStorageSync("timUniAppInstanceID");
        } }, { key: "_hello", value: function() {
          var e3 = this;
          this._lastWsHelloTs = Date.now(), this.request({ protocolName: Po, requestData: { isWebUniapp: this._isWebUniapp } }).catch(function(t3) {
            Ye.w("".concat(e3._n, "._hello error:"), t3);
          });
        } }, { key: "getLastWsHelloTs", value: function() {
          return this._lastWsHelloTs;
        } }, { key: "_checkLoginInfo", value: function(e3) {
          var t3 = 0;
          return un(this.getModule(no).getSDKAppID()) ? t3 = No.NO_SDKAPPID : un(e3.userID) ? t3 = No.NO_IDENTIFIER : un(e3.userSig) && (t3 = No.NO_USERSIG), { code: t3 };
        } }, { key: "_isReactUIKit", value: function() {
          return re && void 0 !== window.tencent_cloud_im_csig_react_uikit_23F_xa;
        } }, { key: "onMultipleAccountKickedOut", value: function(e3) {
          var t3 = this;
          new Ms("kickedOut").setNetworkType(this.getNetworkType()).setMessage("type:".concat(L.KICKED_OUT_MULT_ACCOUNT, " newInstanceInfo:").concat(JSON.stringify(e3))).end(true), Ye.w("".concat(this._n, ".onMultipleAccountKickedOut userID:").concat(this.getMyUserID(), " newInstanceInfo:"), e3), this.logout(1).then(function() {
            t3.emitOuterEvent(k.KICKED_OUT, { type: L.KICKED_OUT_MULT_ACCOUNT }), t3._m.setNotReadyReason(No.KICKED_OUT_MULT_ACCOUNT), t3._m.reset();
          });
        } }, { key: "onMultipleDeviceKickedOut", value: function(e3) {
          var t3 = this;
          new Ms("kickedOut").setNetworkType(this.getNetworkType()).setMessage("type:".concat(L.KICKED_OUT_MULT_DEVICE, " newInstanceInfo:").concat(JSON.stringify(e3))).end(true), Ye.w("".concat(this._n, ".onMultipleDeviceKickedOut userID:").concat(this.getMyUserID(), " newInstanceInfo:"), e3), this.logout(1).then(function() {
            t3.emitOuterEvent(k.KICKED_OUT, { type: L.KICKED_OUT_MULT_DEVICE }), t3._m.setNotReadyReason(No.KICKED_OUT_MULT_DEVICE), t3._m.reset();
          });
        } }, { key: "onUserSigExpired", value: function() {
          new Ms("kickedOut").setNetworkType(this.getNetworkType()).setMessage(L.KICKED_OUT_USERSIG_EXPIRED).end(true), Ye.w("".concat(this._n, ".onUserSigExpired userID:").concat(this.getMyUserID())), 0 !== this.getModule(no).getStatusInstanceID() && (this.emitOuterEvent(k.KICKED_OUT, { type: L.KICKED_OUT_USERSIG_EXPIRED }), this._m.setNotReadyReason(No.KICKED_OUT_USERSIG_EXPIRED), this._m.reset());
        } }, { key: "onRestApiKickedOut", value: function(e3) {
          (new Ms("kickedOut").setNetworkType(this.getNetworkType()).setMessage("type:".concat(L.KICKED_OUT_REST_API, " newInstanceInfo:").concat(JSON.stringify(e3))).end(true), Ye.w("".concat(this._n, ".onRestApiKickedOut userID:").concat(this.getMyUserID(), " newInstanceInfo:"), e3), 0 !== this.getModule(no).getStatusInstanceID()) && (this.emitOuterEvent(k.KICKED_OUT, { type: L.KICKED_OUT_REST_API }), this._m.setNotReadyReason(No.KICKED_OUT_REST_API), this._m.reset(), this.getModule(lo).onRestApiKickedOut());
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this.resetReady(), this._helloInterval = 120, this._lastLoginTs = 0, this._lastWsHelloTs = 0, this._isWebUniapp = 0;
        } }]), n2;
      }(Oo);
      function wr() {
        return null;
      }
      var Fr = function() {
        function e2(t2) {
          o(this, e2), this._m = t2, this._n = "StorageModule", this._storageQueue = /* @__PURE__ */ new Map(), this._errorTolerantHandle();
        }
        return a(e2, [{ key: "_errorTolerantHandle", value: function() {
          se || !ft(window) && this._canIUseCookies() || (this.getItem = wr, this.setItem = wr, this.removeItem = wr, this.clear = wr);
        } }, { key: "onCheckTimer", value: function(e3) {
          if (e3 % 20 == 0) {
            if (0 === this._storageQueue.size)
              return;
            this._doFlush();
          }
        } }, { key: "_doFlush", value: function() {
          try {
            var e3, t2 = T(this._storageQueue);
            try {
              for (t2.s(); !(e3 = t2.n()).done; ) {
                var n2 = v(e3.value, 2), o2 = n2[0], i2 = n2[1];
                this._setStorageSync(this._getKey(o2), i2);
              }
            } catch (a2) {
              t2.e(a2);
            } finally {
              t2.f();
            }
            this._storageQueue.clear();
          } catch (s2) {
            Ye.w("".concat(this._n, "._doFlush error:"), s2);
          }
        } }, { key: "_getPrefix", value: function() {
          var e3 = this._m.getModule(no);
          return "TIM_".concat(e3.getSDKAppID(), "_").concat(e3.getUserID(), "_");
        } }, { key: "_getKey", value: function(e3) {
          return "".concat(this._getPrefix()).concat(e3);
        } }, { key: "getItem", value: function(e3) {
          var t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          try {
            var n2 = t2 ? this._getKey(e3) : e3;
            return this.getStorageSync(n2);
          } catch (o2) {
            return Ye.w("".concat(this._n, ".getItem error:"), o2), {};
          }
        } }, { key: "setItem", value: function(e3, t2) {
          var n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], o2 = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
          if (n2) {
            var i2 = o2 ? this._getKey(e3) : e3;
            this._setStorageSync(i2, t2);
          } else
            this._storageQueue.set(e3, t2);
        } }, { key: "clear", value: function() {
          try {
            se ? ce.clearStorageSync() : this._canIUseCookies() && localStorage.clear();
          } catch (e3) {
            Ye.w("".concat(this._n, ".clear error:"), e3);
          }
        } }, { key: "removeItem", value: function(e3) {
          var t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          try {
            var n2 = t2 ? this._getKey(e3) : e3;
            this._removeStorageSync(n2);
          } catch (o2) {
            Ye.w("".concat(this._n, ".removeItem error:"), o2);
          }
        } }, { key: "getSize", value: function(e3) {
          var t2 = this, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "b";
          try {
            var o2 = { size: 0, limitSize: 5242880, unit: n2 };
            if (Object.defineProperty(o2, "leftSize", { enumerable: true, get: function() {
              return o2.limitSize - o2.size;
            } }), se && (o2.limitSize = 1024 * ce.getStorageInfoSync().limitSize), e3)
              o2.size = JSON.stringify(this.getItem(e3)).length + this._getKey(e3).length;
            else if (se) {
              var i2 = ce.getStorageInfoSync(), a2 = i2.keys;
              a2.forEach(function(e4) {
                o2.size += JSON.stringify(t2.getStorageSync(e4)).length + t2._getKey(e4).length;
              });
            } else if (this._canIUseCookies())
              for (var s2 in localStorage)
                localStorage.hasOwnProperty(s2) && (o2.size += localStorage.getItem(s2).length + s2.length);
            return this._convertUnit(o2);
          } catch (r2) {
            Ye.w("".concat(this._n, " error:"), r2);
          }
        } }, { key: "_convertUnit", value: function(e3) {
          var t2 = {}, n2 = e3.unit;
          for (var o2 in t2.unit = n2, e3)
            "number" == typeof e3[o2] && ("kb" === n2.toLowerCase() ? t2[o2] = Math.round(e3[o2] / 1024) : "mb" === n2.toLowerCase() ? t2[o2] = Math.round(e3[o2] / 1024 / 1024) : t2[o2] = e3[o2]);
          return t2;
        } }, { key: "_setStorageSync", value: function(e3, t2) {
          se ? ne ? my.setStorageSync({ key: e3, data: t2 }) : ce.setStorageSync(e3, t2) : this._canIUseCookies() && localStorage.setItem(e3, JSON.stringify(t2));
        } }, { key: "getStorageSync", value: function(e3) {
          return se ? ne ? my.getStorageSync({ key: e3 }).data : ce.getStorageSync(e3) : this._canIUseCookies() ? JSON.parse(localStorage.getItem(e3)) : {};
        } }, { key: "_removeStorageSync", value: function(e3) {
          se ? ne ? my.removeStorageSync({ key: e3 }) : ce.removeStorageSync(e3) : this._canIUseCookies() && localStorage.removeItem(e3);
        } }, { key: "_canIUseCookies", value: function() {
          return navigator && navigator.cookieEnabled && localStorage;
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._doFlush();
        } }]), e2;
      }(), qr = function() {
        function e2(t2) {
          o(this, e2), this._n = "SSOLogBody", this._report = [];
        }
        return a(e2, [{ key: "pushIn", value: function(e3) {
          Ye.d("".concat(this._n, ".pushIn"), this._report.length, e3), this._report.push(e3);
        } }, { key: "backfill", value: function(e3) {
          var t2;
          _t(e3) && 0 !== e3.length && (Ye.d("".concat(this._n, ".backfill"), this._report.length, e3.length), (t2 = this._report).unshift.apply(t2, m(e3)));
        } }, { key: "getLogsNumInMemory", value: function() {
          return this._report.length;
        } }, { key: "isEmpty", value: function() {
          return 0 === this._report.length;
        } }, { key: "_reset", value: function() {
          this._report.length = 0, this._report = [];
        } }, { key: "getLogsInMemory", value: function() {
          var e3 = this._report.slice();
          return this._reset(), e3;
        } }]), e2;
      }(), xr = function(e2) {
        var t2 = e2.getModule(no);
        return { SDKType: 10, SDKAppID: t2.getSDKAppID(), SDKVersion: t2.getVersion(), tinyID: Number(t2.getTinyID()), userID: t2.getUserID(), platform: e2.getPlatform(), instanceID: t2.getInstanceID(), traceID: xe() };
      }, Vr = function(e2) {
        r(i2, e2);
        var n2 = f(i2);
        function i2(e3) {
          var t2;
          o(this, i2), (t2 = n2.call(this, e3))._n = "EventStatModule", t2.TAG = "im-ssolog-event", t2._reportBody = new qr(), t2.MIN_THRESHOLD = 20, t2.MAX_THRESHOLD = 100, t2.WAITING_TIME = 6e4, t2.REPORT_LEVEL = [4, 5, 6], t2.REPORT_SDKAPPID_BLACKLIST = [], t2.REPORT_TINYID_WHITELIST = [], t2._lastReportTime = Date.now();
          var a2 = t2.getInnerEmitterInstance();
          return a2.on(Fs.A2KEY_AND_TINYID_UPDATED, t2._onLoginSuccess, h(t2)), a2.on(Fs.CLOUD_CONFIG_UPDATED, t2._onCloudConfigUpdated, h(t2)), t2;
        }
        return a(i2, [{ key: "reportAtOnce", value: function() {
          this._report();
        } }, { key: "_onLoginSuccess", value: function() {
          var e3 = this, t2 = this.getModule(oo), n3 = t2.getItem(this.TAG, false);
          !un(n3) && mt(n3.forEach) && (Ye.l("".concat(this._n, "._onLoginSuccess. logs count:").concat(n3.length)), n3.forEach(function(t3) {
            e3._reportBody.pushIn(t3);
          }), t2.removeItem(this.TAG, false));
        } }, { key: "_onCloudConfigUpdated", value: function() {
          var e3 = this.getCloudConfig("evt_rpt_threshold"), t2 = this.getCloudConfig("evt_rpt_waiting"), n3 = this.getCloudConfig("evt_rpt_level"), o2 = this.getCloudConfig("evt_rpt_sdkappid_bl"), i3 = this.getCloudConfig("evt_rpt_tinyid_wl");
          ft(e3) || (this.MIN_THRESHOLD = Number(e3)), ft(t2) || (this.WAITING_TIME = Number(t2)), ft(n3) || (this.REPORT_LEVEL = n3.split(",").map(function(e4) {
            return Number(e4);
          })), ft(o2) || (this.REPORT_SDKAPPID_BLACKLIST = o2.split(",").map(function(e4) {
            return Number(e4);
          })), ft(i3) || (this.REPORT_TINYID_WHITELIST = i3.split(","));
        } }, { key: "pushIn", value: function(e3) {
          e3 instanceof Ms && (e3.updateTimeStamp(), this._reportBody.pushIn(e3), this._reportBody.getLogsNumInMemory() >= this.MIN_THRESHOLD && this._report());
        } }, { key: "onCheckTimer", value: function() {
          Date.now() < this._lastReportTime + this.WAITING_TIME || this._reportBody.isEmpty() || this._report();
        } }, { key: "_filterLogs", value: function(e3) {
          var t2 = this, n3 = this.getModule(no), o2 = n3.getSDKAppID(), i3 = n3.getTinyID();
          return zt(this.REPORT_SDKAPPID_BLACKLIST, o2) && !Xt(this.REPORT_TINYID_WHITELIST, i3) ? [] : e3.filter(function(e4) {
            return t2.REPORT_LEVEL.includes(e4.level);
          });
        } }, { key: "_report", value: function() {
          var e3 = this;
          if (!this._reportBody.isEmpty()) {
            var n3 = this._reportBody.getLogsInMemory(), o2 = this._filterLogs(n3);
            if (0 !== o2.length) {
              var i3 = { header: xr(this), event: o2 };
              this.request({ protocolName: Ra, requestData: t({}, i3) }).then(function() {
                e3._lastReportTime = Date.now();
              }).catch(function(t2) {
                Ye.w("".concat(e3._n, "._report failed. networkType:").concat(e3.getNetworkType(), " error:"), t2), e3._lastReportTime = Date.now(), e3._reportBody.backfill(n3), e3._reportBody.getLogsNumInMemory() > e3.MAX_THRESHOLD && e3._flushAtOnce();
              });
            } else
              this._lastReportTime = Date.now();
          }
        } }, { key: "_flushAtOnce", value: function() {
          var e3 = this.getModule(oo), t2 = e3.getItem(this.TAG, false), n3 = this._reportBody.getLogsInMemory(), o2 = "".concat(this._n, "._flushAtOnce");
          if (un(t2))
            Ye.l("".concat(o2, " count:").concat(n3.length)), e3.setItem(this.TAG, n3, true, false);
          else {
            var i3 = n3.concat(t2);
            i3.length > this.MAX_THRESHOLD && (i3 = i3.slice(0, this.MAX_THRESHOLD)), Ye.l("".concat(o2, " count:").concat(i3.length)), e3.setItem(this.TAG, i3, true, false);
          }
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._lastReportTime = 0, this._report(), this.REPORT_SDKAPPID_BLACKLIST = [], this.REPORT_TINYID_WHITELIST = [];
        } }]), i2;
      }(Oo), Hr = "none", Br = "online", Kr = [No.OVER_FREQUENCY_LIMIT, No.OPEN_SERVICE_OVERLOAD_ERROR], Wr = function() {
        function e2(t2) {
          o(this, e2), this._m = t2, this._networkType = "", this._n = "NetMonitorModule", this.MAX_WAIT_TIME = 3e3, this._mpNetworkStatusCallback = null, this._webOnlineCallback = null, this._webOfflineCallback = null;
        }
        return a(e2, [{ key: "start", value: function() {
          var e3 = this;
          se ? (ce.getNetworkType({ success: function(t2) {
            e3._networkType = t2.networkType || t2.subtype || "", t2.networkType === Hr ? Ye.w("".concat(e3._n, ".start no network, please check!")) : Ye.i("".concat(e3._n, ".start networkType:").concat(t2.networkType));
          } }), this._mpNetworkStatusCallback = this._onNetworkStatusChange.bind(this), ce.onNetworkStatusChange(this._mpNetworkStatusCallback)) : (this._networkType = Br, this._webOnlineCallback = this._onWebOnline.bind(this), this._webOfflineCallback = this._onWebOffline.bind(this), window && (window.addEventListener("online", this._webOnlineCallback), window.addEventListener("offline", this._webOfflineCallback)));
        } }, { key: "_onWebOnline", value: function() {
          this._onNetworkStatusChange({ isConnected: true, networkType: Br });
        } }, { key: "_onWebOffline", value: function() {
          this._onNetworkStatusChange({ isConnected: false, networkType: Hr });
        } }, { key: "_onNetworkStatusChange", value: function(e3) {
          var t2 = e3.isConnected, n2 = e3.networkType, o2 = "".concat(this._n, "._onNetworkStatusChange"), i2 = false;
          t2 ? (Ye.i("".concat(o2, " previous:").concat(this._networkType, " current:").concat(n2)), this._networkType !== n2 && (i2 = true, this._m.getModule(lo).reConnect(true))) : this._networkType !== n2 && (i2 = true, Ye.w("".concat(o2, " no network, please check!")), this._m.getModule(lo).offline());
          i2 && (new Ms("networkChange").setMessage("isConnected:".concat(t2, " previousNetworkType:").concat(this._networkType, " networkType:").concat(n2)).end(), this._networkType = n2);
        } }, { key: "probe", value: function(e3) {
          var t2 = this;
          if (!ft(e3) && Kr.includes(e3.code))
            return Promise.resolve([true, this._networkType]);
          var n2 = "".concat(this._n, ".probe");
          return new Promise(function(e4, o2) {
            se ? ce.getNetworkType({ success: function(o3) {
              t2._networkType = o3.networkType, o3.networkType === Hr ? (Ye.w("".concat(n2, " no network, please check!")), e4([false, o3.networkType])) : (Ye.i("".concat(n2, " networkType:").concat(o3.networkType)), e4([true, o3.networkType]));
            } }) : t2._networkType === Hr ? e4([false, Hr]) : e4([true, Br]);
          });
        } }, { key: "getNetworkType", value: function() {
          return this._networkType;
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), se ? null !== this._mpNetworkStatusCallback && (ce.offNetworkStatusChange && (ie || ee ? ce.offNetworkStatusChange(this._mpNetworkStatusCallback) : ce.offNetworkStatusChange()), this._mpNetworkStatusCallback = null) : window && (null !== this._webOnlineCallback && (window.removeEventListener("online", this._webOnlineCallback), this._webOnlineCallback = null), null !== this._onWebOffline && (window.removeEventListener("offline", this._webOfflineCallback), this._webOfflineCallback = null));
        } }]), e2;
      }();
      var Yr = function(e2, t2) {
        return e2(t2 = { exports: {} }, t2.exports), t2.exports;
      }(function(e2) {
        var t2 = Object.prototype.hasOwnProperty, n2 = "~";
        function o2() {
        }
        function i2(e3, t3, n3) {
          this.fn = e3, this.context = t3, this.once = n3 || false;
        }
        function a2(e3, t3, o3, a3, s3) {
          if ("function" != typeof o3)
            throw new TypeError("The listener must be a function");
          var r3 = new i2(o3, a3 || e3, s3), c2 = n2 ? n2 + t3 : t3;
          return e3._events[c2] ? e3._events[c2].fn ? e3._events[c2] = [e3._events[c2], r3] : e3._events[c2].push(r3) : (e3._events[c2] = r3, e3._eventsCount++), e3;
        }
        function s2(e3, t3) {
          0 == --e3._eventsCount ? e3._events = new o2() : delete e3._events[t3];
        }
        function r2() {
          this._events = new o2(), this._eventsCount = 0;
        }
        Object.create && (o2.prototype = /* @__PURE__ */ Object.create(null), new o2().__proto__ || (n2 = false)), r2.prototype.eventNames = function() {
          var e3, o3, i3 = [];
          if (0 === this._eventsCount)
            return i3;
          for (o3 in e3 = this._events)
            t2.call(e3, o3) && i3.push(n2 ? o3.slice(1) : o3);
          return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e3)) : i3;
        }, r2.prototype.listeners = function(e3) {
          var t3 = n2 ? n2 + e3 : e3, o3 = this._events[t3];
          if (!o3)
            return [];
          if (o3.fn)
            return [o3.fn];
          for (var i3 = 0, a3 = o3.length, s3 = new Array(a3); i3 < a3; i3++)
            s3[i3] = o3[i3].fn;
          return s3;
        }, r2.prototype.listenerCount = function(e3) {
          var t3 = n2 ? n2 + e3 : e3, o3 = this._events[t3];
          return o3 ? o3.fn ? 1 : o3.length : 0;
        }, r2.prototype.emit = function(e3, t3, o3, i3, a3, s3) {
          var r3 = n2 ? n2 + e3 : e3;
          if (!this._events[r3])
            return false;
          var c2, u2, l2 = this._events[r3], d2 = arguments.length;
          if (l2.fn) {
            switch (l2.once && this.removeListener(e3, l2.fn, void 0, true), d2) {
              case 1:
                return l2.fn.call(l2.context), true;
              case 2:
                return l2.fn.call(l2.context, t3), true;
              case 3:
                return l2.fn.call(l2.context, t3, o3), true;
              case 4:
                return l2.fn.call(l2.context, t3, o3, i3), true;
              case 5:
                return l2.fn.call(l2.context, t3, o3, i3, a3), true;
              case 6:
                return l2.fn.call(l2.context, t3, o3, i3, a3, s3), true;
            }
            for (u2 = 1, c2 = new Array(d2 - 1); u2 < d2; u2++)
              c2[u2 - 1] = arguments[u2];
            l2.fn.apply(l2.context, c2);
          } else {
            var p2, g2 = l2.length;
            for (u2 = 0; u2 < g2; u2++)
              switch (l2[u2].once && this.removeListener(e3, l2[u2].fn, void 0, true), d2) {
                case 1:
                  l2[u2].fn.call(l2[u2].context);
                  break;
                case 2:
                  l2[u2].fn.call(l2[u2].context, t3);
                  break;
                case 3:
                  l2[u2].fn.call(l2[u2].context, t3, o3);
                  break;
                case 4:
                  l2[u2].fn.call(l2[u2].context, t3, o3, i3);
                  break;
                default:
                  if (!c2)
                    for (p2 = 1, c2 = new Array(d2 - 1); p2 < d2; p2++)
                      c2[p2 - 1] = arguments[p2];
                  l2[u2].fn.apply(l2[u2].context, c2);
              }
          }
          return true;
        }, r2.prototype.on = function(e3, t3, n3) {
          return a2(this, e3, t3, n3, false);
        }, r2.prototype.once = function(e3, t3, n3) {
          return a2(this, e3, t3, n3, true);
        }, r2.prototype.removeListener = function(e3, t3, o3, i3) {
          var a3 = n2 ? n2 + e3 : e3;
          if (!this._events[a3])
            return this;
          if (!t3)
            return s2(this, a3), this;
          var r3 = this._events[a3];
          if (r3.fn)
            r3.fn !== t3 || i3 && !r3.once || o3 && r3.context !== o3 || s2(this, a3);
          else {
            for (var c2 = 0, u2 = [], l2 = r3.length; c2 < l2; c2++)
              (r3[c2].fn !== t3 || i3 && !r3[c2].once || o3 && r3[c2].context !== o3) && u2.push(r3[c2]);
            u2.length ? this._events[a3] = 1 === u2.length ? u2[0] : u2 : s2(this, a3);
          }
          return this;
        }, r2.prototype.removeAllListeners = function(e3) {
          var t3;
          return e3 ? (t3 = n2 ? n2 + e3 : e3, this._events[t3] && s2(this, t3)) : (this._events = new o2(), this._eventsCount = 0), this;
        }, r2.prototype.off = r2.prototype.removeListener, r2.prototype.addListener = r2.prototype.on, r2.prefixed = n2, r2.EventEmitter = r2, e2.exports = r2;
      }), jr = ["requestSnapshotUrl"], Jr = function(e2) {
        r(i2, e2);
        var n2 = f(i2);
        function i2(e3) {
          var t2;
          o(this, i2), (t2 = n2.call(this, e3))._n = "UploadModule", t2.TIMUploadPlugin = null, t2.timUploadPlugin = null, t2.COSSDK = null, t2._cosUploadMethod = null, t2.expiredTimeLimit = 600, t2.appid = 0, t2.bucketName = "", t2.ciUrl = "", t2.directory = "", t2.downloadUrl = "", t2.uploadUrl = "", t2.region = "ap-shanghai", t2.cos = null, t2.cosOptions = { secretId: "", secretKey: "", sessionToken: "", expiredTime: 0 }, t2.uploadFileType = "", t2.duration = 900, t2.tryCount = 0, t2.UPLOAD_SIZE_LIMIT = { A: 20971520, F: 104857600, I: 20971520, V: 104857600 };
          var a2 = t2.getInnerEmitterInstance();
          return a2.on(Fs.A2KEY_AND_TINYID_UPDATED, t2._init, h(t2)), a2.on(Fs.CLOUD_CONFIG_UPDATED, t2._onCloudConfigUpdated, h(t2)), t2;
        }
        return a(i2, [{ key: "_init", value: function() {
          var e3 = this.getModule(ro);
          if (this.TIMUploadPlugin = e3.getPlugin("tim-upload-plugin"), this.TIMUploadPlugin)
            this._initUploaderMethod();
          else {
            var t2 = se ? "cos-wx-sdk" : "cos-js-sdk";
            this.COSSDK = e3.getPlugin(t2), this.COSSDK ? (this._getAuthorizationKey(), this.outputWarning("CosReplacement", t2)) : this.outputWarning("PluginUndetected");
          }
        } }, { key: "_onCloudConfigUpdated", value: function() {
          var e3 = "".concat(this._n, "._onCloudConfigUpdated"), t2 = this.getCloudConfig("upload_size_limit");
          if (Ye.l("".concat(e3, " uploadSizeLimit:").concat(t2)), !ft(t2))
            try {
              var n3 = JSON.parse(t2);
              this.UPLOAD_SIZE_LIMIT = { A: n3.a ? 1048576 * parseInt(n3.a) : this.UPLOAD_SIZE_LIMIT.A, F: n3.f ? 1048576 * parseInt(n3.f) : this.UPLOAD_SIZE_LIMIT.F, I: n3.i ? 1048576 * parseInt(n3.i) : this.UPLOAD_SIZE_LIMIT.I, V: n3.v ? 1048576 * parseInt(n3.v) : this.UPLOAD_SIZE_LIMIT.V };
            } catch (o2) {
              Ye.e("".concat(e3, " JSON parse error. uploadSizeLimit:"), t2);
            }
        } }, { key: "_getAuthorizationKey", value: function() {
          var e3 = this, t2 = "".concat(this._n, ".").concat("_getAuthorizationKey"), n3 = new Ms("_getAuthorizationKey"), o2 = Math.ceil(Date.now() / 1e3);
          this.request({ protocolName: Sa, requestData: { duration: this.expiredTimeLimit } }).then(function(i3) {
            var a2 = i3.data;
            Ye.l("".concat(t2, " ok. data:"), a2);
            var s2 = a2.expiredTime - o2;
            n3.setMessage("requestId:".concat(a2.requestId, " requestTime:").concat(o2, " expiredTime:").concat(a2.expiredTime, " diff:").concat(s2, "s")).setNetworkType(e3.getNetworkType()).end(), !se && a2.region && (e3.region = a2.region), e3.appid = a2.appid, e3.bucketName = a2.bucketName, e3.ciUrl = a2.ciUrl, e3.directory = a2.directory, e3.downloadUrl = a2.downloadUrl, e3.uploadUrl = a2.uploadUrl, e3.cosOptions = { secretId: a2.secretId, secretKey: a2.secretKey, sessionToken: a2.sessionToken, expiredTime: a2.expiredTime }, Ye.l("".concat(t2, " ok. region:").concat(e3.region, " bucketName:").concat(e3.bucketName)), e3._initUploaderMethod();
          }).catch(function(o3) {
            e3.probeNetwork().then(function(e4) {
              var t3 = v(e4, 2), i3 = t3[0], a2 = t3[1];
              n3.setError(o3, i3, a2).end();
            }), Ye.w("".concat(t2, " failed. error:"), o3);
          });
        } }, { key: "_getCosPreSigUrl", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".").concat("_getCosPreSigUrl"), o2 = Math.ceil(Date.now() / 1e3), i3 = new Ms("_getCosPreSigUrl");
          return this.request({ protocolName: Aa, requestData: { fileType: e3.fileType, fileName: e3.fileName, uploadMethod: e3.uploadMethod, duration: e3.duration } }).then(function(e4) {
            t2.tryCount = 0;
            var a2 = e4.data || {}, s2 = a2.expiredTime - o2;
            return Ye.l("".concat(n3, " ok. data:"), a2), i3.setMessage("requestId:".concat(a2.requestId, " expiredTime:").concat(a2.expiredTime, " diff:").concat(s2, "s")).setNetworkType(t2.getNetworkType()).end(), a2;
          }).catch(function(o3) {
            return -1 === o3.code && (o3.code = No.COS_GET_SIG_FAIL), t2.probeNetwork().then(function(e4) {
              var t3 = v(e4, 2), n4 = t3[0], a2 = t3[1];
              i3.setError(o3, n4, a2).end();
            }), Ye.w("".concat(n3, " failed. error:"), o3), t2.tryCount < 1 ? (t2.tryCount++, t2._getCosPreSigUrl(e3)) : (t2.tryCount = 0, Ro({ code: No.COS_GET_SIG_FAIL }));
          });
        } }, { key: "_initUploaderMethod", value: function() {
          var e3 = this;
          if (this.TIMUploadPlugin)
            return this.timUploadPlugin = new this.TIMUploadPlugin(), void (this._cosUploadMethod = function(t2, n3) {
              e3.timUploadPlugin.uploadFile(t2, n3);
            });
          this.appid && (this.cos = se ? new this.COSSDK({ ForcePathStyle: true, getAuthorization: this._getAuthorization.bind(this) }) : new this.COSSDK({ getAuthorization: this._getAuthorization.bind(this) }), this._cosUploadMethod = se ? function(t2, n3) {
            e3.cos.postObject(t2, n3);
          } : function(t2, n3) {
            e3.cos.uploadFiles(t2, n3);
          });
        } }, { key: "onCheckTimer", value: function(e3) {
          this.COSSDK && (this.TIMUploadPlugin || this.isLoggedIn() && e3 % 60 == 0 && Math.ceil(Date.now() / 1e3) >= this.cosOptions.expiredTime - 120 && this._getAuthorizationKey());
        } }, { key: "_getAuthorization", value: function(e3, t2) {
          t2({ TmpSecretId: this.cosOptions.secretId, TmpSecretKey: this.cosOptions.secretKey, XCosSecurityToken: this.cosOptions.sessionToken, ExpiredTime: this.cosOptions.expiredTime });
        } }, { key: "upload", value: function(e3) {
          if (true === e3.getRelayFlag())
            return Promise.resolve();
          var t2 = this.getModule(fo);
          switch (e3.type) {
            case L.MSG_IMAGE:
              return t2.addTotalCount(ds), this._uploadImage(e3);
            case L.MSG_FILE:
              return t2.addTotalCount(ds), this._uploadFile(e3);
            case L.MSG_AUDIO:
              return t2.addTotalCount(ds), this._uploadAudio(e3);
            case L.MSG_VIDEO:
              return t2.addTotalCount(ds), this._uploadVideo(e3);
            default:
              return Promise.resolve();
          }
        } }, { key: "_uploadImage", value: function(e3) {
          var n3 = this, o2 = this.getModule(Jn), i3 = e3.getElements()[0], a2 = o2.getMessageOption(e3.clientSequence);
          return this.doUploadImage({ file: a2.payload.file, to: a2.to, onProgress: function(e4) {
            if (i3.updatePercent(e4), mt(a2.onProgress))
              try {
                a2.onProgress(e4);
              } catch (t2) {
                return Ro({ code: No.MSG_ONPROGRESS_FUNCTION_ERROR });
              }
          } }).then(function(o3) {
            var a3, s2, r2 = o3.location, c2 = o3.fileType, u2 = o3.fileSize, l2 = o3.width, d2 = o3.height, p2 = o3.smallImageUrl, g2 = o3.smallImageWidth, h2 = o3.smallImageHeight, _2 = o3.largeImageUrl, f2 = o3.largeImageWidth, v2 = o3.largeImageHeight, m2 = n3.isPrivateNetWork() ? r2 : Rt(r2);
            return i3.updateImageFormat(c2), p2 && _2 ? (a3 = { url: p2, width: g2, height: h2 }, s2 = { url: _2, width: f2, height: v2 }) : (a3 = Wt({ originUrl: m2, originWidth: l2, originHeight: d2, min: 198 }), s2 = Wt({ originUrl: m2, originWidth: l2, originHeight: d2, min: 720 })), i3.updateImageInfoArray([{ size: u2, url: m2, width: l2, height: d2 }, t({}, s2), t({}, a3)]), e3;
          });
        } }, { key: "_uploadFile", value: function(e3) {
          var t2 = this, n3 = this.getModule(Jn), o2 = e3.getElements()[0], i3 = n3.getMessageOption(e3.clientSequence);
          return this.doUploadFile({ file: i3.payload.file, to: i3.to, onProgress: function(e4) {
            if (o2.updatePercent(e4), mt(i3.onProgress))
              try {
                i3.onProgress(e4);
              } catch (t3) {
                return Ro({ code: No.MSG_ONPROGRESS_FUNCTION_ERROR });
              }
          } }).then(function(n4) {
            var i4 = n4.location, a2 = t2.isPrivateNetWork() ? i4 : Rt(i4);
            return o2.updateFileUrl(a2), e3;
          });
        } }, { key: "_uploadAudio", value: function(e3) {
          var t2 = this, n3 = this.getModule(Jn), o2 = e3.getElements()[0], i3 = n3.getMessageOption(e3.clientSequence);
          return this.doUploadAudio({ file: i3.payload.file, to: i3.to, onProgress: function(e4) {
            if (o2.updatePercent(e4), mt(i3.onProgress))
              try {
                i3.onProgress(e4);
              } catch (t3) {
                return Ro({ code: No.MSG_ONPROGRESS_FUNCTION_ERROR });
              }
          } }).then(function(n4) {
            var i4 = n4.location, a2 = t2.isPrivateNetWork() ? i4 : Rt(i4);
            return o2.updateAudioUrl(a2), e3;
          });
        } }, { key: "_uploadVideo", value: function(e3) {
          var t2 = this, n3 = this.getModule(Jn), o2 = e3.getElements()[0], i3 = n3.getMessageOption(e3.clientSequence);
          return this.doUploadVideo({ file: i3.payload.file, to: i3.to, onProgress: function(e4) {
            if (o2.updatePercent(e4), mt(i3.onProgress))
              try {
                i3.onProgress(e4);
              } catch (t3) {
                return Ro({ code: No.MSG_ONPROGRESS_FUNCTION_ERROR });
              }
          } }).then(function(n4) {
            var i4 = n4.location, a2 = n4.snapshotInfo, s2 = t2.isPrivateNetWork() ? i4 : Rt(i4);
            return o2.updateVideoUrl(s2), un(a2) || o2.updateSnapshotInfo(a2), e3;
          });
        } }, { key: "_checkSizeError", value: function(e3) {
          var t2 = "";
          return "A" === e3 ? t2 = "audio" : "I" === e3 ? t2 = "image" : "V" === e3 ? t2 = "video" : "F" === e3 && (t2 = "file"), Ro({ code: No["MSG_".concat(e3, "_SIZE_LIMIT")], message: this.getErrorMessage("UploadSizeLimit", t2, "".concat(this.UPLOAD_SIZE_LIMIT[e3] / 1048576, "MB")) });
        } }, { key: "doUploadImage", value: function(e3) {
          var t2 = this;
          if (!e3.file || this._isEmptyFileList(e3.file.files))
            return Ro({ code: No.MSG_I_SELECT_F_FIRST });
          var n3 = this._checkImageType(e3.file);
          if (true !== n3)
            return n3;
          var o2 = this._checkImageSize(e3.file);
          if (true !== o2)
            return o2;
          var i3 = null;
          return this._setUploadFileType(Hs), this.uploadByCOS(e3).then(function(e4) {
            return i3 = e4, t2.isPrivateNetWork() ? Vt(e4.location) : Vt("https://".concat(e4.location));
          }).then(function(e4) {
            return i3.width = e4.width, i3.height = e4.height, Promise.resolve(i3);
          });
        } }, { key: "_checkImageType", value: function(e3) {
          var t2 = "";
          return t2 = se ? e3.url.slice(e3.url.lastIndexOf(".") + 1) : e3.files[0].name.slice(e3.files[0].name.lastIndexOf(".") + 1), xs.indexOf(t2.toLowerCase()) >= 0 || Ro({ code: No.MSG_I_TYPES_LIMIT });
        } }, { key: "_checkImageSize", value: function(e3) {
          var t2 = 0;
          return 0 === (t2 = se ? e3.size : e3.files[0].size) ? Ro({ code: No.MSG_F_IS_EMPTY }) : t2 < this.UPLOAD_SIZE_LIMIT.I || this._checkSizeError("I");
        } }, { key: "doUploadFile", value: function(e3) {
          return !e3.file || this._isEmptyFileList(e3.file.files) ? Ro({ code: No.MSG_F_SELECT_F_FIRST }) : e3.file.files[0].size > this.UPLOAD_SIZE_LIMIT.F ? this._checkSizeError("F") : 0 === e3.file.files[0].size ? Ro({ code: No.MSG_F_IS_EMPTY }) : (this._setUploadFileType(Ws), this.uploadByCOS(e3));
        } }, { key: "doUploadVideo", value: function(e3) {
          return e3.file.videoFile.size > this.UPLOAD_SIZE_LIMIT.V ? this._checkSizeError("V") : 0 === e3.file.videoFile.size ? Ro({ code: No.MSG_F_IS_EMPTY }) : -1 === Vs.indexOf(e3.file.videoFile.type) ? Ro({ code: No.MSG_V_TYPES_LIMIT }) : (this._setUploadFileType(Bs), se ? this.handleVideoUpload({ file: e3.file.videoFile, onProgress: e3.onProgress }) : re ? this.handleVideoUpload(e3) : void 0);
        } }, { key: "handleVideoUpload", value: function(e3) {
          var t2 = this;
          return new Promise(function(n3, o2) {
            t2.uploadByCOS(e3).then(function(e4) {
              n3(e4);
            }).catch(function() {
              t2.uploadByCOS(e3).then(function(e4) {
                n3(e4);
              }).catch(function() {
                o2(new Lo({ code: No.MSG_V_UPLOAD_FAIL }));
              });
            });
          });
        } }, { key: "doUploadAudio", value: function(e3) {
          return e3.file ? e3.file.size > this.UPLOAD_SIZE_LIMIT.A ? this._checkSizeError("A") : 0 === e3.file.size ? Ro({ code: No.MSG_F_IS_EMPTY }) : (this._setUploadFileType(Ks), this.uploadByCOS(e3)) : Ro({ code: No.MSG_A_UPLOAD_FAIL });
        } }, { key: "uploadByCOS", value: function(e3) {
          var t2 = this;
          if (!mt(this._cosUploadMethod))
            return this.outputWarning("PluginUndetected"), Ro({ code: No.COS_UNDETECTED });
          if (this.timUploadPlugin)
            return this._uploadWithPreSigUrl(e3);
          var n3 = new Ms("upload"), o2 = "".concat(this._n, ".uploadByCOS"), i3 = Date.now(), a2 = this._getFile(e3);
          return new Promise(function(s2, r2) {
            var c2 = se ? t2._createCosOptionsWXMiniApp(e3) : t2._createCosOptionsWeb(e3), u2 = t2;
            t2._cosUploadMethod(c2, function(e4, c3) {
              var l2 = /* @__PURE__ */ Object.create(null);
              if (c3) {
                if (e4 || _t(c3.files) && c3.files[0].error) {
                  var d2 = new Lo({ code: No.MSG_F_UPLOAD_FAIL });
                  return n3.setError(d2, true, t2.getNetworkType()).end(), Ye.l("".concat(o2, " failed. error:"), c3.files[0].error), 403 === c3.files[0].error.statusCode && (Ye.w("".concat(o2, " failed. cos AccessKeyId was invalid, regain auth key!")), t2._getAuthorizationKey()), void r2(d2);
                }
                l2.fileName = a2.name, l2.fileSize = a2.size, l2.fileType = a2.type.slice(a2.type.indexOf("/") + 1).toLowerCase(), l2.location = se ? c3.Location : c3.files[0].data.Location;
                var p2 = Date.now() - i3, g2 = u2._formatFileSize(a2.size), h2 = u2._formatSpeed(1e3 * a2.size / p2), _2 = "size:".concat(g2, " time:").concat(p2, "ms speed:").concat(h2);
                Ye.l("".concat(o2, " success. name:").concat(a2.name, " ").concat(_2)), s2(l2);
                var f2 = t2.getModule(fo);
                return f2.addCost(ds, p2), f2.addFileSize(ds, a2.size), void n3.setNetworkType(t2.getNetworkType()).setMessage(_2).end();
              }
              var v2 = new Lo({ code: No.MSG_F_UPLOAD_FAIL });
              n3.setError(v2, true, u2.getNetworkType()).end(), Ye.w("".concat(o2, " failed. error:"), e4), 403 === e4.statusCode && (Ye.w("".concat(o2, " failed. cos AccessKeyId was invalid, regain auth key!")), t2._getAuthorizationKey()), r2(v2);
            });
          });
        } }, { key: "_uploadWithPreSigUrl", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, "._uploadWithPreSigUrl"), o2 = this._getFile(e3);
          return this._createCosOptionsPreSigUrl(e3).then(function(e4) {
            return new Promise(function(i3, a2) {
              var s2 = new Ms("upload"), r2 = e4.requestSnapshotUrl, c2 = void 0 === r2 ? void 0 : r2, u2 = g(e4, jr), l2 = Date.now();
              t2._cosUploadMethod(u2, function(e5, r3) {
                if (e5 || 403 === r3.statusCode)
                  return s2.setError(new Lo(e5), true, t2.getNetworkType()).end(), Ye.l("".concat(n3, " failed, error:"), e5), void a2(new Lo({ code: No.MSG_F_UPLOAD_FAIL }));
                var d2 = /* @__PURE__ */ Object.create(null), p2 = r3.data.location || "";
                t2.isPrivateNetWork() || 0 !== p2.indexOf("https://") && 0 !== p2.indexOf("http://") || (p2 = p2.split("//")[1]), d2.fileName = o2.name, d2.fileSize = o2.size, d2.fileType = o2.type.slice(o2.type.indexOf("/") + 1).toLowerCase(), d2.location = p2;
                var g2 = Date.now() - l2, h2 = t2._formatFileSize(o2.size), _2 = t2._formatSpeed(1e3 * o2.size / g2), f2 = "size:".concat(h2, ",time:").concat(g2, "ms,speed:").concat(_2, " res:").concat(JSON.stringify(r3.data));
                Ye.l("".concat(n3, " success name:").concat(o2.name, ",").concat(f2)), s2.setNetworkType(t2.getNetworkType()).setMessage(f2).end();
                var v2 = t2.getModule(fo);
                v2.addCost(ds, g2), v2.addFileSize(ds, o2.size);
                var m2 = [];
                if (u2.thumbUrl && u2.largeUrl && (m2 = [t2._getSmallImageInfoByUrl(u2.thumbUrl, d2), t2._getLargeImageInfoByUrl(u2.largeUrl, d2)]), c2 && m2.push(t2._getSnapshotInfoByUrl(c2, d2)), m2.length > 0)
                  return Promise.all(m2).then(function() {
                    i3(d2);
                  });
                i3(d2);
              });
            });
          });
        } }, { key: "_getRawOrUploadProxyUrl", value: function(e3) {
          var t2 = this.getModule(no).getFileUploadProxy(), n3 = e3;
          return t2 && (n3 = e3.replace(/^https:\/\/[^/]+/, t2)), n3;
        } }, { key: "_getFile", value: function(e3) {
          return _t(e3.file.files) || yt(e3.file.files) ? e3.file.files[0] : e3.file;
        } }, { key: "_formatFileSize", value: function(e3) {
          return e3 < 1024 ? e3 + "B" : e3 < 1048576 ? Math.floor(e3 / 1024) + "KB" : Math.floor(e3 / 1048576) + "MB";
        } }, { key: "_formatSpeed", value: function(e3) {
          return e3 <= 1048576 ? Jt(e3 / 1024, 1) + "KB/s" : Jt(e3 / 1048576, 1) + "MB/s";
        } }, { key: "_createCosOptionsWeb", value: function(e3) {
          var t2 = this._getFile(e3), n3 = t2.name, o2 = n3.slice(n3.lastIndexOf(".")), i3 = this._genFileName("".concat(Lt(999999)).concat(o2));
          return { files: [{ Bucket: "".concat(this.bucketName, "-").concat(this.appid), Region: this.region, Key: "".concat(this.directory, "/").concat(i3), Body: t2 }], SliceSize: 1048576, onProgress: function(t3) {
            if ("function" == typeof e3.onProgress)
              try {
                e3.onProgress(t3.percent);
              } catch (n4) {
                Ye.w("onProgress callback error:", n4);
              }
          }, onFileFinish: function(e4, t3, n4) {
          } };
        } }, { key: "_createCosOptionsWXMiniApp", value: function(e3) {
          var t2 = this._getFile(e3), n3 = this._genFileName(t2.name), o2 = t2.url;
          return { Bucket: "".concat(this.bucketName, "-").concat(this.appid), Region: this.region, Key: "".concat(this.directory, "/").concat(n3), FilePath: o2, onProgress: function(t3) {
            if (Ye.l(JSON.stringify(t3)), "function" == typeof e3.onProgress)
              try {
                e3.onProgress(t3.percent);
              } catch (n4) {
                Ye.w("onProgress callback error:", n4);
              }
          } };
        } }, { key: "_createCosOptionsPreSigUrl", value: function(e3) {
          var t2 = this, n3 = "", o2 = "", i3 = 0, a2 = this._getFile(e3);
          if (se)
            n3 = this._genFileName(a2.name), o2 = a2.url, i3 = 1;
          else {
            var s2 = a2.name, r2 = s2.slice(s2.lastIndexOf("."));
            n3 = this._genFileName("".concat(Lt(999999)).concat(r2)), o2 = a2, i3 = 0;
          }
          return this._getCosPreSigUrl({ fileType: this.uploadFileType, fileName: n3, uploadMethod: i3, duration: this.duration }).then(function(i4) {
            var a3 = i4.uploadUrl, s3 = i4.downloadUrl, r3 = i4.requestSnapshotUrl, c2 = void 0 === r3 ? void 0 : r3, u2 = i4.thumbUrl, l2 = i4.largeUrl, d2 = i4.fileKey;
            return { url: t2._getRawOrUploadProxyUrl(a3), fileType: t2.uploadFileType, fileName: n3, resources: o2, downloadUrl: s3, requestSnapshotUrl: c2, thumbUrl: u2, largeUrl: l2, fileKey: d2, onProgress: function(t3) {
              if ("function" == typeof e3.onProgress)
                try {
                  e3.onProgress(t3.percent);
                } catch (n4) {
                  Ye.w("onProgress callback error:", n4), Ye.e(n4);
                }
            } };
          });
        } }, { key: "_genFileName", value: function(e3) {
          return "".concat(Ht(), "-").concat(e3);
        } }, { key: "_setUploadFileType", value: function(e3) {
          this.uploadFileType = e3;
        } }, { key: "_getSnapshotInfoByUrl", value: function(e3, t2) {
          var n3 = this, o2 = new Ms("getSnapshotInfo");
          return this.request({ protocolName: Ea, requestData: { platform: this.getPlatform(), coverName: this._genFileName(Lt(99999)), requestSnapshotUrl: e3 } }).then(function(e4) {
            var n4 = (e4.data || {}).snapshotUrl;
            return o2.setMessage("snapshotUrl:".concat(n4)).end(), un(n4) ? {} : Vt(n4).then(function(e5) {
              t2.snapshotInfo = { snapshotUrl: n4, snapshotWidth: e5.width, snapshotHeight: e5.height };
            });
          }).catch(function(e4) {
            return Ye.w("".concat(n3._n, "._getSnapshotInfoByUrl failed. error:"), e4), o2.setCode(e4.errorCode).setMessage(e4.errorInfo).end(), {};
          });
        } }, { key: "_getSmallImageInfoByUrl", value: function(e3, t2) {
          return Vt(e3).then(function(n3) {
            t2.smallImageUrl = e3, t2.smallImageWidth = n3.width, t2.smallImageHeight = n3.height;
          });
        } }, { key: "_getLargeImageInfoByUrl", value: function(e3, t2) {
          return Vt(e3).then(function(n3) {
            t2.largeImageUrl = e3, t2.largeImageWidth = n3.width, t2.largeImageHeight = n3.height;
          });
        } }, { key: "_isEmptyFileList", value: function(e3) {
          return !(!yt(e3) || 0 !== e3.length);
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset"));
        } }]), i2;
      }(Oo), zr = ["downloadKey", "pbDownloadKey", "messageList"], Xr = function() {
        function e2(t2) {
          o(this, e2), this._n = "MergerMessageHandler", this._messageModule = t2;
        }
        return a(e2, [{ key: "uploadMergerMessage", value: function(e3, t2) {
          var n2 = this, o2 = "".concat(this._n, ".").concat("uploadMergerMessage");
          Ye.d("".concat(o2, " message:"), e3, "messageBytes:".concat(t2));
          var i2 = e3.payload.messageList, a2 = i2.length, s2 = new Ms("uploadMergerMessage");
          return this._messageModule.request({ protocolName: Fa, requestData: { messageList: i2 } }).then(function(e4) {
            Ye.d("".concat(o2, " ok. response:"), e4.data);
            var i3 = e4.data, r2 = i3.pbDownloadKey, c2 = i3.downloadKey, u2 = { pbDownloadKey: r2, downloadKey: c2, messageNumber: a2 };
            return s2.setNetworkType(n2._messageModule.getNetworkType()).setMessage("".concat(a2, "-").concat(t2, "-").concat(c2)).end(), u2;
          }).catch(function(e4) {
            throw Ye.w("".concat(o2, " failed. error:"), e4), n2._messageModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              s2.setError(e4, o3, i3).end();
            }), e4;
          });
        } }, { key: "downloadMergerMessage", value: function(e3) {
          var n2 = this, o2 = "".concat(this._n, ".").concat("downloadMergerMessage");
          Ye.d("".concat(o2, " message:"), e3);
          var i2 = e3.payload.downloadKey, a2 = this._messageModule.getFileDownloadProxy(), s2 = new Ms("downloadMergerMessage");
          return s2.setMessage("downloadKey:".concat(i2)), this._messageModule.request({ protocolName: qa, requestData: { downloadKey: i2 } }).then(function(i3) {
            if (Ye.d("".concat(o2, " ok. response:"), i3.data), mt(e3.clearElement)) {
              var r2 = e3.payload;
              r2.downloadKey, r2.pbDownloadKey, r2.messageList;
              var c2 = g(r2, zr);
              e3.clearElement(), e3.setElement({ type: e3.type, content: t({ messageList: i3.data.messageList }, c2) }, a2);
            } else {
              var u2 = [];
              i3.data.messageList.forEach(function(e4) {
                if (!un(e4)) {
                  var t2 = new Os(e4, a2);
                  u2.push(t2);
                }
              }), e3.payload.messageList = u2, e3.payload.downloadKey = "", e3.payload.pbDownloadKey = "";
            }
            return s2.setNetworkType(n2._messageModule.getNetworkType()).end(), e3;
          }).catch(function(e4) {
            throw Ye.w("".concat(o2, " failed. key:").concat(i2, " error:"), e4), n2._messageModule.probeNetwork().then(function(t2) {
              var n3 = v(t2, 2), o3 = n3[0], i3 = n3[1];
              s2.setError(e4, o3, i3).end();
            }), e4;
          });
        } }, { key: "createMergerMessagePack", value: function(e3, t2, n2) {
          return e3.conversationType === L.CONV_C2C ? this._createC2CMergerMessagePack(e3, t2, n2) : this._createGroupMergerMessagePack(e3, t2, n2);
        } }, { key: "_createC2CMergerMessagePack", value: function(e3, t2, n2) {
          var o2 = null;
          t2 && (t2.offlinePushInfo && (o2 = t2.offlinePushInfo), true === t2.onlineUserOnly && (o2 ? o2.disablePush = true : o2 = { disablePush: true }));
          var i2 = [];
          if (ht(t2) && ht(t2.messageControlInfo)) {
            var a2 = t2.messageControlInfo, s2 = a2.excludedFromUnreadCount, r2 = a2.excludedFromLastMessage, c2 = a2.excludedFromContentModeration;
            true === s2 && i2.push("NoUnread"), true === r2 && i2.push("NoLastMsg"), true === c2 && i2.push("NoMsgCheck");
          }
          var u2 = "";
          pt(e3.cloudCustomData) && e3.cloudCustomData.length > 0 && (u2 = e3.cloudCustomData);
          var l2 = n2.pbDownloadKey, d2 = n2.downloadKey, p2 = n2.messageNumber, g2 = e3.payload, h2 = g2.title, _2 = g2.abstractList, f2 = g2.compatibleText, v2 = this._messageModule.getModule(Qn), m2 = v2 && v2.isOnlineMessage(e3, t2) ? 0 : void 0;
          return { protocolName: Fo, tjgID: this._messageModule.generateTjgID(e3), requestData: { fromAccount: this._messageModule.getMyUserID(), toAccount: e3.to, msgBody: [{ msgType: e3.type, msgContent: { pbDownloadKey: l2, downloadKey: d2, title: h2, abstractList: _2, compatibleText: f2, messageNumber: p2 } }], cloudCustomData: u2, clientTime: e3.clientTime, msgSeq: e3.sequence, msgRandom: e3.random, msgLifeTime: m2, offlinePushInfo: o2 ? { pushFlag: true === o2.disablePush ? 1 : 0, title: o2.title || "", desc: o2.description || "", ext: o2.extension || "", apnsInfo: { badgeMode: true === o2.ignoreIOSBadge ? 1 : 0 }, androidInfo: { OPPOChannelID: o2.androidOPPOChannelID || "" } } : void 0, messageControlInfo: 0 !== m2 ? i2 : void 0, isSupportExtension: true === e3.isSupportExtension ? 1 : 0, isRelayMessage: true === e3._relayFlag ? 1 : 0 } };
        } }, { key: "_createGroupMergerMessagePack", value: function(e3, t2, n2) {
          var o2 = null;
          t2 && t2.offlinePushInfo && (o2 = t2.offlinePushInfo);
          var i2 = [];
          if (ht(t2) && ht(t2.messageControlInfo)) {
            var a2 = t2.messageControlInfo, s2 = a2.excludedFromUnreadCount, r2 = a2.excludedFromLastMessage, c2 = a2.excludedFromContentModeration;
            true === s2 && i2.push("NoUnread"), true === r2 && i2.push("NoLastMsg"), true === c2 && i2.push("NoMsgCheck");
          }
          var u2 = "";
          pt(e3.cloudCustomData) && e3.cloudCustomData.length > 0 && (u2 = e3.cloudCustomData);
          var l2 = n2.pbDownloadKey, d2 = n2.downloadKey, p2 = n2.messageNumber, g2 = e3.payload, h2 = g2.title, _2 = g2.abstractList, f2 = g2.compatibleText, v2 = this._messageModule.getModule(Zn), m2 = v2 && v2.isOnlineMessage(e3, t2) ? 1 : 0;
          return { protocolName: qo, tjgID: this._messageModule.generateTjgID(e3), requestData: { fromAccount: this._messageModule.getMyUserID(), groupID: e3.to, msgBody: [{ msgType: e3.type, msgContent: { pbDownloadKey: l2, downloadKey: d2, title: h2, abstractList: _2, compatibleText: f2, messageNumber: p2 } }], random: e3.random, priority: e3.priority, clientSequence: e3.clientSequence, groupAtInfo: void 0, cloudCustomData: u2, onlineOnlyFlag: m2, offlinePushInfo: o2 ? { pushFlag: true === o2.disablePush ? 1 : 0, title: o2.title || "", desc: o2.description || "", ext: o2.extension || "", apnsInfo: { badgeMode: true === o2.ignoreIOSBadge ? 1 : 0 }, androidInfo: { OPPOChannelID: o2.androidOPPOChannelID || "" } } : void 0, clientTime: e3.clientTime, needReadReceipt: true !== e3.needReadReceipt || v2.isMessageFromOrToAVChatroom(e3.to) ? 0 : 1, messageControlInfo: 0 === m2 ? i2 : void 0, isSupportExtension: true === e3.isSupportExtension ? 1 : 0, isRelayMessage: true === e3._relayFlag ? 1 : 0 } };
        } }]), e2;
      }(), Qr = { ERR_SVR_COMM_SENSITIVE_TEXT: 80001, ERR_SVR_COMM_BODY_SIZE_LIMIT: 80002, OPEN_SERVICE_OVERLOAD_ERROR: 60022, ERR_SVR_MSG_PKG_PARSE_FAILED: 20001, ERR_SVR_MSG_INTERNAL_AUTH_FAILED: 20002, ERR_SVR_MSG_INVALID_ID: 20003, ERR_SVR_MSG_PUSH_DENY: 20006, ERR_SVR_MSG_IN_PEER_BLACKLIST: 20007, ERR_SVR_MSG_BOTH_NOT_FRIEND: 20009, ERR_SVR_MSG_NOT_PEER_FRIEND: 20010, ERR_SVR_MSG_NOT_SELF_FRIEND: 20011, ERR_SVR_MSG_SHUTUP_DENY: 20012, ERR_SVR_GROUP_INVALID_PARAMETERS: 10004, ERR_SVR_GROUP_PERMISSION_DENY: 10007, ERR_SVR_GROUP_NOT_FOUND: 10010, ERR_SVR_GROUP_INVALID_GROUPID: 10015, ERR_SVR_GROUP_REJECT_FROM_THIRDPARTY: 10016, ERR_SVR_GROUP_SHUTUP_DENY: 10017, MSG_SEND_FAIL: 2100, OVER_FREQUENCY_LIMIT: 2996 }, Zr = [No.MSG_ONPROGRESS_FUNCTION_ERROR, No.MSG_I_SELECT_F_FIRST, No.MSG_I_TYPES_LIMIT, No.MSG_F_IS_EMPTY, No.MSG_I_SIZE_LIMIT, No.MSG_F_SELECT_F_FIRST, No.MSG_F_SIZE_LIMIT, No.MSG_V_SIZE_LIMIT, No.MSG_V_TYPES_LIMIT, No.MSG_A_UPLOAD_FAIL, No.MSG_A_SIZE_LIMIT, No.COS_UNDETECTED];
      function $r(e2) {
        var t2 = false;
        return Object.values(Qr).includes(e2) && (t2 = true), (e2 >= 120001 && e2 <= 13e4 || e2 >= 10100 && e2 <= 10200) && (t2 = true), t2;
      }
      var ec = ["conversationID", "timePosition", "timePeriod"], tc = function(e2) {
        r(i2, e2);
        var n2 = f(i2);
        function i2(e3) {
          var t2;
          return o(this, i2), (t2 = n2.call(this, e3))._n = "MessageModule", t2._messageOptionsMap = /* @__PURE__ */ new Map(), t2._mergerMessageHandler = new Xr(h(t2)), t2;
        }
        return a(i2, [{ key: "createTextMessage", value: function(e3) {
          var t2 = this.getMyUserID();
          e3.currentUser = t2, e3.senderTinyID = this.getMyTinyID();
          var n3 = new Ps(e3), o2 = pt(e3.payload) ? e3.payload : e3.payload.text, i3 = new ys({ text: o2 }), a2 = this._getNickAndAvatarByUserID(t2);
          return n3.setElement(i3), n3.setNickAndAvatar(a2), n3.setNameCard(this._getNameCardByGroupID(n3)), n3;
        } }, { key: "createImageMessage", value: function(e3) {
          var t2 = this.getMyUserID();
          e3.currentUser = t2, e3.senderTinyID = this.getMyTinyID();
          var n3 = new Ps(e3);
          if (se) {
            var o2 = e3.payload.file;
            if (lt(o2))
              return void this.outputWarning("FileUnsupportedInMP", "createImageMessage");
            var i3 = o2.tempFiles[0].path || o2.tempFiles[0].tempFilePath, a2 = { url: i3, name: i3.slice(i3.lastIndexOf("/") + 1), size: o2.tempFiles && o2.tempFiles[0].size || 1, type: i3.slice(i3.lastIndexOf(".") + 1).toLowerCase() };
            e3.payload.file = a2;
          } else if (re) {
            if (lt(e3.payload.file)) {
              var s2 = e3.payload.file;
              e3.payload.file = { files: [s2] };
            } else if (ht(e3.payload.file) && "undefined" != typeof uni) {
              var r2 = e3.payload.file.tempFiles[0];
              e3.payload.file = { files: [r2] };
            }
          }
          var c2 = new Is({ imageFormat: je.UNKNOWN, uuid: this._generateUUID(e3.payload.file), file: e3.payload.file }), u2 = this._getNickAndAvatarByUserID(t2);
          return n3.setElement(c2), n3.setNickAndAvatar(u2), n3.setNameCard(this._getNameCardByGroupID(n3)), this._messageOptionsMap.set(n3.clientSequence, e3), n3;
        } }, { key: "createAudioMessage", value: function(e3) {
          var t2 = e3.payload.file;
          if (se) {
            var n3 = { url: t2.tempFilePath, name: t2.tempFilePath.slice(t2.tempFilePath.lastIndexOf("/") + 1), size: t2.fileSize, second: parseInt(t2.duration) / 1e3, type: t2.tempFilePath.slice(t2.tempFilePath.lastIndexOf(".") + 1).toLowerCase() };
            e3.payload.file = n3;
          }
          var o2 = this.getMyUserID();
          e3.currentUser = o2, e3.senderTinyID = this.getMyTinyID();
          var i3 = new Ps(e3), a2 = new Ds({ second: Math.floor(t2.duration / 1e3), size: t2.fileSize || t2.size, url: t2.tempFilePath, uuid: this._generateUUID(e3.payload.file) }), s2 = this._getNickAndAvatarByUserID(o2);
          return i3.setElement(a2), i3.setNickAndAvatar(s2), i3.setNameCard(this._getNameCardByGroupID(i3)), this._messageOptionsMap.set(i3.clientSequence, e3), i3;
        } }, { key: "createVideoMessage", value: function(e3) {
          var t2 = this.getMyUserID();
          e3.currentUser = t2, e3.senderTinyID = this.getMyTinyID(), e3.payload.file.thumbUrl = "", e3.payload.file.thumbSize = 0;
          var n3 = {};
          if (se) {
            if (ne)
              return void this.outputWarning("VideoUnsupportedInAlipay");
            if (lt(e3.payload.file))
              return void this.outputWarning("FileUnsupportedInMP", "createVideoMessage");
            var o2 = e3.payload.file;
            _t(o2.tempFiles) && (o2 = o2.tempFiles[0]), n3.url = o2.tempFilePath, n3.name = o2.tempFilePath.slice(o2.tempFilePath.lastIndexOf("/") + 1), n3.size = o2.size || 1, n3.second = o2.duration || 0, n3.type = o2.tempFilePath.slice(o2.tempFilePath.lastIndexOf(".") + 1).toLowerCase();
          } else if (re) {
            if (lt(e3.payload.file)) {
              var i3 = e3.payload.file;
              e3.payload.file.files = [i3];
            } else if (ht(e3.payload.file) && "undefined" != typeof uni) {
              var a2 = e3.payload.file.tempFile;
              e3.payload.file.files = [a2];
            }
            var s2 = e3.payload.file;
            n3.url = window.URL.createObjectURL(s2.files[0]), n3.name = s2.files[0].name, n3.size = s2.files[0].size || 1, n3.second = s2.files[0].duration || 0, n3.type = s2.files[0].type.split("/")[1];
          }
          e3.payload.file.videoFile = n3;
          var r2 = new Ps(e3), c2 = new Es({ videoFormat: n3.type, videoSecond: Jt(n3.second, 0), videoSize: n3.size, remoteVideoUrl: "", videoUrl: n3.url, videoUUID: this._generateUUID(e3.payload.file.videoFile), thumbUUID: this._generateUUID(e3.payload.file.videoFile), thumbWidth: e3.payload.file.width || 200, thumbHeight: e3.payload.file.height || 200, thumbUrl: e3.payload.file.thumbUrl, thumbSize: e3.payload.file.thumbSize, thumbFormat: e3.payload.file.thumbUrl.slice(e3.payload.file.thumbUrl.lastIndexOf(".") + 1).toLowerCase() }), u2 = this._getNickAndAvatarByUserID(t2);
          return r2.setElement(c2), r2.setNickAndAvatar(u2), r2.setNameCard(this._getNameCardByGroupID(r2)), this._messageOptionsMap.set(r2.clientSequence, e3), r2;
        } }, { key: "createCustomMessage", value: function(e3) {
          var t2 = this.getMyUserID();
          e3.currentUser = t2, e3.senderTinyID = this.getMyTinyID();
          var n3 = new Ps(e3), o2 = new As({ data: e3.payload.data, description: e3.payload.description, extension: e3.payload.extension }), i3 = this._getNickAndAvatarByUserID(t2);
          return n3.setElement(o2), n3.setNickAndAvatar(i3), n3.setNameCard(this._getNameCardByGroupID(n3)), n3;
        } }, { key: "createFaceMessage", value: function(e3) {
          var t2 = this.getMyUserID();
          e3.currentUser = t2, e3.senderTinyID = this.getMyTinyID();
          var n3 = new Ps(e3), o2 = new Cs(e3.payload), i3 = this._getNickAndAvatarByUserID(t2);
          return n3.setElement(o2), n3.setNickAndAvatar(i3), n3.setNameCard(this._getNameCardByGroupID(n3)), n3;
        } }, { key: "createMergerMessage", value: function(e3) {
          var t2 = this.getMyUserID();
          e3.currentUser = t2, e3.senderTinyID = this.getMyTinyID();
          var n3 = this._getNickAndAvatarByUserID(t2), o2 = new Ps(e3), i3 = new Gs(e3.payload);
          return o2.setElement(i3), o2.setNickAndAvatar(n3), o2.setNameCard(this._getNameCardByGroupID(o2)), o2.setRelayFlag(true), o2;
        } }, { key: "createForwardMessage", value: function(e3) {
          var t2 = e3.to, n3 = e3.conversationType, o2 = e3.priority, i3 = e3.payload, a2 = e3.needReadReceipt, s2 = e3.receiverList, r2 = this.getMyUserID(), c2 = this._getNickAndAvatarByUserID(r2);
          if (i3.type === L.MSG_GRP_TIP)
            return Ro({ code: No.MSG_FORWARD_TYPE_INVALID });
          var u2 = { to: t2, conversationType: n3, conversationID: "".concat(n3).concat(t2), priority: o2, isPlaceMessage: 0, status: gn.UNSEND, currentUser: r2, senderTinyID: this.getMyTinyID(), cloudCustomData: e3.cloudCustomData || i3.cloudCustomData || "", needReadReceipt: a2, receiverList: s2, isSupportExtension: e3.isSupportExtension || false }, l2 = new Ps(u2);
          return l2.setElement(i3.getElements()[0]), l2.setNickAndAvatar(c2), l2.setNameCard(this._getNameCardByGroupID(i3)), l2.setRelayFlag(true), l2;
        } }, { key: "downloadMergerMessage", value: function(e3) {
          return this._mergerMessageHandler.downloadMergerMessage(e3);
        } }, { key: "createFileMessage", value: function(e3) {
          if (se) {
            if (!Z && !$ && !ie)
              return;
            var n3 = ce.getSystemInfoSync().SDKVersion;
            if (Z && Kt(n3, "2.5.0") < 0)
              return void this.outputWarning("WXChooseMessageFile");
            if ($ && Kt(n3, "1.18.0") < 0)
              return void this.outputWarning("QQChooseMessageFile");
          }
          if (re || ie) {
            if (lt(e3.payload.file)) {
              var o2 = e3.payload.file;
              e3.payload.file = { files: [o2] };
            } else if (ht(e3.payload.file) && "undefined" != typeof uni) {
              var i3 = e3.payload.file, a2 = i3.tempFiles, s2 = i3.files, r2 = null;
              _t(a2) ? r2 = a2[0] : _t(s2) && (r2 = s2[0]), e3.payload.file = { files: [r2] };
            }
          } else if (Z || $) {
            var c2 = e3.payload.file.tempFiles, u2 = t(t({}, c2[0]), {}, { url: c2[0].path });
            e3.payload.file = { files: [u2] };
          }
          var l2 = this.getMyUserID();
          e3.currentUser = l2, e3.senderTinyID = this.getMyTinyID();
          var d2 = new Ps(e3), p2 = new Ss({ uuid: this._generateUUID(e3.payload.file), file: e3.payload.file }), g2 = this._getNickAndAvatarByUserID(l2);
          return d2.setElement(p2), d2.setNickAndAvatar(g2), d2.setNameCard(this._getNameCardByGroupID(d2)), this._messageOptionsMap.set(d2.clientSequence, e3), d2;
        } }, { key: "createLocationMessage", value: function(e3) {
          var t2 = this.getMyUserID();
          e3.currentUser = t2, e3.senderTinyID = this.getMyTinyID();
          var n3 = new Ps(e3), o2 = new Rs(e3.payload), i3 = this._getNickAndAvatarByUserID(t2);
          return n3.setElement(o2), n3.setNickAndAvatar(i3), n3.setNameCard(this._getNameCardByGroupID(n3)), n3;
        } }, { key: "_onCannotFindModule", value: function() {
          return Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "sendMessageInstance", value: function(e3, t2) {
          var n3 = this;
          if (false === this.getModule(Mo).filterMessage(e3, t2))
            return this._onSendMessageFailed(e3, new Lo({ code: No.PROFANITY_FOUND }));
          var o2 = null;
          if (e3.conversationType === L.CONV_C2C)
            o2 = this.getModule(Qn);
          else {
            if (e3.conversationType !== L.CONV_GROUP)
              return Ro({ code: No.MSG_INVALID_CONV_TYPE });
            o2 = this.getModule(Zn);
          }
          var i3, a2 = "".concat(this._n, ".sendMessageInstance"), s2 = this.getModule(to), r2 = o2.isOnlineMessage(e3, t2);
          return this.getModule(so).upload(e3).then(function() {
            n3._getSendMessageSpecifiedKey(e3) === ls && n3.getModule(fo).addSuccessCount(ds);
            return n3._guardForGroup(e3).then(function() {
              if (!e3.isSendable())
                return Ro({ code: No.MSG_F_URL_IS_EMPTY });
              n3._addSendMessageTotalCount(e3), i3 = Date.now();
              var a3 = function(e4) {
                var t3 = "utf-8";
                re && document && (t3 = document.charset.toLowerCase());
                var n4, o3, i4 = 0;
                if (o3 = e4.length, "utf-8" === t3 || "utf8" === t3)
                  for (var a4 = 0; a4 < o3; a4++)
                    (n4 = e4.codePointAt(a4)) <= 127 ? i4 += 1 : n4 <= 2047 ? i4 += 2 : n4 <= 65535 ? i4 += 3 : (i4 += 4, a4++);
                else if ("utf-16" === t3 || "utf16" === t3)
                  for (var s3 = 0; s3 < o3; s3++)
                    (n4 = e4.codePointAt(s3)) <= 65535 ? i4 += 2 : (i4 += 4, s3++);
                else
                  i4 = e4.replace(/[^\x00-\xff]/g, "aa").length;
                return i4;
              }(JSON.stringify(e3));
              return e3.type === L.MSG_MERGER && a3 > 11264 ? n3._mergerMessageHandler.uploadMergerMessage(e3, a3).then(function(o3) {
                var i4 = n3._mergerMessageHandler.createMergerMessagePack(e3, t2, o3);
                return n3.request(i4);
              }) : (s2.setMessageRandom(e3), o2.sendMessage(e3, t2));
            }).then(function(o3) {
              var c2 = o3.data, u2 = c2.time, l2 = c2.sequence, d2 = c2.readReceiptCode;
              dt(d2) && 0 !== d2 && (new Ms("sendMessageWithReceipt").setMessage("from:".concat(e3.from, " to:").concat(e3.to, " sequence:").concat(l2, " readReceiptCode:").concat(d2)).end(), Ye.w("".concat(a2, " readReceiptCode:").concat(d2, " message:").concat(n3.getErrorMessage(d2))));
              if (n3._addSendMessageSuccessCount(e3, i3), n3._messageOptionsMap.delete(e3.clientSequence), true === e3.isResend) {
                var p2 = s2.findMessage(e3.ID);
                p2 && (Ye.l("".concat(a2, " resend ok. ID:").concat(p2.ID)), s2.deleteLocalMessage(p2));
              }
              e3.status = gn.SUCCESS, e3.time = u2;
              var g2 = false;
              if (e3.conversationType === L.CONV_GROUP)
                e3.sequence = l2;
              else if (e3.conversationType === L.CONV_C2C) {
                var h2 = s2.getLatestMessageSentByMe(e3.conversationID);
                if (h2) {
                  var _2 = h2.nick, f2 = h2.avatar;
                  _2 === e3.nick && f2 === e3.avatar || (g2 = true);
                }
              }
              if (g2 && s2.modifyMessageSentByMe({ conversationID: e3.conversationID, latestNick: e3.nick, latestAvatar: e3.avatar }), true === r2)
                e3._onlineOnlyFlag = true;
              else {
                s2.appendToMessageList(e3);
                var v2 = e3;
                ht(t2) && ht(t2.messageControlInfo) && (true === t2.messageControlInfo.excludedFromLastMessage && (e3._isExcludedFromLastMessage = true, v2 = ""), true === t2.messageControlInfo.excludedFromUnreadCount && (e3._isExcludedFromUnreadCount = true));
                var m2 = e3.conversationType;
                if (bt(e3.to))
                  m2 = L.CONV_TOPIC, n3.getModule(eo).onMessageSent({ groupID: Qt(e3.to), topicID: e3.to, lastMessage: v2 });
                s2.onMessageSent({ conversationOptionsList: [{ conversationID: e3.conversationID, unreadCount: 0, type: m2, subType: e3.conversationSubType, lastMessage: v2 }] });
              }
              return e3.getRelayFlag() || "TIMImageElem" !== e3.type || Yt(e3.payload.imageInfoArray), ko({ message: e3 });
            });
          }).catch(function(t3) {
            return n3._onSendMessageFailed(e3, t3, r2);
          });
        } }, { key: "_guardForGroup", value: function(e3) {
          if (e3.conversationType !== L.CONV_GROUP)
            return Promise.resolve();
          var t2 = this.getModule(Zn);
          if (!t2)
            return this._onCannotFindModule();
          if (Pt({ groupID: e3.to })) {
            var n3 = t2.getLocalGroupProfile(e3.to);
            if (n3 && n3.isSupportTopic)
              return Ro({ code: No.MSG_SEND_GRP_WITH_TOPIC_FAIL });
          }
          return t2.guardForAVChatRoom(e3);
        } }, { key: "_onSendMessageFailed", value: function(e3, t2) {
          var n3 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], o2 = "".concat(this._n, "._onSendMessageFailed");
          e3.status = gn.FAIL;
          var i3 = this.getModule(to);
          if (i3.deleteMessageRandom(e3), !n3) {
            var a2 = i3.appendToMessageList(e3);
            true === a2 && Ye.l("".concat(o2, " message stored, ID:").concat(e3.ID));
          }
          this._addSendMessageFailCountOnUser(e3, t2);
          var s2 = new Ms("sendMessage");
          return s2.setMessage("tjg_id:".concat(this.generateTjgID(e3), " type:").concat(e3.type, " from:").concat(e3.from, " to:").concat(e3.to)), this.probeNetwork().then(function(e4) {
            var n4 = v(e4, 2), o3 = n4[0], i4 = n4[1];
            s2.setError(t2, o3, i4).end();
          }), Ye.e("".concat(o2, " error:"), t2), Ro(new Lo({ code: t2 && t2.code ? t2.code : No.MSG_SEND_FAIL, message: t2 && t2.message ? t2.message : void 0, data: { message: e3 } }));
        } }, { key: "_getSendMessageSpecifiedKey", value: function(e3) {
          if ([L.MSG_IMAGE, L.MSG_AUDIO, L.MSG_VIDEO, L.MSG_FILE].includes(e3.type))
            return ls;
          if (e3.conversationType === L.CONV_C2C)
            return rs;
          if (e3.conversationType === L.CONV_GROUP) {
            var t2 = this.getModule(Zn);
            if (!t2)
              return;
            var n3 = t2.getLocalGroupProfile(e3.to);
            if (!n3)
              return;
            var o2 = n3.type;
            return Ut(o2) ? us : cs;
          }
        } }, { key: "_addSendMessageTotalCount", value: function(e3) {
          var t2 = this._getSendMessageSpecifiedKey(e3);
          t2 && this.getModule(fo).addTotalCount(t2);
        } }, { key: "_addSendMessageSuccessCount", value: function(e3, t2) {
          var n3 = Math.abs(Date.now() - t2), o2 = this._getSendMessageSpecifiedKey(e3);
          if (o2) {
            var i3 = this.getModule(fo);
            i3.addSuccessCount(o2), i3.addCost(o2, n3);
          }
        } }, { key: "_addSendMessageFailCountOnUser", value: function(e3, t2) {
          var n3, o2, i3 = t2.code, a2 = void 0 === i3 ? -1 : i3, s2 = this.getModule(fo), r2 = this._getSendMessageSpecifiedKey(e3);
          r2 === ls && (n3 = a2, o2 = false, Zr.includes(n3) && (o2 = true), o2) ? s2.addFailedCountOfUserSide(ds) : $r(a2) && r2 && s2.addFailedCountOfUserSide(r2);
        } }, { key: "resendMessage", value: function(e3, t2) {
          return e3.isResend = true, e3.status = gn.UNSEND, this.sendMessageInstance(e3, t2);
        } }, { key: "revokeMessage", value: function(e3) {
          var t2 = this, n3 = null;
          if (e3.conversationType === L.CONV_C2C ? n3 = this.getModule(Qn) : e3.conversationType === L.CONV_GROUP && (n3 = this.getModule(Zn)), !n3)
            return this._onCannotFindModule();
          var o2 = new Ms("revokeMessage");
          o2.setMessage("tjg_id:".concat(this.generateTjgID(e3), " type:").concat(e3.type, " from:").concat(e3.from, " to:").concat(e3.to));
          var i3 = "".concat(this._n, ".").concat("revokeMessage");
          return n3.revokeMessage(e3).then(function(n4) {
            var a2 = n4.data.recallRetList;
            if (!un(a2) && 0 !== a2[0].retCode) {
              var s2 = new Lo({ code: a2[0].retCode, data: { message: e3 } });
              return o2.setCode(s2.code).setMoreMessage(s2.message).end(), Ro(s2);
            }
            return Ye.i("".concat(i3, " ok. ID:").concat(e3.ID)), e3.isRevoked = true, o2.end(), t2.getModule(to).onMessageRevoked([e3]), ko({ message: e3 });
          }).catch(function(n4) {
            t2.probeNetwork().then(function(e4) {
              var t3 = v(e4, 2), i4 = t3[0], a3 = t3[1];
              o2.setError(n4, i4, a3).end();
            });
            var a2 = new Lo({ code: n4 && n4.code ? n4.code : No.MSG_REVOKE_FAIL, message: n4 && n4.message ? n4.message : void 0, data: { message: e3 } });
            return Ye.w("".concat(i3, " failed. error:"), n4), Ro(a2);
          });
        } }, { key: "deleteMessage", value: function(e3) {
          var t2 = this, n3 = null, o2 = e3[0], i3 = o2.conversationID, a2 = "", s2 = [], r2 = [];
          if (o2.conversationType === L.CONV_C2C)
            n3 = this.getModule(Qn), a2 = i3.replace(L.CONV_C2C, ""), e3.forEach(function(e4) {
              e4 && e4.status === gn.SUCCESS && e4.conversationID === i3 && (e4._onlineOnlyFlag || s2.push("".concat(e4.sequence, "_").concat(e4.random, "_").concat(e4.time)), r2.push(e4));
            });
          else if (o2.conversationType === L.CONV_GROUP)
            n3 = this.getModule(Zn), a2 = i3.replace(L.CONV_GROUP, ""), e3.forEach(function(e4) {
              e4 && e4.status === gn.SUCCESS && e4.conversationID === i3 && (e4._onlineOnlyFlag || s2.push("".concat(e4.sequence)), r2.push(e4));
            });
          else if (o2.conversationType === L.CONV_SYSTEM)
            return Ro({ code: No.CANNOT_DELETE_GRP_SYSTEM_NOTICE });
          if (!n3)
            return this._onCannotFindModule();
          if (0 === s2.length)
            return this._onMessageDeleted(r2);
          s2.length > 30 && (s2 = s2.slice(0, 30), r2 = r2.slice(0, 30));
          var c2 = new Ms("deleteMessage");
          c2.setMessage("to:".concat(a2, " count:").concat(s2.length));
          var u2 = "".concat(this._n, ".").concat("deleteMessage");
          return n3.deleteMessage({ to: a2, keyList: s2 }).then(function(e4) {
            return c2.end(), Ye.i("".concat(u2, " ok")), t2._onMessageDeleted(r2);
          }).catch(function(e4) {
            t2.probeNetwork().then(function(t3) {
              var n5 = v(t3, 2), o3 = n5[0], i4 = n5[1];
              c2.setError(e4, o3, i4).end();
            }), Ye.w("".concat(u2, " failed. error:"), e4);
            var n4 = new Lo({ code: e4 && e4.code ? e4.code : No.MSG_DELETE_FAIL, message: e4 && e4.message ? e4.message : void 0 });
            return Ro(n4);
          });
        } }, { key: "_onMessageDeleted", value: function(e3) {
          return this.getModule(to).onMessageDeleted(e3), Eo({ messageList: e3 });
        } }, { key: "translateText", value: function(e3) {
          var n3 = "".concat(this._n, ".").concat("translateText"), o2 = e3.sourceTextList, i3 = e3.sourceLanguage, a2 = e3.targetLanguage, s2 = new Ms("translateText");
          return s2.setMessage("sourceLanguage:".concat(i3, " targetLanguage:").concat(a2)), this.request({ protocolName: os, requestData: { sourceTextList: o2, source: i3 || "auto", target: a2, from: this.getMyTinyID(), SDKAppID: this.getSDKAppID() } }).then(function(e4) {
            var o3 = e4.data, i4 = o3.error, a3 = o3.requestID, r2 = o3.translatedTextList;
            if (0 === i4.code)
              return s2.end(), Ye.i("".concat(n3, " ok. requestID:").concat(a3)), ko({ translatedTextList: r2 });
            throw t(t({}, i4), {}, { requestID: a3 });
          }).catch(function(e4) {
            return s2.setCode(e4.code).setMoreMessage(e4.requestID).end(), Ye.w("".concat(n3, " failed. error:"), e4), Ro({ code: No.TRANSLATE_TEXT_FAIL });
          });
        } }, { key: "convertVoiceToText", value: function(e3) {
          var n3 = e3.message, o2 = e3.language, i3 = n3.payload.url;
          n3.from === this.getMyUserID() && "out" === n3.flow && (i3 = n3.payload.remoteAudioUrl);
          var a2 = /\.(wav|pcm|ogg-opus|speex|silk|mp3|m4a|aac|amr)/;
          if (!a2.test(i3))
            return Ro({ code: No.UNSUPPORTED_VOICE_FORMAT });
          var s2 = a2.exec(i3)[1] || "mp3", r2 = "16k_zh-PY";
          o2 ? "zh (cmn-Hans-CN)" === o2 ? r2 = "16k_zh" : "en-US" === o2 ? r2 = "16k_en" : "yue-Hant-HK" === o2 ? r2 = "16k_yue" : "ja-JP" === o2 && (r2 = "16k_ja") : r2 = "16k_zh-PY";
          var c2 = "serviceType:".concat(r2, " url:").concat(i3), u2 = "".concat(this._n, ".").concat("convertVoiceToText");
          Ye.i("".concat(u2, " ").concat(c2));
          var l2 = new Ms("convertVoiceToText");
          return l2.setMessage(c2), this.request({ protocolName: is, requestData: { url: i3, language: r2, SDKAppID: this.getSDKAppID(), format: s2 } }).then(function(e4) {
            var n4 = e4.data, o3 = n4.error, i4 = n4.requestID, a3 = n4.result;
            if (0 === o3.code)
              return l2.end(), Ye.i("".concat(u2, " ok. requestID:").concat(i4)), ko({ result: a3 });
            throw t(t({}, o3), {}, { requestID: i4 });
          }).catch(function(e4) {
            return l2.setCode(e4.code).setMoreMessage(e4.requestID || "").end(), Ye.w("".concat(u2, " failed. error:"), e4), Ro({ code: No.VOICE_TO_TEXT_FAIL });
          });
        } }, { key: "modifyRemoteMessage", value: function(e3) {
          var t2 = this, n3 = null, o2 = e3.conversationType, i3 = e3.to, a2 = this.getModule(Zn);
          if (!a2)
            return this._onCannotFindModule();
          if (a2.isMessageFromOrToAVChatroom(i3))
            return Ro({ code: No.MSG_MODIFY_DISABLED_IN_AVCHATROOM, data: { message: e3 } });
          if (false === this.getModule(Mo).filterMessage(e3))
            return Ro({ code: No.PROFANITY_FOUND, data: { message: e3 } });
          o2 === L.CONV_C2C ? n3 = this.getModule(Qn) : o2 === L.CONV_GROUP && (n3 = this.getModule(Zn));
          var s2 = new Ms("modifyMessage");
          s2.setMessage("to:".concat(i3));
          var r2 = "".concat(this._n, ".modifyRemoteMessage");
          return n3.modifyRemoteMessage(e3).then(function(n4) {
            s2.end(), Ye.i("".concat(r2, " ok"));
            var o3 = t2._onModifyRemoteMessageResp(e3, n4.data);
            return ko({ message: o3 });
          }).catch(function(n4) {
            if (s2.setCode(n4.code).setMoreMessage(n4.message).end(), Ye.w("".concat(r2, " failed. error:"), n4), 20027 === n4.code) {
              var o3 = t2._onModifyRemoteMessageResp(e3, n4.data);
              return Ro({ code: No.MSG_MODIFY_CONFLICT, data: { message: o3 } });
            }
            return Ro({ code: n4.code, message: n4.message, data: { message: e3 } });
          });
        } }, { key: "_generateSearchRequestData", value: function(e3) {
          var t2 = e3.conversationID, n3 = e3.timePosition, o2 = e3.timePeriod, i3 = g(e3, ec);
          return ft(t2) || (wt(t2) && (i3.account = t2.replace(L.CONV_C2C, "")), Ft(t2) && (i3.groupID = t2.replace(L.CONV_GROUP, ""))), dt(o2) && o2 > 0 && (dt(n3) && n3 > 0 ? i3.startTime = n3 - o2 : i3.startTime = He() - o2), i3.startTime && i3.startTime < 0 && (i3.startTime = void 0), dt(n3) && n3 > 0 && (i3.endTime = n3), i3;
        } }, { key: "searchCloudMessages", value: function(e3) {
          var t2 = this, n3 = "searchCloudMessages", o2 = "".concat(this._n, ".").concat(n3);
          if (!e3)
            return Ro({ code: No.OPTIONS_IS_EMPTY, message: this.getErrorMessage(No.OPTIONS_IS_EMPTY, n3) });
          var i3 = e3.keywordList, a2 = e3.keywordListMatchType, s2 = e3.conversationID, r2 = e3.cursor, c2 = _t(e3.senderUserIDList) && e3.senderUserIDList.length > 0, u2 = _t(e3.messageTypeList) && e3.messageTypeList.length > 0;
          if (!i3 && !c2 && !u2)
            throw Ye.e("[".concat(n3, '] Missing required params: "keywordList".')), new Error("Params validate failed.");
          var l2 = Date.now(), d2 = new Ms(n3), p2 = "keywordList:".concat(i3, " keywordListMatchType:").concat(a2, " ") + "conversationID:".concat(s2, " cursor:").concat(r2);
          return Ye.l("".concat(o2, " ").concat(p2)), this.request({ protocolName: Ua, requestData: this._generateSearchRequestData(e3) }).then(function(n4) {
            var i4 = n4.data, a3 = i4.errorCode, s3 = i4.errorInfo, r3 = Date.now() - l2;
            if (0 !== a3) {
              if (a3 === No.ERR_SVR_COMM_INVALID_SERVICE || a3 === No.MSG_SEARCH_CURSOR_INVALID || a3 === No.MSG_SEARCH_CURSOR_EXPIRED)
                return Ro({ code: a3 });
              throw new Lo({ code: a3, message: s3 });
            }
            var c3 = n4.data, u3 = c3.cursor, g2 = c3.totalCount, h2 = c3.searchResult;
            d2.setNetworkType(t2.getNetworkType()).setMessage("".concat(p2, " totalCount:").concat(g2, " cost ").concat(r3, " ms")).end();
            var _2 = t2._handleSearchResults(h2, !e3.conversationID);
            return Ye.l("".concat(o2, " ok. cursor:").concat(u3, " totalCount:").concat(g2, " cost ").concat(r3, " ms")), ko({ searchResultList: _2, cursor: u3, totalCount: g2 });
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              d2.setMessage(p2).setError(e4, o3, i4).end();
            }), Ro(e4);
          });
        } }, { key: "_handleSearchResults", value: function(e3, t2) {
          var n3 = this.getModule(to);
          return _t(e3) && 0 !== e3.length ? e3.map(function(e4) {
            var o2 = e4.groupID, i3 = e4.userID, a2 = e4.messageCount, s2 = e4.messageList, r2 = o2 ? "".concat(L.CONV_GROUP).concat(o2) : "".concat(L.CONV_C2C).concat(i3), c2 = { conversationID: r2, messageCount: a2, messageList: [] };
            return t2 && a2 > 1 || s2 && s2.length > 0 && (c2.messageList = n3.onRoamingMessage(s2, r2, false)), c2;
          }) : [];
        } }, { key: "_onModifyRemoteMessageResp", value: function(e3, t2) {
          Ye.d("".concat(this._n, "._onModifyRemoteMessageResp options:"), t2);
          var n3 = e3.conversationType, o2 = e3.from, i3 = e3.to, a2 = e3.random, s2 = e3.sequence, r2 = e3.time, c2 = t2.elements, u2 = t2.messageVersion, l2 = t2.cloudCustomData, d2 = void 0 === l2 ? "" : l2;
          return this.getModule(to).onMessageModified({ conversationType: n3, from: o2, to: i3, time: r2, random: a2, sequence: s2, elements: c2, cloudCustomData: d2, messageVersion: u2 });
        } }, { key: "_generateUUID", value: function(e3) {
          var t2 = this.getModule(no), n3 = "".concat(t2.getSDKAppID(), "-").concat(t2.getUserID(), "-").concat(function() {
            for (var e4 = "", t3 = 32; t3 > 0; --t3)
              e4 += Nt[Math.floor(Math.random() * St)];
            return e4;
          }()), o2 = e3.name || e3.value || e3.url || e3.tempFilePath, i3 = o2 && o2.slice(o2.lastIndexOf(".") + 1);
          return i3 && (n3 = "".concat(n3, ".").concat(i3)), n3;
        } }, { key: "getMessageOption", value: function(e3) {
          return this._messageOptionsMap.get(e3);
        } }, { key: "_getNickAndAvatarByUserID", value: function(e3) {
          return this.getModule(Xn).getNickAndAvatarByUserID(e3);
        } }, { key: "_getNameCardByGroupID", value: function(e3) {
          if (e3.conversationType === L.CONV_GROUP) {
            var t2 = this.getModule(Zn);
            if (t2)
              return t2.getMyNameCardByGroupID(e3.to);
          }
          return "";
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._messageOptionsMap.clear();
        } }]), i2;
      }(Oo), nc = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          return o(this, n2), (i2 = t2.call(this, e3))._n = "MessageExtensionModule", i2.messageExtensionMap = /* @__PURE__ */ new Map(), i2.globalSeqMap = /* @__PURE__ */ new Map(), i2.getMessageExtensionsMap = /* @__PURE__ */ new Map(), i2;
        }
        return a(n2, [{ key: "onMessageExtensionNotify", value: function(e3) {
          var t3 = this, n3 = e3.dataList, o2 = n3.messageInfo, i2 = n3.operateType, a2 = n3.operateResultList, s2 = n3.tinyID, r2 = n3.globalSequence, c2 = o2.clientTime, u2 = o2.random, l2 = "".concat(s2, "-").concat(c2, "-").concat(u2), d2 = [], p2 = [];
          Ye.l("".concat(this._n, ".onMessageExtensionNotify messageID:").concat(l2, " operateType:").concat(i2, " globalSequence:").concat(r2)), this._updateGlobalSequence(l2, r2);
          var g2 = false, h2 = false;
          a2.forEach(function(e4) {
            var n4 = e4.extensions, o3 = void 0 === n4 ? [] : n4, a3 = e4.clearSequence;
            if (1 === i2)
              g2 = true, o3.forEach(function(e5) {
                d2.push({ key: e5.key, value: e5.value });
              }), t3._updateLocalExtension(l2, o3);
            else if (2 === i2)
              h2 = true, o3.forEach(function(e5) {
                p2.push(e5.key);
              }), t3._updateLocalExtension(l2, o3);
            else if (3 === i2) {
              if (h2 = true, t3._hasLocalExtension(l2))
                t3._getLocalExtension(l2).forEach(function(e5, t4) {
                  e5.seq <= a3 && !un(e5.value) && p2.push(t4);
                });
              t3._clearLocalExtension(l2, a3);
            }
          }), g2 && this.emitOuterEvent(k.MESSAGE_EXTENSIONS_UPDATED, { messageID: l2, extensions: d2 }), h2 && this.emitOuterEvent(k.MESSAGE_EXTENSIONS_DELETED, { messageID: l2, keyList: p2 });
        } }, { key: "setMessageExtensions", value: function(e3, t3) {
          var n3 = this, o2 = "setMessageExtensions";
          if (!this.canIUse(B.MSG_EXT))
            return this.cannotUseCommercialAbility(o2);
          var i2 = "".concat(this._n, ".").concat(o2), a2 = e3.ID, s2 = e3.conversationID, r2 = e3.sequence, c2 = e3.time, u2 = m(t3);
          t3.length > 20 && (u2 = t3.slice(0, 20), Ye.w("".concat(i2, ". the length of extensions cannot exceed 20.")));
          var l2 = "conversationID:".concat(s2, " messageID:").concat(a2, " sequence:").concat(r2, " time:").concat(c2, " count:").concat(u2.length), d2 = new Ms(o2);
          return d2.setMessage(l2), Ye.l("".concat(i2, " ").concat(l2)), this._modifyMessageExtensions(e3, u2).then(function(e4) {
            var t4 = e4.resultList, n4 = e4.successCount, o3 = e4.failureCount, a3 = "success count:".concat(n4, " fail count:").concat(o3);
            return d2.setMoreMessage(a3).end(), Ye.l("".concat(i2, " ok. ").concat(a3)), ko({ extensions: t4 });
          }).catch(function(e4) {
            return n3.probeNetwork().then(function(t4) {
              var n4 = v(t4, 2), o3 = n4[0], i3 = n4[1];
              d2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(i2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getMessageExtensions", value: function(e3) {
          var t3 = this, n3 = "getMessageExtensions";
          if (!this.canIUse(B.MSG_EXT))
            return this.cannotUseCommercialAbility(n3);
          var o2 = "".concat(this._n, ".").concat(n3), i2 = e3.ID, a2 = e3.conversationID, s2 = e3.sequence, r2 = e3.time, c2 = "conversationID:".concat(a2, " messageID:").concat(i2, " sequence:").concat(s2, " time:").concat(r2), u2 = new Ms(n3);
          u2.setMessage(c2), Ye.l("".concat(o2, " ").concat(c2));
          var l2 = void 0;
          return this.getMessageExtensionsMap.has(i2) && (l2 = this._getGlobalSequence(i2)), this._getMessageExtensions(e3, l2).then(function(e4) {
            return u2.end(), Ye.l("".concat(o2, " ok. total count:").concat(e4.length)), ft(l2) && e4.length > 0 && t3.getMessageExtensionsMap.set(i2, 1), ko({ extensions: e4 });
          }).catch(function(e4) {
            return t3.probeNetwork().then(function(t4) {
              var n4 = v(t4, 2), o3 = n4[0], i3 = n4[1];
              u2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "deleteMessageExtensions", value: function(e3, t3) {
          var n3 = this, o2 = "deleteMessageExtensions";
          if (!this.canIUse(B.MSG_EXT))
            return this.cannotUseCommercialAbility(o2);
          var i2 = "".concat(this._n, ".").concat(o2), a2 = [], s2 = 3;
          un(t3) || (s2 = 2, t3.forEach(function(e4) {
            a2.push({ key: e4, value: "", seq: 0 });
          }));
          var r2 = e3.ID, c2 = e3.conversationID, u2 = e3.sequence, l2 = e3.time, d2 = "conversationID:".concat(c2, " messageID:").concat(r2, " sequence:").concat(u2, " time:").concat(l2, " operateType:").concat(s2), p2 = new Ms(o2);
          return p2.setMessage(d2), Ye.l("".concat(i2, " ").concat(d2)), this._modifyMessageExtensions(e3, a2, s2).then(function(e4) {
            var t4 = e4.resultList, n4 = e4.successCount, o3 = e4.failureCount, a3 = "";
            return 2 === s2 && (a3 = "success count:".concat(n4, " fail count:").concat(o3)), p2.setMoreMessage("".concat(a3)).end(), Ye.l("".concat(i2, " ok. ").concat(a3)), ko({ extensions: t4 });
          }).catch(function(e4) {
            return n3.probeNetwork().then(function(t4) {
              var n4 = v(t4, 2), o3 = n4[0], i3 = n4[1];
              p2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(i2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_modifyMessageExtensions", value: function(e3, t3) {
          var n3 = this, o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, i2 = bt(e3.to) ? L.CONV_TOPIC : e3.conversationType, a2 = void 0;
          3 !== o2 && (a2 = this._getRequestExtensions(e3, t3));
          var s2 = null;
          switch (i2) {
            case L.CONV_C2C:
              s2 = this.getModule(Qn);
              break;
            case L.CONV_GROUP:
              s2 = this.getModule(Zn);
              break;
            case L.CONV_TOPIC:
              s2 = this.getModule(eo);
              break;
            default:
              return Ro({ code: No.CANNOT_FIND_MODULE });
          }
          return s2.modifyMessageExtensions(e3, a2, o2).then(function(t4) {
            var o3 = t4.data, i3 = o3.extensions, a3 = o3.seq, s3 = [], r2 = 0, c2 = 0, u2 = [];
            return (i3 = un(i3) ? [] : i3).forEach(function(e4) {
              var t5 = e4.errorCode, n4 = e4.extension, o4 = n4.key, i4 = n4.value, a4 = n4.seq;
              s3.push({ code: t5, key: o4, value: i4 }), 0 === t5 ? r2++ : c2++, u2.push({ key: o4, value: i4, seq: a4 });
            }), n3._updateGlobalSequence(e3.ID, a3), u2.length > 0 && (n3._updateLocalExtension(e3.ID, u2), u2 = null), { resultList: s3, successCount: r2, failureCount: c2 };
          }).catch(function(e4) {
            return Ro(e4);
          });
        } }, { key: "_getRequestExtensions", value: function(e3, t3) {
          var n3 = [];
          if (this._hasLocalExtension(e3.ID)) {
            var o2 = this._getLocalExtension(e3.ID);
            return t3.forEach(function(e4) {
              var t4 = e4.key, i2 = e4.value, a2 = 0;
              o2.has(t4) && (a2 = o2.get(t4).seq), n3.push({ key: t4, value: i2, seq: a2 });
            }), n3;
          }
          return t3.forEach(function(e4) {
            var t4 = e4.key, o3 = e4.value;
            n3.push({ key: t4, value: o3, seq: 0 });
          }), n3;
        } }, { key: "_getMessageExtensions", value: function(e3, t3) {
          var n3 = this, o2 = "".concat(this._n, "._getMessageExtensions"), i2 = e3.ID, a2 = e3.to, s2 = null;
          switch (bt(a2) ? L.CONV_TOPIC : e3.conversationType) {
            case L.CONV_C2C:
              s2 = this.getModule(Qn);
              break;
            case L.CONV_GROUP:
              s2 = this.getModule(Zn);
              break;
            case L.CONV_TOPIC:
              s2 = this.getModule(eo);
              break;
            default:
              return Ro({ code: No.CANNOT_FIND_MODULE });
          }
          return s2.getMessageExtensions(e3, t3).then(function(t4) {
            var a3 = t4.data, s3 = a3.extensions, r2 = a3.completeFlag, c2 = a3.globalSequence, u2 = a3.clearSequence;
            if (s3 = un(s3) ? [] : s3, Ye.l("".concat(o2, " ok. completeFlag:").concat(r2, " globalSequence:").concat(c2, " clearSequence:").concat(u2, " count:").concat(s3.length)), n3._updateLocalExtension(i2, s3), n3._clearLocalExtension(i2, u2), n3._updateGlobalSequence(i2, c2), 1 !== r2) {
              var l2 = s3.slice(-1)[0].seq + 1;
              return n3._getMessageExtensions(e3, l2);
            }
            return n3._getLocalExtensions(i2);
          }).catch(function(e4) {
            return Ro(e4);
          });
        } }, { key: "_hasLocalExtension", value: function(e3) {
          return this.messageExtensionMap.has(e3);
        } }, { key: "_getLocalExtension", value: function(e3) {
          return this.messageExtensionMap.get(e3);
        } }, { key: "_updateLocalExtension", value: function(e3, t3) {
          this._hasLocalExtension(e3) || this.messageExtensionMap.set(e3, /* @__PURE__ */ new Map());
          var n3 = this._getLocalExtension(e3);
          t3.forEach(function(e4) {
            var t4 = e4.key, o2 = e4.value, i2 = void 0 === o2 ? "" : o2, a2 = e4.seq;
            n3.set(t4, { value: i2, seq: a2 });
          });
        } }, { key: "_clearLocalExtension", value: function(e3, t3) {
          if (!(t3 <= 0) && this._hasLocalExtension(e3)) {
            var n3 = this._getLocalExtension(e3);
            n3.forEach(function(e4, o2) {
              e4.seq <= t3 && n3.delete(o2);
            });
          }
        } }, { key: "_getLocalExtensions", value: function(e3) {
          var t3 = [];
          this._hasLocalExtension(e3) && this._getLocalExtension(e3).forEach(function(e4, n3) {
            var o2 = e4.value;
            un(o2) || t3.push({ key: n3, value: o2 });
          });
          return t3;
        } }, { key: "_getGlobalSequence", value: function(e3) {
          return this.globalSeqMap.get(e3);
        } }, { key: "_updateGlobalSequence", value: function(e3, t3) {
          this.globalSeqMap.set(e3, t3);
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this.messageExtensionMap.clear(), this.globalSeqMap.clear(), this.getMessageExtensionsMap.clear();
        } }]), n2;
      }(Oo), oc = function(e2) {
        r(i2, e2);
        var n2 = f(i2);
        function i2(e3) {
          var t2;
          return o(this, i2), (t2 = n2.call(this, e3))._n = "MessageReactionModule", t2;
        }
        return a(i2, [{ key: "onMessageReactionNotify", value: function(e3) {
          var n3 = this, o2 = (e3 || {}).dataList;
          (void 0 === o2 ? [] : o2).forEach(function(e4) {
            var o3 = e4.C2CMessageInfo, i3 = void 0 === o3 ? {} : o3, a2 = e4.groupMessageInfo, s2 = void 0 === a2 ? {} : a2, r2 = e4.reactionList, c2 = void 0 === r2 ? [] : r2, u2 = t(t({}, i3), s2), l2 = u2.tinyID, d2 = u2.clientTime, p2 = u2.random, g2 = "".concat(l2, "-").concat(d2, "-").concat(p2), h2 = [];
            c2.forEach(function(e5) {
              ft(e5.userIDList) && (e5.userIDList = [], e5.count = 0), h2.push.apply(h2, m(e5.userIDList));
            }), Ye.l("".concat(n3._n, ".onMessageReactionNotify messageID:").concat(g2, " reactionList: ").concat(c2.length)), n3._handleReactionSummary([{ messageID: g2, reactionList: c2 }], h2).then(function(e5) {
              n3.emitOuterEvent(k.MESSAGE_REACTIONS_UPDATED, t({}, e5[0]));
            });
          });
        } }, { key: "addMessageReaction", value: function(e3, t2) {
          var n3 = this, o2 = "addMessageReaction";
          if (!this.canIUse(B.MSG_REACTION))
            return this.cannotUseCommercialAbility(o2);
          var i3 = "".concat(this._n, ".").concat(o2), a2 = e3.ID, s2 = e3.conversationID, r2 = "conversationID:".concat(s2, " messageID:").concat(a2, " reactionID:").concat(t2), c2 = new Ms(o2);
          c2.setMessage(r2), Ye.l("".concat(i3, " ").concat(r2));
          var u2 = this._createReactionOperationPack(e3, t2, "Add");
          return this.request(u2).then(function() {
            return c2.end(), Ye.l("".concat(i3, " ok.")), ko();
          }).catch(function(e4) {
            return n3.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              c2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(i3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "removeMessageReaction", value: function(e3, t2) {
          var n3 = this, o2 = "removeMessageReaction";
          if (!this.canIUse(B.MSG_REACTION))
            return this.cannotUseCommercialAbility(o2);
          var i3 = "".concat(this._n, ".").concat(o2), a2 = e3.ID, s2 = e3.conversationID, r2 = "conversationID:".concat(s2, " messageID:").concat(a2, " reactionID:").concat(t2), c2 = new Ms(o2);
          c2.setMessage(r2), Ye.l("".concat(i3, " ").concat(r2));
          var u2 = this._createReactionOperationPack(e3, t2, "DEL");
          return this.request(u2).then(function() {
            return c2.end(), Ye.l("".concat(i3, " ok.")), ko();
          }).catch(function(e4) {
            return n3.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              c2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(i3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getMessageReactions", value: function(e3) {
          var n3 = this, o2 = "getMessageReactions";
          if (!this.canIUse(B.MSG_REACTION))
            return this.cannotUseCommercialAbility(o2);
          var i3 = "".concat(this._n, ".").concat(o2), a2 = e3.messageList, s2 = e3.maxUserCountPerReaction, r2 = a2[0].conversationID, c2 = "conversationID:".concat(r2, " maxUserCountPerReaction:").concat(s2, " messageList:").concat(a2.length), u2 = new Ms(o2);
          u2.setMessage(c2), Ye.l("".concat(i3, " ").concat(c2));
          var l2 = /* @__PURE__ */ new Map(), d2 = this._createReactionSummaryPack(t(t({}, e3), {}, { messageIDMap: l2 }));
          return this.request(d2).then(function(e4) {
            var t2 = e4.data.resultList, o3 = [], i4 = [];
            return (void 0 === t2 ? [] : t2).forEach(function(e5) {
              var t3 = e5.messageKey, n4 = void 0 === t3 ? void 0 : t3, a3 = e5.messageSequence, s3 = void 0 === a3 ? void 0 : a3, r3 = e5.reactionList, c3 = void 0 === r3 ? [] : r3, u3 = ft(n4) ? l2.get(s3) : l2.get(n4);
              o3.push({ messageID: u3, reactionList: c3 }), c3.forEach(function(e6) {
                i4.push.apply(i4, m(e6.userIDList));
              });
            }), n3._handleReactionSummary(o3, i4);
          }).then(function(e4) {
            return u2.end(), Ye.l("".concat(i3, " ok.")), l2.clear(), ko(e4);
          }).catch(function(e4) {
            return n3.probeNetwork().then(function(t2) {
              var n4 = v(t2, 2), o3 = n4[0], i4 = n4[1];
              u2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(i3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "getAllUserListOfMessageReaction", value: function(e3) {
          var t2 = this, n3 = "getAllUserListOfMessageReaction";
          if (!this.canIUse(B.MSG_REACTION))
            return this.cannotUseCommercialAbility(n3);
          var o2 = "".concat(this._n, ".").concat(n3), i3 = e3.message, a2 = e3.reactionID, s2 = e3.nextSeq, r2 = e3.count, c2 = i3.ID, u2 = i3.conversationID, l2 = "conversationID:".concat(u2, " messageID:").concat(c2, " reactionID:").concat(a2, " nextSeq:").concat(s2, " count:").concat(r2), d2 = new Ms(n3);
          d2.setMessage(l2), Ye.l("".concat(o2, " ").concat(l2));
          var p2 = { userList: [], nextSeq: 0, isCompleted: false }, g2 = this._createReactionUserListPack(e3);
          return this.request(g2).then(function(e4) {
            var n4 = e4.data, o3 = n4.userIDList, i4 = void 0 === o3 ? [] : o3, a3 = n4.nextSeq, s3 = void 0 === a3 ? 0 : a3;
            return p2.nextSeq = s3, p2.isCompleted = 0 === s3, t2.getModule(Xn).getUserNickAndAvatar(i4);
          }).then(function(e4) {
            return p2.userList = e4, d2.end(), Ye.l("".concat(o2, " ok.")), ko(p2);
          }).catch(function(e4) {
            return t2.probeNetwork().then(function(t3) {
              var n4 = v(t3, 2), o3 = n4[0], i4 = n4[1];
              d2.setError(e4, o3, i4).end();
            }), Ye.e("".concat(o2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_createReactionOperationPack", value: function(e3, t2) {
          var n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Add", o2 = void 0, i3 = { reactionID: t2, userIDList: [this.getMyUserID()] };
          if (e3.conversationType === L.CONV_C2C) {
            var a2 = this.getModule(Qn);
            o2 = "Add" === n3 ? _i : fi, i3.from = e3.from, i3.to = e3.to, i3.messageKey = a2.getMessageKey(e3);
          }
          if (e3.conversationType === L.CONV_GROUP) {
            var s2 = void 0, r2 = e3.to;
            bt(e3.to) && (r2 = Qt(s2 = e3.to)), o2 = "Add" === n3 ? fa : va, i3.groupID = r2, i3.topicID = s2, i3.messageSequence = e3.sequence;
          }
          return { protocolName: o2, requestData: i3 };
        } }, { key: "_createReactionSummaryPack", value: function(e3) {
          var t2 = e3.messageList, n3 = e3.maxUserCountPerReaction, o2 = void 0 === n3 ? 10 : n3, i3 = e3.messageIDMap, a2 = t2[0], s2 = void 0, r2 = void 0;
          if (a2.conversationType === L.CONV_C2C) {
            var c2 = this.getModule(Qn), u2 = t2.map(function(e4) {
              var t3 = c2.getMessageKey(e4);
              return i3.set(t3, e4.ID), t3;
            });
            s2 = vi, r2 = { from: a2.from, to: a2.to, messageKeyList: u2, count: o2 };
          }
          if (a2.conversationType === L.CONV_GROUP) {
            var l2 = void 0, d2 = a2.to;
            bt(a2.to) && (d2 = Qt(l2 = a2.to));
            var p2 = t2.map(function(e4) {
              return i3.set(e4.sequence, e4.ID), e4.sequence;
            });
            s2 = ma, r2 = { groupID: d2, topicID: l2, messageSequenceList: p2, count: o2 };
          }
          return { protocolName: s2, requestData: r2 };
        } }, { key: "_createReactionUserListPack", value: function(e3) {
          var t2 = e3.message, n3 = e3.reactionID, o2 = e3.nextSeq, i3 = void 0 === o2 ? 0 : o2, a2 = e3.count, s2 = void 0 === a2 ? 100 : a2, r2 = void 0, c2 = { reactionID: n3, nextSeq: i3, count: s2 > 100 ? 100 : s2 };
          if (t2.conversationType === L.CONV_C2C) {
            var u2 = this.getModule(Qn);
            r2 = mi, c2.from = t2.from, c2.to = t2.to, c2.messageKey = u2.getMessageKey(t2);
          }
          if (t2.conversationType === L.CONV_GROUP) {
            var l2 = void 0, d2 = t2.to;
            bt(t2.to) && (d2 = Qt(l2 = t2.to)), r2 = Ma, c2.groupID = d2, c2.topicID = l2, c2.messageSequence = t2.sequence;
          }
          return { protocolName: r2, requestData: c2 };
        } }, { key: "_handleReactionSummary", value: function(e3, t2) {
          return this.getModule(Xn).getUserNickAndAvatar(t2).then(function(t3) {
            var n3 = [];
            return e3.forEach(function(e4) {
              var o2 = [];
              e4.reactionList.forEach(function(e5) {
                var n4 = e5.reactionID, i3 = e5.count, a2 = e5.userIDList, s2 = [];
                a2.forEach(function(e6) {
                  t3.forEach(function(t4) {
                    e6 === t4.userID && s2.push(t4);
                  });
                }), o2.push({ reactionID: n4, totalUserCount: i3, partialUserList: s2 });
              }), n3.push({ messageID: e4.messageID, reactionList: o2 });
            }), n3;
          });
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset"));
        } }]), i2;
      }(Oo), ic = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          return o(this, n2), (i2 = t2.call(this, e3))._n = "ComboMessageModule", i2;
        }
        return a(n2, [{ key: "sendMessage", value: function(e3) {
          var t3 = this, n3 = this._constructMessageInstance(e3);
          if (null === n3)
            return Ro({ code: No.MSG_SEND_FAIL });
          this._addSendMessageTotalCount(n3);
          var o2 = Date.now();
          return this.getModule(to).setMessageRandom(n3), this._sendComboMessage(n3, e3).then(function(e4) {
            var i2 = e4.data, a2 = i2.time, s2 = i2.sequence, r2 = i2.readReceiptCode;
            dt(r2) && 0 !== r2 && (new Ms("sendMessageWithReceipt").setMessage("from:".concat(n3.from, " to:").concat(n3.to, " sequence:").concat(s2, " readReceiptCode:").concat(r2)).end(), Ye.w("".concat(t3._n, ".sendMessage readReceiptCode:").concat(r2, " message:").concat(t3.getErrorMessage(r2))));
            t3._addSendMessageSuccessCount(n3, o2);
            var c2 = t3.getModule(to);
            n3.status = gn.SUCCESS, n3.time = a2, n3.conversationType === L.CONV_GROUP && (n3.sequence = s2), c2.appendToMessageList(n3);
            var u2 = n3;
            return true === n3._isExcludedFromLastMessage && (u2 = ""), c2.onMessageSent({ conversationOptionsList: [{ conversationID: n3.conversationID, unreadCount: 0, type: n3.conversationType, subType: n3.conversationSubType, lastMessage: u2 }] }), ko({ message: n3 });
          }).catch(function(e4) {
            return t3._onSendMessageFailed(n3, e4);
          });
        } }, { key: "_sendComboMessage", value: function(e3, t3) {
          var n3 = this._m.getModule(uo), o2 = "";
          return e3.conversationType === L.CONV_C2C && (o2 = "".concat(H.NAME.OPEN_IM, ".").concat(Fo)), e3.conversationType === L.CONV_GROUP && (o2 = "".concat(H.NAME.GROUP, ".").concat(qo)), n3.sendComboMessage({ servcmd: o2, data: t3 });
        } }, { key: "_constructMessageInstance", value: function(e3) {
          var t3 = "".concat(this._n, "._constructMessageInstance"), n3 = null;
          try {
            var o2 = this.getMyUserID(), i2 = {};
            if (i2.senderTinyID = this.getMyTinyID(), i2.currentUser = o2, i2.from = e3.From_Account || o2, e3.GroupId ? (i2.conversationID = "".concat(L.CONV_GROUP).concat(e3.GroupId), i2.conversationType = L.CONV_GROUP, i2.to = e3.GroupId) : e3.To_Account && (i2.conversationID = "".concat(L.CONV_C2C).concat(e3.To_Account), i2.conversationType = L.CONV_C2C, i2.to = e3.To_Account), i2.time = e3.MsgTimeStamp || 0, i2.random = e3.Random || e3.MsgRandom || 0, i2.priority = e3.MsgPriority, pt(e3.CloudCustomData) && e3.CloudCustomData.length > 0 && (i2.cloudCustomData = e3.CloudCustomData), _t(e3.SendMsgControl) && (i2.messageControlInfo = {}, e3.SendMsgControl.includes("NoUnread") && (i2.messageControlInfo.excludedFromUnreadCount = 1), e3.SendMsgControl.includes("NoLastMsg") && (i2.messageControlInfo.excludedFromLastMessage = 1)), i2.conversationType === L.CONV_GROUP && _t(e3.To_Account) && e3.To_Account.length > 0) {
              var a2 = e3.To_Account;
              e3.To_Account.length > 50 && (a2 = e3.To_Account.slice(0, 50), Ye.w("".concat(t3, " To_Account must be less than or equal to 50."))), i2.receiverList = m(a2), e3.To_Account = m(a2);
            }
            1 !== e3.IsNeedReadReceipt && 1 !== e3.NeedReadReceipt || (i2.needReadReceipt = true), 1 === e3.SupportMessageExtension && (i2.isSupportExtension = true), (n3 = new Ps(i2)).status = gn.UNSEND, e3.MsgClientTime = n3.clientTime, n3.conversationType === L.CONV_C2C && (e3.MsgSeq = n3.sequence);
            for (var s2, r2 = e3.MsgBody.length, c2 = 0; c2 < r2; c2++)
              "TIMTextElem" === (s2 = e3.MsgBody[c2]).MsgType ? n3.setTextElement(s2.MsgContent.Text) : "TIMCustomElem" === s2.MsgType ? n3.setCustomElement({ data: s2.MsgContent.Data || "", description: s2.MsgContent.Desc || "", extension: s2.MsgContent.Ext || "" }) : "TIMFaceElem" === s2.MsgType && n3.setFaceElement({ index: s2.MsgContent.Index, data: s2.MsgContent.Data });
            var u2 = n3.getElements();
            n3.payload = u2[0].content, n3.type = u2[0].type;
          } catch (l2) {
            n3 = null, Ye.e("".concat(t3, " failed. error:"), l2);
          }
          return n3;
        } }, { key: "_onSendMessageFailed", value: function(e3, t3) {
          e3.status = gn.FAIL, this.getModule(to).deleteMessageRandom(e3), this._addSendMessageFailCountOnUser(e3, t3);
          var n3 = new Ms("sendMessage");
          return n3.setMessage("tjg_id:".concat(this.generateTjgID(e3), " type:").concat(e3.type, " from:").concat(e3.from, " to:").concat(e3.to)), this.probeNetwork().then(function(e4) {
            var o2 = v(e4, 2), i2 = o2[0], a2 = o2[1];
            n3.setError(t3, i2, a2).end();
          }), Ye.e("".concat(this._n, "._onSendMessageFailed error:"), t3), Ro(new Lo({ code: t3 && t3.code ? t3.code : No.MSG_SEND_FAIL, message: t3 && t3.message ? t3.message : void 0, data: { message: e3 } }));
        } }, { key: "_getSendMessageSpecifiedKey", value: function(e3) {
          if (e3.conversationType === L.CONV_C2C)
            return rs;
          if (e3.conversationType === L.CONV_GROUP) {
            var t3 = this.getModule(Zn).getLocalGroupProfile(e3.to);
            if (!t3)
              return;
            var n3 = t3.type;
            return Ut(n3) ? us : cs;
          }
        } }, { key: "_addSendMessageTotalCount", value: function(e3) {
          var t3 = this._getSendMessageSpecifiedKey(e3);
          t3 && this.getModule(fo).addTotalCount(t3);
        } }, { key: "_addSendMessageSuccessCount", value: function(e3, t3) {
          var n3 = Math.abs(Date.now() - t3), o2 = this._getSendMessageSpecifiedKey(e3);
          if (o2) {
            var i2 = this.getModule(fo);
            i2.addSuccessCount(o2), i2.addCost(o2, n3);
          }
        } }, { key: "_addSendMessageFailCountOnUser", value: function(e3, t3) {
          var n3 = t3.code, o2 = void 0 === n3 ? -1 : n3, i2 = this.getModule(fo), a2 = this._getSendMessageSpecifiedKey(e3);
          $r(o2) && a2 && i2.addFailedCountOfUserSide(a2);
        } }]), n2;
      }(Oo), ac = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          return o(this, n2), (i2 = t2.call(this, e3))._n = "PluginModule", i2.plugins = {}, i2;
        }
        return a(n2, [{ key: "registerPlugin", value: function(e3) {
          var t3 = this;
          Object.keys(e3).forEach(function(n3) {
            t3.plugins[n3] = e3[n3];
          }), new Ms("registerPlugin").setMessage("".concat(Object.keys(e3))).end();
        } }, { key: "getPlugin", value: function(e3) {
          return this.plugins[e3];
        } }, { key: "reset", value: function() {
        } }]), n2;
      }(Oo), sc = function(e2) {
        r(i2, e2);
        var n2 = f(i2);
        function i2(e3) {
          var t2;
          return o(this, i2), (t2 = n2.call(this, e3))._n = "SyncUnreadMessageModule", t2._cookie = "", t2._onlineSyncFlag = false, t2.getInnerEmitterInstance().on(Fs.A2KEY_AND_TINYID_UPDATED, t2._onLoginSuccess, h(t2)), t2;
        }
        return a(i2, [{ key: "_onLoginSuccess", value: function(e3) {
          this._startSync({ cookie: this._cookie, syncFlag: 0, isOnlineSync: 0 });
        } }, { key: "_startSync", value: function(e3) {
          var n3 = this, o2 = e3.cookie, i3 = e3.syncFlag, a2 = e3.isOnlineSync, s2 = "".concat(this._n, "._startSync");
          Ye.l("".concat(s2, " cookie:").concat(o2, " syncFlag:").concat(i3, " isOnlineSync:").concat(a2)), this.request({ protocolName: wo, requestData: { cookie: o2, syncFlag: i3, isOnlineSync: a2 } }).then(function(e4) {
            var o3 = e4.data, i4 = o3.cookie, a3 = o3.syncFlag;
            n3._cookie = i4, un(i4) || (0 === a3 || 1 === a3 ? (n3._dispatchUnreadMessage(t(t({}, e4.data), {}, { isSyncingEnded: false })), n3._startSync({ cookie: i4, syncFlag: a3, isOnlineSync: 0 })) : 2 === a3 && n3._dispatchUnreadMessage(t(t({}, e4.data), {}, { isSyncingEnded: true })));
          }).catch(function(e4) {
            Ye.e("".concat(s2, " failed. error:"), e4);
          });
        } }, { key: "_dispatchUnreadMessage", value: function(e3) {
          e3.eventArray && this.getModule(uo).onMessage({ head: {}, body: { eventArray: e3.eventArray, isInstantMessage: this._onlineSyncFlag, isSyncingEnded: e3.isSyncingEnded } });
          this.getModule(Qn).onNewC2CMessage({ dataList: e3.messageList, isInstantMessage: !!e3.isSyncingEnded && this._onlineSyncFlag, C2CRemainingUnreadList: e3.C2CRemainingUnreadList, C2CPairUnreadList: e3.C2CPairUnreadList, isSyncingEnded: e3.isSyncingEnded });
        } }, { key: "startOnlineSync", value: function() {
          Ye.l("".concat(this._n, ".startOnlineSync")), this._onlineSyncFlag = true, this._startSync({ cookie: this._cookie, syncFlag: 0, isOnlineSync: 1 });
        } }, { key: "startSyncOnReconnected", value: function() {
          Ye.l("".concat(this._n, ".startSyncOnReconnected.")), this._onlineSyncFlag = true, this._startSync({ cookie: this._cookie, syncFlag: 0, isOnlineSync: 0 });
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._onlineSyncFlag = false, this._cookie = "";
        } }]), i2;
      }(Oo), rc = { request: { toAccount: "To_Account", fromAccount: "From_Account", to: "To_Account", from: "From_Account", groupID: "GroupId", groupAtUserID: "GroupAt_Account", extension: "Ext", data: "Data", description: "Desc", elements: "MsgBody", sizeType: "Type", downloadFlag: "Download_Flag", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", videoUrl: "", imageUrl: "URL", fileUrl: "Url", uuid: "UUID", priority: "MsgPriority", receiverUserID: "To_Account", receiverGroupID: "GroupId", messageSender: "SenderId", messageReceiver: "ReceiverId", nick: "From_AccountNick", avatar: "From_AccountHeadurl", messageNumber: "MsgNum", pbDownloadKey: "PbMsgKey", downloadKey: "JsonMsgKey", applicationType: "PendencyType", userIDList: "To_Account", groupNameList: "GroupName", userID: "To_Account", groupAttributeList: "GroupAttr", mainSequence: "AttrMainSeq", avChatRoomKey: "BytesKey", attributeControl: "AttrControl", sequence: "seq", messageControlInfo: "SendMsgControl", updateSequence: "UpdateSeq", clientTime: "MsgClientTime", sequenceList: "MsgSeqList", topicID: "TopicId", customData: "CustomString", isSupportTopic: "SupportTopic", isWebUniapp: "is_web_uniapp", isSupportExtension: "SupportMessageExtension", messageSequence: "MsgSeq", messageKey: "MsgKey", startSequence: "startSeq", simplifiedMessage: "DownsizeFlag", isRelayMessage: "IsRelayMsg", reactionID: "Reaction", messageSequenceList: "MsgSeqList", messageKeyList: "MsgKeyList" }, response: { MsgPriority: "priority", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID", Download_Flag: "downloadFlag", GroupId: "groupID", Member_Account: "userID", MsgList: "messageList", SyncFlag: "syncFlag", To_Account: "to", From_Account: "from", MsgSeq: "sequence", MsgRandom: "random", MsgTime: "time", MsgTimeStamp: "time", MsgContent: "content", MsgBody: "elements", From_AccountNick: "nick", From_AccountHeadurl: "avatar", GroupWithdrawInfoArray: "revokedInfos", GroupReadInfoArray: "groupMessageReadNotice", LastReadMsgSeq: "lastMessageSeq", WithdrawC2cMsgNotify: "c2cMessageRevokedNotify", C2cWithdrawInfoArray: "revokedInfos", C2cReadedReceipt: "c2cMessageReadReceipt", ReadC2cMsgNotify: "c2cMessageReadNotice", LastReadTime: "peerReadTime", MsgRand: "random", MsgType: "type", MsgShow: "messageShow", NextMsgSeq: "nextMessageSeq", FaceUrl: "avatar", ProfileDataMod: "profileModify", Profile_Account: "userID", ValueBytes: "value", ValueNum: "value", NoticeSeq: "noticeSequence", NotifySeq: "notifySequence", MsgFrom_AccountExtraInfo: "messageFromAccountExtraInformation", Operator_Account: "operatorID", OpType: "operationType", ReportType: "operationType", UserId: "userID", User_Account: "userID", List_Account: "userIDList", MsgOperatorMemberExtraInfo: "operatorInfo", MsgMemberExtraInfo: "memberInfoList", ImageUrl: "avatar", NickName: "nick", MsgGroupNewInfo: "newGroupProfile", MsgAppDefinedData: "groupCustomField", Owner_Account: "ownerID", GroupFaceUrl: "avatar", GroupIntroduction: "introduction", GroupNotification: "notification", GroupApplyJoinOption: "joinOption", MsgKey: "messageKey", GroupInfo: "groupProfile", ShutupTime: "muteTime", Desc: "description", Ext: "extension", GroupAt_Account: "groupAtUserID", MsgNum: "messageNumber", PbMsgKey: "pbDownloadKey", JsonMsgKey: "downloadKey", MsgModifiedFlag: "isModified", PendencyItem: "applicationItem", PendencyType: "applicationType", AddTime: "time", AddSource: "source", AddWording: "wording", ProfileImImage: "avatar", PendencyAdd: "friendApplicationAdded", FrienPencydDel_Account: "friendApplicationDeletedUserIDList", Peer_Account: "userID", GroupAttr: "groupAttributeList", GroupAttrAry: "groupAttributeList", AttrMainSeq: "mainSequence", seq: "sequence", GroupAttrOption: "groupAttributeOption", BytesChangedKeys: "changedKeyList", GroupAttrInfo: "groupAttributeList", GroupAttrSeq: "mainSequence", PushChangedAttrValFlag: "isWithChangedAttributeInfo", SubKeySeq: "sequence", Val: "value", MsgGroupFromCardName: "senderNameCard", MsgGroupFromNickName: "senderNick", C2cNick: "peerNick", C2cImage: "peerAvatar", SendMsgControl: "messageControlInfo", NoLastMsg: "excludedFromLastMessage", NoUnread: "excludedFromUnreadCount", UpdateSeq: "updateSequence", MuteNotifications: "muteFlag", MsgClientTime: "clientTime", TinyId: "tinyID", GroupMsgReceiptList: "readReceiptList", ReadNum: "readCount", UnreadNum: "unreadCount", TopicId: "topicID", MillionGroupFlag: "communityType", SupportTopic: "isSupportTopic", MsgTopicNewInfo: "newTopicInfo", ShutupAll: "muteAllMembers", CustomString: "customData", TopicFaceUrl: "avatar", TopicIntroduction: "introduction", TopicNotification: "notification", TopicIdArray: "topicIDList", MsgVersion: "messageVersion", C2cMsgModNotifys: "c2cMessageModified", GroupMsgModNotifys: "groupMessageModified", ApplyJoinOption: "joinOption", MsgFlag: "messageRemindType", AtInfoList: "groupAtInfoList", AtFlagList: "groupAtType", AtMsgSeq: "sequence", BanDuration: "duration", BanDescription: "reason", NotVisible: "invisible", BytesTag: "tag", BytesValue: "value", RptBytesValue: "value", LatestSeq: "globalSequence", ClearSeq: "clearSequence", SupportMessageExtension: "isSupportExtension", ExtensionList: "extensions", GroupCounter: "counterList", Revoker_Account: "revoker", MsgExtensionNotify: "messageExtensionNotify", ExtensionC2cMsgInfo: "messageInfo", ExtensionGroupMsgInfo: "messageInfo", MsgOptType: "operateType", SetKVInfo: "operateResultList", DeleteKVInfo: "operateResultList", ClearKVInfo: "operateResultList", MsgKeyValue: "extensions", ClearMsgSeq: "clearSequence", MsgLastSeq: "globalSequence", InviteJoinOption: "inviteOption", MemberList_Account: "inviteeList", MsgMemberExtraInfoList: "inviteeInfoList", E: "event", GInf: "groupProfile", MCT: "clientTime", MR: "random", MP: "priority", MTS: "time", GId: "groupID", MS: "sequence", CCD: "cloudCustomData", F_Account: "from", F_Hd: "avatar", F_NN: "nick", GN: "groupName", GT: "groupType", IsSys: "isSystemMessage", OpInf: "operatorInfo", Img: "avatar", NN: "nick", OnlineInf: "onlineMemberInfo", ET: "expireTime", Num: "onlineMemberNum", Opt: "operationType", O_Account: "operatorID", RT: "operationType", UDF: "userDefinedField", L_Account: "userIDList", IsPlaceMsg: "isPlaceMessage", MsgCheckResult: "checkResult", Results: "resultList", Reaction: "reactionID", Reaction_Account: "userIDList", MsgReactionNotifyList: "messageReactionNotifyList", MsgReactionSummary: "reactionList", C2CMsgInfo: "C2CMessageInfo", GroupMsgInfo: "groupMessageInfo" }, ignoreKeyWord: ["C2C", "ID", "USP"] };
      function cc(e2, t2) {
        if ("string" != typeof e2 && !Array.isArray(e2))
          throw new TypeError("Expected the input to be `string | string[]`");
        t2 = Object.assign({ pascalCase: false }, t2);
        var n2;
        return 0 === (e2 = Array.isArray(e2) ? e2.map(function(e3) {
          return e3.trim();
        }).filter(function(e3) {
          return e3.length;
        }).join("-") : e2.trim()).length ? "" : 1 === e2.length ? t2.pascalCase ? e2.toUpperCase() : e2.toLowerCase() : (e2 !== e2.toLowerCase() && (e2 = uc(e2)), e2 = e2.replace(/^[_.\- ]+/, "").toLowerCase().replace(/[_.\- ]+(\w|$)/g, function(e3, t3) {
          return t3.toUpperCase();
        }).replace(/\d+(\w|$)/g, function(e3) {
          return e3.toUpperCase();
        }), n2 = e2, t2.pascalCase ? n2.charAt(0).toUpperCase() + n2.slice(1) : n2);
      }
      var uc = function(e2) {
        for (var t2 = false, n2 = false, o2 = false, i2 = 0; i2 < e2.length; i2++) {
          var a2 = e2[i2];
          t2 && /[a-zA-Z]/.test(a2) && a2.toUpperCase() === a2 ? (e2 = e2.slice(0, i2) + "-" + e2.slice(i2), t2 = false, o2 = n2, n2 = true, i2++) : n2 && o2 && /[a-zA-Z]/.test(a2) && a2.toLowerCase() === a2 ? (e2 = e2.slice(0, i2 - 1) + "-" + e2.slice(i2 - 1), o2 = n2, n2 = false, t2 = true) : (t2 = a2.toLowerCase() === a2 && a2.toUpperCase() !== a2, o2 = n2, n2 = a2.toUpperCase() === a2 && a2.toLowerCase() !== a2);
        }
        return e2;
      };
      function lc(e2, t2) {
        var n2 = 0;
        return function e3(t3, o2) {
          if (++n2 > 100)
            return n2--, t3;
          if (_t(t3)) {
            var i2 = t3.map(function(t4) {
              return gt(t4) ? e3(t4, o2) : t4;
            });
            return n2--, i2;
          }
          if (gt(t3)) {
            var a2 = (s2 = t3, r2 = function(e4, t4) {
              if (!Ct(t4))
                return false;
              if ((i3 = t4) !== cc(i3))
                for (var n3 = 0; n3 < rc.ignoreKeyWord.length && !t4.includes(rc.ignoreKeyWord[n3]); n3++)
                  ;
              var i3;
              return ft(o2[t4]) ? function(e5) {
                return "OPPOChannelID" === e5 ? e5 : e5[0].toUpperCase() + cc(e5).slice(1);
              }(t4) : o2[t4];
            }, c2 = /* @__PURE__ */ Object.create(null), Object.keys(s2).forEach(function(e4) {
              var t4 = r2(s2[e4], e4);
              t4 && (c2[t4] = s2[e4]);
            }), c2);
            return a2 = xt(a2, function(t4, n3) {
              return _t(t4) || gt(t4) ? e3(t4, o2) : t4;
            }), n2--, a2;
          }
          var s2, r2, c2;
        }(e2, t2);
      }
      function dc(e2, t2) {
        if (_t(e2))
          return e2.map(function(e3) {
            return gt(e3) ? dc(e3, t2) : e3;
          });
        if (gt(e2)) {
          var n2 = (o2 = e2, i2 = function(e3, n3) {
            return ft(t2[n3]) ? cc(n3) : t2[n3];
          }, a2 = {}, Object.keys(o2).forEach(function(e3) {
            a2[i2(o2[e3], e3)] = o2[e3];
          }), a2);
          return n2 = xt(n2, function(e3) {
            return _t(e3) || gt(e3) ? dc(e3, t2) : e3;
          });
        }
        var o2, i2, a2;
      }
      var pc = String.fromCharCode, gc = function(e2) {
        var t2 = 0 | e2.charCodeAt(0);
        if (55296 <= t2)
          if (t2 < 56320) {
            var n2 = 0 | e2.charCodeAt(1);
            if (56320 <= n2 && n2 <= 57343) {
              if ((t2 = (t2 << 10) + n2 - 56613888 | 0) > 65535)
                return pc(240 | t2 >>> 18, 128 | t2 >>> 12 & 63, 128 | t2 >>> 6 & 63, 128 | 63 & t2);
            } else
              t2 = 65533;
          } else
            t2 <= 57343 && (t2 = 65533);
        return t2 <= 2047 ? pc(192 | t2 >>> 6, 128 | 63 & t2) : pc(224 | t2 >>> 12, 128 | t2 >>> 6 & 63, 128 | 63 & t2);
      }, hc = function(e2) {
        for (var t2 = void 0 === e2 ? "" : ("" + e2).replace(/[\x80-\uD7ff\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g, gc), n2 = 0 | t2.length, o2 = new Uint8Array(n2), i2 = 0; i2 < n2; i2 = i2 + 1 | 0)
          o2[i2] = 0 | t2.charCodeAt(i2);
        return o2;
      }, _c = function(e2) {
        for (var t2 = new Uint8Array(e2), n2 = "", o2 = 0, i2 = t2.length; o2 < i2; ) {
          var a2 = t2[o2], s2 = 0, r2 = 0;
          if (a2 <= 127 ? (s2 = 0, r2 = 255 & a2) : a2 <= 223 ? (s2 = 1, r2 = 31 & a2) : a2 <= 239 ? (s2 = 2, r2 = 15 & a2) : a2 <= 244 && (s2 = 3, r2 = 7 & a2), i2 - o2 - s2 > 0)
            for (var c2 = 0; c2 < s2; )
              r2 = r2 << 6 | 63 & (a2 = t2[o2 + c2 + 1]), c2 += 1;
          else
            r2 = 65533, s2 = i2 - o2;
          n2 += String.fromCodePoint(r2), o2 += s2 + 1;
        }
        return n2;
      }, fc = function() {
        function e2(t2) {
          o(this, e2), this._handler = t2;
          var n2 = t2.getURL();
          if (this._socket = null, this._workerSocket = null, this._id = Lt(), this._handler.getIsWorkerEnabled()) {
            var i2 = URL.createObjectURL(new Blob([';let _socket = null;onmessage = function(event) {  if (event.data.cmd === "start") {    const url = event.data.url;    _socket = new WebSocket(url);    _socket.binaryType = "arraybuffer";    _socket.onopen = function() {      postMessage({ callback: "onOpen" });    };    _socket.onclose = function(e) {      postMessage({ callback: "onOpen", e: { code: e.code, reason: e.reason } });    };    _socket.onmessage = function(e) {      postMessage({ callback: "onMessage", data: e.data });    };    _socket.onerror = function(e) {      postMessage({ callback: "onError", e: { isTrusted: "true" } });    };  } else if (event.data.cmd === "sendMessage") {    if (_socket !== null) {      _socket.send(event.data.data);    }  } else if (event.data.cmd === "stop") {    if (_socket !== null) {      _socket.close(event.data.code);      _socket = null;    }  }};'], { type: "application/javascript; charset=utf-8" }));
            this._workerSocket = new Worker(i2);
            var a2 = this;
            this._workerSocket.onmessage = function(e3) {
              var t3 = e3.data, n3 = t3.callback, o2 = t3.e;
              "onOpen" === n3 ? a2._onOpen() : "onClose" === n3 ? a2._onClose(o2) : "onError" === n3 ? a2._onError(o2) : "onMessage" === n3 && a2._onMessage(e3.data);
            }, this._workerSocket.postMessage({ cmd: "start", id: this._id, url: n2 });
          } else
            se ? ne ? (ce.connectSocket({ url: n2, header: { "content-type": "application/json" } }), ce.onSocketClose(this._onClose.bind(this)), ce.onSocketOpen(this._onOpen.bind(this)), ce.onSocketMessage(this._onMessage.bind(this)), ce.onSocketError(this._onError.bind(this))) : (this._socket = ce.connectSocket({ url: n2, header: { "content-type": "application/json" }, complete: function() {
            } }), this._socket.onClose(this._onClose.bind(this)), this._socket.onOpen(this._onOpen.bind(this)), this._socket.onMessage(this._onMessage.bind(this)), this._socket.onError(this._onError.bind(this))) : re && (this._socket = new WebSocket(n2), this._socket.binaryType = "arraybuffer", this._socket.onopen = this._onOpen.bind(this), this._socket.onmessage = this._onMessage.bind(this), this._socket.onclose = this._onClose.bind(this), this._socket.onerror = this._onError.bind(this));
          this._canIUseBinaryFrame = t2.canIUseBinaryFrame();
        }
        return a(e2, [{ key: "getID", value: function() {
          return this._id;
        } }, { key: "_onOpen", value: function() {
          this._handler.onOpen({ id: this._id });
        } }, { key: "_onClose", value: function(e3) {
          this._handler.onClose({ id: this._id, e: e3 });
        } }, { key: "_onMessage", value: function(e3) {
          this._handler.onMessage({ data: this._canIUseBinaryFrame ? _c(e3.data) : e3.data });
        } }, { key: "_onError", value: function(e3) {
          this._handler.onError({ id: this._id, e: e3 });
        } }, { key: "setIsWorkerEnabled", value: function(e3) {
          this._isWorkerEnabled = true;
        } }, { key: "close", value: function(e3) {
          if (this._workerSocket && (this._workerSocket.postMessage({ cmd: "stop", code: e3 }), this._workerSocket.terminate(), this._workerSocket = null), ne)
            return ce.offSocketClose(), ce.offSocketMessage(), ce.offSocketOpen(), ce.offSocketError(), void ce.closeSocket();
          this._socket && (se ? (this._socket.onClose(function() {
          }), this._socket.onOpen(function() {
          }), this._socket.onMessage(function() {
          }), this._socket.onError(function() {
          })) : re && (this._socket.onopen = null, this._socket.onmessage = null, this._socket.onclose = null, this._socket.onerror = null), te ? this._socket.close({ code: e3 }) : this._socket.close(e3), this._socket = null);
        } }, { key: "send", value: function(e3) {
          if (this._workerSocket)
            this._workerSocket.postMessage({ cmd: "sendMessage", data: this._canIUseBinaryFrame ? hc(e3.data).buffer : e3.data });
          else {
            if (ne)
              return void ce.sendSocketMessage({ data: e3.data, fail: function() {
                e3.fail && e3.requestID && e3.fail(e3.requestID);
              } });
            this._socket && (se ? this._socket.send({ data: this._canIUseBinaryFrame ? hc(e3.data).buffer : e3.data, fail: function() {
              e3.fail && e3.requestID && e3.fail(e3.requestID);
            } }) : re && this._socket.send(this._canIUseBinaryFrame ? hc(e3.data).buffer : e3.data));
          }
        } }]), e2;
      }(), vc = 4e3, mc = 4001, Mc = ["keyMap"], yc = ["keyMap"], Ic = "connected", Cc = "connecting", Dc = "disconnected", Tc = function() {
        function e2(t2) {
          o(this, e2), this._channelModule = t2, this._n = "SocketHandler", this._promiseMap = /* @__PURE__ */ new Map(), this._readyState = Dc, this._simpleRequestMap = /* @__PURE__ */ new Map(), this.MAX_SIZE = 100, this._startSequence = Lt(), this._startTs = 0, this._reConnectFlag = false, this._nextPingTs = 0, this._reConnectCount = 0, this.MAX_RECONNECT_COUNT = 3, this._socketID = -1, this._random = 0, this._socket = null, this._url = "", this._onOpenTs = 0, this._canIUseBinaryFrame = true, this._isWorkerEnabled = true, this._setWebsocketHost(), this._initConnection();
        }
        return a(e2, [{ key: "_setWebsocketHost", value: function() {
          var e3 = this._channelModule.getModule(no), t2 = U;
          this._channelModule.isOversea() && (t2 = P), e3.isSingaporeSite() ? t2 = b : e3.isKoreaSite() ? t2 = w : e3.isGermanySite() ? t2 = F : e3.isIndiaSite() ? t2 = q : e3.isJapanSite() ? t2 = x : e3.isUSASite() && (t2 = V), H.HOST.setCurrent(t2);
        } }, { key: "_initConnection", value: function() {
          ft(H.HOST.CURRENT.BACKUP) || "" === this._url ? this._url = H.HOST.CURRENT.DEFAULT : this._url === H.HOST.CURRENT.DEFAULT ? this._url = H.HOST.CURRENT.BACKUP : this._url === H.HOST.CURRENT.BACKUP ? this._url = this._canIUseAnyCast() ? H.HOST.CURRENT.ANYCAST : H.HOST.CURRENT.DEFAULT : this._url === H.HOST.CURRENT.ANYCAST && (H.HOST.CURRENT.ANYCAST = "", this._url = H.HOST.CURRENT.DEFAULT);
          var e3 = this._channelModule.getModule(no).getProxyServer();
          un(e3) || (this._url = e3), this._connect(), this._nextPingTs = 0;
        } }, { key: "_canIUseAnyCast", value: function() {
          return re && H.HOST.CURRENT.ANYCAST;
        } }, { key: "onCheckTimer", value: function(e3) {
          e3 % 1 == 0 && this._checkPromiseMap();
        } }, { key: "_checkPromiseMap", value: function() {
          var e3 = this;
          0 !== this._promiseMap.size && this._promiseMap.forEach(function(t2, n2) {
            var o2 = t2.reject, i2 = t2.timestamp, a2 = 15e3;
            -1 !== n2.indexOf(Go) && (a2 = 9e4), Date.now() - i2 >= a2 && (Ye.l("".concat(e3._n, "._checkPromiseMap request timeout, delete requestID:").concat(n2)), e3._promiseMap.delete(n2), o2(new Lo({ code: No.NETWORK_TIMEOUT })), e3._channelModule.onRequestTimeout(n2));
          });
        } }, { key: "onOpen", value: function(e3) {
          if ("" !== this._readyState) {
            this._onOpenTs = Date.now();
            var t2 = e3.id;
            this._socketID = t2;
            var n2 = Date.now() - this._startTs;
            Ye.l("".concat(this._n, "._onOpen cost ").concat(n2, " ms. socketID:").concat(t2)), new Ms("wsOnOpen").setMessage(n2).setCostTime(n2).setMoreMessage("socketID:".concat(t2)).end(), e3.id === this._socketID && (this._readyState = Ic, this._reConnectCount = 0, this._resend(), true === this._reConnectFlag && (this._channelModule.onReconnected(), this._reConnectFlag = false), this._channelModule.onOpen());
          }
        } }, { key: "onClose", value: function(e3) {
          var t2 = new Ms("wsOnClose"), n2 = e3.id, o2 = e3.e, i2 = "sourceSocketID:".concat(n2, " currentSocketID:").concat(this._socketID, " code:").concat(o2.code, " reason:").concat(o2.reason), a2 = 0;
          0 !== this._onOpenTs && (a2 = Date.now() - this._onOpenTs), t2.setMessage(a2).setCostTime(a2).setMoreMessage(i2).setCode(o2.code).end(), Ye.l("".concat(this._n, "._onClose ").concat(i2, " onlineTime:").concat(a2)), n2 === this._socketID && (this._readyState = Dc, a2 < 1e3 ? this._channelModule.onReconnectFailed() : this._channelModule.onClose());
        } }, { key: "onError", value: function(e3) {
          var t2 = e3.id, n2 = e3.e, o2 = "sourceSocketID:".concat(t2, " currentSocketID:").concat(this._socketID);
          new Ms("wsOnError").setMessage(n2.errMsg || Tt(n2)).setMoreMessage(o2).setLevel("error").end(), Ye.w("".concat(this._n, "._onError"), n2, o2), t2 === this._socketID && (this._readyState = "", this._channelModule.onError());
        } }, { key: "onMessage", value: function(e3) {
          var t2;
          try {
            t2 = JSON.parse(e3.data);
          } catch (u2) {
            new Ms("jsonParseError").setMessage(e3.data).end();
          }
          if (t2 && t2.head) {
            var n2 = this._getRequestIDFromHead(t2.head), o2 = t2.body;
            if (!this._isTRTCCommand(n2)) {
              var i2 = jt(t2.head);
              o2 = dc(t2.body, this._getResponseKeyMap(i2));
            }
            if (Ye.d("".concat(this._n, ".onMessage ret:").concat(JSON.stringify(o2), " requestID:").concat(n2, " has:").concat(this._promiseMap.has(n2))), this._setNextPingTs(), this._promiseMap.has(n2)) {
              var a2 = this._promiseMap.get(n2), s2 = a2.resolve, r2 = a2.reject, c2 = a2.timestamp;
              return this._promiseMap.delete(n2), this._calcRTT(c2), void (o2.errorCode && 0 !== o2.errorCode ? (this._channelModule.onErrorCodeNotZero(o2), r2(new Lo({ code: o2.errorCode, message: o2.errorInfo || "", data: n2.includes(pi) || n2.includes(aa) ? { elements: o2.elements, messageVersion: o2.messageVersion, cloudCustomData: o2.cloudCustomData } : void 0 }))) : s2(ko(o2)));
            }
            this._channelModule.onMessage({ head: t2.head, body: o2 });
          }
        } }, { key: "_isTRTCCommand", value: function(e3) {
          for (var t2 = this._channelModule.getModule(yo).getCommandList(), n2 = false, o2 = 0; o2 < t2.length; o2++)
            if (e3.startsWith(t2[o2])) {
              n2 = true;
              break;
            }
          return n2;
        } }, { key: "_calcRTT", value: function(e3) {
          var t2 = Date.now() - e3;
          this._channelModule.getModule(fo).addRTT(t2);
        } }, { key: "_connect", value: function() {
          this._startTs = Date.now(), this._onOpenTs = 0, this._socket = new fc(this), this._socketID = this._socket.getID(), this._readyState = Cc, Ye.l("".concat(this._n, "._connect isWorkerEnabled:").concat(this.getIsWorkerEnabled(), " socketID:").concat(this._socketID, " url:").concat(this.getURL())), new Ms("wsConnect").setMessage("socketID:".concat(this._socketID, " url:").concat(this.getURL())).end();
        } }, { key: "getURL", value: function() {
          this._channelModule.isDevMode() && (this._canIUseBinaryFrame = false);
          var e3 = Bt();
          (ne || Z && "windows" === e3 || ie) && (this._canIUseBinaryFrame = false);
          var t2 = -1;
          "ios" === e3 ? t2 = Me || -1 : "android" === e3 && (t2 = Ie || -1);
          var n2 = this._channelModule.getModule(no), o2 = this._channelModule.getPlatform(), i2 = n2.getSDKAppID(), a2 = n2.getInstanceID(), s2 = "sdkappid=".concat(i2, "&instanceid=").concat(a2, "&random=").concat(this._getRandom(), "&platform=").concat(o2, "&host=").concat(e3, "&version=").concat(t2, "&sdkversion=").concat("3.2.0");
          return this._canIUseBinaryFrame ? "".concat(this._url, "/binfo?").concat(s2) : "".concat(this._url, "/info?").concat(s2);
        } }, { key: "_closeConnection", value: function(e3) {
          Ye.l("".concat(this._n, "._closeConnection socketID:").concat(this._socketID)), this._socket && (this._socket.close(e3), this._socketID = -1, this._socket = null, this._readyState = Dc);
        } }, { key: "_resend", value: function() {
          var e3 = this;
          if (Ye.l("".concat(this._n, "._resend reConnectFlag:").concat(this._reConnectFlag), "promiseMap.size:".concat(this._promiseMap.size, " simpleRequestMap.size:").concat(this._simpleRequestMap.size)), this._promiseMap.size > 0 && this._promiseMap.forEach(function(t3, n3) {
            var o3 = t3.uplinkData, i3 = t3.resolve, a3 = t3.reject;
            e3._promiseMap.set(n3, { resolve: i3, reject: a3, timestamp: Date.now(), uplinkData: o3 }), e3._execute(n3, o3);
          }), this._simpleRequestMap.size > 0) {
            var t2, n2 = T(this._simpleRequestMap);
            try {
              for (n2.s(); !(t2 = n2.n()).done; ) {
                var o2 = v(t2.value, 2), i2 = o2[0], a2 = o2[1];
                this._execute(i2, a2);
              }
            } catch (s2) {
              n2.e(s2);
            } finally {
              n2.f();
            }
            this._simpleRequestMap.clear();
          }
        } }, { key: "send", value: function(e3) {
          var t2 = this;
          e3.head.seq = this._getSequence(), e3.head.reqtime = Math.floor(Date.now() / 1e3), e3.keyMap;
          var n2 = g(e3, Mc), o2 = this._getRequestIDFromHead(e3.head), i2 = JSON.stringify(n2);
          return new Promise(function(e4, a2) {
            (t2._promiseMap.set(o2, { resolve: e4, reject: a2, timestamp: Date.now(), uplinkData: i2 }), Ye.d("".concat(t2._n, ".send uplinkData:").concat(JSON.stringify(n2), " requestID:").concat(o2, " readyState:").concat(t2._readyState)), t2._readyState !== Ic) ? t2._reConnect() : (t2._execute(o2, i2), t2._channelModule.getModule(fo).addRequestCount());
          });
        } }, { key: "simplySend", value: function(e3) {
          e3.head.seq = this._getSequence(), e3.head.reqtime = Math.floor(Date.now() / 1e3), e3.keyMap;
          var t2 = g(e3, yc), n2 = this._getRequestIDFromHead(e3.head), o2 = JSON.stringify(t2);
          this._readyState !== Ic ? (this._simpleRequestMap.size < this.MAX_SIZE ? this._simpleRequestMap.set(n2, o2) : Ye.l("".concat(this._n, ".simplySend. simpleRequestMap is full, drop request!")), this._reConnect()) : this._execute(n2, o2);
        } }, { key: "_execute", value: function(e3, t2) {
          this._socket.send({ data: t2, fail: se ? this._onSendFail.bind(this) : void 0, requestID: e3 });
        } }, { key: "_onSendFail", value: function(e3) {
          Ye.l("".concat(this._n, "._onSendFail requestID:").concat(e3));
        } }, { key: "_getSequence", value: function() {
          var e3;
          if (this._startSequence < 2415919103)
            return e3 = this._startSequence, this._startSequence += 1, 2415919103 === this._startSequence && (this._startSequence = Lt()), e3;
        } }, { key: "_getRequestIDFromHead", value: function(e3) {
          return e3.servcmd + e3.seq;
        } }, { key: "_getResponseKeyMap", value: function(e3) {
          var n2 = this._channelModule.getKeyMap(e3);
          return t(t({}, rc.response), n2.response);
        } }, { key: "_reConnect", value: function() {
          this._readyState !== Ic && this._readyState !== Cc && this.forcedReconnect();
        } }, { key: "forcedReconnect", value: function() {
          var e3 = this, t2 = "".concat(this._n, ".forcedReconnect");
          Ye.l("".concat(t2, " count:").concat(this._reConnectCount, " readyState:").concat(this._readyState)), this._reConnectFlag = true, this._resetRandom(), this._reConnectCount < this.MAX_RECONNECT_COUNT ? (this._reConnectCount += 1, this._closeConnection(mc), this._initConnection()) : (this._reConnectCount = 0, this._channelModule.probeNetwork().then(function(n2) {
            var o2 = v(n2, 2), i2 = o2[0];
            o2[1], i2 ? (Ye.w("".concat(t2, " disconnected from wsserver but network is ok, continue...")), e3._closeConnection(mc), e3._initConnection()) : e3._channelModule.onReconnectFailed();
          }));
        } }, { key: "getReconnectFlag", value: function() {
          return this._reConnectFlag;
        } }, { key: "_setNextPingTs", value: function() {
          this._nextPingTs = Date.now() + 1e4;
        } }, { key: "getNextPingTs", value: function() {
          return this._nextPingTs;
        } }, { key: "isConnected", value: function() {
          return this._readyState === Ic;
        } }, { key: "canIUseBinaryFrame", value: function() {
          return this._canIUseBinaryFrame;
        } }, { key: "setIsWorkerEnabled", value: function(e3) {
          Ye.l("".concat(this._n, ".setIsWorkerEnabled flag:").concat(e3)), this._isWorkerEnabled = e3;
        } }, { key: "getIsWorkerEnabled", value: function() {
          return this._isWorkerEnabled && Re;
        } }, { key: "_getRandom", value: function() {
          return 0 === this._random && (this._random = Math.random()), this._random;
        } }, { key: "_resetRandom", value: function() {
          this._random = 0;
        } }, { key: "close", value: function() {
          Ye.l("".concat(this._n, ".close")), this._closeConnection(vc), this._promiseMap.clear(), this._startSequence = Lt(), this._readyState = Dc, this._simpleRequestMap.clear(), this._reConnectFlag = false, this._reConnectCount = 0, this._onOpenTs = 0, this._url = "", this._random = 0, this._canIUseBinaryFrame = true, this._isWorkerEnabled = true;
        } }]), e2;
      }(), kc = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          if (o(this, n2), (i2 = t2.call(this, e3))._n = "ChannelModule", i2._socketHandler = new Tc(h(i2)), i2._probing = false, i2._isAppShowing = true, i2._previousState = L.NET_STATE_CONNECTED, se && "function" == typeof ce.onAppShow && "function" == typeof ce.onAppHide) {
            var a2 = i2._onAppHide.bind(h(i2)), s2 = i2._onAppShow.bind(h(i2));
            "function" == typeof ce.offAppHide && ce.offAppHide(a2), "function" == typeof ce.offAppShow && ce.offAppShow(s2), ce.onAppHide(a2), ce.onAppShow(s2);
          }
          return i2._timerForNotLoggedIn = -1, i2._timerForNotLoggedIn = setInterval(i2.onCheckTimer.bind(h(i2)), 1e3), i2._fatalErrorFlag = false, i2;
        }
        return a(n2, [{ key: "onCheckTimer", value: function(e3) {
          this._socketHandler && (this.isLoggedIn() ? (this._timerForNotLoggedIn > 0 && (clearInterval(this._timerForNotLoggedIn), this._timerForNotLoggedIn = -1), this._socketHandler.onCheckTimer(e3)) : this._socketHandler.onCheckTimer(1), this._checkNextPing());
        } }, { key: "onErrorCodeNotZero", value: function(e3) {
          this.getModule(uo).onErrorCodeNotZero(e3);
        } }, { key: "onMessage", value: function(e3) {
          this.getModule(uo).onMessage(e3);
        } }, { key: "send", value: function(e3) {
          if (!this._socketHandler)
            return Promise.reject();
          if (this._previousState !== L.NET_STATE_CONNECTED && e3.head.servcmd.includes(Ra))
            return this.reConnect(), this.getModule(no).getProxyServer() ? Promise.resolve() : this._sendLogViaHTTP(e3);
          return this._socketHandler.send(e3);
        } }, { key: "_sendLogViaHTTP", value: function(e3) {
          var t3 = H.HOST.CURRENT.STAT;
          return new Promise(function(n3, o2) {
            var i2 = "".concat(t3, "/v4/imopenstat/tim_web_report_v2?sdkappid=").concat(e3.head.sdkappid, "&reqtime=").concat(Date.now()), a2 = JSON.stringify(e3.body), s2 = "application/x-www-form-urlencoded;charset=UTF-8";
            if (se)
              ce.request({ url: i2, data: a2, method: "POST", timeout: 3e3, header: { "content-type": s2 }, success: function() {
                n3();
              }, fail: function() {
                o2(new Lo({ code: No.NETWORK_ERROR }));
              } });
            else {
              var r2 = new XMLHttpRequest(), c2 = setTimeout(function() {
                r2.abort(), o2(new Lo({ code: No.NETWORK_TIMEOUT }));
              }, 3e3);
              r2.onreadystatechange = function() {
                4 === r2.readyState && (clearTimeout(c2), 200 === r2.status || 304 === r2.status ? n3() : o2(new Lo({ code: No.NETWORK_ERROR })));
              }, r2.open("POST", i2, true), r2.setRequestHeader("Content-type", s2), r2.send(a2);
            }
          });
        } }, { key: "simplySend", value: function(e3) {
          return this._socketHandler ? this._socketHandler.simplySend(e3) : Promise.reject();
        } }, { key: "onOpen", value: function() {
          this._ping();
        } }, { key: "onClose", value: function() {
          this._socketHandler && (this._socketHandler.getReconnectFlag() && this._emitNetStateChangeEvent(L.NET_STATE_DISCONNECTED));
          this.reConnect();
        } }, { key: "onError", value: function() {
          se && !ie && this.outputWarning("DomainNameInMP"), this._emitNetStateChangeEvent(L.NET_STATE_DISCONNECTED);
        } }, { key: "getKeyMap", value: function(e3) {
          return this.getModule(uo).getKeyMap(e3);
        } }, { key: "_onAppHide", value: function() {
          this._isAppShowing = false;
        } }, { key: "_onAppShow", value: function() {
          this._isAppShowing = true;
        } }, { key: "onRequestTimeout", value: function(e3) {
        } }, { key: "onReconnected", value: function() {
          Ye.l("".concat(this._n, ".onReconnected")), this._m.restartTimer(), this.getModule(uo).onReconnected(), this._emitNetStateChangeEvent(L.NET_STATE_CONNECTED);
        } }, { key: "onReconnectFailed", value: function() {
          Ye.l("".concat(this._n, ".onReconnectFailed")), this._emitNetStateChangeEvent(L.NET_STATE_DISCONNECTED);
        } }, { key: "setIsWorkerEnabled", value: function(e3) {
          this._socketHandler && this._socketHandler.setIsWorkerEnabled(false);
        } }, { key: "offline", value: function() {
          this._emitNetStateChangeEvent(L.NET_STATE_DISCONNECTED);
        } }, { key: "reConnect", value: function() {
          var e3 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t3 = false;
          this._socketHandler && (t3 = this._socketHandler.getReconnectFlag());
          var n3 = "forcedFlag:".concat(e3, " fatalErrorFlag:").concat(this._fatalErrorFlag, " previousState:").concat(this._previousState, " reconnectFlag:").concat(t3);
          if (Ye.l("".concat(this._n, ".reConnect ").concat(n3)), !this._fatalErrorFlag && this._socketHandler) {
            if (true === e3)
              this._socketHandler.forcedReconnect();
            else {
              if (this._previousState === L.NET_STATE_CONNECTING && t3)
                return;
              this._socketHandler.forcedReconnect();
            }
            this._emitNetStateChangeEvent(L.NET_STATE_CONNECTING);
          }
        } }, { key: "_emitNetStateChangeEvent", value: function(e3) {
          this._previousState !== e3 && (Ye.l("".concat(this._n, "._emitNetStateChangeEvent from ").concat(this._previousState, " to ").concat(e3)), this._previousState = e3, this.emitOuterEvent(k.NET_STATE_CHANGE, { state: e3 }));
        } }, { key: "_ping", value: function() {
          var e3 = this;
          if (true !== this._probing) {
            this._probing = true;
            var t3 = this.getModule(uo).getProtocolData({ protocolName: Oa });
            this.send(t3).then(function() {
              e3._probing = false;
            }).catch(function(t4) {
              if (Ye.w("".concat(e3._n, "._ping failed. error:"), t4), e3._probing = false, t4 && 60002 === t4.code)
                return new Ms("error").setMessage("code:".concat(t4.code, " message:").concat(t4.message)).setNetworkType(e3.getModule(ao).getNetworkType()).end(), e3._fatalErrorFlag = true, void e3._emitNetStateChangeEvent(L.NET_STATE_DISCONNECTED);
              e3.probeNetwork().then(function(t5) {
                var n3 = v(t5, 2), o2 = n3[0], i2 = n3[1];
                Ye.l("".concat(e3._n, "._ping failed. probe network, isAppShowing:").concat(e3._isAppShowing, " online:").concat(o2, " networkType:").concat(i2)), o2 ? e3.reConnect() : e3._emitNetStateChangeEvent(L.NET_STATE_DISCONNECTED);
              });
            });
          }
        } }, { key: "_checkNextPing", value: function() {
          this._socketHandler && (this._socketHandler.isConnected() && Date.now() >= this._socketHandler.getNextPingTs() && this._ping());
        } }, { key: "dealloc", value: function() {
          this._socketHandler && (this._socketHandler.close(), this._socketHandler = null), this._timerForNotLoggedIn > -1 && clearInterval(this._timerForNotLoggedIn);
        } }, { key: "onRestApiKickedOut", value: function() {
          this._socketHandler && (this._socketHandler.close(), this.reConnect(true));
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._previousState = L.NET_STATE_CONNECTED, this._probing = false, this._fatalErrorFlag = false, this._timerForNotLoggedIn = setInterval(this.onCheckTimer.bind(this), 1e3);
        } }]), n2;
      }(Oo), Lc = ["a2", "tinyid"], Nc = ["a2", "tinyid"], Sc = function() {
        function e2(t2) {
          o(this, e2), this._n = "ProtocolHandler", this._sessionModule = t2, this._configMap = /* @__PURE__ */ new Map(), this._fillConfigMap();
        }
        return a(e2, [{ key: "_fillConfigMap", value: function() {
          this._configMap.clear();
          var e3 = this._sessionModule.genCommonHead(), n2 = this._sessionModule.genCosSpecifiedHead(), o2 = this._sessionModule.genSSOReportHead();
          this._configMap.set(Go, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_STATUS, ".").concat(Go) }), body: { state: "Online", isWebUniapp: 0, deviceBrand: 0 }, keyMap: { request: { deviceBrand: "InstType" }, response: { InstId: "instanceID", HelloInterval: "helloInterval" } } };
          }(e3)), this._configMap.set(Uo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_STATUS, ".").concat(Uo) }), body: { type: 0 }, keyMap: { request: { type: "wslogout_type" } } };
          }(e3)), this._configMap.set(Po, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_STATUS, ".").concat(Po) }), body: { isWebUniapp: 0 }, keyMap: { response: { NewInstInfo: "newInstanceInfo" } } };
          }(e3)), this._configMap.set(bo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.STAT_SERVICE, ".").concat(bo) }), body: {} };
          }(e3)), this._configMap.set(Sa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_COS_SIGN, ".").concat(Sa) }), body: { cmd: "open_im_cos_svc", subCmd: "get_cos_token", duration: 300, version: 2 }, keyMap: { request: { userSig: "usersig", subCmd: "sub_cmd", cmd: "cmd", duration: "duration", version: "version" }, response: { expired_time: "expiredTime", bucket_name: "bucketName", session_token: "sessionToken", tmp_secret_id: "secretId", tmp_secret_key: "secretKey" } } };
          }(n2)), this._configMap.set(Aa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.CUSTOM_UPLOAD, ".").concat(Aa) }), body: { fileType: void 0, fileName: void 0, uploadMethod: 0, duration: 900 }, keyMap: { request: { userSig: "usersig", fileType: "file_type", fileName: "file_name", uploadMethod: "upload_method" }, response: { expired_time: "expiredTime", request_id: "requestId", head_url: "headUrl", upload_url: "uploadUrl", download_url: "downloadUrl", ci_url: "ciUrl", snapshot_url: "requestSnapshotUrl" } } };
          }(n2)), this._configMap.set(Ea, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.CUSTOM_UPLOAD, ".").concat(Ea) }), body: { version: 1, platform: void 0, coverName: void 0, requestSnapshotUrl: void 0 }, keyMap: { request: { version: "version", platform: "platform", coverName: "cover_name", requestSnapshotUrl: "snapshot_url" }, response: { error_code: "errorCode", error_msg: "errorInfo", download_url: "snapshotUrl" } } };
          }(n2)), this._configMap.set(Ha, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_CONFIG_MANAGER, ".").concat(Ha) }), body: { SDKAppID: 0 }, keyMap: { request: { SDKAppID: "uint32_sdkappid" }, response: { int32_error_code: "errorCode", str_error_message: "errorMessage", str_purchase_bits: "purchaseBits", uint32_expired_time: "expiredTime" } } };
          }(e3)), this._configMap.set(Ba, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_CONFIG_MANAGER, ".").concat(Ba) }), body: {}, keyMap: { response: { int32_error_code: "errorCode", str_error_message: "errorMessage", str_purchase_bits: "purchaseBits", uint32_expired_time: "expiredTime" } } };
          }(e3)), this._configMap.set(xa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_CONFIG_MANAGER, ".").concat(xa) }), body: { SDKAppID: 0, version: 0 }, keyMap: { request: { SDKAppID: "uint32_sdkappid", version: "uint64_version" }, response: { int32_error_code: "errorCode", str_error_message: "errorMessage", str_json_config: "cloudControlConfig", uint32_expired_time: "expiredTime", uint32_sdkappid: "SDKAppID", uint64_version: "version" } } };
          }(e3)), this._configMap.set(Va, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_CONFIG_MANAGER, ".").concat(Va) }), body: {}, keyMap: { response: { int32_error_code: "errorCode", str_error_message: "errorMessage", str_json_config: "cloudControlConfig", uint32_expired_time: "expiredTime", uint32_sdkappid: "SDKAppID", uint64_version: "version" } } };
          }(e3)), this._configMap.set(Ka, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OVERLOAD_PUSH, ".").concat(Ka) }), body: {}, keyMap: { response: { OverLoadServCmd: "overloadCommand", DelaySecs: "waitingTime" } } };
          }(e3)), this._configMap.set(wo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(wo) }), body: { cookie: "", syncFlag: 0, needAbstract: 1, isOnlineSync: 0, needSignaling: 1 }, keyMap: { request: { fromAccount: "From_Account", toAccount: "To_Account", from: "From_Account", to: "To_Account", time: "MsgTimeStamp", sequence: "MsgSeq", random: "MsgRandom", elements: "MsgBody" }, response: { MsgList: "messageList", SyncFlag: "syncFlag", To_Account: "to", From_Account: "from", ClientSeq: "clientSequence", MsgSeq: "sequence", NoticeSeq: "noticeSequence", NotifySeq: "notifySequence", MsgRandom: "random", MsgTimeStamp: "time", MsgContent: "content", ToGroupId: "to", MsgKey: "messageKey", GroupTips: "groupTips", MsgBody: "elements", MsgType: "type", C2CRemainingUnreadCount: "C2CRemainingUnreadList", C2CPairUnreadCount: "C2CPairUnreadList" } } };
          }(e3)), this._configMap.set(ns, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_MSG_AUDIT_MGR, ".").concat(ns) }), body: { version: 0, deviceID: "", startIndex: void 0 }, keyMap: { request: { version: "uint64_version", deviceID: "str_device_id", startIndex: "uint64_start_index" }, response: { msg_cmd_error_code: "errorInfo", str_err_msg: "errorMessage", uint32_code: "errorCode", msg_scene_ctl_config: "filterConfig", uint64_c2c_custom_msg_flag: "c2c_custom_message", uint64_c2c_text_msg_flag: "c2c_text_message", uint64_group_custom_msg_flag: "group_custom_message", uint64_group_text_msg_flag: "group_text_message", uint64_group_info_flag: "group_profile", uint64_group_member_info_flag: "group_member_profile", uint64_relation_chain_flag: "sns", uint64_user_info_flag: "user_profile", rpt_msg_dirty_word: "lexicon", str_dirty_word: "profanity", str_replaced_content: "replacement", uint64_filter_type: "filterType", uint64_id: "id", uint64_word_type: "profanityType", uint64_complete_flag: "completeFlag", uint64_next_start_index: "nextStartIndex", uint64_version: "version", uint64_expired_time: "expiredTime" } } };
          }(e3)), this._configMap.set(Fo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(Fo) }), body: { fromAccount: "", toAccount: "", msgSeq: 0, msgRandom: 0, msgBody: [], cloudCustomData: void 0, nick: "", avatar: "", msgLifeTime: void 0, offlinePushInfo: { pushFlag: 0, title: "", desc: "", ext: "", apnsInfo: { badgeMode: 0, isVoipPush: void 0 }, androidInfo: { OPPOChannelID: "" } }, messageControlInfo: void 0, clientTime: void 0, needReadReceipt: 0, isSupportExtension: 0, isRelayMessage: 0 }, keyMap: { request: { fromAccount: "From_Account", toAccount: "To_Account", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom", msgBody: "MsgBody", count: "MaxCnt", lastMessageTime: "LastMsgTime", messageKey: "MsgKey", peerAccount: "Peer_Account", data: "Data", description: "Desc", extension: "Ext", type: "MsgType", content: "MsgContent", sizeType: "Type", uuid: "UUID", url: "", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag", nick: "From_AccountNick", avatar: "From_AccountHeadurl", from: "From_Account", time: "MsgTimeStamp", messageRandom: "MsgRandom", messageSequence: "MsgSeq", elements: "MsgBody", clientSequence: "ClientSeq", payload: "MsgContent", messageList: "MsgList", messageNumber: "MsgNum", abstractList: "AbstractList", messageBody: "MsgBody", needReadReceipt: "IsNeedReadReceipt" } } };
          }(e3)), this._configMap.set(qo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(qo) }), body: { fromAccount: "", groupID: "", random: 0, clientSequence: 0, priority: "", msgBody: [], cloudCustomData: void 0, onlineOnlyFlag: 0, offlinePushInfo: { pushFlag: 0, title: "", desc: "", ext: "", apnsInfo: { badgeMode: 0, isVoipPush: void 0 }, androidInfo: { OPPOChannelID: "" } }, groupAtInfo: [], messageControlInfo: void 0, clientTime: void 0, needReadReceipt: 0, topicID: void 0, receiverList: void 0, isSupportExtension: 0, isRelayMessage: 0 }, keyMap: { request: { to: "GroupId", extension: "Ext", data: "Data", description: "Desc", random: "Random", sequence: "ReqMsgSeq", count: "ReqMsgNumber", type: "MsgType", priority: "MsgPriority", content: "MsgContent", elements: "MsgBody", sizeType: "Type", uuid: "UUID", url: "", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag", clientSequence: "ClientSeq", from: "From_Account", time: "MsgTimeStamp", messageRandom: "MsgRandom", messageSequence: "MsgSeq", payload: "MsgContent", messageList: "MsgList", messageNumber: "MsgNum", abstractList: "AbstractList", messageBody: "MsgBody", needReadReceipt: "NeedReadReceipt", receiverList: "To_Account" }, response: { MsgTime: "time", MsgSeq: "sequence" } } };
          }(e3)), this._configMap.set(ai, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(ai) }), body: { msgInfo: { fromAccount: "", toAccount: "", msgTimeStamp: 0, msgSeq: 0, msgRandom: 0 } }, keyMap: { request: { msgInfo: "MsgInfo", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom" } } };
          }(e3)), this._configMap.set(Wi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Wi) }), body: { groupID: "", msgSeqList: void 0, topicID: "" }, keyMap: { request: { msgSeqList: "MsgSeqList", msgSeq: "MsgSeq" } } };
          }(e3)), this._configMap.set(ui, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(ui) }), body: { peerAccount: "", count: 15, lastMessageTime: 0, messageKey: "", withRecalledMessage: 1, direction: 0 }, keyMap: { request: { messageKey: "MsgKey", peerAccount: "Peer_Account", count: "MaxCnt", lastMessageTime: "LastMsgTime", withRecalledMessage: "WithRecalledMsg", direction: "GetDirection" }, response: { LastMsgTime: "lastMessageTime", IsNeedReadReceipt: "needReadReceipt", IsPeerRead: "readReceiptSentByPeer" } } };
          }(e3)), this._configMap.set(pi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(pi) }), body: { from: "", to: "", sequence: 0, random: 0, time: 0, version: 0, elements: void 0, cloudCustomData: void 0 }, keyMap: { request: { sequence: "MsgSeq", random: "MsgRandom", time: "MsgTime", version: "MsgVersion", type: "MsgType", content: "MsgContent" } } };
          }(e3)), this._configMap.set(Ji, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Ji) }), body: { withRecalledMsg: 1, groupID: "", count: 15, sequence: "", topicID: void 0 }, keyMap: { request: { sequence: "ReqMsgSeq", count: "ReqMsgNumber", withRecalledMessage: "WithRecalledMsg" }, response: { Random: "random", MsgTime: "time", MsgSeq: "sequence", ReqMsgSeq: "sequence", RspMsgList: "messageList", IsSystemMsg: "isSystemMessage", ToGroupId: "to", EnumFrom_AccountType: "fromAccountType", EnumTo_AccountType: "toAccountType", GroupCode: "groupCode", MsgPriority: "priority", MsgBody: "elements", MsgType: "type", MsgContent: "content", IsFinished: "complete", Download_Flag: "downloadFlag", ClientSeq: "clientSequence", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID", ToTopicId: "topicID", InvisibleMsgSeq: "invisibleSequenceList" } } };
          }(e3)), this._configMap.set(si, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(si) }), body: { C2CMsgReaded: void 0 }, keyMap: { request: { lastMessageTime: "LastedMsgTime" } } };
          }(e3)), this._configMap.set(ri, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(ri) }), body: { userIDList: void 0, muteFlag: 0 }, keyMap: { request: { userIDList: "Peer_Account", muteFlag: "Mute_Notifications" } } };
          }(e3)), this._configMap.set(ci, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(ci) }), body: { toAccount: void 0, userIDList: void 0 }, keyMap: { request: { userIDList: "Peer_Account" }, response: { MuteNotificationsList: "muteFlagList" } } };
          }(e3)), this._configMap.set(Yi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Yi) }), body: { groupID: void 0, messageReadSeq: void 0, topicID: void 0 }, keyMap: { request: { messageReadSeq: "MsgReadedSeq" } } };
          }(e3)), this._configMap.set(ji, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(ji) }), body: { readAllC2CMessage: 0, groupMessageReadInfoList: [] }, keyMap: { request: { readAllC2CMessage: "C2CReadAllMsg", groupMessageReadInfoList: "GroupReadInfo", messageSequence: "MsgSeq" }, response: { C2CReadAllMsg: "readAllC2CMessage", GroupReadInfoArray: "groupMessageReadInfoList" } } };
          }(e3)), this._configMap.set(di, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(di) }), body: { fromAccount: "", to: "", keyList: void 0 }, keyMap: { request: { keyList: "MsgKeyList" } } };
          }(e3)), this._configMap.set(ia, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(ia) }), body: { groupID: "", deleter: "", keyList: void 0, topicID: void 0 }, keyMap: { request: { deleter: "Deleter_Account", keyList: "Seqs" } } };
          }(e3)), this._configMap.set(os, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_TRANSLATE, ".").concat(os) }), body: { sourceTextList: void 0, SDKAppID: 0, from: 0, source: "", target: "" }, keyMap: { request: { sourceTextList: "SourceText", SDKAppID: "SdkAppId", from: "FromAccount" }, response: { TargetText: "translatedTextList", RequestId: "requestID", CmdErrorCode: "error", ErrorCode: "code", ErrorInfo: "message" } } };
          }(e3)), this._configMap.set(is, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_SPEECH, ".").concat(is) }), body: { url: "", SDKAppID: 0, format: "", sourceType: 0, language: "" }, keyMap: { request: { url: "BytesUrl", SDKAppID: "Uint32Sdkappid", format: "BytesVoiceFormat", sourceType: "Uint64SourceType", language: "BytesEngServiceType" }, response: { BytesRequestid: "requestID", BytesResult: "result", CmdErrorCode: "error", ErrorCode: "code", ErrorInfo: "message" } } };
          }(e3)), this._configMap.set(aa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(aa) }), body: { groupID: "", topicID: void 0, sequence: 0, version: 0, elements: void 0, cloudCustomData: void 0 }, keyMap: { request: { sequence: "MsgSeq", version: "MsgVersion", type: "MsgType", content: "MsgContent" } } };
          }(e3)), this._configMap.set(zi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(zi) }), body: { groupID: "", sequenceList: void 0 }, keyMap: { request: { sequence: "MsgSeq" } } };
          }(e3)), this._configMap.set(Qi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(Qi) }), body: { peerAccount: "", messageInfoList: void 0 }, keyMap: { request: { peerAccount: "Peer_Account", messageInfoList: "C2CMsgInfo", fromAccount: "From_Account", toAccount: "To_Account", sequence: "MsgSeq", random: "MsgRandom", time: "MsgTime", clientTime: "MsgClientTime" } } };
          }(e3)), this._configMap.set(Xi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Xi) }), body: { groupID: "", sequenceList: void 0 }, keyMap: { request: { sequenceList: "MsgSeqList", sequence: "MsgSeq" } } };
          }(e3)), this._configMap.set(Zi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Zi) }), body: { groupID: "", sequence: void 0, flag: 0, cursor: 0, count: 0 }, keyMap: { request: { sequence: "MsgSeq", count: "Num" }, response: { ReadList: "readUserIDList", Read_Account: "userID", UnreadList: "unreadUserIDList", Unread_Account: "userID", IsFinish: "isCompleted" } } };
          }(e3)), this._configMap.set(gi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM_MSG_EXT, ".").concat(gi) }), body: { from: void 0, to: void 0, messageKey: void 0, operateType: void 0, extensionList: void 0 } };
          }(e3)), this._configMap.set(hi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM_MSG_EXT, ".").concat(hi) }), body: { from: void 0, to: void 0, messageKey: void 0, startSequence: void 0 } };
          }(e3)), this._configMap.set(da, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM_MSG_EXT, ".").concat(da) }), body: { groupID: void 0, topicID: void 0, messageSequence: void 0, operateType: void 0, extensionList: void 0 } };
          }(e3)), this._configMap.set(pa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM_MSG_EXT, ".").concat(pa) }), body: { groupID: void 0, topicID: void 0, messageSequence: void 0, startSequence: void 0 } };
          }(e3)), this._configMap.set(Ua, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.MESSAGE_SEARCH, ".").concat(Ua) }), body: { keywordList: void 0, keywordListMatchType: "or", account: void 0, groupID: void 0, count: 100, cursor: void 0, messageTypeList: void 0, senderUserIDList: void 0, startTime: void 0, endTime: void 0 }, keyMap: { request: { keywordListMatchType: "MatchType", account: "PeerAccount", groupID: "GroupID", messageTypeList: "MsgTypeList", senderUserIDList: "SendUserIDList" }, response: { GroupID: "groupID", UserID: "userID", Count: "messageCount", LastMsgTime: "lastMessageTime", ConversationMsgs: "searchResult", IsNeedReadReceipt: "needReadReceipt", IsPeerRead: "readReceiptSentByPeer", MsgSeq: "sequence", ReqMsgSeq: "sequence", IsSystemMsg: "isSystemMessage", ToGroupId: "to", EnumFrom_AccountType: "fromAccountType", EnumTo_AccountType: "toAccountType", GroupCode: "groupCode", MsgContent: "content", ClientSeq: "clientSequence", ToTopicId: "topicID", InvisibleMsgSeq: "invisibleSequenceList" } } };
          }(e3)), this._configMap.set(_i, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM_MSG_EXT, ".").concat(_i) }), body: { from: void 0, to: void 0, reactionID: void 0, messageKey: void 0, userIDList: void 0 }, keyMap: { request: { userIDList: "Add_Account" } } };
          }(e3)), this._configMap.set(fi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM_MSG_EXT, ".").concat(fi) }), body: { from: void 0, to: void 0, reactionID: void 0, messageKey: void 0, userIDList: void 0 }, keyMap: { request: { userIDList: "Del_Account" } } };
          }(e3)), this._configMap.set(vi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM_MSG_EXT, ".").concat(vi) }), body: { from: void 0, to: void 0, messageKeyList: void 0, count: void 0 } };
          }(e3)), this._configMap.set(mi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM_MSG_EXT, ".").concat(mi) }), body: { from: void 0, to: void 0, reactionID: void 0, messageKey: void 0, count: void 0 } };
          }(e3)), this._configMap.set(fa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM_MSG_EXT, ".").concat(fa) }), body: { groupID: void 0, topicID: void 0, reactionID: void 0, messageSequence: void 0, userIDList: void 0 }, keyMap: { request: { userIDList: "Add_Account" } } };
          }(e3)), this._configMap.set(va, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM_MSG_EXT, ".").concat(va) }), body: { groupID: void 0, topicID: void 0, reactionID: void 0, messageSequence: void 0, userIDList: void 0 }, keyMap: { request: { userIDList: "Del_Account" } } };
          }(e3)), this._configMap.set(ma, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM_MSG_EXT, ".").concat(ma) }), body: { groupID: void 0, topicID: void 0, messageSequenceList: void 0, count: void 0 }, keyMap: { response: { MsgSeq: "messageSequence" } } };
          }(e3)), this._configMap.set(Ma, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM_MSG_EXT, ".").concat(Ma) }), body: { groupID: void 0, topicID: void 0, reactionID: void 0, messageSequence: void 0, nextSeq: void 0, count: void 0 } };
          }(e3)), this._configMap.set(li, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(li) }), body: { userIDList: void 0 }, keyMap: { request: { userIDList: "To_Account" }, response: { ReadTime: "peerReadTimeList" } } };
          }(e3)), this._configMap.set(Mi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.RECENT_CONTACT, ".").concat(Mi) }), body: { fromAccount: void 0, timeStamp: void 0, startIndex: void 0, pinnedTimeStamp: void 0, pinnedStartIndex: void 0, orderType: void 0, messageAssistFlag: 15, assistFlag: 31 }, keyMap: { request: { messageAssistFlag: "MsgAssistFlags", assistFlag: "AssistFlags", pinnedTimeStamp: "TopTimeStamp", pinnedStartIndex: "TopStartIndex" }, response: { SessionItem: "conversations", ToAccount: "groupID", To_Account: "userID", UnreadMsgCount: "unreadCount", MsgGroupReadedSeq: "messageReadSeq", C2cPeerReadTime: "c2cPeerReadTime", LastMsgFlags: "lastMessageFlag", TopFlags: "isPinned", TopTimeStamp: "pinnedTimeStamp", TopStartIndex: "pinnedStartIndex", GroupId: "convGroupID", C2cRemark: "friendRemark", MsgRecvOption: "messageRemindType", GroupIgnoredUnreadSeqCount: "noUnreadCount", GroupNextMsgSeq: "nextMessageSeq" } } };
          }(e3)), this._configMap.set(yi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.RECENT_CONTACT, ".").concat(yi) }), body: { fromAccount: "", conversationList: void 0, clearHistoryMessage: void 0 }, keyMap: { request: { toGroupID: "ToGroupid", clearHistoryMessage: "ClearRamble", conversationList: "ContactItem" }, response: { ResultItem: "resultList", ToGroupid: "groupID", ResultCode: "code", ResultInfo: "info" } } };
          }(e3)), this._configMap.set(Ii, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.RECENT_CONTACT, ".").concat(Ii) }), body: { fromAccount: "", toAccount: void 0, type: 1, toGroupID: void 0 }, keyMap: { request: { toGroupID: "ToGroupid" } } };
          }(e3)), this._configMap.set(Ci, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.RECENT_CONTACT, ".").concat(Ci) }), body: { fromAccount: "", operationType: 1, itemList: void 0 }, keyMap: { request: { itemList: "RecentContactItem" } } };
          }(e3)), this._configMap.set(Di, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(Di) }), body: { messageListToDelete: void 0 }, keyMap: { request: { messageListToDelete: "DelMsgList", messageSeq: "MsgSeq", messageRandom: "MsgRandom" } } };
          }(e3)), this._configMap.set(Ti, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.RECENT_CONTACT, ".").concat(ki) }), body: { fromAccount: "", itemList: void 0 }, keyMap: { request: { itemList: "MarkItem", operationType: "OptType", groupID: "ToGroupId" }, response: { ToGroupId: "groupID", OptType: "operationType" } } };
          }(e3)), this._configMap.set(ki, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.RECENT_CONTACT, ".").concat(ki) }), body: { fromAccount: "", itemList: void 0 }, keyMap: { request: { itemList: "MarkItem", operationType: "OptType", groupID: "ToGroupId" }, response: { ToGroupId: "groupID", OptType: "operationType" } } };
          }(e3)), this._configMap.set(Li, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.RECENT_CONTACT, ".").concat(Si) }), body: { fromAccount: "", itemList: void 0 }, keyMap: { request: { itemList: "GroupContactItem", groupID: "ToGroupId" }, response: { GroupId: "convGroupID", ToGroupId: "groupID", OptType: "operationType" } } };
          }(e3)), this._configMap.set(Ni, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.RECENT_CONTACT, ".").concat(Ni) }), body: { fromAccount: "", groupName: void 0 }, keyMap: { request: {}, response: { GroupId: "convGroupID" } } };
          }(e3)), this._configMap.set(Si, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.RECENT_CONTACT, ".").concat(Si) }), body: { fromAccount: "", updateType: void 0, updateGroup: void 0 }, keyMap: { request: { oldName: "OldGroupName", newName: "NewGroupName", groupID: "ToGroupId", operationType: "ContactOptType", groupName: "OldGroupName", updateItem: "ContactUpdateItem" }, response: { ContactOptType: "operationType", ToGroupId: "groupID", GroupId: "convGroupID" } } };
          }(e3)), this._configMap.set(Ai, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.RECENT_CONTACT, ".").concat(Si) }), body: { fromAccount: "", updateType: void 0, updateGroup: { groupName: void 0, updateGroupType: void 0, updateItem: void 0 } }, keyMap: { request: {}, response: {} } };
          }(e3)), this._configMap.set(Ei, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.RECENT_CONTACT, ".").concat(Si) }), body: { fromAccount: "", updateType: void 0, updateGroup: void 0 }, keyMap: { request: {}, response: {} } };
          }(e3)), this._configMap.set(Ri, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.RECENT_CONTACT, ".").concat(Ri) }), body: { fromAccount: "", startTime: void 0, startIndex: void 0 }, keyMap: { request: {}, response: { GroupId: "convGroupID", ToGroupId: "groupID", OptType: "operationType", CustomMark: "customData", ContactGroupId: "convGroupIDList" } } };
          }(e3)), this._configMap.set(xo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.PROFILE, ".").concat(xo) }), body: { fromAccount: "", userItem: [] }, keyMap: { request: { toAccount: "To_Account", standardSequence: "StandardSequence", customSequence: "CustomSequence" } } };
          }(e3)), this._configMap.set(Vo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.PROFILE, ".").concat(Vo) }), body: { fromAccount: "", profileItem: [{ tag: Je.NICK, value: "" }, { tag: Je.GENDER, value: "" }, { tag: Je.ALLOWTYPE, value: "" }, { tag: Je.AVATAR, value: "" }] }, keyMap: { request: { toAccount: "To_Account", standardSequence: "StandardSequence", customSequence: "CustomSequence" } } };
          }(e3)), this._configMap.set(Ho, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(Ho) }), body: { fromAccount: "", startIndex: 0, maxLimited: 30, lastSequence: 0 }, keyMap: { response: { CurruentSequence: "currentSequence" } } };
          }(e3)), this._configMap.set(Bo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(Bo) }), body: { fromAccount: "", toAccount: [] } };
          }(e3)), this._configMap.set(Ko, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(Ko) }), body: { fromAccount: "", toAccount: [] } };
          }(e3)), this._configMap.set(za, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_STATUS, ".").concat(za) }), body: { customStatus: "" }, keyMap: {} };
          }(e3)), this._configMap.set(Xa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_STATUS, ".").concat(Xa) }), body: { userIDList: void 0 }, keyMap: { response: { UserStatusList: "successUserList", ErrorList: "failureUserList", To_Account: "userID", Invalid_Account: "invalidUserID", Status: "statusType" } } };
          }(e3)), this._configMap.set(Qa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_STATUS, ".").concat(Qa) }), body: { userIDList: void 0 }, keyMap: { response: { ErrorList: "failureUserList", To_Account: "userID", Invalid_Account: "invalidUserID" } } };
          }(e3)), this._configMap.set(Za, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_STATUS, ".").concat(Za) }), body: { userIDList: void 0, unsubscribeAll: void 0 }, keyMap: { response: { ErrorList: "failureUserList", To_Account: "userID", Invalid_Account: "invalidUserID" } } };
          }(e3)), this._configMap.set(Wo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(Wo) }), body: { fromAccount: "", startIndex: 0, standardSequence: 0, customSequence: 0 }, keyMap: { response: { FriendNum: "friendCount", UserDataItem: "resultList", ValueItem: "tagValueList" } } };
          }(e3)), this._configMap.set(zo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(zo) }), body: { fromAccount: "", addFriendItem: [], type: "" }, keyMap: { request: { source: "AddSource", wording: "AddWording", type: "AddType" }, response: { ResultItem: "resultList" } } };
          }(e3)), this._configMap.set(Xo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(Xo) }), body: { fromAccount: "", updateItem: void 0 }, keyMap: { request: { snsItem: "SnsItem" }, response: { ResultItem: "resultList" } } };
          }(e3)), this._configMap.set(Jo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(Jo) }), body: { fromAccount: "", userIDList: [], type: "" }, keyMap: { request: { type: "DeleteType" }, response: { ResultItem: "resultList" } } };
          }(e3)), this._configMap.set(Yo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(Yo) }), body: { fromAccount: "", userIDList: void 0 }, keyMap: { response: { InfoItem: "resultList", SnsProfileItem: "tagValueList" } } };
          }(e3)), this._configMap.set(jo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(jo) }), body: { fromAccount: "", userIDList: [], type: "" }, keyMap: { request: { type: "CheckType" }, response: { InfoItem: "resultList" } } };
          }(e3)), this._configMap.set(Zo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(Zo) }), body: { fromAccount: "", applicationType: "", startTime: 0, maxLimited: 0, lastSequence: 0 }, keyMap: { response: { PendencyItem: "resultList", AddSource: "source", AddTime: "time", AddWording: "wording", Image: "avatar", UnreadPendencyCount: "unreadCount", To_Account: "userID", PendencyType: "type" } } };
          }(e3)), this._configMap.set(Qo, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(Qo) }), body: { fromAccount: "", responseFriendItem: [] }, keyMap: { request: { tag: "TagName", action: "ResponseAction" }, response: { ResultItem: "resultList" } } };
          }(e3)), this._configMap.set($o, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat($o) }), body: { fromAccount: "", type: "", userIDList: void 0 }, keyMap: { request: { type: "PendencyType", userIDList: "To_Account" }, response: { ResultItem: "resultList" } } };
          }(e3)), this._configMap.set(ei, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(ei) }), body: { fromAccount: "", latestTimeStamp: "" }, keyMap: { request: { latestTimeStamp: "LatestPendencyTimeStamp" } } };
          }(e3)), this._configMap.set(ni, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(ni) }), body: { fromAccount: "", groupName: void 0, userIDList: void 0 }, keyMap: { request: { groupName: "GroupName", userIDList: "To_Account" }, response: { ResultItem: "resultList" } } };
          }(e3)), this._configMap.set(oi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(oi) }), body: { fromAccount: "", nameList: void 0 }, keyMap: { request: { nameList: "GroupName" } } };
          }(e3)), this._configMap.set(ti, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(ti) }), body: { fromAccount: "", lastSequence: 0, needFriend: "Need_Friend_Type_Yes" }, keyMap: { response: { ResultItem: "resultList", GroupName: "name", FriendNumber: "friendCount", To_Account: "userIDList" } } };
          }(e3)), this._configMap.set(ii, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.FRIEND, ".").concat(ii) }), body: { fromAccount: "", oldName: "", newName: void 0, updateGroupItem: void 0 }, keyMap: { request: { oldName: "GroupOldName", newName: "GroupNewName" }, response: { UpdateType: "type", ResultItem: "resultList" } } };
          }(e3)), this._configMap.set(Oi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Oi) }), body: { memberAccount: "", limit: void 0, offset: void 0, groupType: void 0, responseFilter: { groupBaseInfoFilter: void 0, selfInfoFilter: void 0 }, isSupportTopic: 0 }, keyMap: { request: { memberAccount: "Member_Account" }, response: { GroupIdList: "groups", NoUnreadSeqList: "excludedUnreadSequenceList", MsgSeq: "readedSequence", LastRecallTime: "_lastRevokedTime" } } };
          }(e3)), this._configMap.set(Gi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Gi) }), body: { groupIDList: void 0, responseFilter: { groupBaseInfoFilter: void 0, groupCustomFieldFilter: void 0, memberInfoFilter: void 0, memberCustomFieldFilter: void 0 } }, keyMap: { request: { groupIDList: "GroupIdList", groupCustomField: "AppDefinedData", memberCustomField: "AppMemberDefinedData", groupCustomFieldFilter: "AppDefinedDataFilter_Group", memberCustomFieldFilter: "AppDefinedDataFilter_GroupMember" }, response: { GroupIdList: "groups", AppDefinedData: "groupCustomField", AppMemberDefinedData: "memberCustomField", AppDefinedDataFilter_Group: "groupCustomFieldFilter", AppDefinedDataFilter_GroupMember: "memberCustomFieldFilter", InfoSeq: "infoSequence", MemberList: "members", GroupInfo: "groups", ShutUpUntil: "muteUntil", ShutUpAllMember: "muteAllMembers" } } };
          }(e3)), this._configMap.set(Ui, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Ui) }), body: { type: void 0, name: void 0, groupID: void 0, ownerID: void 0, introduction: void 0, notification: void 0, maxMemberNum: void 0, joinOption: void 0, memberList: void 0, groupCustomField: void 0, memberCustomField: void 0, webPushFlag: 1, avatar: "", isSupportTopic: void 0, inviteOption: void 0 }, keyMap: { request: { ownerID: "Owner_Account", userID: "Member_Account", avatar: "FaceUrl", maxMemberNum: "MaxMemberCount", joinOption: "ApplyJoinOption", groupCustomField: "AppDefinedData", memberCustomField: "AppMemberDefinedData", inviteOption: "InviteJoinOption" }, response: { HugeGroupFlag: "avChatRoomFlag", OverJoinedGroupLimit_Account: "overLimitUserIDList" } } };
          }(e3)), this._configMap.set(Pi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Pi) }), body: { groupID: void 0 } };
          }(e3)), this._configMap.set(bi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(bi) }), body: { groupID: void 0, name: void 0, introduction: void 0, notification: void 0, avatar: void 0, joinOption: void 0, groupCustomField: void 0, muteAllMembers: void 0, inviteOption: void 0 }, keyMap: { request: { groupCustomField: "AppDefinedData", muteAllMembers: "ShutUpAllMember", joinOption: "ApplyJoinOption", avatar: "FaceUrl", inviteOption: "InviteJoinOption" }, response: { AppDefinedData: "groupCustomField", ShutUpAllMember: "muteAllMembers" } } };
          }(e3)), this._configMap.set(wi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(wi) }), body: { groupID: void 0, applyMessage: void 0, userDefinedField: void 0, webPushFlag: 1, historyMessageFlag: void 0 }, keyMap: { request: { applyMessage: "ApplyMsg", historyMessageFlag: "HugeGroupHistoryMsgFlag" }, response: { HugeGroupFlag: "avChatRoomFlag", AVChatRoomKey: "avChatRoomKey", RspMsgList: "messageList", ToGroupId: "to" } } };
          }(e3)), this._configMap.set(Fi, function(e4) {
            return e4.a2, e4.tinyid, { head: t(t({}, g(e4, Lc)), {}, { servcmd: "".concat(H.NAME.BIG_GROUP_NO_AUTH, ".").concat(wi) }), body: { groupID: void 0, applyMessage: void 0, userDefinedField: void 0, webPushFlag: 1 }, keyMap: { request: { applyMessage: "ApplyMsg" }, response: { HugeGroupFlag: "avChatRoomFlag" } } };
          }(e3)), this._configMap.set(qi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(qi) }), body: { groupID: void 0 } };
          }(e3)), this._configMap.set(xi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(xi) }), body: { groupIDList: void 0, responseFilter: { groupBasePublicInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "CreateTime", "Owner_Account", "LastInfoTime", "LastMsgTime", "NextMsgSeq", "MemberNum", "MaxMemberNum", "ApplyJoinOption", "InviteJoinOption"] } }, keyMap: { response: {} } };
          }(e3)), this._configMap.set(Vi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Vi) }), body: { groupID: void 0, newOwnerID: void 0 }, keyMap: { request: { newOwnerID: "NewOwner_Account" } } };
          }(e3)), this._configMap.set(Hi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Hi) }), body: { groupID: void 0, applicant: void 0, handleAction: void 0, handleMessage: void 0, authentication: void 0, messageKey: void 0, userDefinedField: void 0 }, keyMap: { request: { applicant: "Applicant_Account", handleAction: "HandleMsg", handleMessage: "ApprovalMsg", messageKey: "MsgKey" } } };
          }(e3)), this._configMap.set(Bi, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Bi) }), body: { groupID: void 0, applicant: void 0, invitee: void 0, handleAction: void 0, handleMessage: void 0, authentication: void 0, userDefinedField: void 0 }, keyMap: { request: { applicant: "Applicant_Account", invitee: "Invited_Account", handleAction: "HandleMsg", handleMessage: "ApprovalMsg" } } };
          }(e3)), this._configMap.set(Ki, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Ki) }), body: { groupID: void 0, inviter: void 0, handleAction: void 0, handleMessage: void 0, authentication: void 0, messageKey: void 0, userDefinedField: void 0 }, keyMap: { request: { inviter: "Inviter_Account", handleAction: "HandleMsg", handleMessage: "ApprovalMsg", messageKey: "MsgKey" } } };
          }(e3)), this._configMap.set($i, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat($i) }), body: { startTime: void 0, limit: void 0, handleAccount: void 0 }, keyMap: { request: { handleAccount: "Handle_Account" }, response: { To_Account: "userID", ApplyInviteMsg: "note" } } };
          }(e3)), this._configMap.set(ea, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(ea) }), body: { messageListToDelete: void 0 }, keyMap: { request: { messageListToDelete: "DelMsgList", messageSeq: "MsgSeq", messageRandom: "MsgRandom" } } };
          }(e3)), this._configMap.set(ta, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.BIG_GROUP_LONG_POLLING, ".").concat(ta) }), body: { USP: 1, startSeq: 1, startBroadcastSeq: void 0, holdTime: 90, key: void 0, simplifiedMessage: void 0 }, keyMap: { request: { USP: "USP" }, response: { ToGroupId: "groupID", RspBroadcastMsgList: "broadcastMessageList", IsSystemMsg: "isSystemMessage" } } };
          }(e3)), this._configMap.set(na, function(e4) {
            return e4.a2, e4.tinyid, { head: t(t({}, g(e4, Nc)), {}, { servcmd: "".concat(H.NAME.BIG_GROUP_LONG_POLLING_NO_AUTH, ".").concat(ta) }), body: { USP: 1, startSeq: 1, holdTime: 90, key: void 0, simplifiedMessage: void 0 }, keyMap: { request: { USP: "USP" }, response: { ToGroupId: "groupID", RspBroadcastMsgList: "broadcastMessageList", IsSystemMsg: "isSystemMessage" } } };
          }(e3)), this._configMap.set(oa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(oa) }), body: { groupID: void 0 }, keyMap: { response: { OnlineMemberNum: "memberCount" } } };
          }(e3)), this._configMap.set(sa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(sa) }), body: { groupID: void 0, groupAttributeList: void 0, mainSequence: void 0, avChatRoomKey: void 0, attributeControl: ["RaceConflict"] }, keyMap: { request: { key: "key", value: "value" } } };
          }(e3)), this._configMap.set(ra, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(ra) }), body: { groupID: void 0, groupAttributeList: void 0, mainSequence: void 0, avChatRoomKey: void 0, attributeControl: ["RaceConflict"] }, keyMap: { request: { key: "key", value: "value" } } };
          }(e3)), this._configMap.set(ca, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(ca) }), body: { groupID: void 0, groupAttributeList: void 0, mainSequence: void 0, avChatRoomKey: void 0, attributeControl: ["RaceConflict"] }, keyMap: { request: { key: "key" } } };
          }(e3)), this._configMap.set(ua, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(ua) }), body: { groupID: void 0, mainSequence: void 0, avChatRoomKey: void 0, attributeControl: ["RaceConflict"] } };
          }(e3)), this._configMap.set(la, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP_ATTR, ".").concat(la) }), body: { groupID: void 0, avChatRoomKey: void 0, groupType: 1 }, keyMap: { request: { avChatRoomKey: "Key", groupType: "GroupType" } } };
          }(e3)), this._configMap.set(ga, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(ga) }), body: { notifyReqList: [] }, keyMap: { request: { notifyReqList: "NotifyReqList" }, response: { NextMsgTime: "nextRevokedTime", NotifyMsgList: "notifyList", NotifyRspList: "notifyRspList" } } };
          }(e3)), this._configMap.set(ha, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(ha) }), body: { groupID: void 0, counterList: void 0, avChatRoomKey: void 0, mode: void 0 }, keyMap: { request: { counterList: "GroupCounter" } } };
          }(e3)), this._configMap.set(_a, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(_a) }), body: { groupID: void 0, keyList: [], avChatRoomKey: void 0 }, keyMap: { request: { keyList: "GroupCounterKeys" } } };
          }(e3)), this._configMap.set(Wa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP_COMMUNITY, ".").concat(Wa) }), body: { groupID: void 0, topicName: void 0, avatar: void 0, customData: void 0, topicID: void 0, notification: void 0, introduction: void 0 }, keyMap: { request: { avatar: "FaceUrl" } } };
          }(e3)), this._configMap.set(Ya, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP_COMMUNITY, ".").concat(Ya) }), body: { groupID: void 0, topicIDList: void 0 }, keyMap: { request: { topicIDList: "TopicIdList" }, response: { DestroyResultItem: "resultList" } } };
          }(e3)), this._configMap.set(ja, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP_COMMUNITY, ".").concat(ja) }), body: { groupID: void 0, topicID: void 0, avatar: void 0, customData: void 0, notification: void 0, introduction: void 0, muteAllMembers: void 0, topicName: void 0 }, keyMap: { request: { avatar: "FaceUrl", muteAllMembers: "ShutUpAllMember" } } };
          }(e3)), this._configMap.set(Ja, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP_COMMUNITY, ".").concat(Ja) }), body: { groupID: void 0, topicIDList: void 0, MemberInfoFilter: ["NoUnreadSeqList"] }, keyMap: { request: { topicIDList: "TopicIdList" }, response: { TopicAndSelfInfo: "topicInfoList", TopicInfo: "topic", GroupID: "groupID", ShutUpTime: "muteTime", ShutUpAllFlag: "muteAllMembers", LastMsgTime: "lastMessageTime", MsgSeq: "readedSequence", LastMsgSeq: "sequence", NoUnreadSeqList: "excludedUnreadSequenceList" } } };
          }(e3)), this._configMap.set(ya, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(ya) }), body: { groupID: void 0, limit: 0, offset: void 0, next: void 0, memberRoleFilter: void 0, memberInfoFilter: void 0, memberCustomFieldFilter: void 0 }, keyMap: { request: { memberCustomFieldFilter: "AppDefinedDataFilter_GroupMember" }, response: { AppMemberDefinedData: "memberCustomField", AppDefinedDataFilter_GroupMember: "memberCustomFieldFilter", MemberList: "members", ShutUpUntil: "muteUntil" } } };
          }(e3)), this._configMap.set(Ia, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP_AVCHATROOM, ".").concat(Ia) }), body: { groupID: void 0, offset: void 0, filter: void 0 }, keyMap: { request: { offset: "Timestamp", filter: "Mark" }, response: { NextTimestamp: "offset" } } };
          }(e3)), this._configMap.set(Ca, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Ca) }), body: { groupID: void 0, userIDList: void 0, memberInfoFilter: void 0, memberCustomFieldFilter: void 0 }, keyMap: { request: { userIDList: "Member_List_Account", memberCustomFieldFilter: "AppDefinedDataFilter_GroupMember" }, response: { MemberList: "members", ShutUpUntil: "muteUntil", AppDefinedDataFilter_GroupMember: "memberCustomFieldFilter", AppMemberDefinedData: "memberCustomField" } } };
          }(e3)), this._configMap.set(Da, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Da) }), body: { groupID: void 0, silence: void 0, userIDList: void 0 }, keyMap: { request: { userID: "Member_Account", userIDList: "MemberList" }, response: { MemberList: "members" } } };
          }(e3)), this._configMap.set(Ta, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(Ta) }), body: { groupID: void 0, userIDList: void 0, reason: void 0 }, keyMap: { request: { userIDList: "MemberToDel_Account" } } };
          }(e3)), this._configMap.set(ka, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(ka) }), body: { groupID: void 0, userIDList: void 0, duration: void 0, reason: "" }, keyMap: { request: { userIDList: "Members_Account", duration: "Duration", reason: "Description" } } };
          }(e3)), this._configMap.set(La, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP, ".").concat(La) }), body: { groupID: void 0, topicID: void 0, userID: void 0, messageRemindType: void 0, nameCard: void 0, role: void 0, memberCustomField: void 0, muteTime: void 0 }, keyMap: { request: { userID: "Member_Account", memberCustomField: "AppMemberDefinedData", muteTime: "ShutUpTime", messageRemindType: "MsgFlag" } } };
          }(e3)), this._configMap.set(Na, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.GROUP_AVCHATROOM, ".").concat(Na) }), body: { groupID: void 0, operationType: 1, memberList: [] }, keyMap: { request: { operationType: "CommandType", memberList: "MemberList", markType: "Marks", userID: "Member_Account" }, response: { CommandType: "operationType", Marks: "markType", Member_Account: "userID" } } };
          }(e3)), this._configMap.set(Ra, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_STAT, ".").concat(Ra) }), body: { header: {}, event: [], quality: [] }, keyMap: { request: { SDKType: "sdk_type", SDKVersion: "sdk_version", deviceType: "device_type", platform: "platform", instanceID: "instance_id", traceID: "trace_id", SDKAppID: "sdk_app_id", userID: "user_id", tinyID: "tiny_id", extension: "extension", timestamp: "timestamp", networkType: "network_type", eventType: "event_type", code: "error_code", message: "error_message", moreMessage: "more_message", duplicate: "duplicate", costTime: "cost_time", level: "level", qualityType: "quality_type", reportIndex: "report_index", wholePeriod: "whole_period", totalCount: "total_count", rttCount: "success_count_business", successRateOfRequest: "percent_business", countLessThan1Second: "success_count_business", percentOfCountLessThan1Second: "percent_business", countLessThan3Second: "success_count_platform", percentOfCountLessThan3Second: "percent_platform", successCountOfBusiness: "success_count_business", successRateOfBusiness: "percent_business", successCountOfPlatform: "success_count_platform", successRateOfPlatform: "percent_platform", successCountOfMessageReceived: "success_count_business", successRateOfMessageReceived: "percent_business", avgRTT: "average_value", avgDelay: "average_value", avgValue: "average_value", uiPlatform: "ui_platform" } } };
          }(o2)), this._configMap.set(Oa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.HEARTBEAT, ".").concat(Oa) }), body: {} };
          }(e3)), this._configMap.set(Ga, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_PUSH, ".").concat(Ga) }), body: {}, keyMap: { response: { C2cMsgArray: "C2CMessageArray", GroupMsgArray: "groupMessageArray", GroupTips: "groupTips", C2cNotifyMsgArray: "C2CNotifyMessageArray", C2cMsgInfo: "C2CReadReceiptArray", ClientSeq: "clientSequence", MsgPriority: "priority", NoticeSeq: "noticeSequence", MsgContent: "content", MsgType: "type", MsgBody: "elements", ToGroupId: "to", Desc: "description", Ext: "extension", IsSyncMsg: "isSyncMessage", Flag: "needSync", NeedAck: "needAck", PendencyAdd_Account: "userID", ProfileImNick: "nick", PendencyType: "applicationType", C2CReadAllMsg: "readAllC2CMessage", IsNeedReadReceipt: "needReadReceipt", Status: "statusType" } } };
          }(e3)), this._configMap.set(Pa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_PUSH, ".").concat(Pa) }), body: {}, keyMap: { response: { GroupMsgArray: "groupMessageArray", GroupTips: "groupTips", ClientSeq: "clientSequence", MsgPriority: "priority", NoticeSeq: "noticeSequence", MsgContent: "content", MsgType: "type", MsgBody: "elements", ToGroupId: "to", Desc: "description", Ext: "extension", IsSyncMsg: "isSyncMessage", Flag: "needSync", NeedAck: "needAck", PendencyType: "applicationType" } } };
          }(e3)), this._configMap.set(ba, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.OPEN_IM, ".").concat(ba) }), body: { sessionData: void 0 }, keyMap: { request: { sessionData: "SessionData" } } };
          }(e3)), this._configMap.set(wa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_STATUS, ".").concat(wa) }), body: {}, keyMap: { response: { C2cNotifyMsgArray: "C2CNotifyMessageArray", NoticeSeq: "noticeSequence", KickoutMsgNotify: "kickoutMsgNotify", NewInstInfo: "newInstanceInfo" } } };
          }(e3)), this._configMap.set(qa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_LONG_MESSAGE, ".").concat(qa) }), body: { downloadKey: "" }, keyMap: { response: { Data: "data", Desc: "description", Ext: "extension", Download_Flag: "downloadFlag", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID" } } };
          }(e3)), this._configMap.set(Fa, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_LONG_MESSAGE, ".").concat(Fa) }), body: { messageList: [] }, keyMap: { request: { fromAccount: "From_Account", toAccount: "To_Account", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom", msgBody: "MsgBody", type: "MsgType", content: "MsgContent", data: "Data", description: "Desc", extension: "Ext", sizeType: "Type", uuid: "UUID", url: "", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag", from: "From_Account", time: "MsgTimeStamp", messageRandom: "MsgRandom", messageSequence: "MsgSeq", elements: "MsgBody", clientSequence: "ClientSeq", payload: "MsgContent", messageList: "MsgList", messageNumber: "MsgNum", abstractList: "AbstractList", messageBody: "MsgBody" } } };
          }(e3)), this._configMap.set(ts, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_STATUS, ".").concat(ts) }), body: { tokenID: "", pushMsg: 0, sdkAppID: 0, businessID: "", deviceBrand: "", deviceToken: "", isTpns: 0, isWebUniapp: 0 }, keyMap: { request: { tokenID: "TokenID", pushMsg: "PushMsg", sdkAppID: "EnterVersion", businessID: "BusiID", deviceBrand: "InstType", deviceToken: "VarToken", isTpns: "IsTpns" } } };
          }(e3)), this._configMap.set(es, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_STATUS, ".").concat(es) }), body: { isWebUniapp: 0 } };
          }(e3)), this._configMap.set($a, function(e4) {
            return { head: t(t({}, e4), {}, { servcmd: "".concat(H.NAME.IM_OPEN_STATUS, ".").concat($a) }), body: { C2CUnread: 0, GroupUnread: 0, isWebUniapp: 0 }, keyMap: { request: { c2cUnreadCount: "C2cUnread", groupUnreadCount: "GrpUnread" } } };
          }(e3));
        } }, { key: "has", value: function(e3) {
          return this._configMap.has(e3);
        } }, { key: "get", value: function(e3) {
          return this._configMap.get(e3);
        } }, { key: "update", value: function() {
          this._fillConfigMap();
        } }, { key: "getKeyMap", value: function(e3) {
          return this.has(e3) ? this.get(e3).keyMap || {} : (Ye.w("".concat(this._n, ".getKeyMap unknown protocolName:").concat(e3)), {});
        } }, { key: "getProtocolData", value: function(e3) {
          var t2 = e3.protocolName, n2 = e3.requestData, o2 = this.get(t2), i2 = null;
          if (n2) {
            var a2 = this._simpleDeepCopy(o2), s2 = this._updateService(n2, a2), r2 = s2.body, c2 = /* @__PURE__ */ Object.create(null);
            for (var u2 in r2)
              if (Object.prototype.hasOwnProperty.call(r2, u2)) {
                if (c2[u2] = r2[u2], void 0 === n2[u2])
                  continue;
                c2[u2] = n2[u2];
              }
            s2.body = c2, i2 = this._getUplinkData(s2);
          } else
            i2 = this._getUplinkData(o2);
          return i2;
        } }, { key: "_getUplinkData", value: function(e3) {
          var t2 = this._requestDataCleaner(e3), n2 = jt(t2.head), o2 = lc(t2.body, this._getRequestKeyMap(n2));
          return t2.body = o2, t2;
        } }, { key: "_updateService", value: function(e3, t2) {
          var n2 = jt(t2.head);
          if (this._isFromGroupRequest(t2)) {
            var o2 = e3.type, i2 = e3.groupID, a2 = void 0 === i2 ? void 0 : i2, s2 = e3.groupIDList, r2 = void 0 === s2 ? [] : s2;
            ft(a2) && (a2 = r2[0] || ""), Pt({ type: o2, groupID: a2 }) && (t2.head.servcmd = "".concat(H.NAME.GROUP_COMMUNITY, ".").concat(n2));
          }
          return t2;
        } }, { key: "_isFromGroupRequest", value: function(e3) {
          return e3.head.servcmd.includes(H.NAME.GROUP) || e3.head.servcmd.includes(H.NAME.GROUP_ATTR);
        } }, { key: "_getRequestKeyMap", value: function(e3) {
          var n2 = this.getKeyMap(e3);
          return t(t({}, rc.request), n2.request);
        } }, { key: "_requestDataCleaner", value: function(e3) {
          var t2 = Array.isArray(e3) ? [] : /* @__PURE__ */ Object.create(null);
          for (var o2 in e3)
            Object.prototype.hasOwnProperty.call(e3, o2) && Ct(o2) && null !== e3[o2] && void 0 !== e3[o2] && ("object" !== n(e3[o2]) ? t2[o2] = e3[o2] : t2[o2] = this._requestDataCleaner.bind(this)(e3[o2]));
          return t2;
        } }, { key: "_simpleDeepCopy", value: function(e3) {
          for (var t2, n2 = Object.keys(e3), o2 = {}, i2 = 0, a2 = n2.length; i2 < a2; i2++)
            t2 = n2[i2], _t(e3[t2]) ? o2[t2] = Array.from(e3[t2]) : gt(e3[t2]) ? o2[t2] = this._simpleDeepCopy(e3[t2]) : o2[t2] = e3[t2];
          return o2;
        } }]), e2;
      }(), Ac = [ba], Ec = function() {
        function e2(t2) {
          o(this, e2), this._sessionModule = t2, this._n = "DownlinkHandler", this._eventHandlerMap = /* @__PURE__ */ new Map(), this._eventHandlerMap.set("C2CMessageArray", this._c2cMessageArrayHandler.bind(this)), this._eventHandlerMap.set("groupMessageArray", this._groupMessageArrayHandler.bind(this)), this._eventHandlerMap.set("groupTips", this._groupTipsHandler.bind(this)), this._eventHandlerMap.set("C2CNotifyMessageArray", this._C2CNotifyMessageArrayHandler.bind(this)), this._eventHandlerMap.set("C2CReadReceiptArray", this._C2CReadReceiptArrayHandler.bind(this)), this._eventHandlerMap.set("profileModify", this._profileHandler.bind(this)), this._eventHandlerMap.set("friendListMod", this._relationChainHandler.bind(this)), this._eventHandlerMap.set("recentContactMod", this._recentContactHandler.bind(this)), this._eventHandlerMap.set("readAllC2CMessage", this._allMessageReadHandler.bind(this)), this._eventHandlerMap.set("c2cMessageModified", this._c2cMessageModifiedHandler.bind(this)), this._eventHandlerMap.set("groupMessageModified", this._groupMessageModifiedHandler.bind(this)), this._eventHandlerMap.set("userStatusList", this._userStatusListHandler.bind(this)), this._eventHandlerMap.set("messageExtensionNotify", this._messageExtensionNotifyHandler.bind(this)), this._eventHandlerMap.set("messageReactionNotifyList", this._messageReactionNotifyListHandler.bind(this)), this._keys = m(this._eventHandlerMap.keys());
        }
        return a(e2, [{ key: "_c2cMessageArrayHandler", value: function(e3) {
          var t2 = this._sessionModule.getModule(Qn);
          if (t2) {
            if (e3.dataList.forEach(function(e4) {
              if (1 === e4.isSyncMessage) {
                var t3 = e4.from;
                e4.from = e4.to, e4.to = t3;
              }
            }), 1 === e3.needSync)
              this._sessionModule.getModule(co).startOnlineSync();
            t2.onNewC2CMessage({ dataList: e3.dataList, isInstantMessage: true });
          }
        } }, { key: "_c2cMessageModifiedHandler", value: function(e3) {
          var t2 = this._sessionModule.getModule(Qn);
          t2 && t2.onC2CMessageModified(e3);
        } }, { key: "_groupMessageArrayHandler", value: function(e3) {
          var t2 = this._sessionModule.getModule(Zn);
          t2 && t2.onNewGroupMessage({ event: e3.event, dataList: e3.dataList, isInstantMessage: true });
        } }, { key: "_groupMessageModifiedHandler", value: function(e3) {
          var t2 = this._sessionModule.getModule(Zn);
          t2 && t2.onGroupMessageModified(e3);
        } }, { key: "_groupTipsHandler", value: function(e3) {
          var t2 = this._sessionModule.getModule(Zn);
          if (t2) {
            var n2 = e3.event, o2 = e3.dataList, i2 = e3.isInstantMessage, a2 = void 0 === i2 || i2, s2 = e3.isSyncingEnded;
            switch (n2) {
              case 4:
              case 6:
                t2.onNewGroupTips({ event: n2, dataList: o2 });
                break;
              case 5:
                for (var r2 = 0; r2 < o2.length; r2++)
                  if (_t(o2[r2].elements.revokedInfos))
                    t2.onGroupMessageRevoked({ dataList: o2 });
                  else if (_t(o2[r2].elements.groupMessageReadNotice))
                    t2.onGroupMessageReadNotice({ dataList: o2 });
                  else {
                    if (!_t(o2[r2].elements.readReceiptList)) {
                      t2.onNewGroupSystemNotice({ dataList: o2, isInstantMessage: a2, isSyncingEnded: s2 });
                      break;
                    }
                    t2.onReadReceiptList({ dataList: o2 });
                  }
                break;
              case 12:
                this._sessionModule.getModule(to).onNewGroupAtTips({ dataList: o2 });
                break;
              default:
                Ye.l("".concat(this._n, "._groupTipsHandler unknown event:").concat(n2, " dataList:"), o2);
            }
          }
        } }, { key: "_C2CNotifyMessageArrayHandler", value: function(e3) {
          var t2 = this, n2 = e3.dataList;
          if (_t(n2)) {
            var o2 = this._sessionModule.getModule(Qn);
            n2.forEach(function(e4) {
              if (ht(e4)) {
                if (e4.hasOwnProperty("kickoutMsgNotify")) {
                  var i2 = e4.kickoutMsgNotify, a2 = i2.kickType, s2 = i2.newInstanceInfo, r2 = void 0 === s2 ? {} : s2;
                  1 === a2 ? t2._sessionModule.onMultipleAccountKickedOut(r2) : 2 === a2 ? t2._sessionModule.onMultipleDeviceKickedOut(r2) : 3 === a2 && t2._sessionModule.onRestApiKickedOut(r2);
                } else if (e4.hasOwnProperty("c2cMessageRevokedNotify"))
                  o2 && o2.onC2CMessageRevoked({ dataList: n2 });
                else if (e4.hasOwnProperty("c2cMessageReadReceipt"))
                  o2 && o2.onC2CMessageReadReceipt({ dataList: n2 });
                else if (e4.hasOwnProperty("c2cMessageReadNotice"))
                  o2 && o2.onC2CMessageReadNotice({ dataList: n2 });
                else if (e4.hasOwnProperty("muteNotificationsSync")) {
                  t2._sessionModule.getModule(to).onC2CMessageRemindTypeSynced({ dataList: n2 });
                }
              }
            });
          }
        } }, { key: "_C2CReadReceiptArrayHandler", value: function(e3) {
          this._sessionModule.getModule(Qn).onReadReceiptList(e3);
        } }, { key: "_profileHandler", value: function(e3) {
          this._sessionModule.getModule(Xn).onProfileModified({ dataList: e3.dataList });
          var t2 = this._sessionModule.getModule($n);
          t2 && t2.onFriendProfileModified({ dataList: e3.dataList });
        } }, { key: "_relationChainHandler", value: function(e3) {
          this._sessionModule.getModule(Xn).onRelationChainModified({ dataList: e3.dataList });
          var t2 = this._sessionModule.getModule($n);
          t2 && t2.onRelationChainModified({ dataList: e3.dataList });
        } }, { key: "_recentContactHandler", value: function(e3) {
          var t2 = e3.dataList;
          if (_t(t2)) {
            var n2 = this._sessionModule.getModule(to);
            n2 && t2.forEach(function(e4) {
              var t3 = e4.pushType;
              if (1 === t3) {
                var o2 = e4.recentContactDeleteItem;
                n2.onConversationDeleted(o2.recentContactList);
              } else if (2 === t3) {
                var i2 = e4.recentContactTopItem;
                n2.onConversationPinned(i2.recentContactList);
              } else if (3 === t3) {
                var a2 = e4.recentContactTopItem;
                n2.onConversationUnpinned(a2.recentContactList);
              } else if (4 === t3) {
                var s2 = e4.recentContactMarkContact;
                n2.onConversationMarkUpdated(s2.recentContactMarkContactItem);
              } else if (5 === t3) {
                var r2 = e4.recentContactCreateContactGroup;
                n2.onConversationGroupCreated(r2.msgContactGroupContactItem);
              } else if (6 === t3) {
                var c2 = e4.recentContactDelContactGroup;
                n2.onConversationGroupDeleted(c2.msgGroupItem);
              } else if (7 === t3) {
                var u2 = e4.recentContactUpdateContactGroup, l2 = u2.updateType, d2 = u2.msgUpdateGroup, p2 = u2.msgUpdateContact;
                if (1 === l2) {
                  var g2 = d2.updateGroupType;
                  1 === g2 ? n2.onConversationGroupNameUpdated(d2) : 2 === g2 && n2.onConversationInGroupUpdated(d2);
                } else
                  2 === l2 && n2.onConversationAddedToOrDeletedFromGroup(p2);
              }
            });
          }
        } }, { key: "_allMessageReadHandler", value: function(e3) {
          var t2 = e3.dataList, n2 = this._sessionModule.getModule(to);
          n2 && n2.onPushedAllMessageRead(t2);
        } }, { key: "_userStatusListHandler", value: function(e3) {
          this._sessionModule.getModule(Xn).onUserStatusUpdated(e3);
        } }, { key: "_messageExtensionNotifyHandler", value: function(e3) {
          this._sessionModule.getModule(zn).onMessageExtensionNotify(e3);
        } }, { key: "_messageReactionNotifyListHandler", value: function(e3) {
          this._sessionModule.getModule(To).onMessageReactionNotify(e3);
        } }, { key: "onMessage", value: function(e3) {
          var t2 = this, n2 = e3.body;
          if (this._filterMessageFromIMOpenPush(e3)) {
            var o2 = n2.eventArray, i2 = n2.isInstantMessage, a2 = n2.isSyncingEnded, s2 = n2.needSync;
            if (_t(o2))
              for (var r2 = null, c2 = null, u2 = 0, l2 = 0, d2 = o2.length; l2 < d2; l2++) {
                u2 = (r2 = o2[l2]).event;
                var p2 = Object.keys(r2).find(function(e4) {
                  return -1 !== t2._keys.indexOf(e4);
                });
                p2 ? (c2 = 14 === u2 ? { readAllC2CMessage: r2[p2], groupMessageReadInfoList: r2.groupMessageReadNotice || [] } : 16 === u2 ? { userID: r2.userID, readReceiptList: r2[p2] } : r2[p2], this._eventHandlerMap.get(p2)({ event: u2, dataList: c2, isInstantMessage: i2, isSyncingEnded: a2, needSync: s2 })) : Ye.l("".concat(this._n, ".onMessage unknown eventItem:").concat(r2));
              }
          }
        } }, { key: "_filterMessageFromIMOpenPush", value: function(e3) {
          var t2 = e3.head, n2 = e3.body, o2 = t2.servcmd, i2 = false;
          if (ft(o2) || (i2 = o2.includes(H.NAME.IM_CONFIG_MANAGER) || o2.includes(H.NAME.OVERLOAD_PUSH) || o2.includes(H.NAME.STAT_SERVICE)), !i2)
            return true;
          if (o2.includes(Va))
            this._sessionModule.getModule(go).onPushedCloudControlConfig(n2);
          else if (o2.includes(Ba)) {
            this._sessionModule.getModule(vo).onPushedConfig(n2);
          } else if (o2.includes(Ka))
            this._sessionModule.onPushedServerOverload(n2);
          else if (o2.includes(bo)) {
            var a2 = Date.now();
            this._sessionModule.reLoginOnKickOther();
            var s2 = new Ms("kickOther"), r2 = this._sessionModule.getModule(jn).getLastWsHelloTs(), c2 = a2 - r2;
            s2.setMessage("last wshello time:".concat(r2, " diff:").concat(c2, "ms")).setNetworkType(this._sessionModule.getNetworkType()).end();
          }
          return false;
        } }]), e2;
      }(), Rc = [{ cmd: Gi, interval: 1, count: 20 }, { cmd: Ia, interval: 3, count: 1 }, { cmd: $i, interval: 1, count: 15 }, { cmd: Ja, interval: 1, count: 10 }, { cmd: sa, interval: 5, count: 10 }, { cmd: ra, interval: 5, count: 10 }, { cmd: ca, interval: 5, count: 10 }, { cmd: ua, interval: 5, count: 10 }, { cmd: la, interval: 5, count: 20 }, { cmd: ha, interval: 5, count: 20 }, { cmd: _a, interval: 5, count: 20 }, { cmd: ji, interval: 1, count: 1 }, { cmd: Xa, interval: 5, count: 20 }, { cmd: Qa, interval: 5, count: 20 }, { cmd: Za, interval: 5, count: 20 }, { cmd: Ua, interval: 1, count: 2 }], Oc = function(e2) {
        r(i2, e2);
        var n2 = f(i2);
        function i2(e3) {
          var t2;
          return o(this, i2), (t2 = n2.call(this, e3))._n = "SessionModule", t2._platform = t2.getPlatform(), t2._protocolHandler = new Sc(h(t2)), t2._messageDispatcher = new Ec(h(t2)), t2._commandFrequencyLimitMap = /* @__PURE__ */ new Map(), t2._commandRequestInfoMap = /* @__PURE__ */ new Map(), t2._serverOverloadInfoMap = /* @__PURE__ */ new Map(), t2._init(), t2.getInnerEmitterInstance().on(Fs.CLOUD_CONFIG_UPDATED, t2._onCloudConfigUpdated, h(t2)), t2;
        }
        return a(i2, [{ key: "_init", value: function() {
          this._updateCommandFrequencyLimitMap(Rc);
        } }, { key: "_onCloudConfigUpdated", value: function() {
          var e3 = this.getCloudConfig("cmd_frequency_limit");
          ft(e3) || (e3 = JSON.parse(e3), this._updateCommandFrequencyLimitMap(e3));
        } }, { key: "_updateCommandFrequencyLimitMap", value: function(e3) {
          var t2 = this;
          e3.forEach(function(e4) {
            t2._commandFrequencyLimitMap.set(e4.cmd, { interval: e4.interval, count: e4.count });
          });
        } }, { key: "updateProtocolConfig", value: function() {
          this._protocolHandler.update();
        } }, { key: "request", value: function(e3) {
          Ye.d("".concat(this._n, ".request options:"), e3);
          var t2 = e3.protocolName, n3 = e3.tjgID;
          if (!this._protocolHandler.has(t2))
            return Ye.w("".concat(this._n, ".request unknown protocol:").concat(t2)), Ro({ code: No.CANNOT_FIND_PROTOCOL });
          var o2 = this.getProtocolData(e3), i3 = o2.head.servcmd;
          if (this._isFrequencyOverLimit(i3))
            return Ro({ code: No.OVER_FREQUENCY_LIMIT });
          if (this._isServerOverload(i3))
            return Ro({ code: No.OPEN_SERVICE_OVERLOAD_ERROR });
          un(n3) || (o2.head.tjgID = n3);
          var a2 = this.getModule(lo);
          return Ac.includes(t2) ? a2.simplySend(o2) : a2.send(o2);
        } }, { key: "getKeyMap", value: function(e3) {
          return this._protocolHandler.getKeyMap(e3);
        } }, { key: "genCommonHead", value: function() {
          var e3 = this.getModule(no);
          return { ver: "v4", platform: this._platform, websdkappid: G, websdkversion: O, a2: e3.getA2Key() || void 0, tinyid: e3.getTinyID() || void 0, status_instid: e3.getStatusInstanceID(), sdkappid: e3.getSDKAppID(), contenttype: e3.getContentType(), reqtime: 0, identifier: e3.getA2Key() ? void 0 : e3.getUserID(), usersig: e3.getA2Key() ? void 0 : e3.getUserSig(), sdkability: 192371, tjgID: "" };
        } }, { key: "genCosSpecifiedHead", value: function() {
          var e3 = this.getModule(no);
          return { ver: "v4", platform: this._platform, websdkappid: G, websdkversion: O, sdkappid: e3.getSDKAppID(), contenttype: e3.getContentType(), reqtime: 0, identifier: e3.getUserID(), usersig: e3.getUserSig(), status_instid: e3.getStatusInstanceID(), sdkability: 192371 };
        } }, { key: "genSSOReportHead", value: function() {
          var e3 = this.getModule(no);
          return { ver: "v4", platform: this._platform, websdkappid: G, websdkversion: O, sdkappid: e3.getSDKAppID(), contenttype: "", reqtime: 0, identifier: "", usersig: "", status_instid: e3.getStatusInstanceID(), sdkability: 192371 };
        } }, { key: "getProtocolData", value: function(e3) {
          return this._protocolHandler.getProtocolData(e3);
        } }, { key: "trans", value: function(e3) {
          var n3 = e3.servcmd, o2 = e3.data, i3 = { head: t(t({}, this.genCommonHead()), {}, { servcmd: n3 }), body: o2 };
          return this.getModule(lo).send(i3);
        } }, { key: "sendComboMessage", value: function(e3) {
          var n3 = e3.servcmd, o2 = e3.data, i3 = { head: t(t({}, this.genCommonHead()), {}, { servcmd: n3 }), body: o2 };
          return this.getModule(lo).send(i3);
        } }, { key: "onErrorCodeNotZero", value: function(e3) {
          var t2 = e3.errorCode;
          if (t2 === No.HELLO_ANSWER_KICKED_OUT) {
            var n3 = e3.kickType, o2 = e3.newInstanceInfo, i3 = void 0 === o2 ? {} : o2;
            1 === n3 ? this.onMultipleAccountKickedOut(i3) : 2 === n3 ? this.onMultipleDeviceKickedOut(i3) : 3 === n3 && this.onRestApiKickedOut(i3);
          }
          t2 !== No.MSG_A2KEY_EXPIRED && t2 !== No.ACCOUNT_A2KEY_EXPIRED || (this._onUserSigExpired(), this.getModule(lo).reConnect());
        } }, { key: "onMessage", value: function(e3) {
          var t2 = e3.body, n3 = t2.needAck, o2 = void 0 === n3 ? 0 : n3, i3 = t2.sessionData;
          1 === o2 && this._sendACK(i3), this._messageDispatcher.onMessage(e3);
        } }, { key: "onReconnected", value: function() {
          this._reLoginOnReconnected();
        } }, { key: "reLoginOnKickOther", value: function() {
          Ye.l("".concat(this._n, ".reLoginOnKickOther")), this._reLogin();
        } }, { key: "_reLoginOnReconnected", value: function() {
          Ye.l("".concat(this._n, "._reLoginOnReconnected")), this._reLogin();
        } }, { key: "_reLogin", value: function() {
          var e3 = this;
          if (this.isLoggedIn()) {
            var t2 = 0, n3 = this.getModule(mo);
            n3.canIUseOfflinePush() && (t2 = n3.getUniAppPlatform()), this.request({ protocolName: Go, requestData: { isWebUniapp: t2 } }).then(function(t3) {
              var n4 = t3.data.instanceID;
              e3.getModule(no).setStatusInstanceID(n4), Ye.l("".concat(e3._n, "._reLogin ok. instanceID:").concat(n4)), e3.getModule(to).syncConversationList().then(function() {
                Ye.l("".concat(e3._n, "._reLogin, sync conversation list ok.")), e3.getModule(_o).start();
              });
              var o2 = e3.getModule(Zn);
              o2 && o2.updateLocalMainSequenceOnReconnected();
              var i3 = e3.getModule(eo);
              i3.resetGetTopicTime(), i3.getTopicListOnReconnected();
            });
          }
        } }, { key: "onMultipleAccountKickedOut", value: function(e3) {
          this.getModule(jn).onMultipleAccountKickedOut(e3);
        } }, { key: "onMultipleDeviceKickedOut", value: function(e3) {
          this.getModule(jn).onMultipleDeviceKickedOut(e3);
        } }, { key: "_onUserSigExpired", value: function() {
          this.getModule(jn).onUserSigExpired();
        } }, { key: "onRestApiKickedOut", value: function(e3) {
          this.getModule(jn).onRestApiKickedOut(e3);
        } }, { key: "_sendACK", value: function(e3) {
          this.request({ protocolName: ba, requestData: { sessionData: e3 } });
        } }, { key: "_isFrequencyOverLimit", value: function(e3) {
          var t2 = e3.split(".")[1];
          if (!this._commandFrequencyLimitMap.has(t2))
            return false;
          if (!this._commandRequestInfoMap.has(t2))
            return this._commandRequestInfoMap.set(t2, { startTime: Date.now(), requestCount: 1 }), false;
          var n3 = this._commandFrequencyLimitMap.get(t2), o2 = n3.count, i3 = n3.interval, a2 = this._commandRequestInfoMap.get(t2), s2 = a2.startTime, r2 = a2.requestCount;
          if (Date.now() - s2 > 1e3 * i3)
            return this._commandRequestInfoMap.set(t2, { startTime: Date.now(), requestCount: 1 }), false;
          r2 += 1, this._commandRequestInfoMap.set(t2, { startTime: s2, requestCount: r2 });
          var c2 = false;
          return r2 > o2 && (c2 = true), c2;
        } }, { key: "_isServerOverload", value: function(e3) {
          if (!this._serverOverloadInfoMap.has(e3))
            return false;
          var t2 = this._serverOverloadInfoMap.get(e3), n3 = t2.overloadTime, o2 = t2.waitingTime, i3 = false;
          return Date.now() - n3 <= 1e3 * o2 ? i3 = true : (this._serverOverloadInfoMap.delete(e3), i3 = false), i3;
        } }, { key: "onPushedServerOverload", value: function(e3) {
          var t2 = e3.overloadCommand, n3 = e3.waitingTime;
          this._serverOverloadInfoMap.set(t2, { overloadTime: Date.now(), waitingTime: n3 }), Ye.w("".concat(this._n, ".onPushedServerOverload waitingTime:").concat(n3, "s"));
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._updateCommandFrequencyLimitMap(Rc), this._commandRequestInfoMap.clear(), this._serverOverloadInfoMap.clear();
        } }]), i2;
      }(Oo), Gc = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          return o(this, n2), (i2 = t2.call(this, e3))._n = "MessageLossDetectionModule", i2._maybeLostSequencesMap = /* @__PURE__ */ new Map(), i2._firstRoundRet = [], i2;
        }
        return a(n2, [{ key: "onMessageMaybeLost", value: function(e3, t3, n3) {
          this._maybeLostSequencesMap.has(e3) || this._maybeLostSequencesMap.set(e3, []);
          for (var o2 = this._maybeLostSequencesMap.get(e3), i2 = 0; i2 < n3; i2++)
            -1 === o2.indexOf(t3 + i2) && o2.push(t3 + i2);
        } }, { key: "detectFirstRound", value: function(e3, t3) {
          var n3 = this._maybeLostSequencesMap.get(e3);
          if (!un(n3) && !un(t3)) {
            var o2 = n3.filter(function(e4) {
              return -1 === t3.indexOf(e4);
            });
            0 === o2.length ? Ye.i("".concat(this._n, ".detectFirstRound no message loss. conversationID:").concat(e3)) : this._firstRoundRet = this._firstRoundRet.concat(o2), n3.length = 0;
          }
        } }, { key: "detectSecondRound", value: function(e3, t3) {
          if (!un(this._firstRoundRet) && !un(t3)) {
            var n3 = this._firstRoundRet.filter(function(e4) {
              return -1 === t3.indexOf(e4);
            });
            this._firstRoundRet.length = 0;
            var o2, i2 = n3.length;
            if (0 !== i2)
              i2 <= 5 ? o2 = e3 + "-" + n3.join("-") : (n3.sort(function(e4, t4) {
                return e4 - t4;
              }), o2 = e3 + " start:" + n3[0] + " end:" + n3[i2 - 1] + " count:" + i2), new Ms("messageLoss").setMessage(o2).setNetworkType(this.getNetworkType()).setLevel("warning").end(), Ye.i("".concat(this._n, ".detectSecondRound message loss detected. conversationID:").concat(e3, " lostSequences:").concat(n3));
          }
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._maybeLostSequencesMap.clear(), this._firstRoundRet.length = 0;
        } }]), n2;
      }(Oo), Uc = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          return o(this, n2), (i2 = t2.call(this, e3))._n = "CloudControlModule", i2._cloudConfig = /* @__PURE__ */ new Map(), i2._expiredTime = 0, i2._version = 0, i2._isFetching = false, i2;
        }
        return a(n2, [{ key: "getCloudConfig", value: function(e3) {
          return ft(e3) ? this._cloudConfig : this._cloudConfig.has(e3) ? this._cloudConfig.get(e3) : void 0;
        } }, { key: "_canFetchConfig", value: function() {
          return this.isLoggedIn() && !this._isFetching && Date.now() >= this._expiredTime;
        } }, { key: "fetchConfig", value: function() {
          var e3 = this, t3 = this._canFetchConfig();
          if (Ye.l("".concat(this._n, ".fetchConfig canFetchConfig:").concat(t3)), t3) {
            var n3 = new Ms("fetchCloudControlConfig"), o2 = this.getModule(no).getSDKAppID();
            this._isFetching = true, this.request({ protocolName: xa, requestData: { SDKAppID: o2, version: this._version } }).then(function(t4) {
              e3._isFetching = false, n3.setMessage("version:".concat(e3._version, " newVersion:").concat(t4.data.version, " config:").concat(t4.data.cloudControlConfig)).setNetworkType(e3.getNetworkType()).end(), Ye.l("".concat(e3._n, ".fetchConfig ok")), e3._parseCloudControlConfig(t4.data);
            }).catch(function(t4) {
              e3._isFetching = false, e3.probeNetwork().then(function(e4) {
                var o3 = v(e4, 2), i2 = o3[0], a2 = o3[1];
                n3.setError(t4, i2, a2).end();
              }), Ye.l("".concat(e3._n, ".fetchConfig failed. error:"), t4), e3._setExpiredTimeOnResponseError(12e4);
            });
          }
        } }, { key: "onPushedCloudControlConfig", value: function(e3) {
          Ye.l("".concat(this._n, ".onPushedCloudControlConfig")), new Ms("pushedCloudControlConfig").setNetworkType(this.getNetworkType()).setMessage("newVersion:".concat(e3.version, " config:").concat(e3.cloudControlConfig)).end(), this._parseCloudControlConfig(e3);
        } }, { key: "onCheckTimer", value: function(e3) {
          this._canFetchConfig() && this.fetchConfig();
        } }, { key: "_parseCloudControlConfig", value: function(e3) {
          var t3 = this, n3 = "".concat(this._n, "._parseCloudControlConfig"), o2 = e3.errorCode, i2 = e3.errorMessage, a2 = e3.cloudControlConfig, s2 = e3.version, r2 = e3.expiredTime;
          if (0 === o2) {
            if (this._version !== s2) {
              var c2 = null;
              try {
                c2 = JSON.parse(a2);
              } catch (u2) {
                this.isPrivateNetWork() || Ye.e("".concat(n3, " JSON parse error. cloudControlConfig:"), a2);
              }
              c2 && (this._cloudConfig.clear(), Object.keys(c2).forEach(function(e4) {
                t3._cloudConfig.set(e4, c2[e4]);
              }), this._version = s2, this.emitInnerEvent(Fs.CLOUD_CONFIG_UPDATED));
            }
            this._expiredTime = Date.now() + 1e3 * r2;
          } else
            ft(o2) ? (Ye.l("".concat(n3, " failed. Invalid message format:"), e3), this._setExpiredTimeOnResponseError(36e5)) : (Ye.e("".concat(n3, " errorCode:").concat(o2, " errorMessage:").concat(i2)), this._setExpiredTimeOnResponseError(12e4));
        } }, { key: "_setExpiredTimeOnResponseError", value: function(e3) {
          this._expiredTime = Date.now() + e3;
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._cloudConfig.clear(), this._expiredTime = 0, this._version = 0, this._isFetching = false;
        } }]), n2;
      }(Oo), Pc = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          return o(this, n2), (i2 = t2.call(this, e3))._n = "RecoverMessageModule", i2.PULL_LIMIT_COUNT = 15, i2;
        }
        return a(n2, [{ key: "start", value: function() {
          this._recoverGroupChat(), this._recoverC2CChat();
        } }, { key: "_recoverGroupChat", value: function() {
          var e3, t3, n3 = this, o2 = this._getLocalConversationList().filter(function(e4) {
            return e4.type === L.CONV_GROUP && e4.groupProfile.type !== L.GRP_AVCHATROOM;
          }), i2 = this.getModule(to), a2 = 0, s2 = 0, r2 = 0, c2 = [];
          o2.forEach(function(o3) {
            var u2 = o3.conversationID, l2 = o3.lastMessage;
            t3 = u2.replace(L.CONV_GROUP, ""), e3 = i2.getLocalLastMessage(u2), l2 && 0 !== l2.lastSequence && e3 ? (s2 = l2.lastSequence, a2 = e3.sequence, r2 = s2 - a2, a2 > 0 && r2 >= 1 && r2 < 300 ? n3._recoverGroupMessage({ groupID: t3, localLastMessageSequence: a2, remoteLastMessageSequence: s2 }) : c2.push(t3)) : c2.push(t3);
          }), this._getGroupNotify(c2);
        } }, { key: "_recoverC2CChat", value: function() {
          var e3, t3 = this, n3 = this._getLocalConversationList().filter(function(e4) {
            return e4.type === L.CONV_C2C;
          }), o2 = this.getModule(to), i2 = 0, a2 = 0, s2 = 0, r2 = [Promise.resolve()];
          n3.forEach(function(n4) {
            var c2 = n4.conversationID, u2 = n4.lastMessage;
            e3 = o2.getLocalLastMessage(c2), u2 && 0 !== u2.lastTime && e3 && (a2 = u2.lastTime, i2 = e3.time, s2 = a2 - i2, i2 > 0 && s2 >= 1 && s2 <= 600 && r2.push(t3._recoverC2CMessage({ conversationID: c2, localLastMessageTime: i2, remoteLastMessageTime: a2 })));
          }), Promise.all(r2).then(function() {
            Ye.l("".concat(t3._n, "._recoverC2CChat all promise fulfilled, start to sync unread messages")), t3.getModule(co).startSyncOnReconnected();
          });
        } }, { key: "_getLocalConversationList", value: function() {
          return this.getModule(to).getLocalConversationList();
        } }, { key: "_recoverGroupMessage", value: function(e3) {
          var t3 = this, n3 = "".concat(this._n, "._recoverGroupMessage");
          Ye.l("".concat(n3, " options:"), e3);
          var o2 = e3.groupID, i2 = e3.localLastMessageSequence, a2 = e3.remoteLastMessageSequence;
          this._getGroupRoamingMessage({ groupID: o2, sequence: i2 }).then(function(e4) {
            var i3 = e4.data, s2 = i3.complete, r2 = i3.messageList;
            if (!ft(r2)) {
              var c2 = r2[0].sequence, u2 = "groupID:".concat(o2, " pkgLastSequence:").concat(c2, " remoteLastSequence:").concat(a2, " complete:").concat(s2, " count:").concat(r2.length);
              Ye.l("".concat(n3, " ").concat(u2)), c2 < a2 && 2 !== s2 && t3._recoverGroupMessage({ groupID: o2, localLastMessageSequence: c2, remoteLastMessageSequence: a2 }), new Ms("recoverMessage").setNetworkType(t3.getNetworkType()).setMessage(u2).end();
              var l2 = t3.getModule(Zn);
              r2.length > 1 && r2.sort(function(e5, t4) {
                return e5.sequence - t4.sequence;
              });
              for (var d2 = 0; d2 < r2.length; d2++) {
                var p2 = r2[d2];
                p2.from !== L.CONV_SYSTEM ? l2.onNewGroupMessage({ dataList: [p2], isInstantMessage: false, updateUnreadCount: false }) : l2.onNewGroupTips({ event: p2.event, dataList: [p2] });
              }
              t3._getGroupNotify([o2]);
            }
          });
        } }, { key: "_genMultiGroupIDList", value: function(e3, t3) {
          var n3 = t3 && t3 > 1 ? t3 : 1, o2 = e3.length, i2 = [];
          if (o2 > 0)
            for (var a2 = 0; a2 < o2; a2 += n3)
              i2.push(e3.slice(a2, a2 + n3));
          return i2;
        } }, { key: "_getGroupNotify", value: function(e3) {
          var t3 = this._genMultiGroupIDList(e3, 10);
          if (t3.length > 0)
            for (var n3 = this.getModule(Zn), o2 = 0, i2 = t3.length; o2 < i2; o2++)
              n3.getGroupNotify(t3[o2]);
        } }, { key: "_getGroupRoamingMessage", value: function(e3) {
          var t3 = e3.groupID, n3 = e3.sequence;
          return this.request({ protocolName: Ji, requestData: { groupID: t3, count: this.PULL_LIMIT_COUNT, sequence: n3 + this.PULL_LIMIT_COUNT - 1 } });
        } }, { key: "_recoverC2CMessage", value: function(e3) {
          var t3 = this, n3 = "".concat(this._n, "._recoverC2CMessage");
          Ye.l("".concat(n3, " options:"), e3);
          var o2 = e3.conversationID, i2 = e3.localLastMessageTime, a2 = e3.remoteLastMessageTime;
          return this._getC2CRoamingMessage({ conversationID: o2, time: i2 }).then(function(e4) {
            var i3 = e4.data, s2 = i3.complete, r2 = i3.messageList;
            if (!ft(r2)) {
              var c2 = r2.length;
              t3.getModule(Qn).onNewC2CMessage({ dataList: r2, isInstantMessage: true });
              var u2 = r2[c2 - 1].time, l2 = o2.replace(L.CONV_C2C, ""), d2 = "peerAccount:".concat(l2, " pkgLastTime:").concat(u2, " remoteLastTime:").concat(a2, " complete:").concat(s2, " count:").concat(c2);
              if (Ye.l("".concat(n3, " ").concat(d2)), new Ms("recoverMessage").setNetworkType(t3.getNetworkType()).setMessage(d2).end(), u2 < a2 && 1 !== s2)
                return t3._recoverC2CMessage({ conversationID: o2, localLastMessageTime: u2, remoteLastMessageTime: a2 });
            }
          });
        } }, { key: "_getC2CRoamingMessage", value: function(e3) {
          var t3 = e3.conversationID, n3 = e3.time;
          return this.request({ protocolName: ui, requestData: { peerAccount: t3.replace(L.CONV_C2C, ""), count: this.PULL_LIMIT_COUNT + 1, lastMessageTime: n3, direction: 1 } });
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset"));
        } }]), n2;
      }(Oo), bc = function() {
        function e2() {
          o(this, e2), this._n = "AvgE2EDelay", this._e2eDelayArray = [];
        }
        return a(e2, [{ key: "addMessageDelay", value: function(e3) {
          var t2 = He() - e3;
          t2 >= 0 && this._e2eDelayArray.push(t2);
        } }, { key: "_calcAvg", value: function(e3, t2) {
          if (0 === t2)
            return 0;
          var n2 = 0;
          return e3.forEach(function(e4) {
            n2 += e4;
          }), Jt(n2 / t2, 1);
        } }, { key: "_calcCountWithLimit", value: function(e3) {
          var t2 = e3.e2eDelayArray, n2 = e3.min, o2 = e3.max;
          return t2.filter(function(e4) {
            return n2 <= e4 && e4 < o2;
          }).length;
        } }, { key: "_calcPercent", value: function(e3, t2) {
          var n2 = Jt(e3 / t2 * 100, 2);
          return n2 > 100 && (n2 = 100), n2;
        } }, { key: "_checkE2EDelayException", value: function(e3, t2) {
          var n2 = e3.filter(function(e4) {
            return e4 > t2;
          });
          if (n2.length > 0) {
            var o2 = n2.length, i2 = Math.min.apply(Math, m(n2)), a2 = Math.max.apply(Math, m(n2)), s2 = this._calcAvg(n2, o2), r2 = Jt(o2 / e3.length * 100, 2);
            if (r2 > 50)
              new Ms("messageE2EDelayException").setMessage("count:".concat(o2, " min:").concat(i2, " max:").concat(a2, " avg:").concat(s2, " percent:").concat(r2)).setLevel("warning").end();
          }
        } }, { key: "getStatResult", value: function() {
          var e3 = this._e2eDelayArray.length;
          if (0 === e3)
            return null;
          var t2 = m(this._e2eDelayArray), n2 = this._calcCountWithLimit({ e2eDelayArray: t2, min: 0, max: 1 }), o2 = this._calcCountWithLimit({ e2eDelayArray: t2, min: 1, max: 3 }), i2 = this._calcPercent(n2, e3), a2 = this._calcPercent(o2, e3), s2 = this._calcAvg(t2, e3);
          return this._checkE2EDelayException(t2, 3), t2.length = 0, this.reset(), { totalCount: e3, countLessThan1Second: n2, percentOfCountLessThan1Second: i2, countLessThan3Second: o2, percentOfCountLessThan3Second: a2, avgDelay: s2 };
        } }, { key: "reset", value: function() {
          this._e2eDelayArray.length = 0;
        } }]), e2;
      }(), wc = function() {
        function e2() {
          o(this, e2), this._n = "AvgRTT", this._requestCount = 0, this._rttArray = [];
        }
        return a(e2, [{ key: "addRequestCount", value: function() {
          this._requestCount += 1;
        } }, { key: "addRTT", value: function(e3) {
          this._rttArray.push(e3);
        } }, { key: "_calcTotalCount", value: function() {
          return this._requestCount;
        } }, { key: "_calcRTTCount", value: function(e3) {
          return e3.length;
        } }, { key: "_calcSuccessRateOfRequest", value: function(e3, t2) {
          if (0 === t2)
            return 0;
          var n2 = Jt(e3 / t2 * 100, 2);
          return n2 > 100 && (n2 = 100), n2;
        } }, { key: "_calcAvg", value: function(e3, t2) {
          if (0 === t2)
            return 0;
          var n2 = 0;
          return e3.forEach(function(e4) {
            n2 += e4;
          }), parseInt(n2 / t2);
        } }, { key: "_calcMax", value: function() {
          return Math.max.apply(Math, m(this._rttArray));
        } }, { key: "_calcMin", value: function() {
          return Math.min.apply(Math, m(this._rttArray));
        } }, { key: "getStatResult", value: function() {
          var e3 = this._calcTotalCount(), t2 = m(this._rttArray);
          if (0 === e3)
            return null;
          var n2 = this._calcRTTCount(t2), o2 = this._calcSuccessRateOfRequest(n2, e3), i2 = this._calcAvg(t2, n2);
          return Ye.l("".concat(this._n, ".getStatResult max:").concat(this._calcMax(), " min:").concat(this._calcMin(), " avg:").concat(i2)), this.reset(), { totalCount: e3, rttCount: n2, successRateOfRequest: o2, avgRTT: i2 };
        } }, { key: "reset", value: function() {
          this._requestCount = 0, this._rttArray.length = 0;
        } }]), e2;
      }(), Fc = function() {
        function e2() {
          o(this, e2), this._map = /* @__PURE__ */ new Map();
        }
        return a(e2, [{ key: "initMap", value: function(e3) {
          var t2 = this;
          e3.forEach(function(e4) {
            t2._map.set(e4, { totalCount: 0, successCount: 0, failedCountOfUserSide: 0, costArray: [], fileSizeArray: [] });
          });
        } }, { key: "addTotalCount", value: function(e3) {
          return !(ft(e3) || !this._map.has(e3)) && (this._map.get(e3).totalCount += 1, true);
        } }, { key: "addSuccessCount", value: function(e3) {
          return !(ft(e3) || !this._map.has(e3)) && (this._map.get(e3).successCount += 1, true);
        } }, { key: "addFailedCountOfUserSide", value: function(e3) {
          return !(ft(e3) || !this._map.has(e3)) && (this._map.get(e3).failedCountOfUserSide += 1, true);
        } }, { key: "addCost", value: function(e3, t2) {
          return !(ft(e3) || !this._map.has(e3)) && (this._map.get(e3).costArray.push(t2), true);
        } }, { key: "addFileSize", value: function(e3, t2) {
          return !(ft(e3) || !this._map.has(e3)) && (this._map.get(e3).fileSizeArray.push(t2), true);
        } }, { key: "_calcSuccessRateOfBusiness", value: function(e3) {
          if (ft(e3) || !this._map.has(e3))
            return -1;
          var t2 = this._map.get(e3), n2 = Jt(t2.successCount / t2.totalCount * 100, 2);
          return n2 > 100 && (n2 = 100), n2;
        } }, { key: "_calcSuccessRateOfPlatform", value: function(e3) {
          if (ft(e3) || !this._map.has(e3))
            return -1;
          var t2 = this._map.get(e3), n2 = this._calcSuccessCountOfPlatform(e3) / t2.totalCount * 100;
          return (n2 = Jt(n2, 2)) > 100 && (n2 = 100), n2;
        } }, { key: "_calcTotalCount", value: function(e3) {
          return ft(e3) || !this._map.has(e3) ? -1 : this._map.get(e3).totalCount;
        } }, { key: "_calcSuccessCountOfBusiness", value: function(e3) {
          return ft(e3) || !this._map.has(e3) ? -1 : this._map.get(e3).successCount;
        } }, { key: "_calcSuccessCountOfPlatform", value: function(e3) {
          if (ft(e3) || !this._map.has(e3))
            return -1;
          var t2 = this._map.get(e3);
          return t2.successCount + t2.failedCountOfUserSide;
        } }, { key: "_calcAvg", value: function(e3) {
          return ft(e3) || !this._map.has(e3) ? -1 : e3 === ds ? this._calcAvgSpeed(e3) : this._calcAvgCost(e3);
        } }, { key: "_calcAvgCost", value: function(e3) {
          var t2 = this._map.get(e3).costArray.length;
          if (0 === t2)
            return 0;
          var n2 = 0;
          return this._map.get(e3).costArray.forEach(function(e4) {
            n2 += e4;
          }), parseInt(n2 / t2);
        } }, { key: "_calcAvgSpeed", value: function(e3) {
          var t2 = 0, n2 = 0;
          return this._map.get(e3).costArray.forEach(function(e4) {
            t2 += e4;
          }), this._map.get(e3).fileSizeArray.forEach(function(e4) {
            n2 += e4;
          }), parseInt(1e3 * n2 / t2);
        } }, { key: "getStatResult", value: function(e3) {
          var t2 = this._calcTotalCount(e3);
          if (0 === t2)
            return null;
          var n2 = this._calcSuccessCountOfBusiness(e3), o2 = this._calcSuccessRateOfBusiness(e3), i2 = this._calcSuccessCountOfPlatform(e3), a2 = this._calcSuccessRateOfPlatform(e3), s2 = this._calcAvg(e3);
          return this.reset(e3), { totalCount: t2, successCountOfBusiness: n2, successRateOfBusiness: o2, successCountOfPlatform: i2, successRateOfPlatform: a2, avgValue: s2 };
        } }, { key: "reset", value: function(e3) {
          ft(e3) ? this._map.clear() : this._map.set(e3, { totalCount: 0, successCount: 0, failedCountOfUserSide: 0, costArray: [], fileSizeArray: [] });
        } }]), e2;
      }(), qc = function() {
        function e2() {
          o(this, e2), this._lastMap = /* @__PURE__ */ new Map(), this._currentMap = /* @__PURE__ */ new Map();
        }
        return a(e2, [{ key: "initMap", value: function(e3) {
          var t2 = this;
          e3.forEach(function(e4) {
            t2._lastMap.set(e4, /* @__PURE__ */ new Map()), t2._currentMap.set(e4, /* @__PURE__ */ new Map());
          });
        } }, { key: "addMessageSequence", value: function(e3) {
          var t2 = e3.key, n2 = e3.message;
          if (ft(t2) || !this._lastMap.has(t2) || !this._currentMap.has(t2))
            return false;
          var o2 = n2.conversationID, i2 = n2.sequence, a2 = o2.replace(L.CONV_GROUP, "");
          if (0 === this._lastMap.get(t2).size)
            this._addCurrentMap(e3);
          else if (this._lastMap.get(t2).has(a2)) {
            var s2 = this._lastMap.get(t2).get(a2), r2 = s2.length - 1;
            i2 > s2[0] && i2 < s2[r2] ? (s2.push(i2), s2.sort(), this._lastMap.get(t2).set(a2, s2)) : this._addCurrentMap(e3);
          } else
            this._addCurrentMap(e3);
          return true;
        } }, { key: "_addCurrentMap", value: function(e3) {
          var t2 = e3.key, n2 = e3.message, o2 = n2.conversationID, i2 = n2.sequence, a2 = o2.replace(L.CONV_GROUP, "");
          this._currentMap.get(t2).has(a2) || this._currentMap.get(t2).set(a2, []), this._currentMap.get(t2).get(a2).push(i2);
        } }, { key: "_copyData", value: function(e3) {
          if (!ft(e3)) {
            this._lastMap.set(e3, /* @__PURE__ */ new Map());
            var t2, n2 = this._lastMap.get(e3), o2 = T(this._currentMap.get(e3));
            try {
              for (o2.s(); !(t2 = o2.n()).done; ) {
                var i2 = v(t2.value, 2), a2 = i2[0], s2 = i2[1];
                n2.set(a2, s2);
              }
            } catch (r2) {
              o2.e(r2);
            } finally {
              o2.f();
            }
            n2 = null, this._currentMap.set(e3, /* @__PURE__ */ new Map());
          }
        } }, { key: "getStatResult", value: function(e3) {
          if (ft(this._currentMap.get(e3)) || ft(this._lastMap.get(e3)))
            return null;
          if (0 === this._lastMap.get(e3).size)
            return this._copyData(e3), null;
          var t2 = 0, n2 = 0;
          if (this._lastMap.get(e3).forEach(function(e4, o3) {
            var i2 = m(e4.values()), a2 = i2.length, s2 = i2[a2 - 1] - i2[0] + 1;
            t2 += s2, n2 += a2;
          }), 0 === t2)
            return null;
          var o2 = Jt(n2 / t2 * 100, 2);
          return o2 > 100 && (o2 = 100), this._copyData(e3), { totalCount: t2, successCountOfMessageReceived: n2, successRateOfMessageReceived: o2 };
        } }, { key: "reset", value: function() {
          this._currentMap.clear(), this._lastMap.clear();
        } }]), e2;
      }(), xc = function(e2) {
        r(i2, e2);
        var n2 = f(i2);
        function i2(e3) {
          var t2;
          o(this, i2), (t2 = n2.call(this, e3))._n = "QualityStatModule", t2.TAG = "im-ssolog-quality-stat", t2.reportIndex = 0, t2.wholePeriod = false, t2._qualityItems = [as, ss, rs, cs, us, ls, ds, ps, gs, hs], t2._messageSentItems = [rs, cs, us, ls, ds], t2._messageReceivedItems = [ps, gs, hs], t2.REPORT_INTERVAL = 120, t2.REPORT_SDKAPPID_BLACKLIST = [], t2.REPORT_TINYID_WHITELIST = [], t2._statInfoArr = [], t2._avgRTT = new wc(), t2._avgE2EDelay = new bc(), t2._rateMessageSent = new Fc(), t2._rateMessageReceived = new qc();
          var a2 = t2.getInnerEmitterInstance();
          return a2.on(Fs.A2KEY_AND_TINYID_UPDATED, t2._onLoginSuccess, h(t2)), a2.on(Fs.CLOUD_CONFIG_UPDATED, t2._onCloudConfigUpdated, h(t2)), t2;
        }
        return a(i2, [{ key: "_onLoginSuccess", value: function() {
          var e3 = this;
          this._rateMessageSent.initMap(this._messageSentItems), this._rateMessageReceived.initMap(this._messageReceivedItems);
          var t2 = this.getModule(oo), n3 = t2.getItem(this.TAG, false);
          !un(n3) && mt(n3.forEach) && (Ye.l("".concat(this._n, "._onLoginSuccess. logs count:").concat(n3.length)), n3.forEach(function(t3) {
            e3._statInfoArr.push(t3);
          }), t2.removeItem(this.TAG, false));
        } }, { key: "_onCloudConfigUpdated", value: function() {
          var e3 = this.getCloudConfig("q_rpt_interval"), t2 = this.getCloudConfig("q_rpt_sdkappid_bl"), n3 = this.getCloudConfig("q_rpt_tinyid_wl");
          ft(e3) || (this.REPORT_INTERVAL = Number(e3)), ft(t2) || (this.REPORT_SDKAPPID_BLACKLIST = t2.split(",").map(function(e4) {
            return Number(e4);
          })), ft(n3) || (this.REPORT_TINYID_WHITELIST = n3.split(","));
        } }, { key: "onCheckTimer", value: function(e3) {
          this.isLoggedIn() && e3 % this.REPORT_INTERVAL == 0 && (this.wholePeriod = true, this._report());
        } }, { key: "addRequestCount", value: function() {
          this._avgRTT.addRequestCount();
        } }, { key: "addRTT", value: function(e3) {
          this._avgRTT.addRTT(e3);
        } }, { key: "addMessageDelay", value: function(e3) {
          this._avgE2EDelay.addMessageDelay(e3);
        } }, { key: "addTotalCount", value: function(e3) {
          this._rateMessageSent.addTotalCount(e3) || Ye.w("".concat(this._n, ".addTotalCount invalid key:"), e3);
        } }, { key: "addSuccessCount", value: function(e3) {
          this._rateMessageSent.addSuccessCount(e3) || Ye.w("".concat(this._n, ".addSuccessCount invalid key:"), e3);
        } }, { key: "addFailedCountOfUserSide", value: function(e3) {
          this._rateMessageSent.addFailedCountOfUserSide(e3) || Ye.w("".concat(this._n, ".addFailedCountOfUserSide invalid key:"), e3);
        } }, { key: "addCost", value: function(e3, t2) {
          this._rateMessageSent.addCost(e3, t2) || Ye.w("".concat(this._n, ".addCost invalid key or cost:"), e3, t2);
        } }, { key: "addFileSize", value: function(e3, t2) {
          this._rateMessageSent.addFileSize(e3, t2) || Ye.w("".concat(this._n, ".addFileSize invalid key or size:"), e3, t2);
        } }, { key: "addMessageSequence", value: function(e3) {
          this._rateMessageReceived.addMessageSequence(e3) || Ye.w("".concat(this._n, ".addMessageSequence invalid key:"), e3.key);
        } }, { key: "_getQualityItem", value: function(e3) {
          var n3 = {}, o2 = vs[this.getNetworkType()];
          ft(o2) && (o2 = 8);
          var i3 = { qualityType: _s[e3], timestamp: xe(), networkType: o2, extension: "" };
          switch (e3) {
            case as:
              n3 = this._avgRTT.getStatResult();
              break;
            case ss:
              n3 = this._avgE2EDelay.getStatResult();
              break;
            case rs:
            case cs:
            case us:
            case ls:
            case ds:
              n3 = this._rateMessageSent.getStatResult(e3);
              break;
            case ps:
            case gs:
            case hs:
              n3 = this._rateMessageReceived.getStatResult(e3);
          }
          return null === n3 ? null : t(t({}, i3), n3);
        } }, { key: "_report", value: function(e3) {
          var t2 = this, n3 = [], o2 = null;
          ft(e3) ? this._qualityItems.forEach(function(e4) {
            null !== (o2 = t2._getQualityItem(e4)) && (o2.reportIndex = t2.reportIndex, o2.wholePeriod = t2.wholePeriod, n3.push(o2));
          }) : null !== (o2 = this._getQualityItem(e3)) && (o2.reportIndex = this.reportIndex, o2.wholePeriod = this.wholePeriod, n3.push(o2)), Ye.d("".concat(this._n, "._report"), n3), this._statInfoArr.length > 0 && (n3 = n3.concat(this._statInfoArr), this._statInfoArr = []);
          var i3 = this.getModule(no), a2 = i3.getSDKAppID(), s2 = i3.getTinyID();
          zt(this.REPORT_SDKAPPID_BLACKLIST, a2) && !Xt(this.REPORT_TINYID_WHITELIST, s2) && (n3 = []), n3.length > 0 && this._doReport(n3);
        } }, { key: "_doReport", value: function(e3) {
          var n3 = this, o2 = { header: xr(this), quality: e3 };
          this.request({ protocolName: Ra, requestData: t({}, o2) }).then(function() {
            n3.reportIndex++, n3.wholePeriod = false;
          }).catch(function(t2) {
            Ye.w("".concat(n3._n, "._doReport failed. networkType:").concat(n3.getNetworkType(), " error:"), t2), n3._statInfoArr = n3._statInfoArr.concat(e3), n3._flushAtOnce();
          });
        } }, { key: "_flushAtOnce", value: function() {
          var e3 = this.getModule(oo), t2 = e3.getItem(this.TAG, false), n3 = this._statInfoArr, o2 = "".concat(this._n, "._flushAtOnce");
          if (un(t2))
            Ye.l("".concat(o2, " count:").concat(n3.length)), e3.setItem(this.TAG, n3, true, false);
          else {
            var i3 = n3.concat(t2);
            i3.length > 10 && (i3 = i3.slice(0, 10)), Ye.l("".concat(o2, " count:").concat(i3.length)), e3.setItem(this.TAG, i3, true, false);
          }
          this._statInfoArr = [];
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._report(), this.reportIndex = 0, this.wholePeriod = false, this.REPORT_SDKAPPID_BLACKLIST = [], this.REPORT_TINYID_WHITELIST = [], this._avgRTT.reset(), this._avgE2EDelay.reset(), this._rateMessageSent.reset(), this._rateMessageReceived.reset();
        } }]), i2;
      }(Oo), Vc = a(function e2(t2) {
        o(this, e2), un(t2) || (this.userID = t2.userID || "", this.nick = t2.nick || "", this.avatar = t2.avatar || "", this.time = t2.time || 0, this.source = t2.source || "", this.wording = t2.wording || "", this.type = t2.type || "");
      }), Hc = function() {
        function e2(t2) {
          o(this, e2), this._snsModule = t2, this._n = "FriendApplicationHandler", this._startTime = 0, this._maxLimited = 100, this._currentSequence = 0, this._friendApplicationMap = /* @__PURE__ */ new Map(), this._unreadCount = 0;
        }
        return a(e2, [{ key: "getLocalFriendApplicationList", value: function() {
          return { friendApplicationList: m(this._friendApplicationMap.values()), unreadCount: this._unreadCount };
        } }, { key: "_onFriendApplicationListUpdated", value: function() {
          this._snsModule.emitOuterEvent(k.FRIEND_APPLICATION_LIST_UPDATED, { friendApplicationList: m(this._friendApplicationMap.values()), unreadCount: this._unreadCount });
        } }, { key: "onFriendApplicationRead", value: function() {
          this._unreadCount = 0, this._onFriendApplicationListUpdated();
        } }, { key: "onFriendApplicationAdded", value: function(e3, n2) {
          var o2 = this;
          if (!un(e3)) {
            var i2 = "";
            i2 = n2 === this._snsModule.getMyUserID() ? L.SNS_APPLICATION_SENT_BY_ME : L.SNS_APPLICATION_SENT_TO_ME;
            var a2 = false;
            e3.forEach(function(e4) {
              var n3 = "".concat(e4.userID, "_").concat(i2);
              i2 !== L.SNS_APPLICATION_SENT_TO_ME || o2._friendApplicationMap.has(n3) || (o2._unreadCount += 1), o2._friendApplicationMap.set(n3, new Vc(t(t({}, e4), {}, { type: i2 }))), a2 = true;
            }), a2 && this._onFriendApplicationListUpdated();
          }
        } }, { key: "onFriendApplicationDeleted", value: function(e3) {
          un(e3) || (this._startTime = 0, this._currentSequence = 0, this.getFriendApplicationList());
        } }, { key: "getFriendApplicationList", value: function() {
          var e3 = this, t2 = "".concat(this._n, ".").concat("getFriendApplicationList"), n2 = new Ms("getFriendApplicationList");
          return this._snsModule.request({ protocolName: Zo, requestData: { applicationType: L.SNS_APPLICATION_TYPE_BOTH, fromAccount: this._snsModule.getMyUserID(), maxLimited: this._maxLimited, startTime: this._startTime, lastSequence: this._currentSequence } }).then(function(o2) {
            var i2 = o2.data, a2 = i2.resultList, s2 = i2.unreadCount, r2 = i2.startTime, c2 = i2.currentSequence;
            e3._startTime = r2, e3._currentSequence = c2, e3._unreadCount = s2;
            var u2 = _t(a2) ? a2.length : 0, l2 = "applicationCount:".concat(u2, " unreadCount:").concat(s2, " startTime:").concat(r2, " currentSequence:").concat(c2);
            n2.setNetworkType(e3._snsModule.getNetworkType()).setMessage(l2).end(), Ye.i("".concat(t2, " ok. ").concat(l2)), e3._friendApplicationMap.clear(), _t(a2) && a2.forEach(function(t3) {
              var n3 = t3.userID, o3 = t3.type, i3 = new Vc(t3);
              e3._friendApplicationMap.set("".concat(n3, "_").concat(o3), i3);
            }), e3._onFriendApplicationListUpdated();
          }).catch(function(o2) {
            return e3._snsModule.probeNetwork().then(function(e4) {
              var t3 = v(e4, 2), i2 = t3[0], a2 = t3[1];
              n2.setError(o2, i2, a2).end();
            }), Ye.w("".concat(t2, " failed. error:"), o2), Ro(o2);
          });
        } }, { key: "deleteFriendApplication", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("deleteFriendApplication"), o2 = e3.userID, i2 = e3.type;
          if ((!i2 || i2 !== L.SNS_APPLICATION_SENT_BY_ME && i2 !== L.SNS_APPLICATION_SENT_TO_ME) && (i2 = L.SNS_APPLICATION_SENT_TO_ME), !this._friendApplicationMap.has("".concat(o2, "_").concat(i2)))
            return Ro({ code: No.FRIEND_APPLICATION_NOT_EXIST });
          var a2 = new Ms("deleteFriendApplication");
          return a2.setMessage("userID:".concat(o2, " type:").concat(i2)), this._snsModule.request({ protocolName: $o, requestData: { fromAccount: this._snsModule.getMyUserID(), userIDList: [o2], type: i2 } }).then(function(e4) {
            var s2 = e4.data.resultList, r2 = s2[0], c2 = r2.to, u2 = r2.resultCode, l2 = r2.resultInfo;
            return a2.setNetworkType(t2._snsModule.getNetworkType()).setMoreMessage("resultList:".concat(JSON.stringify(s2))).end(), Ye.i("".concat(n2, " ok. userID:").concat(o2, " type:").concat(i2)), 0 === u2 ? ko() : Ro({ userID: c2, code: u2, message: l2 });
          }).catch(function(e4) {
            return t2._snsModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              a2.setError(e4, o3, i3).end();
            }), Ye.w("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "acceptFriendApplication", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("acceptFriendApplication"), o2 = e3.userID, i2 = e3.remark, a2 = e3.tag, s2 = e3.type;
          (!s2 || s2 !== L.SNS_APPLICATION_AGREE && s2 !== L.SNS_APPLICATION_AGREE_AND_ADD) && (s2 = L.SNS_APPLICATION_AGREE_AND_ADD);
          var r2 = new Ms("acceptFriendApplication");
          return r2.setMessage("userID:".concat(o2, " type:").concat(s2)), this._snsModule.request({ protocolName: Qo, requestData: { fromAccount: this._snsModule.getMyUserID(), responseFriendItem: [{ userID: o2, remark: i2, tag: a2, action: s2 }] } }).then(function(e4) {
            r2.setNetworkType(t2._snsModule.getNetworkType()).end();
            var i3 = e4.data.resultList[0], a3 = i3.resultCode, c2 = i3.resultInfo;
            if (0 !== a3)
              return Ro({ code: a3, message: c2 });
            Ye.i("".concat(n2, " ok. userID:").concat(o2, " type:").concat(s2));
          }).catch(function(e4) {
            return t2._snsModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              r2.setError(e4, o3, i3).end();
            }), Ye.w("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "refuseFriendApplication", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("refuseFriendApplication"), o2 = e3.userID, i2 = new Ms("refuseFriendApplication");
          return i2.setMessage("userID:".concat(o2)), this._snsModule.request({ protocolName: Qo, requestData: { fromAccount: this._snsModule.getMyUserID(), responseFriendItem: [{ userID: o2, action: "Response_Action_Reject" }] } }).then(function(e4) {
            i2.setNetworkType(t2._snsModule.getNetworkType()).end();
            var a2 = e4.data.resultList[0], s2 = a2.resultCode, r2 = a2.resultInfo;
            if (0 !== s2)
              return Ro({ code: s2, message: r2 });
            Ye.i("".concat(n2, " ok. userID:").concat(o2));
          }).catch(function(e4) {
            return t2._snsModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], a2 = n3[1];
              i2.setError(e4, o3, a2).end();
            }), Ye.w("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_onFriendApplicationProcessed", value: function(e3) {
          var t2 = this;
          if (0 !== e3.length) {
            var n2 = false;
            e3.forEach(function(e4) {
              var o2 = "".concat(e4.to, "_").concat(L.SNS_APPLICATION_SENT_TO_ME);
              t2._friendApplicationMap.has(o2) && (t2._friendApplicationMap.delete(o2), t2._unreadCount -= 1, n2 = true);
            }), this._unreadCount < 0 && (this._unreadCount = 0), n2 && this._onFriendApplicationListUpdated();
          }
        } }, { key: "setFriendApplicationRead", value: function() {
          var e3 = this, t2 = "".concat(this._n, ".").concat("setFriendApplicationRead"), n2 = new Ms("setFriendApplicationRead");
          return this._snsModule.request({ protocolName: ei, requestData: { fromAccount: this._snsModule.getMyUserID(), latestTimeStamp: Jt(xe() / 1e3, 0) } }).then(function(o2) {
            n2.setNetworkType(e3._snsModule.getNetworkType()).end(), Ye.i("".concat(t2, " ok")), e3._unreadCount = 0;
          }).catch(function(o2) {
            return e3._snsModule.probeNetwork().then(function(e4) {
              var t3 = v(e4, 2), i2 = t3[0], a2 = t3[1];
              n2.setError(o2, i2, a2).end();
            }), Ye.w("".concat(t2, " failed. error:"), o2), Ro(o2);
          });
        } }, { key: "reset", value: function() {
          this._startIndex = 0, this._maxLimited = 100, this._currentSequence = 0, this._unreadCount = 0, this._friendApplicationMap.clear();
        } }]), e2;
      }(), Bc = function() {
        function e2(n2, i2) {
          o(this, e2), this.userID = n2, this.remark = "", this.groupList = [], this.source = "", this.addTime = 0, this.friendCustomField = [], this.timestamp = 0;
          var a2 = {}, s2 = [];
          if (a2.userID = n2, !un(i2))
            for (var r2 = "", c2 = "", u2 = 0, l2 = i2.length; u2 < l2; u2++)
              if (r2 = i2[u2].tag, c2 = i2[u2].value, r2.indexOf("Tag_SNS_Custom") > -1)
                this.friendCustomField.push({ key: r2, value: c2 });
              else if (r2.indexOf("Tag_Profile_Custom") > -1)
                s2.push({ key: r2, value: c2 });
              else
                switch (r2) {
                  case Je.NICK:
                    a2.nick = c2;
                    break;
                  case Je.GENDER:
                    a2.gender = c2;
                    break;
                  case Je.BIRTHDAY:
                    a2.birthday = c2;
                    break;
                  case Je.LOCATION:
                    a2.location = c2;
                    break;
                  case Je.SELFSIGNATURE:
                    a2.selfSignature = c2;
                    break;
                  case Je.ALLOWTYPE:
                    a2.allowType = c2;
                    break;
                  case Je.LANGUAGE:
                    a2.language = c2;
                    break;
                  case Je.AVATAR:
                    a2.avatar = c2;
                    break;
                  case Je.MESSAGESETTINGS:
                    a2.messageSettings = c2;
                    break;
                  case Je.ADMINFORBIDTYPE:
                    a2.adminForbidType = c2;
                    break;
                  case Je.LEVEL:
                    a2.level = c2;
                    break;
                  case Je.ROLE:
                    a2.role = c2;
                    break;
                  case Xe:
                    this.remark = c2;
                    break;
                  case $e:
                    this.addTime = c2;
                    break;
                  case ze:
                    this.groupList = JSON.parse(JSON.stringify(c2));
                    break;
                  case Qe:
                    this.source = c2;
                    break;
                  case Ze:
                    break;
                  default:
                    Ye.l("snsProfileItem unknown tag->", i2[u2].tag);
                }
          this.profile = new Ys(t(t({}, a2), {}, { profileCustomField: s2 }));
        }
        return a(e2, [{ key: "validate", value: function(e3) {
          var t2 = true, n2 = "";
          if (un(e3))
            return { valid: false, tips: "empty options" };
          if (e3.profileCustomField)
            for (var o2 = e3.profileCustomField.length, i2 = null, a2 = 0; a2 < o2; a2++) {
              if (i2 = e3.profileCustomField[a2], !pt(i2.key) || -1 === i2.key.indexOf("Tag_Profile_Custom"))
                return { valid: false, tips: "The prefix of keys of the custom profile key-value pairs (which is profileCustomField) must be Tag_Profile_Custom" };
              if (!pt(i2.value))
                return { valid: false, tips: "The type of values of the custom profile key-value pairs (which is profileCustomField) must be String" };
            }
          for (var s2 in e3)
            if (Object.prototype.hasOwnProperty.call(e3, s2)) {
              if ("profileCustomField" === s2)
                continue;
              if (un(e3[s2]) && !pt(e3[s2]) && !dt(e3[s2])) {
                n2 = "key:" + s2 + ", invalid value:" + e3[s2], t2 = false;
                continue;
              }
              switch (s2) {
                case "nick":
                  pt(e3[s2]) || (n2 = "nick must be a string", t2 = false), kt(e3[s2]) > 500 && (n2 = "nick name limited: must less than or equal to ".concat(500, " bytes, current size: ").concat(kt(e3[s2]), " bytes"), t2 = false);
                  break;
                case "gender":
                  At(et, e3.gender) || (n2 = "key:gender, invalid value:" + e3.gender, t2 = false);
                  break;
                case "birthday":
                  dt(e3.birthday) || (n2 = "birthday must be a number", t2 = false);
                  break;
                case "location":
                  pt(e3.location) || (n2 = "location must be a string", t2 = false);
                  break;
                case "selfSignature":
                  pt(e3.selfSignature) || (n2 = "selfSignature must be a string", t2 = false);
                  break;
                case "allowType":
                  At(ot, e3.allowType) || (n2 = "key:allowType, invalid value:" + e3.allowType, t2 = false);
                  break;
                case "language":
                  dt(e3.language) || (n2 = "language must be a number", t2 = false);
                  break;
                case "avatar":
                  pt(e3.avatar) || (n2 = "avatar must be a string", t2 = false);
                  break;
                case "messageSettings":
                  0 !== e3.messageSettings && 1 !== e3.messageSettings && (n2 = "messageSettings must be 0 or 1", t2 = false);
                  break;
                case "adminForbidType":
                  At(nt, e3.adminForbidType) || (n2 = "key:adminForbidType, invalid value:" + e3.adminForbidType, t2 = false);
                  break;
                case "level":
                  dt(e3.level) || (n2 = "level must be a number", t2 = false);
                  break;
                case "role":
                  dt(e3.role) || (n2 = "role must be a number", t2 = false);
                  break;
                default:
                  n2 = "unknown key:" + s2 + "  " + e3[s2], t2 = false;
              }
            }
          return { valid: t2, tips: n2 };
        } }, { key: "update", value: function(e3) {
          var t2 = "", n2 = "", o2 = [];
          this.friendCustomField.forEach(function(e4) {
            o2.push(e4.key);
          });
          for (var i2 = 0, a2 = e3.length; i2 < a2; i2++)
            if (t2 = e3[i2].tag, n2 = e3[i2].value, t2.indexOf("Tag_SNS_Custom") > -1)
              o2.indexOf(t2) > -1 ? this.friendCustomField.forEach(function(e4) {
                e4.key === t2 && (e4.value = n2);
              }) : this.friendCustomField.push({ key: t2, value: n2 });
            else if (t2.indexOf("Tag_Profile_Custom") > -1) {
              var s2 = false;
              this.profile.profileCustomField.forEach(function(e4) {
                e4.key === t2 && (e4.value = n2, s2 = true);
              }), s2 || this.profile.profileCustomField.push({ key: t2, value: n2 });
            } else
              switch (t2) {
                case Je.NICK:
                  this.profile.nick = n2;
                  break;
                case Je.GENDER:
                  this.profile.gender = n2;
                  break;
                case Je.BIRTHDAY:
                  this.profile.birthday = n2;
                  break;
                case Je.LOCATION:
                  this.profile.location = n2;
                  break;
                case Je.SELFSIGNATURE:
                  this.profile.selfSignature = n2;
                  break;
                case Je.ALLOWTYPE:
                  this.profile.allowType = n2;
                  break;
                case Je.LANGUAGE:
                  this.profile.language = n2;
                  break;
                case Je.AVATAR:
                  this.profile.avatar = n2;
                  break;
                case Je.MESSAGESETTINGS:
                  this.profile.messageSettings = n2;
                  break;
                case Je.ADMINFORBIDTYPE:
                  this.profile.adminForbidType = n2;
                  break;
                case Je.LEVEL:
                  this.profile.level = n2;
                  break;
                case Je.ROLE:
                  this.profile.role = n2;
                  break;
                case Xe:
                  this.remark = n2;
                  break;
                case $e:
                  this.addTime = n2;
                  break;
                case ze:
                  this.groupList = JSON.parse(JSON.stringify(n2));
                  break;
                case Qe:
                  this.source = n2;
                  break;
                case Ze:
                  break;
                default:
                  Ye.d("snsProfileItem unkown tag->", e3[i2].tag);
              }
          this.timestamp = Date.now(), o2.length = 0;
        } }, { key: "updateProfile", value: function(e3) {
          this.profile = JSON.parse(JSON.stringify(e3)), this.timestamp = Date.now();
        } }, { key: "addToGroupList", value: function(e3) {
          -1 === this.groupList.indexOf(e3) && (this.groupList.push(e3), this.count = this.groupList.length);
        } }, { key: "removeFromGroupList", value: function(e3) {
          var t2 = this.groupList.indexOf(e3);
          t2 > -1 && (this.groupList.splice(t2, 1), this.count = this.groupList.length);
        } }]), e2;
      }(), Kc = function() {
        function e2(t2) {
          o(this, e2), this._snsModule = t2, this._n = "FriendHandler", this._friendMap = /* @__PURE__ */ new Map(), this._startIndex = 0, this._standardSequence = 0, this._customSequence = 0, this._expirationTime = 18e4;
        }
        return a(e2, [{ key: "getLocalFriendList", value: function() {
          return m(this._friendMap.values());
        } }, { key: "getFriendRemark", value: function(e3) {
          return this._friendMap.has(e3) ? this._friendMap.get(e3).remark : "";
        } }, { key: "onFriendProfileModified", value: function(e3) {
          var t2 = this, n2 = e3.dataList;
          if (!un(n2)) {
            var o2 = this._snsModule.getModule(to);
            n2.forEach(function(e4) {
              var n3 = e4.userID, i2 = e4.profileList;
              if (t2.isMyFriend(n3)) {
                Ye.l("".concat(t2._n, ".onFriendProfileModified. friend account:").concat(n3, ", profileList:").concat(JSON.stringify(i2)));
                var a2 = t2._friendMap.get(n3);
                a2.update(i2), o2.modifyMessageSentByPeer({ conversationID: "".concat(L.CONV_C2C).concat(n3), latestNick: a2.profile.nick, latestAvatar: a2.profile.avatar });
              }
            }), this._onFriendListUpdated();
          }
        } }, { key: "onFriendAdded", value: function(e3) {
          var t2 = this;
          0 !== e3.length && (Ye.l("".concat(this._n, ".onFriendAdded userIDList:").concat(e3)), e3.forEach(function(e4) {
            t2._friendMap.set(e4, new Bc(e4));
          }), this.getFriendProfile({ userIDList: e3 }).then(function(n2) {
            e3.forEach(function(e4) {
              var n3 = t2._friendMap.get(e4);
              n3.groupList.length > 0 && t2._snsModule.updateWhenFriendAdded({ nameList: n3.groupList, userID: e4 });
            }), t2._onFriendListUpdated();
          }));
        } }, { key: "onFriendDeleted", value: function(e3) {
          var t2 = this;
          0 !== e3.length && (Ye.l("".concat(this._n, ".onFriendDeleted userIDList:").concat(e3)), e3.forEach(function(e4) {
            var n2 = t2._friendMap.get(e4);
            n2.groupList.length > 0 && t2._snsModule.updateWhenFriendDeleted({ nameList: n2.groupList, userID: e4 }), t2._friendMap.delete(e4);
          }), this._onFriendListUpdated());
        } }, { key: "_onFriendListUpdated", value: function() {
          this._snsModule.emitOuterEvent(k.FRIEND_LIST_UPDATED), this._snsModule.getModule(to).checkAndPatchRemark();
        } }, { key: "getFriendProfile", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("getFriendProfile"), o2 = e3.userIDList, i2 = [], a2 = [], s2 = [];
          if (o2.forEach(function(e4) {
            if (t2._friendMap.has(e4)) {
              var n3 = t2._friendMap.get(e4);
              Date.now() - n3.timestamp < t2._expirationTime ? a2.push(n3) : s2.push(e4);
            } else
              i2.push({ userID: e4, code: No.NOT_MY_FRIEND, message: t2._snsModule.getErrorMessage(No.NOT_MY_FRIEND) });
          }), 0 === s2.length)
            return Ye.i("".concat(n2, " newUserIDList is empty")), Eo({ friendList: a2, failureUserIDList: i2 });
          var r2 = new Ms("getFriendProfile");
          return r2.setMessage("userIDList:".concat(s2)), Ye.i("".concat(n2, " userIDList:").concat(s2)), this._snsModule.request({ protocolName: Yo, requestData: { fromAccount: this._snsModule.getMyUserID(), userIDList: s2 } }).then(function(e4) {
            return r2.setNetworkType(t2._snsModule.getNetworkType()).end(), Ye.i("".concat(n2, " ok")), e4.data.resultList.forEach(function(e5) {
              var n3, o3 = e5.to, s3 = e5.resultCode, r3 = e5.resultInfo, c2 = e5.tagValueList;
              ft(s3) || 0 === s3 ? (t2._friendMap.has(o3) ? (n3 = t2._friendMap.get(o3)).update(c2) : (n3 = new Bc(o3, c2), t2._friendMap.set(o3, n3)), a2.push(n3)) : i2.push({ userID: o3, code: s3, message: r3 });
            }), ko({ friendList: a2, failureUserIDList: i2 });
          }).catch(function(e4) {
            return t2._snsModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              r2.setError(e4, o3, i3).end();
            }), Ye.w("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "isMyFriend", value: function(e3) {
          return this._friendMap.has(e3);
        } }, { key: "pagingGetFriendList", value: function() {
          var e3 = this, t2 = "".concat(this._n, ".").concat("getFriendList"), n2 = new Ms("getFriendList"), o2 = Date.now();
          this._snsModule.request({ protocolName: Wo, requestData: { fromAccount: this._snsModule.getMyUserID(), startIndex: this._startIndex, standardSequence: this._standardSequence, customSequence: this._customSequence } }).then(function(i2) {
            var a2 = i2.data, s2 = a2.friendCount, r2 = a2.resultList, c2 = a2.nextStartIndex, u2 = a2.standardSequence, l2 = a2.customSequence, d2 = a2.completeFlag;
            e3._startIndex = c2, e3._standardSequence = u2, e3._customSequence = l2;
            var p2 = Date.now() - o2, g2 = "friendCount:".concat(s2, " nextStartIndex:").concat(c2, " standardSequence:").concat(u2, " ") + "customSequence:".concat(l2, " completeFlag:").concat(d2, " cost ").concat(p2, " ms");
            n2.setNetworkType(e3._snsModule.getNetworkType()).setMessage(g2).end(), Ye.i("".concat(t2, " ok."), g2), un(r2) || r2.forEach(function(t3) {
              var n3 = t3.to, o3 = t3.tagValueList;
              e3._friendMap.set(n3, new Bc(n3, o3));
            }), 0 === d2 ? e3.pagingGetFriendList() : (e3._snsModule.emitOuterEvent(k.FRIEND_LIST_UPDATED), e3._pagingGetFriendProfile());
          }).catch(function(o3) {
            return e3._snsModule.probeNetwork().then(function(e4) {
              var t3 = v(e4, 2), i2 = t3[0], a2 = t3[1];
              n2.setError(o3, i2, a2).end();
            }), Ye.w("".concat(t2, " failed. error:"), o3), Ro(o3);
          });
        } }, { key: "_pagingGetFriendProfile", value: function() {
          var e3 = this, t2 = m(this._friendMap.keys()), n2 = this._snsModule.getModule(Xn), o2 = t2.length, i2 = o2 <= 100 ? 1 : Math.ceil(o2 / 100);
          Ye.l("".concat(this._n, "._pagingGetFriendProfile friendCount:").concat(o2, " pageCount:").concat(i2));
          for (var a2 = 0; a2 < i2; a2++)
            n2.getUserProfile({ userIDList: t2.slice(100 * a2, 100 * (a2 + 1)) }).then(function(t3) {
              t3.data.forEach(function(t4) {
                var n3 = e3._friendMap.get(t4.userID);
                n3 && n3.updateProfile(t4);
              }), e3._onFriendListUpdated();
            });
        } }, { key: "addFriend", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("addFriend");
          if (this._friendMap.has(e3.to))
            return Ro({ code: No.ALREADY_MY_FRIEND });
          if (e3.wording && false === this._snsModule.filterProfanity("wording", e3))
            return Ro({ code: No.PROFANITY_FOUND });
          var o2 = e3.to, i2 = e3.source, a2 = e3.type, s2 = e3.wording, r2 = e3.remark, c2 = e3.groupName, u2 = a2;
          (!u2 || u2 !== L.SNS_ADD_TYPE_SINGLE && u2 !== L.SNS_ADD_TYPE_BOTH) && (u2 = L.SNS_ADD_TYPE_BOTH);
          var l2 = new Ms("addFriend");
          return l2.setMessage("to:".concat(o2, " source:").concat(i2, " type:").concat(u2)), this._snsModule.request({ protocolName: zo, requestData: { fromAccount: this._snsModule.getMyUserID(), addFriendItem: [{ to: o2, source: i2, wording: s2, remark: r2, groupName: c2 }], type: u2 } }).then(function(e4) {
            var o3 = e4.data.resultList;
            l2.setNetworkType(t2._snsModule.getNetworkType()).setMoreMessage("resultList:".concat(JSON.stringify(o3))).end();
            var i3 = o3[0], a3 = i3.to, s3 = i3.resultCode, r3 = i3.resultInfo;
            return Ye.i("".concat(n2, " ok. to:").concat(a3, " type:").concat(u2, " code:").concat(s3)), ft(s3) || 0 === s3 ? ko({ userID: a3, code: 0 }) : 30539 === s3 ? ko({ userID: a3, code: s3, message: t2._snsModule.getErrorMessage(s3) }) : Ro({ userID: a3, code: s3, message: t2._snsModule.getErrorMessage(s3) || r3 });
          }).catch(function(e4) {
            return t2._snsModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              l2.setError(e4, o3, i3).end();
            }), Ye.w("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "deleteFriend", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("deleteFriend"), o2 = e3.userIDList, i2 = e3.type;
          o2.length > 1e3 && (Ye.w("".concat(n2, " ").concat(nn(1e3))), o2.length = 1e3);
          var a2 = [], s2 = [], r2 = [];
          if (o2.forEach(function(e4) {
            t2._friendMap.has(e4) ? r2.push(e4) : a2.push({ userID: e4, code: No.NOT_MY_FRIEND, message: t2._snsModule.getErrorMessage(No.NOT_MY_FRIEND) });
          }), 0 === r2.length)
            return Eo({ successUserIDList: s2, failureUserIDList: a2 });
          var c2 = i2;
          (!c2 || c2 !== L.SNS_DELETE_TYPE_SINGLE && c2 !== L.SNS_DELETE_TYPE_BOTH) && (c2 = L.SNS_DELETE_TYPE_BOTH);
          var u2 = new Ms("deleteFriend");
          return u2.setMessage("userIDList:".concat(r2, " type:").concat(c2)), this._snsModule.request({ protocolName: Jo, requestData: { fromAccount: this._snsModule.getMyUserID(), userIDList: r2, type: c2 } }).then(function(e4) {
            u2.setNetworkType(t2._snsModule.getNetworkType()).end(), Ye.i("".concat(n2, " ok"));
            var o3 = e4.data.resultList;
            return un(o3) || o3.forEach(function(e5) {
              var t3 = e5.to, n3 = e5.resultCode, o4 = e5.resultInfo;
              ft(n3) || 0 === n3 ? s2.push({ userID: t3 }) : a2.push({ userID: t3, code: n3, message: o4 });
            }), ko({ successUserIDList: s2, failureUserIDList: a2 });
          }).catch(function(e4) {
            return t2._snsModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              u2.setError(e4, o3, i3).end();
            }), Ye.w("".concat(n2, " error:"), e4), Ro(e4);
          });
        } }, { key: "updateFriend", value: function(e3) {
          var t2 = this, n2 = e3.userID, o2 = e3.remark, i2 = e3.friendCustomField;
          if (!this._friendMap.has(n2))
            return Ro({ code: No.NOT_MY_FRIEND });
          var a2 = "".concat(this._n, ".").concat("updateFriend"), s2 = new Ms("updateFriend");
          s2.setMessage("userID:".concat(n2, " remark:").concat(o2, " friendCustomField:").concat(i2));
          var r2 = [];
          return ft(o2) || r2.push({ tag: Xe, value: o2 }), _t(i2) && i2.length > 0 && i2.forEach(function(e4) {
            r2.push({ tag: e4.key, value: e4.value });
          }), this._snsModule.request({ protocolName: Xo, requestData: { fromAccount: this._snsModule.getMyUserID(), updateItem: [{ to: n2, snsItem: r2 }] } }).then(function(e4) {
            s2.setNetworkType(t2._snsModule.getNetworkType()).end(), Ye.i("".concat(a2, " ok"));
            var n3 = e4.data.resultList[0], r3 = n3.to, c2 = n3.resultCode, u2 = n3.resultInfo;
            if (ft(c2) || 0 === c2) {
              var l2 = t2._friendMap.get(r3);
              return l2 && (ft(o2) || (l2.remark = o2), _t(i2) && i2.length > 0 && Gt(l2.friendCustomField, i2), t2._onFriendListUpdated()), ko(l2);
            }
            return Ro({ code: c2, message: u2 });
          }).catch(function(e4) {
            return t2._snsModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              s2.setError(e4, o3, i3).end();
            }), Ye.w("".concat(a2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "checkFriend", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("checkFriend"), o2 = e3.userIDList, i2 = e3.type;
          (!i2 || i2 !== L.SNS_CHECK_TYPE_SINGLE && i2 !== L.SNS_CHECK_TYPE_BOTH) && (i2 = L.SNS_CHECK_TYPE_BOTH);
          var a2 = new Ms("checkFriend");
          return a2.setMessage("userIDList:".concat(o2, " type:").concat(i2)), this._snsModule.request({ protocolName: jo, requestData: { fromAccount: this._snsModule.getMyUserID(), userIDList: o2, type: i2 } }).then(function(e4) {
            a2.setNetworkType(t2._snsModule.getNetworkType()).end(), Ye.i("".concat(n2, " ok. userIDList:").concat(o2, " type:").concat(i2));
            var s2 = [], r2 = [], c2 = e4.data.resultList;
            return _t(c2) && c2.forEach(function(e5) {
              var t3 = e5.to, n3 = e5.relation, o3 = e5.resultCode, i3 = e5.resultInfo;
              ft(o3) || 0 === o3 ? s2.push({ userID: t3, code: 0, relation: n3 }) : r2.push({ userID: t3, code: o3, message: i3 });
            }), ko({ successUserIDList: s2, failureUserIDList: r2 });
          }).catch(function(e4) {
            return t2._snsModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              a2.setError(e4, o3, i3).end();
            }), Ye.w("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "updateWhenAddedToFriendGroup", value: function(e3) {
          var t2 = this, n2 = e3.name, o2 = e3.userIDList;
          Ye.l("".concat(this._n, ".updateWhenAddedToFriendGroup groupName:").concat(n2, " userIDList:").concat(o2)), n2 && !un(o2) && o2.forEach(function(e4) {
            t2._friendMap.has(e4) && t2._friendMap.get(e4).addToGroupList(n2);
          });
        } }, { key: "updateWhenRemovedFromFriendGroup", value: function(e3) {
          var t2 = this, n2 = e3.name, o2 = e3.userIDList;
          Ye.l("".concat(this._n, ".updateWhenRemovedFromFriendGroup groupName:").concat(n2, " userIDList:").concat(o2)), n2 && !un(o2) && o2.forEach(function(e4) {
            t2._friendMap.has(e4) && t2._friendMap.get(e4).removeFromGroupList(n2);
          });
        } }, { key: "reset", value: function() {
          this._friendMap.clear(), this._startIndex = 0, this._standardSequence = 0, this._customSequence = 0;
        } }]), e2;
      }(), Wc = function() {
        function e2(t2) {
          o(this, e2), un(t2) || (this.name = t2.name || "", this.userIDList = t2.userIDList || [], this.count = this.userIDList.length || 0);
        }
        return a(e2, [{ key: "addToUserIDList", value: function(e3) {
          -1 === this.userIDList.indexOf(e3) && (this.userIDList.push(e3), this.count = this.userIDList.length);
        } }, { key: "removeFromUserIDList", value: function(e3) {
          var t2 = this.userIDList.indexOf(e3);
          t2 > -1 && (this.userIDList.splice(t2, 1), this.count = this.userIDList.length);
        } }]), e2;
      }(), Yc = function() {
        function e2(t2) {
          o(this, e2), this._snsModule = t2, this._n = "FriendGroupHandler", this._friendGroupMap = /* @__PURE__ */ new Map();
        }
        return a(e2, [{ key: "getLocalFriendGroupList", value: function() {
          return m(this._friendGroupMap.values());
        } }, { key: "_emitFriendGroupListUpdated", value: function() {
          var e3 = m(this._friendGroupMap.values());
          this._snsModule.emitOuterEvent(k.FRIEND_GROUP_LIST_UPDATED, e3);
        } }, { key: "getFriendGroupList", value: function() {
          var e3 = this, t2 = "".concat(this._n, ".").concat("getFriendGroupList"), n2 = new Ms("getFriendGroupList");
          return this._snsModule.request({ protocolName: ti, requestData: { fromAccount: this._snsModule.getMyUserID() } }).then(function(o2) {
            n2.setNetworkType(e3._snsModule.getNetworkType()).end();
            var i2 = o2.data.resultList;
            un(i2) ? Ye.i("".concat(t2, " ok. friend group count:0")) : (Ye.i("".concat(t2, " ok. friend group count:").concat(i2.length)), e3._friendGroupMap.clear(), i2.forEach(function(t3) {
              var n3 = new Wc(t3);
              e3._friendGroupMap.set(t3.name, n3);
            }), e3._emitFriendGroupListUpdated());
          }).catch(function(o2) {
            return e3._snsModule.probeNetwork().then(function(e4) {
              var t3 = v(e4, 2), i2 = t3[0], a2 = t3[1];
              n2.setError(o2, i2, a2).end();
            }), Ye.w("".concat(t2, " error:"), o2), Ro(o2);
          });
        } }, { key: "createFriendGroup", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("createFriendGroup"), o2 = e3.name, i2 = e3.userIDList;
          if (this._friendGroupMap.has(o2))
            return Ro({ code: No.FRIEND_GRP_EXISTED });
          var a2 = new Ms("createFriendGroup");
          return a2.setMessage("name:".concat(o2, " userIDList:").concat(i2)), this._snsModule.request({ protocolName: ni, requestData: { fromAccount: this._snsModule.getMyUserID(), groupName: [o2], userIDList: _t(i2) ? i2 : void 0 } }).then(function(e4) {
            a2.setNetworkType(t2._snsModule.getNetworkType()).end(), Ye.l("".concat(n2, " ok. name:").concat(o2, " userIDList:").concat(i2));
            var s2 = e4.data.resultList, r2 = [], c2 = [];
            s2 && s2.forEach(function(e5) {
              var t3 = e5.to, n3 = e5.resultCode, o3 = e5.resultInfo;
              if (ft(n3) || 0 === n3)
                r2.push(t3);
              else {
                var i3 = { userID: e5.to, code: n3, message: o3 };
                c2.push(i3);
              }
            });
            var u2 = new Wc({ name: o2, userIDList: r2 });
            return t2._friendGroupMap.set(o2, u2), t2._snsModule.updateWhenAddedToFriendGroup({ name: o2, userIDList: r2 }), t2._emitFriendGroupListUpdated(), ko({ friendGroup: u2, failureUserIDList: c2 });
          }).catch(function(e4) {
            return t2._snsModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              a2.setError(e4, o3, i3).end();
            }), Ye.w("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "deleteFriendGroup", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("deleteFriendGroup"), o2 = e3.name;
          if (!this._friendGroupMap.has(o2))
            return Ro({ code: No.FRIEND_GRP_NOT_EXIST });
          var i2 = new Ms("deleteFriendGroup");
          return i2.setMessage("name:".concat(o2)), this._snsModule.request({ protocolName: oi, requestData: { fromAccount: this._snsModule.getMyUserID(), nameList: [o2] } }).then(function(e4) {
            i2.setNetworkType(t2._snsModule.getNetworkType()).end(), Ye.l("".concat(n2, " ok. name:").concat(o2));
            var a2 = t2._friendGroupMap.get(o2);
            return a2 && (t2._snsModule.updateWhenRemovedFromFriendGroup({ name: o2, userIDList: a2.userIDList }), t2._friendGroupMap.delete(o2), a2.userIDList.length = 0), t2._emitFriendGroupListUpdated(), ko(a2);
          }).catch(function(e4) {
            return t2._snsModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], a2 = n3[1];
              i2.setError(e4, o3, a2).end();
            }), Ye.w("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "renameFriendGroup", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("renameFriendGroup"), o2 = e3.oldName, i2 = e3.newName;
          if (!this._friendGroupMap.has(o2))
            return Ro({ code: No.FRIEND_GRP_NOT_EXIST });
          var a2 = new Ms("renameFriendGroup");
          return a2.setMessage("oldName:".concat(o2, " newName:").concat(i2)), this._snsModule.request({ protocolName: ii, requestData: { fromAccount: this._snsModule.getMyUserID(), oldName: o2, newName: i2 } }).then(function() {
            if (a2.setNetworkType(t2._snsModule.getNetworkType()).end(), Ye.l("".concat(n2, " ok. oldName:").concat(o2, " newName:").concat(i2)), t2._friendGroupMap.has(o2)) {
              var e4 = t2._friendGroupMap.get(o2);
              return e4.name = i2, t2._friendGroupMap.delete(o2), t2._friendGroupMap.set(i2, e4), t2._snsModule.updateWhenRemovedFromFriendGroup({ name: o2, userIDList: e4.userIDList }), t2._snsModule.updateWhenAddedToFriendGroup({ name: i2, userIDList: e4.userIDList }), t2._emitFriendGroupListUpdated(), ko(e4);
            }
            return ko();
          }).catch(function(e4) {
            return t2._snsModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              a2.setError(e4, o3, i3).end();
            }), Ye.w("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "addToFriendGroup", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("addToFriendGroup"), o2 = e3.name, i2 = e3.userIDList;
          if (!this._friendGroupMap.has(o2))
            return this._onFriendGroupNotExist(o2);
          var a2 = new Ms("addToFriendGroup");
          return a2.setMessage("name:".concat(o2, " userIDList:").concat(i2)), Ye.l("".concat(n2, " name:").concat(o2, " userIDList:").concat(i2)), this._snsModule.request({ protocolName: ii, requestData: { fromAccount: this._snsModule.getMyUserID(), oldName: o2, updateGroupItem: i2.filter(function(e4) {
            return t2._snsModule.isMyFriend(e4);
          }).map(function(e4) {
            return { to: e4, updateType: "Update_Type_Add" };
          }) } }).then(function(e4) {
            return a2.setNetworkType(t2._snsModule.getNetworkType()).end(), t2._onFriendGroupUpdated(o2, e4);
          }).catch(function(e4) {
            return t2._snsModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              a2.setError(e4, o3, i3).end();
            }), Ye.w("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "removeFromFriendGroup", value: function(e3) {
          var t2 = this, n2 = "".concat(this._n, ".").concat("removeFromFriendGroup"), o2 = e3.name, i2 = e3.userIDList;
          if (!this._friendGroupMap.has(o2))
            return this._onFriendGroupNotExist(o2);
          var a2 = new Ms("removeFromFriendGroup");
          return a2.setMessage("name:".concat(o2, " userIDList:").concat(i2)), Ye.l("".concat(n2, " name:").concat(o2, " userIDList:").concat(i2)), this._snsModule.request({ protocolName: ii, requestData: { fromAccount: this._snsModule.getMyUserID(), oldName: o2, updateGroupItem: i2.filter(function(e4) {
            return t2._snsModule.isMyFriend(e4);
          }).map(function(e4) {
            return { to: e4, updateType: "Update_Type_Delete" };
          }) } }).then(function(e4) {
            return a2.setNetworkType(t2._snsModule.getNetworkType()).end(), t2._onFriendGroupUpdated(o2, e4);
          }).catch(function(e4) {
            return t2._snsModule.probeNetwork().then(function(t3) {
              var n3 = v(t3, 2), o3 = n3[0], i3 = n3[1];
              a2.setError(e4, o3, i3).end();
            }), Ye.w("".concat(n2, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_onFriendGroupUpdated", value: function(e3, t2) {
          var n2 = t2.data.resultList, o2 = this._friendGroupMap.get(e3), i2 = [], a2 = [], s2 = [];
          return _t(n2) && n2.forEach(function(e4) {
            var t3 = e4.to, n3 = e4.resultCode, r2 = e4.resultInfo, c2 = e4.type;
            0 === n3 ? "Update_Type_Add" === c2 ? o2 && (o2.addToUserIDList(t3), a2.push(t3)) : "Update_Type_Delete" === c2 && o2 && (o2.removeFromUserIDList(t3), s2.push(t3)) : i2.push({ to: e4.to, code: n3, message: r2 });
          }), Ye.l("".concat(this._n, "._onFriendGroupUpdated name:").concat(e3, " userIDList:").concat(o2.userIDList)), a2.length > 0 && this._snsModule.updateWhenAddedToFriendGroup({ name: e3, userIDList: a2 }), s2.length > 0 && this._snsModule.updateWhenRemovedFromFriendGroup({ name: e3, userIDList: s2 }), ko({ friendGroup: o2, failureUserIDList: i2 });
        } }, { key: "updateWhenFriendAdded", value: function(e3) {
          var t2 = this, n2 = e3.nameList, o2 = e3.userID;
          Ye.l("".concat(this._n, ".updateWhenFriendAdded userID:").concat(o2, " nameList:").concat(n2)), un(n2) || n2.forEach(function(e4) {
            t2._friendGroupMap.has(e4) && t2._friendGroupMap.get(e4).addToUserIDList(o2);
          });
        } }, { key: "updateWhenFriendDeleted", value: function(e3) {
          var t2 = this, n2 = e3.nameList, o2 = e3.userID;
          Ye.l("".concat(this._n, ".updateWhenFriendDeleted userID:").concat(o2, " nameList:").concat(n2)), un(n2) || n2.forEach(function(e4) {
            t2._friendGroupMap.has(e4) && t2._friendGroupMap.get(e4).removeFromUserIDList(o2);
          });
        } }, { key: "reset", value: function() {
          this._friendGroupMap.clear();
        } }]), e2;
      }(), jc = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          return o(this, n2), (i2 = t2.call(this, e3))._n = "SnsModule", i2._friendHandler = new Kc(h(i2)), i2._friendApplicationHandler = new Hc(h(i2)), i2._friendGroupHandler = new Yc(h(i2)), i2.getInnerEmitterInstance().on(Fs.A2KEY_AND_TINYID_UPDATED, i2.onContextUpdated, h(i2)), i2;
        }
        return a(n2, [{ key: "onContextUpdated", value: function(e3) {
          this._friendHandler.pagingGetFriendList(), this._friendGroupHandler.getFriendGroupList(), this._friendApplicationHandler.getFriendApplicationList();
        } }, { key: "onRelationChainModified", value: function(e3) {
          var t3 = this, n3 = e3.dataList;
          if (!un(n3)) {
            var o2 = [], i2 = [], a2 = [], s2 = [], r2 = false, c2 = "";
            n3.forEach(function(e4) {
              if (3 !== e4.pushType && 4 !== e4.pushType || !e4.from || (c2 = e4.from), e4.friendAddAccount && (o2.push.apply(o2, m(e4.friendAddAccount)), s2.push.apply(s2, m(e4.friendAddAccount))), e4.friendDelAccount && i2.push.apply(i2, m(e4.friendDelAccount)), e4.friendApplicationAdded && a2.push.apply(a2, m(e4.friendApplicationAdded)), e4.friendApplicationDeletedUserIDList && s2.push.apply(s2, m(e4.friendApplicationDeletedUserIDList)), e4.reportTime && 7 === e4.pushType && (r2 = true), e4.friendUpInfo) {
                var n4 = { dataList: [] };
                e4.friendUpInfo.forEach(function(e5) {
                  n4.dataList.push({ userID: e5.friendAccount, profileList: m(e5.sns) });
                }), t3.onFriendProfileModified(n4);
              }
            }), r2 && this._friendApplicationHandler.onFriendApplicationRead(), this._friendApplicationHandler.onFriendApplicationAdded(a2, c2), this._friendApplicationHandler.onFriendApplicationDeleted(s2), this._friendHandler.onFriendAdded(o2), this._friendHandler.onFriendDeleted(i2);
          }
        } }, { key: "isMyFriend", value: function(e3) {
          return this._friendHandler.isMyFriend(e3);
        } }, { key: "filterProfanity", value: function(e3, t3) {
          var n3 = this.getModule(Mo);
          if (!n3)
            return true;
          var o2 = n3.filterText(t3[e3], z), i2 = o2.isAllowedToSend, a2 = o2.modifiedText;
          return true === i2 && (t3[e3] = a2, true);
        } }, { key: "onFriendProfileModified", value: function(e3) {
          this._friendHandler.onFriendProfileModified(e3);
        } }, { key: "getLocalFriendList", value: function() {
          var e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t3 = this._friendHandler.getLocalFriendList();
          return e3 ? Eo(t3) : t3;
        } }, { key: "getFriendRemark", value: function(e3) {
          return this._friendHandler.getFriendRemark(e3);
        } }, { key: "getFriendList", value: function() {
          return this._friendHandler.pagingGetFriendList();
        } }, { key: "addFriend", value: function(e3) {
          return this._friendHandler.addFriend(e3);
        } }, { key: "deleteFriend", value: function(e3) {
          return this._friendHandler.deleteFriend(e3);
        } }, { key: "checkFriend", value: function(e3) {
          return this._friendHandler.checkFriend(e3);
        } }, { key: "getFriendProfile", value: function(e3) {
          return this._friendHandler.getFriendProfile(e3);
        } }, { key: "updateFriend", value: function(e3) {
          return this._friendHandler.updateFriend(e3);
        } }, { key: "updateWhenAddedToFriendGroup", value: function(e3) {
          this._friendHandler.updateWhenAddedToFriendGroup(e3);
        } }, { key: "updateWhenRemovedFromFriendGroup", value: function(e3) {
          this._friendHandler.updateWhenRemovedFromFriendGroup(e3);
        } }, { key: "getLocalFriendApplicationList", value: function() {
          var e3 = this._friendApplicationHandler.getLocalFriendApplicationList();
          return Eo(e3);
        } }, { key: "deleteFriendApplication", value: function(e3) {
          return this._friendApplicationHandler.deleteFriendApplication(e3);
        } }, { key: "refuseFriendApplication", value: function(e3) {
          return this._friendApplicationHandler.refuseFriendApplication(e3);
        } }, { key: "acceptFriendApplication", value: function(e3) {
          return this._friendApplicationHandler.acceptFriendApplication(e3);
        } }, { key: "setFriendApplicationRead", value: function(e3) {
          return this._friendApplicationHandler.setFriendApplicationRead(e3);
        } }, { key: "getLocalFriendGroupList", value: function() {
          var e3 = this._friendGroupHandler.getLocalFriendGroupList();
          return Eo(e3);
        } }, { key: "createFriendGroup", value: function(e3) {
          return this._friendGroupHandler.createFriendGroup(e3);
        } }, { key: "deleteFriendGroup", value: function(e3) {
          return this._friendGroupHandler.deleteFriendGroup(e3);
        } }, { key: "addToFriendGroup", value: function(e3) {
          return this._friendGroupHandler.addToFriendGroup(e3);
        } }, { key: "removeFromFriendGroup", value: function(e3) {
          return this._friendGroupHandler.removeFromFriendGroup(e3);
        } }, { key: "renameFriendGroup", value: function(e3) {
          return this._friendGroupHandler.renameFriendGroup(e3);
        } }, { key: "onAddToFriendGroup", value: function(e3) {
          return this._friendGroupHandler.onAddToFriendGroup(e3);
        } }, { key: "updateWhenFriendAdded", value: function(e3) {
          this._friendGroupHandler.updateWhenFriendAdded(e3);
        } }, { key: "updateWhenFriendDeleted", value: function(e3) {
          this._friendGroupHandler.updateWhenFriendDeleted(e3);
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._friendHandler.reset(), this._friendGroupHandler.reset(), this._friendApplicationHandler.reset();
        } }]), n2;
      }(Oo), Jc = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          return o(this, n2), (i2 = t2.call(this, e3))._n = "WorkerTimerModule", i2._isWorkerEnabled = true, i2._workerTimer = null, i2._timerID = -1, i2._init(), i2.getInnerEmitterInstance().on(Fs.CLOUD_CONFIG_UPDATED, i2._onCloudConfigUpdated, h(i2)), i2;
        }
        return a(n2, [{ key: "isWorkerEnabled", value: function() {
          return this._isWorkerEnabled && Re;
        } }, { key: "startWorkerTimer", value: function() {
          Ye.l("".concat(this._n, ".startWorkerTimer")), this._workerTimer && this._workerTimer.postMessage("start");
        } }, { key: "stopWorkerTimer", value: function() {
          Ye.l("".concat(this._n, ".stopWorkerTimer")), this._workerTimer && this._workerTimer.postMessage("stop");
        } }, { key: "_init", value: function() {
          if (Re) {
            var e3 = URL.createObjectURL(new Blob(['let interval = -1;onmessage = function(event) {  if (event.data === "start") {    if (interval > 0) {      clearInterval(interval);    }    interval = setInterval(() => {      postMessage("");    }, 1000);    postMessage(interval);  } else if (event.data === "stop") {    clearInterval(interval);    interval = -1;  }};'], { type: "application/javascript; charset=utf-8" }));
            this._workerTimer = new Worker(e3);
            var t3 = this;
            this._workerTimer.onmessage = function(e4) {
              e4.data ? (t3._timerID = e4.data, Ye.l("".concat(t3._n, "._init seed:").concat(t3._timerID))) : t3._m.onCheckTimer();
            };
          }
        } }, { key: "_onCloudConfigUpdated", value: function() {
          var e3 = this.getCloudConfig("enable_worker");
          Ye.l("".concat(this._n, "._onCloudConfigUpdated enableWorker:").concat(e3)), ft(e3) || "1" === e3 ? !this._isWorkerEnabled && Re && (this._isWorkerEnabled = true, this.startWorkerTimer(), this._m.onWorkerTimerEnabled()) : this._isWorkerEnabled && Re && (this._isWorkerEnabled = false, this.stopWorkerTimer(), this._m.onWorkerTimerDisabled());
        } }, { key: "terminate", value: function() {
          Ye.l("".concat(this._n, ".terminate")), this._workerTimer && (this._workerTimer.terminate(), this._workerTimer = null, this._timerID = -1);
        } }, { key: "getTimerID", value: function() {
          return this._timerID;
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset"));
        } }]), n2;
      }(Oo), zc = function() {
        function e2() {
          o(this, e2), this._n = "PurchasedFeatureHandler", this._purchasedFeatureMap = /* @__PURE__ */ new Map();
        }
        return a(e2, [{ key: "isValidPurchaseBits", value: function(e3) {
          return e3 && "string" == typeof e3 && e3.length >= 1 && e3.length <= 64 && /[01]{1,64}/.test(e3);
        } }, { key: "parsePurchaseBits", value: function(e3) {
          if (this.isValidPurchaseBits(e3)) {
            this._purchasedFeatureMap.clear();
            for (var t2 = null, n2 = e3.length - 1, o2 = 0; n2 >= 0; n2--, o2++)
              t2 = o2 < 32 ? new A(0, Math.pow(2, o2)).toString() : new A(Math.pow(2, o2 - 32), 0).toString(), "1" === e3[n2] ? this._purchasedFeatureMap.set(t2, true) : this._purchasedFeatureMap.set(t2, false);
          } else
            Ye.w("".concat(this._n, ".parsePurchaseBits invalid purchasebits:").concat(e3));
        } }, { key: "hasPurchasedFeature", value: function(e3) {
          return !!this._purchasedFeatureMap.get(e3);
        } }, { key: "isFeatureEnabled", value: function(e3) {
          for (var t2 = parseInt(e3).toString(2), n2 = void 0, o2 = true, i2 = t2.length - 1, a2 = 0; i2 >= 0; i2--, a2++)
            if ("1" === t2.charAt(i2) && (n2 = a2 < 32 ? new A(0, Math.pow(2, a2)).toString() : new A(Math.pow(2, a2 - 32), 0).toString(), !this._purchasedFeatureMap.get(n2))) {
              o2 = false;
              break;
            }
          return Ye.l("".concat(this._n, ".isFeatureEnabled decimalNumber:").concat(e3, " binaryString:").concat(t2, " ret:").concat(o2)), Eo({ enabled: o2 });
        } }, { key: "clear", value: function() {
          this._purchasedFeatureMap.clear();
        } }]), e2;
      }(), Xc = function() {
        function e2(t2) {
          o(this, e2), this._m = t2, this._n = "CommercialConfigModule", this._expiredTime = 0, this._isFetching = false, this._purchasedFeatureHandler = new zc();
        }
        return a(e2, [{ key: "_canFetch", value: function() {
          return this._getModule(no).isLoggedIn() ? !this._isFetching && Date.now() >= this._expiredTime : (this._expiredTime = Date.now() + 2e3, false);
        } }, { key: "onCheckTimer", value: function(e3) {
          this._canFetch() && this.fetchConfig();
        } }, { key: "fetchConfig", value: function() {
          var e3 = this, t2 = this._canFetch(), n2 = "".concat(this._n, ".fetchConfig");
          if (Ye.l("".concat(n2, " canFetch:").concat(t2)), t2) {
            var o2 = this._getModule(ao), i2 = new Ms("fetchCommercialConfig");
            i2.setNetworkType(o2.getNetworkType());
            var a2 = this._getModule(no).getSDKAppID(), s2 = this._getModule(uo);
            this._isFetching = true, s2.request({ protocolName: Ha, requestData: { SDKAppID: a2 } }).then(function(t3) {
              i2.setMessage("purchaseBits:".concat(t3.data.purchaseBits)).end(), Ye.l("".concat(n2, " ok.")), e3._parseConfig(t3.data), e3._isFetching = false;
            }).catch(function(t3) {
              o2.probe().then(function(e4) {
                var n3 = v(e4, 2), o3 = n3[0], a3 = n3[1];
                i2.setError(t3, o3, a3).end();
              }), e3._isFetching = false;
            });
          }
        } }, { key: "onPushedConfig", value: function(e3) {
          var t2 = "".concat(this._n, ".onPushedConfig data:").concat(JSON.stringify(e3));
          Ye.l("".concat(t2)), new Ms("pushedCommercialConfig").setNetworkType(this._getModule(ao).getNetworkType()).setMessage("purchaseBits:".concat(e3.purchaseBits)).end(), this._parseConfig(e3);
        } }, { key: "_parseConfig", value: function(e3) {
          var t2 = "".concat(this._n, "._parseConfig"), n2 = e3.errorCode, o2 = e3.errorMessage, i2 = e3.purchaseBits, a2 = e3.expiredTime;
          0 === n2 ? (this._purchasedFeatureHandler.parsePurchaseBits(i2), this._expiredTime = Date.now() + 1e3 * a2) : ft(n2) ? (Ye.l("".concat(t2, " failed. Invalid message format:"), e3), this._setExpiredTimeOnResponseError(36e5)) : (Ye.e("".concat(t2, " errorCode:").concat(n2, " errorMessage:").concat(o2)), this._setExpiredTimeOnResponseError(12e4));
        } }, { key: "_setExpiredTimeOnResponseError", value: function(e3) {
          this._expiredTime = Date.now() + e3;
        } }, { key: "canIUse", value: function(e3) {
          return this._purchasedFeatureHandler.hasPurchasedFeature(e3);
        } }, { key: "isFeatureEnabled", value: function(e3) {
          return this._purchasedFeatureHandler.isFeatureEnabled(e3);
        } }, { key: "_getModule", value: function(e3) {
          return this._m.getModule(e3);
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._expiredTime = 0, this._isFetching = false, this._purchasedFeatureHandler.clear();
        } }]), e2;
      }(), Qc = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          return o(this, n2), (i2 = t2.call(this, e3))._m = e3, i2._n = "OfflinePushModule", i2._offlinePushPlugin = void 0, i2._androidPushConfig = { huaweiPushBussinessId: "", xiaomiPushBussinessId: "", xiaomiPushAppId: "", xiaomiPushAppKey: "", meizuPushBussinessId: "", meizuPushAppId: "", meizuPushAppKey: "", vivoPushBussinessId: "", fcmPushBussinessId: "", oppoPushBussinessId: "", oppoPushAppKey: "", oppoPushAppSecret: "", honorPushBussinessId: "" }, i2._deviceToken = "", i2._businessID = 0, i2._iosBusinessID = 0, i2._c2cUnreadCount = 0, i2._groupUnreadCount = 0, i2._isWebUniapp = 0, i2;
        }
        return a(n2, [{ key: "registerPlugin", value: function(e3) {
          if (ie) {
            this._offlinePushPlugin = e3["tim-offline-push-plugin"];
            var t3 = e3.offlinePushConfig || {}, n3 = t3.huaweiBusinessID, o2 = t3.xiaomiBusinessID, i2 = t3.xiaomiAppID, a2 = t3.xiaomiAppKey, s2 = t3.meizuBusinessID, r2 = t3.meizuAppID, c2 = t3.meizuAppKey, u2 = t3.vivoBusinessID, l2 = t3.oppoBusinessID, d2 = t3.oppoAppKey, p2 = t3.oppoAppSecret, g2 = t3.honorBusinessID, h2 = t3.iosBusinessID;
            this._androidPushConfig.huaweiPushBussinessId = n3, this._androidPushConfig.xiaomiPushBussinessId = o2, this._androidPushConfig.xiaomiPushAppId = i2, this._androidPushConfig.xiaomiPushAppKey = a2, this._androidPushConfig.meizuPushBussinessId = s2, this._androidPushConfig.meizuPushAppId = r2, this._androidPushConfig.meizuPushAppKey = c2, this._androidPushConfig.vivoPushBussinessId = u2, this._androidPushConfig.oppoPushBussinessId = l2, this._androidPushConfig.oppoPushAppKey = d2, this._androidPushConfig.oppoPushAppSecret = p2, this._androidPushConfig.honorPushBussinessId = g2, new Ms("registerPlugin").setMessage("tim-offline-push-plugin").setMoreMessage("isExist:".concat(!ft(this._offlinePushPlugin))).end(true), Ye.l("".concat(this._n, ".").concat("registerPlugin", " ok. offlinePushConfig:").concat(JSON.stringify(e3.offlinePushConfig))), this._iosBusinessID = h2, this._setAppShowListener();
          } else
            this.outputWarning("OfflinePushInUniapp");
        } }, { key: "init", value: function() {
          this._isWebUniapp = this.getUniAppPlatform(), this._getDeviceToken();
        } }, { key: "_getDeviceToken", value: function() {
          var e3 = this, t3 = "".concat(this._n, ".").concat("_getDeviceToken");
          if (mt(this._offlinePushPlugin.getDeviceToken)) {
            var n3 = "androidPushConfig:".concat(JSON.stringify(this._androidPushConfig), ", iosBusinessID:").concat(this._iosBusinessID);
            Ye.l("".concat(t3, " start. ").concat(n3)), new Ms("_getDeviceToken").setMessage("".concat(n3)).end(true), this._offlinePushPlugin.getDeviceToken(this._androidPushConfig, function(o2) {
              var i2 = new Ms("getDeviceTokenRes"), a2 = o2.code, s2 = o2.msg;
              if (0 === a2) {
                var r2 = o2.data, c2 = r2.deviceToken, u2 = r2.deviceBrand, l2 = r2.deviceType, d2 = r2.bussinessId;
                e3._deviceToken = c2, e3._businessID = d2 || e3._iosBusinessID, n3 = "deviceToken:".concat(c2, ", deviceBrand:").concat(u2 || l2, ", businessID:").concat(e3._businessID), Ye.l("".concat(t3, " ok. ").concat(n3)), i2.setMessage(n3).end(true), e3._setToken();
              } else
                i2.setMessage("code:".concat(a2, ", msg:").concat(s2)).end(true), Ye.e("".concat(t3, " failed. error:"), o2);
            });
          } else
            Ye.e("".concat(t3, " getDeviceToken is not a function"));
        } }, { key: "canIUseOfflinePush", value: function() {
          return ie && !ft(this._offlinePushPlugin);
        } }, { key: "_setAppShowListener", value: function() {
          var e3 = this, t3 = "".concat(this._n, ".").concat("_setAppShowListener");
          ft(this._offlinePushPlugin) ? Ye.e("".concat(t3, " offlinePushPlugin is undefined")) : mt(this._offlinePushPlugin.setAppShowListener) ? (new Ms("_setAppShowListener").end(true), Ye.l("".concat(t3, " start")), this._offlinePushPlugin.setAppShowListener(function(n3) {
            var o2 = (n3 || {}).appShow;
            new Ms("setAppShowListenerRes").setMessage("appShow:".concat(o2)).end(true), Ye.l("".concat(t3, " ok. appShow:").concat(o2)), e3._m.isReady() && (0 === o2 ? (e3._getConvUnreadCount(), e3._onBackground()) : 1 === o2 && e3._onForeground());
          })) : Ye.e("".concat(t3, " setAppShowListener is not a function"));
        } }, { key: "getDeviceBrand", value: function() {
          if (!ft(this._offlinePushPlugin) && mt(this._offlinePushPlugin.getDeviceType)) {
            var e3 = (this._offlinePushPlugin.getDeviceType() || {}).deviceType;
            return Ye.l("".concat(this._n, ".getDeviceBrand ok. deviceType:").concat(e3)), e3;
          }
        } }, { key: "_setToken", value: function() {
          var e3, t3 = this, n3 = "".concat(this._n, "._setToken"), o2 = this.getModule(no), i2 = 1, a2 = "", s2 = "";
          un(this._deviceToken) && (i2 = 0);
          var r2 = this.getUniAppPlatform(), c2 = this.getDeviceBrand();
          r2 === R.IOS || r2 === R.IPAD || r2 === R.MAC ? s2 = this._deviceToken : r2 === R.ANDROID && (a2 = this._deviceToken);
          var u2 = new Ms("offlinePushSetToken");
          return e3 = "deviceToken:".concat(s2 || a2, ", businessID:").concat(this._businessID, ", ") + "deviceBrand:".concat(c2, ", isWebUniapp:").concat(this._isWebUniapp, ", pushMsg:").concat(i2, ", platform:").concat(r2), u2.setMessage("".concat(e3)), Ye.l("".concat(n3, " ").concat(e3)), this.request({ protocolName: ts, requestData: { tokenID: a2, pushMsg: i2, sdkAppID: o2.getSDKAppID(), businessID: parseInt(this._businessID), deviceBrand: c2, deviceToken: s2, isWebUniapp: this._isWebUniapp } }).then(function(e4) {
            return u2.end(), Ye.l("".concat(n3, " ok")), e4;
          }).catch(function(e4) {
            return t3.probeNetwork().then(function(t4) {
              var n4 = v(t4, 2), o3 = n4[0], i3 = n4[1];
              u2.setError(e4, o3, i3).end();
            }), Ye.e("".concat(n3, " failed. error:"), e4), Ro(e4);
          });
        } }, { key: "_getConvUnreadCount", value: function() {
          var e3 = this;
          this._c2cUnreadCount = 0, this._groupUnreadCount = 0, this.getModule(to).getLocalConversationList().forEach(function(t3) {
            t3.type === L.CONV_C2C && (e3._c2cUnreadCount += t3.unreadCount), t3.type === L.CONV_GROUP && (e3._groupUnreadCount += t3.unreadCount);
          });
        } }, { key: "_onBackground", value: function() {
          var e3 = this, t3 = "".concat(this._n, ".").concat("_onBackground"), n3 = new Ms("_onBackground");
          this.request({ protocolName: $a, requestData: { c2cUnreadCount: this._c2cUnreadCount, groupUnreadCount: this._groupUnreadCount, isWebUniapp: this._isWebUniapp } }).then(function(o2) {
            return n3.setMessage("c2cUnreadCount: ".concat(e3._c2cUnreadCount, ", groupUnreadCount: ").concat(e3._groupUnreadCount)).end(), Ye.l("".concat(t3, " ok")), o2;
          }).catch(function(o2) {
            e3.probeNetwork().then(function(e4) {
              var t4 = v(e4, 2), i2 = t4[0], a2 = t4[1];
              n3.setError(o2, i2, a2).end();
            }), Ye.e("".concat(t3, " failed. error:"), o2);
          });
        } }, { key: "_onForeground", value: function() {
          var e3 = this, t3 = "".concat(this._n, ".").concat("_onForeground"), n3 = new Ms("_onForeground");
          this.request({ protocolName: es, requestData: { isWebUniapp: this._isWebUniapp } }).then(function(e4) {
            return n3.end(), Ye.l("".concat(t3, " ok")), e4;
          }).catch(function(o2) {
            e3.probeNetwork().then(function(e4) {
              var t4 = v(e4, 2), i2 = t4[0], a2 = t4[1];
              n3.setError(o2, i2, a2).end();
            }), Ye.e("".concat(t3, " failed. error:"), o2);
          });
        } }, { key: "getUniAppPlatform", value: function() {
          var e3 = uni.getSystemInfoSync().platform, t3 = this.getDeviceBrand();
          return "ios" === e3 ? R.IOS : "android" === e3 ? R.ANDROID : 1002 === t3 ? R.IPAD : 1001 === t3 ? R.MAC : void 0;
        } }, { key: "reset", value: function() {
          this._deviceToken = "", this._businessID = 0, this._c2cUnreadCount = 0, this._groupUnreadCount = 0, this._isWebUniapp = 0, Ye.l("".concat(this._n, ".reset"));
        } }]), n2;
      }(Oo), Zc = function(e2) {
        r(n2, e2);
        var t2 = f(n2);
        function n2(e3) {
          var i2;
          return o(this, n2), (i2 = t2.call(this, e3))._n = "ProfanityFilterModule", i2._plugin = null, i2._filterConfigMap = /* @__PURE__ */ new Map(), i2._startIndex = 0, i2._version = 0, i2._canIUseLexicon = false, i2._isFetching = false, i2._expiredTime = 0, i2;
        }
        return a(n2, [{ key: "init", value: function() {
          var e3 = this.getModule(ro).getPlugin("tim-profanity-filter-plugin");
          e3 ? (this._plugin = new e3({ logger: Ye, isArray: _t, isMap: ut, isDevMode: this.isDevMode() }), this._getLexicon()) : this.outputWarning("ProfanityPluginNotFound");
        } }, { key: "onCheckTimer", value: function() {
          this._plugin && this._canIUseLexicon && this.isLoggedIn() && !this._isFetching && Date.now() >= this._expiredTime && this._getLexicon();
        } }, { key: "filterMessage", value: function(e3, t3) {
          var n3 = true;
          if (!this._plugin || !this._canIUseLexicon)
            return n3;
          if (t3 && t3.messageControlInfo && true === t3.messageControlInfo.excludedFromContentModeration)
            return n3;
          var o2 = e3.type, i2 = e3.conversationType;
          if (o2 !== L.MSG_TEXT && o2 !== L.MSG_CUSTOM)
            return n3;
          var a2, s2 = "".concat(this._n, ".filterMessage");
          if (Ye.l("".concat(s2)), o2 === L.MSG_TEXT) {
            if (i2 === L.CONV_C2C ? a2 = K : i2 === L.CONV_GROUP && (a2 = Y), !this._isConfigOn(a2))
              return n3;
            var r2 = this._plugin.filter(e3.payload.text), c2 = r2.type, u2 = r2.modifiedText;
            1 === c2 ? n3 = false : 2 === c2 && (e3.payload.text = u2);
          } else if (o2 === L.MSG_CUSTOM) {
            if (i2 === L.CONV_C2C ? a2 = W : i2 === L.CONV_GROUP && (a2 = j), !this._isConfigOn(a2))
              return n3;
            var l2 = this._plugin.filter(e3.payload.data), d2 = this._plugin.filter(e3.payload.description), p2 = this._plugin.filter(e3.payload.extension);
            1 === l2.type || 1 === d2.type || 1 === p2.type ? n3 = false : (2 === l2.type && (e3.payload.data = l2.modifiedText), 2 === d2.type && (e3.payload.description = d2.modifiedText), 2 === p2.type && (e3.payload.extension = p2.modifiedText));
          }
          return Ye.l("".concat(s2, " done. isAllowedToSend:").concat(n3)), n3;
        } }, { key: "filterText", value: function(e3, t3) {
          var n3 = "".concat(this._n, ".filterText"), o2 = { isAllowedToSend: true, modifiedText: e3 };
          if (!this._plugin || !this._canIUseLexicon)
            return o2;
          if (!this._isConfigOn(t3))
            return o2;
          Ye.l("".concat(n3));
          var i2 = this._plugin.filter(e3), a2 = i2.type, s2 = i2.modifiedText;
          return 1 === a2 ? o2.isAllowedToSend = false : 2 === a2 && (o2.modifiedText = s2), Ye.l("".concat(n3, " done. ret:"), o2), o2;
        } }, { key: "_getLexicon", value: function() {
          var e3 = this, t3 = new Ms("profanityFilter"), n3 = "".concat(this._n, "._getLexicon");
          this._isFetching = true, this.request({ protocolName: ns, requestData: { startIndex: this._startIndex, version: this._version } }).then(function(o2) {
            var i2 = o2.data, a2 = i2.errorInfo, s2 = i2.filterConfig, r2 = i2.lexicon, c2 = i2.strToken, u2 = i2.completeFlag, l2 = i2.nextStartIndex, d2 = i2.version, p2 = i2.expiredTime, g2 = a2.errorCode, h2 = a2.errorMessage;
            return 0 !== g2 ? (e3._isFetching = false, Ye.w("".concat(n3, " failed. error:"), a2), void t3.setCode(g2).setMessage(h2).end()) : (e3._onFilterConfig(s2), e3._getToken(c2), 1 === u2 ? (Ye.l("".concat(n3, " done. version:").concat(d2, " expiredTime:").concat(p2)), e3._version = d2, e3._canIUseLexicon = true, e3._isFetching = false, e3._expiredTime = Date.now() + 1e3 * p2, void e3._plugin.onLexiconCompleted(r2)) : (e3._startIndex = l2, e3._plugin.onLexiconSliced(r2), void e3._getLexicon()));
          }).catch(function(o2) {
            e3.probeNetwork().then(function(e4) {
              var n4 = v(e4, 2), i2 = n4[0], a2 = n4[1];
              t3.setError(o2, i2, a2).end();
            }), e3._isFetching = false, Ye.l("".concat(n3, " failed. error:"), o2);
          });
        } }, { key: "_onFilterConfig", value: function(e3) {
          var t3 = this;
          un(e3) || (this._filterConfigMap.clear(), Object.keys(e3).forEach(function(n3) {
            t3._filterConfigMap.set(n3, e3[n3]);
          }), Ye.l("".concat(this._n, "._onFilterConfig. keys:").concat(Array.from(this._filterConfigMap.keys()), " values:").concat(Array.from(this._filterConfigMap.values()))));
        } }, { key: "_isConfigOn", value: function(e3) {
          return 1 === this._filterConfigMap.get(e3);
        } }, { key: "_getToken", value: function(e3) {
          if (pt(e3)) {
            var t3 = e3.length, n3 = "";
            if (t3 % 2 == 0)
              for (var o2 = 0; o2 <= t3 - 1; o2 += 2)
                n3 += e3[o2 + 1], n3 += e3[o2];
            else {
              for (var i2 = 0; i2 < t3 - 1; i2 += 2)
                n3 += e3[i2 + 1], n3 += e3[i2];
              n3 += e3[t3 - 1];
            }
            this._plugin.onToken(n3);
          }
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._plugin && (this._plugin.reset(), this._plugin = null), this._filterConfigMap.clear(), this._startIndex = 0, this._version = 0, this._canIUseLexicon = false, this._isFetching = false, this._expiredTime = 0;
        } }]), n2;
      }(Oo), $c = function() {
        function e2(t2) {
          o(this, e2), this._m = t2, this._n = "TransCmdModule", this._TRTCCommandList = ["tui_room_svr.*"], this._m.getInnerEmitterInstance().on(Fs.CLOUD_CONFIG_UPDATED, this._onCloudConfigUpdated, this);
        }
        return a(e2, [{ key: "_onCloudConfigUpdated", value: function() {
          var e3 = this, t2 = this._m.getModule(go).getCloudConfig("rtc_cmd");
          ft(t2) || (t2 = JSON.parse(t2)).forEach(function(t3) {
            e3._TRTCCommandList.includes(t3) || e3._TRTCCommandList.push(t3);
          });
        } }, { key: "sendTRTCCustomData", value: function(e3) {
          var t2 = e3.serviceCommand, n2 = e3.data, o2 = "".concat(H.NAME.TUIROOM_SVR, ".*");
          return ft(t2) || (o2 = t2), this._TRTCCommandList.includes(o2) ? this._trans({ servcmd: o2, data: n2 }) : Ro({ code: No.INVALID_TRTC_CMD });
        } }, { key: "_trans", value: function(e3) {
          Ye.d("".concat(this._n, "._trans. options:").concat(JSON.stringify(e3)));
          var t2 = e3.servcmd, n2 = e3.data;
          return this._m.getModule(uo).trans({ servcmd: t2, data: pt(n2) ? JSON.parse(n2) : n2 });
        } }, { key: "getCommandList", value: function() {
          return this._TRTCCommandList;
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset"));
        } }]), e2;
      }(), eu = function() {
        function e2(t2) {
          o(this, e2), this._m = t2, this._n = "ErrorMessageModule", this.TIM_ERROR_ASSISTANCE = "tim_error_assistance", this.STORAGE_EXPIRES_TIME = 6048e5, this._map = /* @__PURE__ */ new Map(), this._init();
        }
        return a(e2, [{ key: "_init", value: function() {
          var e3 = this._getStorageModule().getItem(this.TIM_ERROR_ASSISTANCE, false);
          if (e3) {
            var t2;
            try {
              t2 = JSON.parse(e3);
            } catch (n2) {
              this._getStorageModule().removeItem(this.TIM_ERROR_ASSISTANCE, false), Ye.w("".concat(this._n, "._init error:"), n2);
            }
            t2 && (this._needToUpdate(t2) ? this._fetch() : this._fillMap(t2.message));
          } else
            this._fetch();
        } }, { key: "_needToUpdate", value: function(e3) {
          var t2 = e3.localSavedTime, n2 = e3.localSavedVersion, o2 = t2 && (/* @__PURE__ */ new Date()).getTime() - t2 >= this.STORAGE_EXPIRES_TIME, i2 = !n2 || "3.2.0" !== n2;
          return Ye.l("".concat(this._n, "._needToUpdate isTimeout:").concat(o2, " isDifferentVersion:").concat(i2)), o2 || i2;
        } }, { key: "_fetch", value: function() {
          if (!this._m.getModule(no).isPrivateNetWork()) {
            var e3 = "https://web.sdk.qcloud.com/im/download/error-message/v3/0.0.2/tim-error-message.txt", t2 = "application/x-www-form-urlencoded;charset=UTF-8", n2 = "".concat(this._n, "._fetch ok in"), o2 = this;
            if (se)
              ce.request({ url: e3, method: "GET", timeout: 3e3, header: { "content-type": t2 }, dataType: "text", success: function(e4) {
                o2._fillAndSave(e4.data), Ye.l("".concat(n2, " mini program"));
              }, fail: function() {
              } });
            else {
              var i2 = new XMLHttpRequest(), a2 = setTimeout(function() {
                i2.abort();
              }, 3e3);
              i2.onreadystatechange = function() {
                4 === i2.readyState && (clearTimeout(a2), 200 !== i2.status && 304 !== i2.status || (Ye.l("".concat(n2, " browser")), o2._fillAndSave(i2.responseText)));
              }, i2.open("GET", e3, true), i2.setRequestHeader("Content-type", t2), i2.send();
            }
          }
        } }, { key: "_fillAndSave", value: function(e3) {
          this._fillMap(e3), this._getStorageModule().setItem(this.TIM_ERROR_ASSISTANCE, JSON.stringify({ message: e3, localSavedTime: (/* @__PURE__ */ new Date()).getTime(), localSavedVersion: "3.2.0" }), true, false);
        } }, { key: "_getStorageModule", value: function() {
          return this._m.getModule(oo);
        } }, { key: "_fillMap", value: function(e3) {
          this._map.clear();
          for (var t2, n2, o2, i2 = e3.split(";\n"), a2 = i2.length, s2 = new RegExp(/'/g), r2 = 0; r2 < a2; r2++)
            if (t2 = i2[r2].indexOf(":"), n2 = i2[r2].slice(0, t2), o2 = i2[r2].slice(t2 + 1, i2[r2].length), !n2.startsWith("//")) {
              if (ft(o2))
                continue;
              this._map.set(n2, o2.replace(s2, ""));
            }
        } }, { key: "get", value: function(e3) {
          var t2 = e3.isIntl, n2 = e3.key, o2 = e3.replacement1, i2 = e3.replacement2, a2 = "".concat(n2, t2 ? "_en" : "_cn");
          !this._map.has(a2) && this._map.has(n2) && (a2 = n2);
          var s2 = "";
          return this._map.has(a2) ? (s2 = this._map.get(a2), ft(o2) || (s2 = s2.replace("$replacement1", o2)), ft(i2) || (s2 = s2.replace("$replacement2", i2)), s2) : s2;
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset"));
        } }]), e2;
      }(), tu = function() {
        function e2(t2) {
          o(this, e2), this._n = "RemoteSignalingHandler", this._signalingModule = t2;
        }
        return a(e2, [{ key: "onNewMessageList", value: function(e3) {
          var t2 = this, n2 = this._signalingModule.filterMessageList(e3);
          n2.length > 0 && n2.forEach(function(e4) {
            var n3 = t2.getPayloadData(e4);
            n3 && t2._handleActionType(n3, e4);
          });
        } }, { key: "onMessageModified", value: function(e3) {
          var t2 = this, n2 = this._signalingModule.filterMessageList(e3);
          n2.length > 0 && n2.forEach(function(e4) {
            var n3 = t2.getPayloadData(e4);
            n3 && t2._onInvitationModified(n3, e4);
          });
        } }, { key: "getPayloadData", value: function(e3) {
          var t2 = "".concat(this._n, ".getPayloadData"), n2 = e3.payload.data;
          try {
            return JSON.parse(n2);
          } catch (o2) {
            return Ye.e("".concat(t2, " JSON parse error. signalingData:").concat(n2)), null;
          }
        } }, { key: "_handleActionType", value: function(e3, t2) {
          switch (e3.actionType) {
            case N.ACTION_TYPE_INVITE:
              this._onNewInvitationReceived(e3, t2);
              break;
            case N.ACTION_TYPE_REJECT_INVITE:
              this._onInviteeRejected(e3);
              break;
            case N.ACTION_TYPE_ACCEPT_INVITE:
              this._onInviteeAccepted(e3);
              break;
            case N.ACTION_TYPE_CANCEL_INVITE:
              this._onInvitationCancelled(e3);
              break;
            case N.ACTION_TYPE_INVITE_TIMEOUT:
              this._onInvitationTimeout(e3);
          }
        } }, { key: "_createDefaultEmitData", value: function(e3) {
          return { inviteID: e3.inviteID, inviter: e3.inviter, groupID: e3.groupID, data: e3.data || "" };
        } }, { key: "_onNewInvitationReceived", value: function(e3, n2) {
          var o2 = "".concat(this._n, "._onNewInvitationReceived"), i2 = e3.inviteID, a2 = e3.inviteeList, s2 = e3.groupID, r2 = this._signalingModule.getMyUserID(), c2 = a2.includes(r2), u2 = Math.round(e3.timeout - ((/* @__PURE__ */ new Date()).getTime() - 1e3 * n2.time) / 1e3);
          if (Ye.l("".concat(o2, " myselfIncluded:").concat(c2, " groupID:").concat(s2, " timeout:").concat(u2, "s signalObj:").concat(JSON.stringify(e3))), s2 && c2 || !s2) {
            var l2 = this._signalingModule.getInviteInfo(i2);
            if (l2 && l2 === e3)
              return;
            l2 || this._signalingModule.setInviteInfo(i2, t(t({}, e3), {}, { message: n2 })), this._signalingModule.emitEvent(N.NEW_INVITATION_RECEIVED, t(t({}, this._createDefaultEmitData(e3)), {}, { inviteeList: a2 })), this._signalingModule.startTimer(t(t({}, e3), {}, { timeout: u2 }));
          }
        } }, { key: "_onInviteeRejected", value: function(e3) {
          var n2 = "".concat(this._n, "._onInviteeRejected"), o2 = e3.inviteID, i2 = e3.inviter, a2 = e3.groupID, s2 = this._signalingModule.hasInviteInfo(o2);
          Ye.l("".concat(n2, " inviteID:").concat(o2, " hasInviteID:").concat(s2, " inviter:").concat(i2, " groupID:").concat(a2)), (a2 && s2 || !a2) && (this._signalingModule.updateInviteInfo(e3), this._signalingModule.emitEvent(N.INVITEE_REJECTED, t(t({}, this._createDefaultEmitData(e3)), {}, { invitee: e3.inviteeList[0] })));
        } }, { key: "_onInviteeAccepted", value: function(e3) {
          var n2 = "".concat(this._n, "._onInviteeAccepted"), o2 = e3.inviteID, i2 = e3.inviter, a2 = e3.groupID, s2 = this._signalingModule.hasInviteInfo(o2);
          Ye.l("".concat(n2, " inviteID:").concat(o2, " hasInviteID:").concat(s2, " inviter:").concat(i2, " groupID:").concat(a2)), (a2 && s2 || !a2) && (this._signalingModule.updateInviteInfo(e3), this._signalingModule.emitEvent(N.INVITEE_ACCEPTED, t(t({}, this._createDefaultEmitData(e3)), {}, { invitee: e3.inviteeList[0] })));
        } }, { key: "_onInvitationCancelled", value: function(e3) {
          var t2 = "".concat(this._n, "._onInvitationCancelled"), n2 = e3.inviteID, o2 = e3.inviter, i2 = e3.groupID, a2 = this._signalingModule.hasInviteInfo(n2);
          Ye.l("".concat(t2, " inviteID:").concat(n2, " hasInviteID:").concat(a2, " inviter:").concat(o2, " groupID:").concat(i2)), (i2 && a2 || !i2) && (this._signalingModule.deleteInviteInfo(n2), this._signalingModule.emitEvent(N.INVITATION_CANCELLED, this._createDefaultEmitData(e3)));
        } }, { key: "_onInvitationTimeout", value: function(e3) {
          var n2 = "".concat(this._n, "._onInvitationTimeout"), o2 = e3.inviteID, i2 = e3.inviter, a2 = e3.groupID, s2 = e3.inviteeList, r2 = this._signalingModule.hasInviteInfo(o2);
          Ye.l("".concat(n2, " inviteID:").concat(o2, " hasInviteID:").concat(r2, " inviter:").concat(i2, " groupID:").concat(a2, "  data:").concat(e3.data)), (a2 && r2 || !a2) && (this._signalingModule.updateInviteInfo(e3), this._signalingModule.emitEvent(N.INVITATION_TIMEOUT, t(t({}, this._createDefaultEmitData(e3)), {}, { inviteeList: s2, isSelfTimeout: false })));
        } }, { key: "_onInvitationModified", value: function(e3, n2) {
          var o2 = "".concat(this._n, "._onInvitationModified"), i2 = e3.inviteID, a2 = e3.data;
          Ye.l("".concat(o2, " inviteID:").concat(i2, " data:").concat(a2)), this._signalingModule.setInviteInfo(i2, t(t({}, e3), {}, { message: n2 })), this._signalingModule.emitEvent(N.INVITATION_MODIFIED, { inviteID: i2, data: a2 });
        } }]), e2;
      }(), nu = function(e2) {
        if (e2 < 0 || e2 > 53)
          return NaN;
        var t2 = 0 | 1073741824 * Math.random();
        return e2 > 30 ? t2 + 1073741824 * (0 | Math.random() * (1 << e2 - 30)) : t2 >>> 30 - e2;
      }, ou = function(e2, t2) {
        for (var n2 = e2.toString(16), o2 = t2 - n2.length, i2 = "0"; o2 > 0; o2 >>>= 1, i2 += i2)
          1 & o2 && (n2 = i2 + n2);
        return n2;
      }, iu = function() {
        function e2(t2) {
          o(this, e2), this._n = "LocalSignalingHandler", this._signalingModule = t2;
        }
        return a(e2, [{ key: "generateInviteID", value: function() {
          var e3, t2, n2 = (t2 = ou)((e3 = nu)(32), 8) + "-" + t2(e3(16), 4) + "-" + t2(16384 | e3(12), 4) + "-" + t2(32768 | e3(14), 4) + "-" + t2(e3(48), 12);
          return Ye.l("".concat(this._n, ".generateInviteID inviteID:").concat(n2)), n2;
        } }, { key: "createInviteInfo", value: function(e3) {
          var n2 = this.generateInviteID(), o2 = this.createInviteCustomData(t(t({}, e3), {}, { inviteID: n2 })), i2 = o2.groupID, a2 = o2.inviteeList, s2 = i2 || a2[0];
          return { customData: o2, message: this.createSignalingMessage(o2, s2), inviteID: n2 };
        } }, { key: "_createDefaultCustomData", value: function(e3) {
          var t2 = e3.data, n2 = void 0 === t2 ? "" : t2, o2 = e3.inviteID, i2 = void 0 === o2 ? "" : o2, a2 = e3.groupID;
          return { businessID: 1, timeout: 0, data: n2, inviteID: i2, groupID: void 0 === a2 ? "" : a2 };
        } }, { key: "createInviteCustomData", value: function(e3) {
          var n2 = e3.userID, o2 = e3.timeout, i2 = void 0 === o2 ? 0 : o2, a2 = e3.groupID, s2 = void 0 === a2 ? "" : a2, r2 = this._signalingModule.getMyUserID(), c2 = t(t({}, this._createDefaultCustomData(e3)), {}, { actionType: N.ACTION_TYPE_INVITE, inviter: r2, inviteeList: s2 ? e3.inviteeList : [n2], timeout: i2 });
          return Ye.l("".concat(this._n, ".createInviteCustomData customData:").concat(JSON.stringify(c2))), c2;
        } }, { key: "createCancelCustomData", value: function(e3) {
          var n2, o2 = "".concat(this._n, ".createCancelCustomData"), i2 = e3.inviteID, a2 = this._signalingModule.getMyUserID(), s2 = this._signalingModule.getInviteInfo(i2), r2 = s2.inviteeList, c2 = s2.groupID, u2 = s2.inviter;
          return u2 === a2 ? n2 = t(t({}, this._createDefaultCustomData(e3)), {}, { actionType: N.ACTION_TYPE_CANCEL_INVITE, groupID: c2, inviter: a2, inviteeList: r2 }) : Ye.e("".concat(o2, " unmatched inviter:").concat(u2, " and my userID:").concat(a2)), Ye.l("".concat(o2, " customData:").concat(JSON.stringify(n2))), n2;
        } }, { key: "createAcceptCustomData", value: function(e3) {
          var n2, o2 = "".concat(this._n, ".createAcceptCustomData"), i2 = e3.inviteID, a2 = this._signalingModule.getMyUserID(), s2 = this._signalingModule.getInviteInfo(i2), r2 = s2.inviter, c2 = s2.groupID;
          return s2.inviteeList.includes(a2) ? n2 = t(t({}, this._createDefaultCustomData(e3)), {}, { actionType: N.ACTION_TYPE_ACCEPT_INVITE, groupID: c2, inviter: r2, inviteeList: [a2] }) : Ye.e("".concat(o2, " userID:").concat(a2, " not in inviteeList. inviteID:").concat(i2, " groupID:").concat(c2)), Ye.l("".concat(o2, " customData:").concat(JSON.stringify(n2))), n2;
        } }, { key: "createRejectCustomData", value: function(e3) {
          var n2, o2 = "".concat(this._n, ".createRejectCustomData"), i2 = e3.inviteID, a2 = this._signalingModule.getMyUserID(), s2 = this._signalingModule.getInviteInfo(i2), r2 = s2.inviter, c2 = s2.groupID;
          return s2.inviteeList.includes(a2) ? n2 = t(t({}, this._createDefaultCustomData(e3)), {}, { actionType: N.ACTION_TYPE_REJECT_INVITE, groupID: c2, inviter: r2, inviteeList: [a2] }) : Ye.e("".concat(o2, " userID:").concat(a2, " not in inviteeList. inviteID:").concat(i2, " groupID:").concat(c2)), Ye.l("".concat(o2, " customData:").concat(JSON.stringify(n2))), n2;
        } }, { key: "createTimeoutCustomData", value: function(e3) {
          var n2 = "".concat(this._n, ".createTimeoutCustomData"), o2 = e3.inviteeList, i2 = e3.inviter, a2 = e3.isInviter, s2 = void 0 !== a2 && a2, r2 = this._signalingModule.getMyUserID(), c2 = t(t({}, this._createDefaultCustomData(e3)), {}, { actionType: N.ACTION_TYPE_INVITE_TIMEOUT, inviter: i2, inviteeList: s2 ? o2 : [r2] });
          return Ye.l("".concat(n2, " customData:").concat(JSON.stringify(c2))), c2;
        } }, { key: "createSignalingMessage", value: function(e3, t2) {
          var n2 = e3.groupID, o2 = e3.inviter, i2 = this._signalingModule.getModule(Jn), a2 = { to: t2 || n2 || o2, conversationType: n2 ? L.CONV_GROUP : L.CONV_C2C, priority: L.MSG_PRIORITY_HIGH, payload: { data: JSON.stringify(e3) } }, s2 = i2.createCustomMessage(a2);
          return Ye.d("".concat(this._n, ".createSignalingMessage. message:").concat(JSON.stringify(s2))), s2;
        } }]), e2;
      }(), au = function() {
        function e2(t2) {
          o(this, e2), this._n = "HistorySignalingHandler", this._signalingModule = t2, this.EXPIRED_TIME = 3e4, this.COUNT = 20, this._signalingMap = /* @__PURE__ */ new Map(), this._signalingRelatedToMeMap = /* @__PURE__ */ new Map();
        }
        return a(e2, [{ key: "getHistorySignaling", value: function() {
          var e3 = this, t2 = this._signalingModule.getModule(to).getLocalConversationList();
          un(t2) || this._getSignalingList(t2).then(function(t3) {
            e3._handleSignalingList(t3);
          });
        } }, { key: "_getSignalingList", value: function(e3) {
          var t2 = this, n2 = this._getValidConversationList(e3), o2 = this._createPromiseList(n2);
          return un(o2) ? Promise.resolve([]) : this._concurrentGetMessageList(o2).then(function(e4) {
            var n3 = /* @__PURE__ */ new Map();
            return e4.forEach(function(e5) {
              var o3 = e5.signalingList, i2 = t2._getSignalingRelatedToMeMap(o3);
              n3 = new Map([].concat(m(n3), m(i2)));
            }), t2._sortSignaling(n3);
          });
        } }, { key: "_handleSignalingList", value: function(e3) {
          un(e3) || (Ye.d("".concat(this._n, "._handleSignalingList signalingList:").concat(JSON.stringify(e3))), this._signalingModule.onNewMessageList(e3));
        } }, { key: "_isSignalingNotExpired", value: function(e3, t2) {
          return e3[t2] && 1e3 * e3[t2] > (/* @__PURE__ */ new Date()).getTime() - this.EXPIRED_TIME;
        } }, { key: "_getValidConversationList", value: function(e3) {
          for (var t2 = [], n2 = 0; n2 < e3.length; n2++) {
            var o2 = e3[n2], i2 = o2.type, a2 = o2.unreadCount, s2 = o2.lastMessage, r2 = this._isSignalingNotExpired(s2, "lastTime");
            i2 !== L.CONV_SYSTEM && a2 > 0 && r2 && t2.push(e3[n2]);
          }
          return t2;
        } }, { key: "_createPromiseList", value: function(e3) {
          for (var t2 = [], n2 = 0; n2 < e3.length; n2++) {
            var o2 = e3[n2], i2 = o2.conversationID, a2 = o2.unreadCount, s2 = o2.type === L.CONV_C2C ? a2 : this.COUNT;
            this._signalingMap.set(i2, { needMessageCount: s2, signalingList: [] });
            var r2 = this._signalingModule.getModule(to).getMessageList({ conversationID: i2 });
            t2.push(r2);
          }
          return t2;
        } }, { key: "_concurrentGetMessageList", value: function(e3) {
          var t2 = this, n2 = [];
          return Promise.all(e3).then(function(e4) {
            for (var o2 = 0; o2 < e4.length; o2++) {
              var i2 = e4[o2], a2 = i2.code, s2 = i2.data;
              if (0 === a2 && 0 !== s2.messageList.length) {
                t2._handleMessageList(s2.messageList);
                var r2 = t2._relayGetMessageList(s2);
                r2 && n2.push(r2);
              }
            }
            return n2.length > 0 ? t2._concurrentGetMessageList(n2) : t2._signalingMap;
          });
        } }, { key: "_relayGetMessageList", value: function(e3) {
          var t2 = e3.messageList, n2 = e3.nextReqMessageID, o2 = e3.isCompleted, i2 = t2.length;
          if (0 === i2)
            return null;
          var a2 = t2[0], s2 = a2.conversationID, r2 = a2.conversationType, c2 = this._signalingMap.get(s2).needMessageCount, u2 = r2 === L.CONV_GROUP, l2 = 0 === c2 || o2, d2 = this._isSignalingNotExpired(t2[i2 - 1], "time");
          return u2 || l2 || !d2 ? null : this._signalingModule.getModule(to).getMessageList({ conversationID: s2, nextReqMessageID: n2, count: c2 });
        } }, { key: "_handleMessageList", value: function(e3) {
          for (var t2 = e3.length, n2 = e3[0].conversationID, o2 = this._signalingMap.get(n2), i2 = o2.needMessageCount, a2 = o2.signalingList, s2 = i2 - t2 > 0 ? i2 - t2 : 0, r2 = [], c2 = 0; c2 < e3.length; c2++) {
            var u2 = e3[c2];
            this._isSignalingNotExpired(u2, "time") && r2.push(u2);
          }
          var l2 = this._signalingModule.filterMessageList(r2);
          this._signalingMap.set(n2, { needMessageCount: s2, signalingList: a2.concat(l2) });
        } }, { key: "_getSignalingRelatedToMeMap", value: function(e3) {
          for (var t2 = 0; t2 < e3.length; t2++) {
            var n2 = e3[t2];
            this._saveSignalingRelatedToMe(n2);
          }
          return this._signalingRelatedToMeMap;
        } }, { key: "_saveSignalingRelatedToMe", value: function(e3) {
          var n2 = this._signalingModule.getRemoteSignalingHandler().getPayloadData(e3) || {}, o2 = n2.actionType, i2 = void 0 === o2 ? "" : o2, a2 = n2.inviteID, s2 = void 0 === a2 ? "" : a2, r2 = n2.inviteeList, c2 = void 0 === r2 ? [] : r2, u2 = this._signalingModule.getMyUserID();
          switch (i2) {
            case N.ACTION_TYPE_INVITE:
              c2.includes(u2) && this._signalingRelatedToMeMap.set(s2, t(t({}, n2), {}, { messageList: [e3] }));
              break;
            case N.ACTION_TYPE_REJECT_INVITE:
            case N.ACTION_TYPE_ACCEPT_INVITE:
              this.updateHistoryInviteInfo(e3);
              break;
            case N.ACTION_TYPE_CANCEL_INVITE:
              this.deleteHistoryInviteInfo(s2);
              break;
            case N.ACTION_TYPE_INVITE_TIMEOUT:
              this.updateHistoryInviteInfo(e3);
          }
        } }, { key: "deleteHistoryInviteInfo", value: function(e3) {
          this._signalingRelatedToMeMap.has(e3) && this._signalingRelatedToMeMap.delete(e3);
        } }, { key: "updateHistoryInviteInfo", value: function(e3) {
          var t2 = this._signalingModule.getRemoteSignalingHandler().getPayloadData(e3) || {}, n2 = t2.inviteID, o2 = void 0 === n2 ? "" : n2, i2 = t2.inviteeList, a2 = void 0 === i2 ? [] : i2;
          if (this._signalingRelatedToMeMap.has(o2)) {
            for (var s2 = this._signalingRelatedToMeMap.get(o2), r2 = s2.inviteeList, c2 = s2.messageList, u2 = 0; u2 < a2.length; u2++) {
              var l2 = a2[u2];
              r2.includes(l2) && r2.splice(r2.indexOf(l2), 1);
            }
            0 === r2.length ? this.deleteHistoryInviteInfo(o2) : c2.push(e3);
          } else
            this.deleteHistoryInviteInfo(o2);
        } }, { key: "_sortSignaling", value: function(e3) {
          var t2 = [];
          return e3.forEach(function(e4) {
            t2 = [].concat(m(t2), m(e4.messageList));
          }), t2.sort(function(e4, t3) {
            return (e4.time ? e4.time : 0) - (t3.time ? t3.time : 0);
          });
        } }, { key: "reset", value: function() {
          this._signalingMap.clear(), this._signalingRelatedToMeMap.clear();
        } }]), e2;
      }(), su = a(function e2(t2, n2) {
        o(this, e2), this.businessID = t2.businessID || 1, this.inviteID = t2.inviteID, this.groupID = t2.groupID || "", this.inviter = t2.inviter || "", this.inviteeList = t2.inviteeList || [], this.data = t2.data || "", this.actionType = t2.actionType || N.ACTION_TYPE_INVITE, this.timeout = t2.timeout || 0;
      }), ru = ["message"], cu = ["message"], uu = function(e2) {
        r(i2, e2);
        var n2 = f(i2);
        function i2(e3) {
          var t2;
          return o(this, i2), (t2 = n2.call(this, e3))._n = "SignalingModule", t2._inviteInfoMap = /* @__PURE__ */ new Map(), t2._outerEmitter = new Yr(), t2._outerEmitter._emit = t2._outerEmitter.emit, t2._outerEmitter.emit = (function() {
            var e4 = arguments.length <= 0 ? void 0 : arguments[0], t3 = [e4, { name: arguments.length <= 0 ? void 0 : arguments[0], data: arguments.length <= 1 ? void 0 : arguments[1] }];
            this._outerEmitter._emit.apply(this._outerEmitter, [].concat(t3));
          }).bind(h(t2)), t2._canIUseSignaling = false, t2._isHandling = false, t2._remoteSignalingHandler = new tu(h(t2)), t2._localSignalingHandler = new iu(h(t2)), t2._historySignalingHandler = new au(h(t2)), t2._isC2CUnreadHandleCompleted = false, t2._isConvSyncCompleted = false, t2._isSyncCompleted = false, t2.getInnerEmitterInstance().on(Fs.C2C_UNREAD_HANDLE_COMPLETED, t2.onC2CUnreadHandleCompleted, h(t2)), t2.getInnerEmitterInstance().on(Fs.CONV_SYNC_COMPLETED, t2.onConvSyncCompleted, h(t2)), t2;
        }
        return a(i2, [{ key: "onC2CUnreadHandleCompleted", value: function() {
          this._isC2CUnreadHandleCompleted = true, this._isC2CUnreadHandleCompleted && this._isConvSyncCompleted && !this._isSyncCompleted && this.onReady();
        } }, { key: "onConvSyncCompleted", value: function() {
          this._isConvSyncCompleted = true, this._isC2CUnreadHandleCompleted && this._isConvSyncCompleted && !this._isSyncCompleted && this.onReady();
        } }, { key: "onReady", value: function() {
          Ye.l("".concat(this._n, ".onReady")), this._isSyncCompleted = true, this._historySignalingHandler.getHistorySignaling();
        } }, { key: "onNewMessageList", value: function(e3) {
          return this._remoteSignalingHandler.onNewMessageList(e3);
        } }, { key: "onMessageModified", value: function(e3) {
          return this._remoteSignalingHandler.onMessageModified(e3);
        } }, { key: "hasInviteInfo", value: function(e3) {
          return this._inviteInfoMap.has(e3);
        } }, { key: "getInviteInfo", value: function(e3) {
          return this._inviteInfoMap.get(e3);
        } }, { key: "setInviteInfo", value: function(e3, n3) {
          var o2 = n3.message, i3 = g(n3, ru);
          Ye.l("".concat(this._n, ".setInviteInfo inviteID:").concat(e3, " data:").concat(JSON.stringify(i3))), this._inviteInfoMap.set(e3, t(t({}, i3), {}, { message: o2 }));
        } }, { key: "deleteInviteInfo", value: function(e3) {
          this.hasInviteInfo(e3) && (Ye.l("".concat(this._n, ".deleteInviteInfo inviteID:").concat(e3, ".")), this._inviteInfoMap.delete(e3));
        } }, { key: "updateInviteInfo", value: function(e3) {
          var t2 = "".concat(this._n, ".updateInviteInfo"), n3 = e3.inviteID, o2 = e3.inviter, i3 = e3.inviteeList, a2 = e3.groupID;
          if (Ye.l("".concat(t2, " inviteID:").concat(n3, " inviter:").concat(o2, " groupID:").concat(a2)), a2 && this.hasInviteInfo(n3)) {
            var s2 = i3[0], r2 = this.getInviteInfo(n3).inviteeList;
            r2.includes(s2) && (r2.splice(r2.indexOf(s2), 1), Ye.l("".concat(t2, " remove ").concat(s2, ". localInviteeList.length:").concat(r2.length))), 0 === r2.length && this.deleteInviteInfo(n3);
          } else
            this.deleteInviteInfo(n3);
        } }, { key: "getLocalSignalingHandler", value: function() {
          return this._localSignalingHandler;
        } }, { key: "getRemoteSignalingHandler", value: function() {
          return this._remoteSignalingHandler;
        } }, { key: "canIUseSignaling", value: function() {
          return this._canIUseSignaling;
        } }, { key: "emitEvent", value: function(e3, t2) {
          this._outerEmitter.emit(e3, t2);
        } }, { key: "addSignalingListener", value: function(e3, t2, n3) {
          this._canIUseSignaling || (this._canIUseSignaling = true), this._outerEmitter.on(e3, t2, n3);
        } }, { key: "removeSignalingListener", value: function(e3, t2, n3) {
          this._outerEmitter.off(e3, t2, n3), 0 === this._outerEmitter.eventNames().length && (this._canIUseSignaling = false);
        } }, { key: "invite", value: function(e3) {
          var n3 = this, o2 = "".concat(this._n, ".").concat("invite"), i3 = this._localSignalingHandler.createInviteInfo(e3), a2 = i3.message, s2 = i3.customData, r2 = i3.inviteID;
          return Ye.l("".concat(o2, " options:").concat(JSON.stringify(e3), " inviteID:").concat(r2)), this.sendSignaling(a2, e3).then(function(e4) {
            return e4 && 0 === e4.code ? (n3.setInviteInfo(r2, t(t({}, s2), {}, { message: a2 })), n3.startTimer(t(t({}, s2), {}, { inviteID: r2 })), t(t({}, e4), {}, { inviteID: r2 })) : e4;
          }).catch(function(e4) {
            return Ro(e4);
          });
        } }, { key: "inviteSync", value: function(e3, n3, o2) {
          var i3 = this, a2 = "".concat(this._n, ".").concat("inviteSync"), s2 = this._localSignalingHandler.createInviteInfo(e3), r2 = s2.message, c2 = s2.customData, u2 = s2.inviteID;
          return Ye.l("".concat(a2, " options:").concat(JSON.stringify(e3), " inviteID:").concat(u2)), this.sendSignaling(r2, e3).then(function(e4) {
            if (e4 && 0 === e4.code)
              return i3.setInviteInfo(u2, t(t({}, c2), {}, { message: r2 })), i3.startTimer(t(t({}, c2), {}, { inviteID: u2 })), n3 && n3({ inviteID: u2 }), { inviteID: u2 };
            o2 && o2(0 === e4.code, e4.message || "");
          }).catch(function(e4) {
            return o2 && o2(e4.code, e4.message), Ro(e4);
          }), u2;
        } }, { key: "_handleImResponse", value: function(e3, t2, n3) {
          t2 && 0 === t2.code && (this._isHandling = false, n3 ? this.deleteInviteInfo(e3.inviteID) : this.updateInviteInfo(e3));
        } }, { key: "cancel", value: function(e3) {
          var n3 = this, o2 = "".concat(this._n, ".").concat("cancel");
          if (Ye.l("".concat(o2, " options:").concat(JSON.stringify(e3))), !this.hasInviteInfo(e3.inviteID) || this._isHandling)
            return Ro({ code: No.INVALID_CANCEL_MESSAGE });
          this._isHandling = true;
          var i3 = this._localSignalingHandler.createCancelCustomData(e3);
          if (!i3)
            return this._isHandling = false, Ro({ code: No.SIGNALING_NO_PERMISSION });
          var a2 = i3.groupID, s2 = i3.inviteeList, r2 = a2 || s2[0], c2 = this._localSignalingHandler.createSignalingMessage(i3, r2);
          return this.sendSignaling(c2, e3).then(function(o3) {
            return n3._handleImResponse(i3, o3, true), 0 === o3.code ? t(t({}, o3), {}, { inviteID: e3.inviteID }) : o3;
          }).catch(function(e4) {
            return Ro(e4);
          });
        } }, { key: "accept", value: function(e3) {
          var n3 = this, o2 = "".concat(this._n, ".").concat("accept");
          if (Ye.l("".concat(o2, " options:").concat(JSON.stringify(e3))), !this.hasInviteInfo(e3.inviteID) || this._isHandling)
            return Ro({ code: No.SIGNALING_INVALID_INVITE_ID });
          this._isHandling = true;
          var i3 = this._localSignalingHandler.createAcceptCustomData(e3);
          if (!i3)
            return this._isHandling = false, Ro({ code: No.SIGNALING_NO_PERMISSION });
          var a2 = this._localSignalingHandler.createSignalingMessage(i3);
          return this.sendSignaling(a2, e3).then(function(o3) {
            return n3._handleImResponse(i3, o3), 0 === o3.code ? t(t({}, o3), {}, { inviteID: e3.inviteID }) : o3;
          }).catch(function(e4) {
            return Ro(e4);
          });
        } }, { key: "reject", value: function(e3) {
          var n3 = this, o2 = "".concat(this._n, ".").concat("reject");
          if (Ye.l("".concat(o2, " options:").concat(JSON.stringify(e3))), !this.hasInviteInfo(e3.inviteID) || this._isHandling)
            return Ro({ code: No.SIGNALING_INVALID_INVITE_ID });
          this._isHandling = true;
          var i3 = this._localSignalingHandler.createRejectCustomData(e3);
          if (!i3)
            return this._isHandling = false, Ro({ code: No.SIGNALING_NO_PERMISSION });
          var a2 = this._localSignalingHandler.createSignalingMessage(i3);
          return this.sendSignaling(a2, e3).then(function(o3) {
            return n3._handleImResponse(i3, o3, true), 0 === o3.code ? t(t({}, o3), {}, { inviteID: e3.inviteID }) : o3;
          }).catch(function(e4) {
            return Ro(e4);
          });
        } }, { key: "getSignalingInfo", value: function(e3) {
          var t2 = "".concat(this._n, ".getSignalingInfo"), n3 = e3.ID, o2 = e3.from, i3 = e3.to, a2 = this._filterSignalingMessage(e3), s2 = null;
          if (a2) {
            var r2 = this._remoteSignalingHandler.getPayloadData(e3);
            s2 = new su(r2);
          }
          var c2 = a2 ? "actionType:".concat(s2.actionType) : "";
          return Ye.l("".concat(t2, " messageID:").concat(n3, " from:").concat(o2, " to:").concat(i3) + "".concat(c2, " isSignaling:").concat(a2)), s2;
        } }, { key: "modifyInvitation", value: function(e3) {
          var n3 = this, o2 = e3.inviteID, i3 = e3.data;
          if (!this.hasInviteInfo(e3.inviteID) || this._isHandling)
            return Ro({ code: No.SIGNALING_INVALID_INVITE_ID });
          this._isHandling = true;
          var a2 = this.getInviteInfo(o2), s2 = a2.message, r2 = g(a2, cu), c2 = s2.payload.data;
          return r2.data = i3, s2.payload.data = JSON.stringify(r2), this.getModule(Jn).modifyRemoteMessage(s2).then(function(e4) {
            return n3.setInviteInfo(o2, t(t({}, r2), {}, { message: s2 })), n3._isHandling = false, e4;
          }).catch(function(e4) {
            return n3._isHandling = false, s2.payload.data = c2, Ro(e4);
          });
        } }, { key: "_genMessageControlInfo", value: function() {
          var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = e3.data, n3 = void 0 === t2 ? "" : t2, o2 = e3.onlineUserOnly, i3 = e3.inviteID, a2 = void 0 === i3 ? "" : i3, s2 = e3.offlinePushInfo, r2 = e3.actionType, c2 = { _onlineOnlyFlag: false };
          a2 && this.getInviteInfo(a2) && (c2 = this.getInviteInfo(a2).message);
          var u2 = { onlineUserOnly: c2._onlineOnlyFlag || o2 || false, offlinePushInfo: s2, messageControlInfo: { excludedFromContentModeration: true, excludedFromUnreadCount: false, excludedFromLastMessage: false } };
          if (r2 === N.ACTION_TYPE_INVITE_TIMEOUT) {
            var l2 = !!n3.match(/excludeTimeoutSignalingFromHistoryMessage/);
            return u2.messageControlInfo.excludedFromUnreadCount = l2, u2.messageControlInfo.excludedFromLastMessage = l2, u2;
          }
          var d2 = !!n3.match(/excludeFromHistoryMessage/), p2 = !!n3.match(/excludeOriginalSignalingFromHistoryMessage/);
          return u2.messageControlInfo.excludedFromUnreadCount = d2 || p2, u2.messageControlInfo.excludedFromLastMessage = d2 || p2, u2;
        } }, { key: "sendSignaling", value: function(e3, t2) {
          var n3 = this;
          return this.getModule(Jn).sendMessageInstance(e3, this._genMessageControlInfo(t2)).catch(function(e4) {
            return n3._isHandling = false, Ro({ code: No.SEND_MESSAGE_FAILED_WITH_CANCEL });
          });
        } }, { key: "filterMessageList", value: function(e3) {
          var t2 = this;
          return e3.filter(function(e4) {
            return t2._filterSignalingMessage(e4);
          });
        } }, { key: "_filterSignalingMessage", value: function(e3) {
          var t2 = false;
          if (e3.type && e3.type === L.MSG_CUSTOM) {
            var n3 = e3.cloudCustomData, o2 = void 0 === n3 ? "" : n3, i3 = e3.payload.data, a2 = void 0 === i3 ? "" : i3, s2 = o2.match(/"type":"tsignaling"/), r2 = a2.match(/inviteID/), c2 = a2.match(/actionType/);
            t2 = s2 || r2 && c2;
          }
          return !!t2;
        } }, { key: "startTimer", value: function(e3) {
          var t2 = this, n3 = "".concat(this._n, ".startTimer"), o2 = e3.timeout, i3 = e3.inviteID, a2 = e3.inviter, s2 = e3.groupID, r2 = a2 === this.getMyUserID();
          if (Ye.l("".concat(n3, " timeout:").concat(o2, " isInviter:").concat(r2, " groupID:").concat(s2)), !(o2 <= 0))
            var c2 = r2 ? o2 + 5 : o2, u2 = 1, l2 = setInterval(function() {
              var o3 = t2._hasLocalInviteInfo(e3, r2);
              u2 < c2 && o3 ? ++u2 : (o3 && t2._sendTimeoutNotice(i3, r2), Ye.l("".concat(n3, " end.")), clearInterval(l2));
            }, 1e3);
        } }, { key: "_hasLocalInviteInfo", value: function(e3, t2) {
          var n3 = e3.inviteID, o2 = e3.groupID;
          if (!this.hasInviteInfo(n3))
            return false;
          var i3 = "".concat(this._n, "._hasLocalInviteInfo"), a2 = this.getInviteInfo(n3).inviteeList;
          return Ye.l("".concat(i3, " inviteID:").concat(n3, " inviteeList:").concat(a2, " groupID:").concat(o2)), !o2 || (t2 ? a2.length > 0 : a2.length > 0 && a2.includes(this.getMyUserID()));
        } }, { key: "_getReceiver", value: function(e3, t2) {
          var n3 = t2.groupID, o2 = t2.inviteeList, i3 = t2.inviter;
          return e3 ? n3 || o2[0] : n3 || i3;
        } }, { key: "_sendTimeoutNotice", value: function(e3, n3) {
          var o2 = this, i3 = this.getInviteInfo(e3), a2 = this._getReceiver(n3, i3);
          Ye.l("".concat(this._n, "._sendTimeoutNotice inviteID:").concat(e3, " to:").concat(a2, " isInviter:").concat(n3));
          var s2 = this._localSignalingHandler.createTimeoutCustomData(t(t({}, i3), {}, { isInviter: n3 })), r2 = this._localSignalingHandler.createSignalingMessage(s2, a2);
          return this.sendSignaling(r2, s2).then(function(t2) {
            if (t2 && 0 === t2.code) {
              var i4 = s2.data, a3 = s2.groupID, c2 = s2.inviteeList, u2 = s2.inviter;
              o2.emitEvent(N.INVITATION_TIMEOUT, { data: i4, groupID: a3, inviteID: e3, inviteeList: c2, inviter: u2, isSelfTimeout: true, message: r2 }), n3 ? o2.deleteInviteInfo(e3) : o2.updateInviteInfo(s2);
            }
          });
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), this._inviteInfoMap.clear(), this._canIUseSignaling = false, this._isHandling = false, this._historySignalingHandler.reset(), this._isC2CUnreadHandleCompleted = false, this._isConvSyncCompleted = false, this._isSyncCompleted = false;
        } }]), i2;
      }(Oo), lu = function() {
        function e2(t2) {
          var n2 = this;
          o(this, e2);
          var i2, a2 = new Ms("sdkConstruct");
          (this._n = "ModuleManager", this._isReady = false, this._reason = No.USER_NOT_LOGGED_IN, this._startLoginTs = 0, this._moduleMap = /* @__PURE__ */ new Map(), this._innerEmitter = null, this._outerEmitter = null, this._checkCount = 0, this._checkTimer = -1, this._moduleMap.set(no, new Ur(this, t2)), this._moduleMap.set(vo, new Xc(this)), this._moduleMap.set(go, new Uc(this)), this._moduleMap.set(ho, new Jc(this)), this._moduleMap.set(fo, new xc(this)), this._moduleMap.set(lo, new kc(this)), this._moduleMap.set(uo, new Oc(this)), this._moduleMap.set(jn, new br(this)), this._moduleMap.set(Jn, new tc(this)), this._moduleMap.set(zn, new nc(this)), this._moduleMap.set(To, new oc(this)), this._moduleMap.set(Io, new ic(this)), this._moduleMap.set(Xn, new Gr(this)), this._moduleMap.set(Qn, new bs(this)), this._moduleMap.set(to, new tr(this)), this._moduleMap.set(Zn, new Dr(this)), this._moduleMap.set(eo, new Nr(this)), this._moduleMap.set(oo, new Fr(this)), this._moduleMap.set(Co, new eu(this)), this._moduleMap.set(io, new Vr(this)), this._moduleMap.set(ao, new Wr(this)), this._moduleMap.set(so, new Jr(this)), this._moduleMap.set(ro, new ac(this)), this._moduleMap.set(co, new sc(this)), this._moduleMap.set(po, new Gc(this)), this._moduleMap.set(_o, new Pc(this)), this._moduleMap.set($n, new jc(this)), this._moduleMap.set(mo, new Qc(this)), this._moduleMap.set(Mo, new Zc(this)), this._moduleMap.set(yo, new $c(this)), this._moduleMap.set(Do, new uu(this)), this._eventThrottleMap = /* @__PURE__ */ new Map(), ht(t2.modules)) && Object.keys(t2.modules).forEach(function(e3) {
            i2 = t2.modules[e3], "group-module" === e3 ? n2._moduleMap.set(Zn, new i2(n2)) : "relationship-module" === e3 ? n2._moduleMap.set($n, new i2(n2)) : "signaling-module" === e3 && n2._moduleMap.set(Do, new i2(n2));
          });
          var s2 = t2.instanceID, r2 = t2.SDKAppID, c2 = this._moduleMap.get(no).isIntl(), u2 = "instanceID:".concat(s2, " SDKAppID:").concat(r2, " isIntl:").concat(c2, " host:").concat(Bt(), " isIOSWebView:").concat(Ue) + " inBrowser:".concat(re, " inMiniApp:").concat(se) + " workerAvailable:".concat(Re, " UserAgent:").concat(ue);
          Ms.bindEventStatModule(this._moduleMap.get(io)), a2.setMessage("".concat(u2, " ").concat(function() {
            var e3 = "";
            if (se)
              try {
                var t3 = ce.getSystemInfoSync(), n3 = t3.model, o2 = t3.version, i3 = t3.system, a3 = t3.platform, s3 = t3.SDKVersion;
                e3 = "model:".concat(n3, " version:").concat(o2, " system:").concat(i3, " platform:").concat(a3, " SDKVersion:").concat(s3);
              } catch (r3) {
                e3 = "";
              }
            return e3;
          }())).end(), Ye.i("SDK ".concat(u2)), Lo.prototype._getErrorMessage = this.getErrorMessage.bind(this), this._readyList = void 0, this._ssoLogForReady = null, this._initReadyList();
        }
        return a(e2, [{ key: "_startTimer", value: function() {
          var e3 = this._moduleMap.get(ho), t2 = e3.isWorkerEnabled();
          Ye.l("".concat(this._n, ".startTimer isWorkerEnabled:").concat(t2, " seed:").concat(this._checkTimer)), t2 ? e3.startWorkerTimer() : this._startMainThreadTimer();
        } }, { key: "_startMainThreadTimer", value: function() {
          this._checkTimer < 0 && (this._checkTimer = setInterval(this.onCheckTimer.bind(this), 1e3)), Ye.l("".concat(this._n, "._startMainThreadTimer seed:").concat(this._checkTimer));
        } }, { key: "stopTimer", value: function() {
          var e3 = this._moduleMap.get(ho), t2 = e3.isWorkerEnabled();
          Ye.l("".concat(this._n, ".stopTimer isWorkerEnabled:").concat(t2, " seed:").concat(this._checkTimer)), t2 ? e3.stopWorkerTimer() : this._stopMainThreadTimer();
        } }, { key: "_stopMainThreadTimer", value: function() {
          Ye.l("".concat(this._n, "._stopMainThreadTimer")), this._checkTimer > 0 && (clearInterval(this._checkTimer), this._checkTimer = -1, this._checkCount = 0);
        } }, { key: "_stopMainThreadSocket", value: function() {
          Ye.l("".concat(this._n, "._stopMainThreadSocket"));
          var e3 = this._moduleMap.get(lo);
          e3.setIsWorkerEnabled(true), e3.reConnect();
        } }, { key: "_startMainThreadSocket", value: function() {
          Ye.l("".concat(this._n, "._startMainThreadSocket"));
          var e3 = this._moduleMap.get(lo);
          e3.setIsWorkerEnabled(false), e3.reConnect();
        } }, { key: "onWorkerTimerEnabled", value: function() {
          Ye.l("".concat(this._n, ".onWorkerTimerEnabled, disable main thread timer and socket")), this._stopMainThreadTimer(), this._stopMainThreadSocket();
        } }, { key: "onWorkerTimerDisabled", value: function() {
          Ye.l("".concat(this._n, ".onWorkerTimerDisabled, enable main thread timer and socket")), this._startMainThreadTimer(), this._startMainThreadSocket();
        } }, { key: "onCheckTimer", value: function() {
          this._checkCount += 1;
          var e3, t2 = T(this._moduleMap);
          try {
            for (t2.s(); !(e3 = t2.n()).done; ) {
              var n2 = v(e3.value, 2)[1];
              n2.onCheckTimer && n2.onCheckTimer(this._checkCount);
            }
          } catch (o2) {
            t2.e(o2);
          } finally {
            t2.f();
          }
        } }, { key: "_initReadyList", value: function() {
          var e3 = this;
          this._readyList = [this._moduleMap.get(jn)], this._readyList.forEach(function(t2) {
            t2.ready(function() {
              return e3._onModuleReady();
            });
          });
        } }, { key: "_onModuleReady", value: function() {
          var e3 = true;
          if (this._readyList.forEach(function(t3) {
            t3.isReady() || (e3 = false);
          }), e3 && !this._isReady) {
            this._isReady = true, this._outerEmitter.emit(k.SDK_READY);
            var t2 = Date.now() - this._startLoginTs;
            Ye.w("SDK is ready. cost ".concat(t2, " ms")), this._startLoginTs = Date.now();
            var n2 = this._moduleMap.get(ao).getNetworkType(), o2 = this._ssoLogForReady.getStartTs() + qe;
            this._ssoLogForReady.setNetworkType(n2).setMessage(t2).start(o2).end();
          }
        } }, { key: "login", value: function() {
          0 === this._startLoginTs && (Ve(), this._startLoginTs = Date.now(), this._startTimer(), this._moduleMap.get(ao).start(), this._ssoLogForReady = new Ms("sdkReady"), this._reason = No.LOGGING_IN);
        } }, { key: "onLoginFailed", value: function() {
          this._startLoginTs = 0;
        } }, { key: "getOuterEmitterInstance", value: function() {
          return null === this._outerEmitter && (this._outerEmitter = new Yr(), Ao(this._outerEmitter), this._outerEmitter._emit = this._outerEmitter.emit, this._outerEmitter.emit = (function(e3, t2) {
            var n2 = this;
            if (this._canIUseSignaling()) {
              if (e3 === k.MESSAGE_RECEIVED) {
                var o2 = this.getModule(Do);
                o2.onNewMessageList(t2);
              }
              if (e3 === k.MESSAGE_MODIFIED) {
                var i2 = this.getModule(Do);
                i2.onMessageModified(t2);
              }
            }
            if (e3 === k.CONVERSATION_LIST_UPDATED || e3 === k.FRIEND_LIST_UPDATED || e3 === k.GROUP_LIST_UPDATED || e3 === k.TOTAL_UNREAD_MESSAGE_COUNT_UPDATED)
              if (this._eventThrottleMap.has(e3)) {
                var a2 = Date.now(), s2 = this._eventThrottleMap.get(e3);
                a2 - s2.last <= 1e3 ? (s2.timeoutID && clearTimeout(s2.timeoutID), s2.timeoutID = setTimeout(function() {
                  s2.last = Date.now(), n2._outerEmitter._emit.apply(n2._outerEmitter, [e3, { name: e3, data: n2._getEventData(e3) }]);
                }, 1e3)) : (s2.last = a2, this._outerEmitter._emit.apply(this._outerEmitter, [e3, { name: e3, data: this._getEventData(e3) }]));
              } else
                this._eventThrottleMap.set(e3, { last: Date.now(), timeoutID: -1 }), this._outerEmitter._emit.apply(this._outerEmitter, [e3, { name: e3, data: this._getEventData(e3) }]);
            else
              this._outerEmitter._emit.apply(this._outerEmitter, [e3, { name: e3, data: arguments[1] }]);
          }).bind(this)), this._outerEmitter;
        } }, { key: "_canIUseSignaling", value: function() {
          var e3 = this.getModule(Do);
          return !!e3 && e3.canIUseSignaling();
        } }, { key: "_getEventData", value: function(e3) {
          return e3 === k.CONVERSATION_LIST_UPDATED ? this._moduleMap.get(to).getLocalConversationList() : e3 === k.FRIEND_LIST_UPDATED ? this._moduleMap.get($n).getLocalFriendList(false) : e3 === k.GROUP_LIST_UPDATED ? this._moduleMap.get(Zn).getLocalGroupList() : e3 === k.TOTAL_UNREAD_MESSAGE_COUNT_UPDATED ? this._moduleMap.get(to).getTotalUnreadMessageCount() : void 0;
        } }, { key: "getInnerEmitterInstance", value: function() {
          return null === this._innerEmitter && (this._innerEmitter = new Yr(), this._innerEmitter._emit = this._innerEmitter.emit, this._innerEmitter.emit = (function(e3, t2) {
            var n2;
            n2 = ht(arguments[1]) && arguments[1].data ? [e3, { name: arguments[0], data: arguments[1].data }] : [e3, { name: arguments[0], data: arguments[1] }], this._innerEmitter._emit.apply(this._innerEmitter, n2);
          }).bind(this)), this._innerEmitter;
        } }, { key: "hasModule", value: function(e3) {
          return this._moduleMap.has(e3);
        } }, { key: "getModule", value: function(e3) {
          return this._moduleMap.get(e3);
        } }, { key: "isReady", value: function() {
          return this._isReady;
        } }, { key: "isIntl", value: function() {
          return this.getModule(no).isIntl();
        } }, { key: "getNotReadyReason", value: function() {
          return this._reason;
        } }, { key: "setNotReadyReason", value: function(e3) {
          this._reason = e3;
        } }, { key: "getErrorMessage", value: function(e3, t2, n2) {
          return this._moduleMap.get(Co).get({ key: e3, replacement1: t2, replacement2: n2, isIntl: this.isIntl() });
        } }, { key: "outputWarning", value: function(e3, t2, n2) {
          var o2 = this.getErrorMessage(e3, t2, n2);
          o2 && Ye.w(o2);
        } }, { key: "onError", value: function(e3) {
          var t2 = "code:".concat(e3.code, " message:").concat(e3.message);
          Ye.w("Oops! ".concat(t2)), new Ms("error").setMessage(t2).setNetworkType(this.getModule(ao).getNetworkType()).setLevel("error").end(), this.getOuterEmitterInstance().emit(k.ERROR, e3);
        } }, { key: "restartTimer", value: function() {
          Ye.l("".concat(this._n, ".restartTimer")), this.stopTimer(), this._startTimer();
          var e3 = this.getModule(Zn);
          e3 && e3.restartPolling();
        } }, { key: "getTimerID", value: function() {
          var e3 = this._moduleMap.get(ho);
          return e3.isWorkerEnabled() ? e3.getTimerID() : this._checkTimer;
        } }, { key: "getPollingTimerID", value: function(e3) {
          return this._moduleMap.get(Zn).getPollingTimerID(e3);
        } }, { key: "reset", value: function() {
          Ye.l("".concat(this._n, ".reset")), Ve();
          var e3, t2 = T(this._moduleMap);
          try {
            for (t2.s(); !(e3 = t2.n()).done; ) {
              var n2 = v(e3.value, 2)[1];
              n2.reset && n2.reset();
            }
          } catch (s2) {
            t2.e(s2);
          } finally {
            t2.f();
          }
          this._startLoginTs = 0, this._initReadyList(), this._isReady = false, this.stopTimer(), this._outerEmitter.emit(k.SDK_NOT_READY);
          var o2, i2 = T(this._eventThrottleMap);
          try {
            for (i2.s(); !(o2 = i2.n()).done; ) {
              var a2 = v(o2.value, 2)[1];
              a2.timeoutID && clearTimeout(a2.timeoutID);
            }
          } catch (s2) {
            i2.e(s2);
          } finally {
            i2.f();
          }
          this._eventThrottleMap.clear();
        } }]), e2;
      }(), du = function() {
        function e2(t2) {
          o(this, e2), this._funcMap = /* @__PURE__ */ new Map(), this._m = t2;
        }
        return a(e2, [{ key: "defense", value: function(e3, t2) {
          var n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
          if ("string" != typeof e3)
            return null;
          if (0 === e3.length)
            return null;
          if ("function" != typeof t2)
            return null;
          if (this._funcMap.has(e3) && this._funcMap.get(e3).has(t2))
            return this._funcMap.get(e3).get(t2);
          this._funcMap.has(e3) || this._funcMap.set(e3, /* @__PURE__ */ new Map());
          var o2 = null;
          return this._funcMap.get(e3).has(t2) ? o2 = this._funcMap.get(e3).get(t2) : (o2 = this._pack(e3, t2, n2), this._funcMap.get(e3).set(t2, o2)), o2;
        } }, { key: "defenseOnce", value: function(e3, t2) {
          var n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
          return "function" != typeof t2 ? null : this._pack(e3, t2, n2);
        } }, { key: "find", value: function(e3, t2) {
          return "string" != typeof e3 || 0 === e3.length || "function" != typeof t2 ? null : this._funcMap.has(e3) && this._funcMap.get(e3).has(t2) ? this._funcMap.get(e3).get(t2) : (this._m.outputWarning("ListenerFnNotFound", e3), null);
        } }, { key: "delete", value: function(e3, t2) {
          return "function" == typeof t2 && (!!this._funcMap.has(e3) && (!!this._funcMap.get(e3).has(t2) && (this._funcMap.get(e3).delete(t2), 0 === this._funcMap.get(e3).size && this._funcMap.delete(e3), true)));
        } }, { key: "_pack", value: function(e3, t2, n2) {
          var o2 = this;
          return function() {
            try {
              t2.apply(n2, Array.from(arguments));
            } catch (c2) {
              var i2 = Object.values(k).indexOf(e3), a2 = "CallbackError";
              if (-1 !== i2) {
                var s2 = Object.keys(k)[i2];
                o2._m.outputWarning(a2, s2, c2);
              }
              var r2 = new Ms(a2);
              r2.setMessage("eventName:".concat(e3)).setMoreMessage(c2.message).end();
            }
          };
        } }]), e2;
      }(), pu = function() {
        function e2(t2) {
          o(this, e2);
          var n2 = { SDKAppID: t2.SDKAppID, unlimitedAVChatRoom: t2.unlimitedAVChatRoom || false, scene: t2.scene || "", oversea: t2.oversea || false, instanceID: Ht(), devMode: t2.devMode || false, proxyServer: t2.proxyServer || void 0, fileUploadProxy: t2.fileUploadProxy || void 0, fileDownloadProxy: t2.fileDownloadProxy || t2.fileUploadProxy || void 0, modules: t2.modules || void 0 };
          this._m = new lu(n2), this._vendorMap = /* @__PURE__ */ new Map(), this._safetyCallbackFactory = new du(this._m);
        }
        return a(e2, [{ key: "onError", value: function(e3) {
          this._m.onError(e3);
        } }, { key: "login", value: function(e3) {
          return this._m.login(), this._getModule(jn).login(e3);
        } }, { key: "logout", value: function() {
          var e3 = this;
          return this._getModule(jn).logout().then(function(t2) {
            return e3._m.reset(), t2;
          });
        } }, { key: "isReady", value: function() {
          return this._m.isReady();
        } }, { key: "isIntl", value: function() {
          return this._m.isIntl();
        } }, { key: "getNotReadyReason", value: function() {
          return this._m.getNotReadyReason();
        } }, { key: "getErrorMessage", value: function(e3, t2, n2) {
          return this._m.getErrorMessage(e3, t2, n2);
        } }, { key: "_getModule", value: function(e3) {
          return this._m.getModule(e3);
        } }, { key: "destroy", value: function() {
          var e3 = this;
          return this.logout().finally(function() {
            e3._m.stopTimer(), e3._getModule(ho).terminate(), e3._getModule(lo).dealloc();
            var t2 = e3._m.getOuterEmitterInstance(), n2 = e3._getModule(no);
            t2.emit(k.SDK_DESTROY, { SDKAppID: n2.getSDKAppID() });
          });
        } }, { key: "on", value: function(e3, t2, n2) {
          Ye.d("on", "eventName:".concat(e3)), this._m.getOuterEmitterInstance().on(e3, this._safetyCallbackFactory.defense(e3, t2, n2), n2);
        } }, { key: "once", value: function(e3, t2, n2) {
          Ye.d("once", "eventName:".concat(e3)), this._m.getOuterEmitterInstance().once(e3, this._safetyCallbackFactory.defenseOnce(e3, t2, n2), n2 || this);
        } }, { key: "off", value: function(e3, t2, n2, o2) {
          Ye.d("off", "eventName:".concat(e3));
          var i2 = this._safetyCallbackFactory.find(e3, t2);
          null !== i2 && (this._m.getOuterEmitterInstance().off(e3, i2, n2, o2), this._safetyCallbackFactory.delete(e3, t2));
        } }, { key: "registerPlugin", value: function(e3) {
          ft(e3["tim-offline-push-plugin"]) ? this._getModule(ro).registerPlugin(e3) : this._getModule(mo).registerPlugin(e3);
        } }, { key: "setLogLevel", value: function(e3) {
          if (e3 <= 0) {
            var t2 = this.getErrorMessage("TIM_ASCII_ART");
            t2 && console.log(t2);
            var n2 = this.getErrorMessage("API_REFER");
            if (n2) {
              tn() ? console.log("%c ".concat("IM SDK API ->", " %c"), "background:#ff9d00; padding:1px; border-radius:3px; color: #fff", "background:transparent", n2) : console.log("IM SDK API ->", n2);
            }
            var o2 = this.getErrorMessage("DOCS_GUIDE");
            o2 && console.log(o2);
            var i2 = this.getErrorMessage("IOS_WEBVIEW_WARNING");
            Ue && i2 && console.warn(i2);
          }
          Ye.setLevel(e3);
        } }, { key: "createTextMessage", value: function(e3) {
          return this._getModule(Jn).createTextMessage(e3);
        } }, { key: "createTextAtMessage", value: function(e3) {
          return this._getModule(Jn).createTextMessage(e3);
        } }, { key: "createImageMessage", value: function(e3) {
          return this._getModule(Jn).createImageMessage(e3);
        } }, { key: "createAudioMessage", value: function(e3) {
          return this._getModule(Jn).createAudioMessage(e3);
        } }, { key: "createVideoMessage", value: function(e3) {
          return this._getModule(Jn).createVideoMessage(e3);
        } }, { key: "createCustomMessage", value: function(e3) {
          return this._getModule(Jn).createCustomMessage(e3);
        } }, { key: "createFaceMessage", value: function(e3) {
          return this._getModule(Jn).createFaceMessage(e3);
        } }, { key: "createFileMessage", value: function(e3) {
          return this._getModule(Jn).createFileMessage(e3);
        } }, { key: "createLocationMessage", value: function(e3) {
          return this._getModule(Jn).createLocationMessage(e3);
        } }, { key: "createMergerMessage", value: function(e3) {
          return this._getModule(Jn).createMergerMessage(e3);
        } }, { key: "downloadMergerMessage", value: function(e3) {
          return e3.type !== L.MSG_MERGER ? Ro({ code: No.MSG_MERGER_TYPE_INVALID }) : un(e3.payload.downloadKey) ? Ro({ code: No.MSG_MERGER_KEY_INVALID }) : this._getModule(Jn).downloadMergerMessage(e3).catch(function(e4) {
            return Ro({ code: No.MSG_MERGER_DOWNLOAD_FAIL });
          });
        } }, { key: "createForwardMessage", value: function(e3) {
          return this._getModule(Jn).createForwardMessage(e3);
        } }, { key: "sendMessage", value: function(e3, t2) {
          return e3 instanceof Ps ? this._getModule(Jn).sendMessageInstance(e3, t2) : Ro({ code: No.MSG_INSTANCE_REQUIRED });
        } }, { key: "searchCloudMessages", value: function(e3) {
          return this._getModule(Jn).searchCloudMessages(e3);
        } }, { key: "callExperimentalAPI", value: function(e3, t2) {
          return "sendComboMessage" === e3 ? this._getModule(Io).sendMessage(t2) : "handleGroupInvitation" === e3 ? this._getModule(Zn).handleGroupInvitation(t2) : "isCommercialAbilityEnabled" === e3 ? this._getModule(vo).isFeatureEnabled(t2) : "isIntl" === e3 ? this.isIntl() : "sendTRTCCustomData" === e3 ? this._getModule(yo).sendTRTCCustomData(t2) : "getTimerID" === e3 ? this._m.getTimerID() : "getPollingTimerID" === e3 ? this._m.getPollingTimerID(t2) : Ro({ code: No.INVALID_OPERATION });
        } }, { key: "revokeMessage", value: function(e3) {
          return this._getModule(Jn).revokeMessage(e3);
        } }, { key: "resendMessage", value: function(e3, t2) {
          return e3 instanceof Ps ? this._getModule(Jn).resendMessage(e3, t2) : Ro({ code: No.MSG_INSTANCE_REQUIRED });
        } }, { key: "deleteMessage", value: function(e3) {
          return this._getModule(Jn).deleteMessage(e3);
        } }, { key: "translateText", value: function(e3) {
          return this._getModule(Jn).translateText(e3);
        } }, { key: "convertVoiceToText", value: function(e3) {
          return this._getModule(Jn).convertVoiceToText(e3);
        } }, { key: "setMessageExtensions", value: function(e3, t2) {
          return this._getModule(zn).setMessageExtensions(e3, t2);
        } }, { key: "getMessageExtensions", value: function(e3) {
          return this._getModule(zn).getMessageExtensions(e3);
        } }, { key: "deleteMessageExtensions", value: function(e3, t2) {
          return this._getModule(zn).deleteMessageExtensions(e3, t2);
        } }, { key: "addMessageReaction", value: function(e3, t2) {
          return this._getModule(To).addMessageReaction(e3, t2);
        } }, { key: "removeMessageReaction", value: function(e3, t2) {
          return this._getModule(To).removeMessageReaction(e3, t2);
        } }, { key: "getMessageReactions", value: function(e3) {
          return this._getModule(To).getMessageReactions(e3);
        } }, { key: "getAllUserListOfMessageReaction", value: function(e3) {
          return this._getModule(To).getAllUserListOfMessageReaction(e3);
        } }, { key: "modifyMessage", value: function(e3) {
          return this._getModule(Jn).modifyRemoteMessage(e3);
        } }, { key: "getMessageList", value: function(e3) {
          return this._getModule(to).getMessageList(e3);
        } }, { key: "getMessageListHopping", value: function(e3) {
          return this._getModule(to).getMessageListHopping(e3);
        } }, { key: "sendMessageReadReceipt", value: function(e3) {
          return this._getModule(to).sendReadReceipt(e3);
        } }, { key: "getMessageReadReceiptList", value: function(e3) {
          return this._getModule(to).getReadReceiptList(e3);
        } }, { key: "getGroupMessageReadMemberList", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.getReadReceiptDetail(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "findMessage", value: function(e3) {
          return this._getModule(to).findMessage(e3);
        } }, { key: "setMessageRead", value: function(e3) {
          return this._getModule(to).setMessageRead(e3);
        } }, { key: "getConversationList", value: function(e3) {
          return this._getModule(to).getConversationList(e3);
        } }, { key: "getConversationProfile", value: function(e3) {
          return this._getModule(to).getConversationProfile(e3);
        } }, { key: "deleteConversation", value: function(e3) {
          return this._getModule(to).deleteConversation(e3);
        } }, { key: "setConversationDraft", value: function(e3) {
          return this._getModule(to).setConversationDraft(e3);
        } }, { key: "clearHistoryMessage", value: function(e3) {
          return this._getModule(to).clearHistoryMessage(e3);
        } }, { key: "pinConversation", value: function(e3) {
          return this._getModule(to).pinConversation(e3);
        } }, { key: "setAllMessageRead", value: function(e3) {
          return this._getModule(to).setAllMessageRead(e3);
        } }, { key: "setMessageRemindType", value: function(e3) {
          return this._getModule(to).setMessageRemindType(e3);
        } }, { key: "getTotalUnreadMessageCount", value: function() {
          return this._getModule(to).getTotalUnreadMessageCount();
        } }, { key: "setConversationCustomData", value: function(e3) {
          return this._getModule(to).setConversationCustomData(e3);
        } }, { key: "markConversation", value: function(e3) {
          return this._getModule(to).markConversation(e3);
        } }, { key: "getConversationGroupList", value: function() {
          return this._getModule(to).getConversationGroupList();
        } }, { key: "createConversationGroup", value: function(e3) {
          return this._getModule(to).createConversationGroup(e3);
        } }, { key: "deleteConversationGroup", value: function(e3) {
          return this._getModule(to).deleteConversationGroup(e3);
        } }, { key: "renameConversationGroup", value: function(e3) {
          return this._getModule(to).renameConversationGroup(e3);
        } }, { key: "addConversationsToGroup", value: function(e3) {
          return this._getModule(to).addConversationsToGroup(e3);
        } }, { key: "deleteConversationsFromGroup", value: function(e3) {
          return this._getModule(to).deleteConversationsFromGroup(e3);
        } }, { key: "getMyProfile", value: function() {
          return this._getModule(Xn).getMyProfile();
        } }, { key: "getUserProfile", value: function(e3) {
          return this._getModule(Xn).getUserProfile(e3);
        } }, { key: "updateMyProfile", value: function(e3) {
          return this._getModule(Xn).updateMyProfile(e3);
        } }, { key: "getBlacklist", value: function() {
          return this._getModule(Xn).getLocalBlacklist();
        } }, { key: "addToBlacklist", value: function(e3) {
          return this._getModule(Xn).addBlacklist(e3);
        } }, { key: "removeFromBlacklist", value: function(e3) {
          return this._getModule(Xn).deleteBlacklist(e3);
        } }, { key: "setSelfStatus", value: function(e3) {
          return this._getModule(Xn).setSelfStatus(e3);
        } }, { key: "getUserStatus", value: function(e3) {
          return this._getModule(Xn).getUserStatus(e3);
        } }, { key: "subscribeUserStatus", value: function(e3) {
          return this._getModule(Xn).subscribeUserStatus(e3);
        } }, { key: "unsubscribeUserStatus", value: function(e3) {
          return this._getModule(Xn).unsubscribeUserStatus(e3);
        } }, { key: "getFriendList", value: function() {
          var e3 = this._getModule($n);
          return e3 ? e3.getLocalFriendList() : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "addFriend", value: function(e3) {
          var t2 = this._getModule($n);
          return t2 ? t2.addFriend(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "deleteFriend", value: function(e3) {
          var t2 = this._getModule($n);
          return t2 ? t2.deleteFriend(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "checkFriend", value: function(e3) {
          var t2 = this._getModule($n);
          return t2 ? t2.checkFriend(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getFriendProfile", value: function(e3) {
          var t2 = this._getModule($n);
          return t2 ? t2.getFriendProfile(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "updateFriend", value: function(e3) {
          var t2 = this._getModule($n);
          return t2 ? t2.updateFriend(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getFriendApplicationList", value: function() {
          var e3 = this._getModule($n);
          return e3 ? e3.getLocalFriendApplicationList() : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "acceptFriendApplication", value: function(e3) {
          var t2 = this._getModule($n);
          return t2 ? t2.acceptFriendApplication(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "refuseFriendApplication", value: function(e3) {
          var t2 = this._getModule($n);
          return t2 ? t2.refuseFriendApplication(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "deleteFriendApplication", value: function(e3) {
          var t2 = this._getModule($n);
          return t2 ? t2.deleteFriendApplication(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "setFriendApplicationRead", value: function() {
          var e3 = this._getModule($n);
          return e3 ? e3.setFriendApplicationRead() : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getFriendGroupList", value: function() {
          var e3 = this._getModule($n);
          return e3 ? e3.getLocalFriendGroupList() : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "createFriendGroup", value: function(e3) {
          var t2 = this._getModule($n);
          return t2 ? t2.createFriendGroup(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "deleteFriendGroup", value: function(e3) {
          var t2 = this._getModule($n);
          return t2 ? t2.deleteFriendGroup(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "addToFriendGroup", value: function(e3) {
          var t2 = this._getModule($n);
          return t2 ? t2.addToFriendGroup(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "removeFromFriendGroup", value: function(e3) {
          var t2 = this._getModule($n);
          return t2 ? t2.removeFromFriendGroup(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "renameFriendGroup", value: function(e3) {
          var t2 = this._getModule($n);
          return t2 ? t2.renameFriendGroup(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getGroupList", value: function() {
          var e3 = this._getModule(Zn);
          return e3 ? e3.getGroupList() : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getGroupProfile", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.getGroupProfile(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "createGroup", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.createGroup(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "dismissGroup", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.dismissGroup(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "updateGroupProfile", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.updateGroupProfile(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "joinGroup", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.joinGroup(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "quitGroup", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.quitGroup(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "searchGroupByID", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.searchGroupByID(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getGroupOnlineMemberCount", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.getGroupOnlineMemberCount(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "changeGroupOwner", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.changeGroupOwner(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getGroupApplicationList", value: function() {
          var e3 = this._getModule(Zn);
          return e3 ? e3.getGroupApplicationList() : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "handleGroupApplication", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.handleGroupApplication(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "initGroupAttributes", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.initGroupAttributes(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "setGroupAttributes", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.setGroupAttributes(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "deleteGroupAttributes", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.deleteGroupAttributes(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getGroupAttributes", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.getGroupAttributes(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "setGroupCounters", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.setGroupCounters(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "increaseGroupCounter", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.increaseGroupCounter(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "decreaseGroupCounter", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.decreaseGroupCounter(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getGroupCounters", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.getGroupCounters(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getGroupMemberList", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.getGroupMemberList(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getGroupMemberProfile", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.getGroupMemberProfile(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "addGroupMember", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.addGroupMember(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "deleteGroupMember", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.deleteGroupMember(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "setGroupMemberMuteTime", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.setGroupMemberMuteTime(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "setGroupMemberRole", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.setGroupMemberRole(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "setGroupMemberNameCard", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.setGroupMemberNameCard(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "setGroupMemberCustomField", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.setGroupMemberCustomField(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "markGroupMemberList", value: function(e3) {
          var t2 = this._getModule(Zn);
          return t2 ? t2.markGroupMemberList(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getJoinedCommunityList", value: function() {
          return this._getModule(eo).getJoinedCommunityList();
        } }, { key: "createTopicInCommunity", value: function(e3) {
          return this._getModule(eo).createTopicInCommunity(e3);
        } }, { key: "deleteTopicFromCommunity", value: function(e3) {
          return this._getModule(eo).deleteTopicFromCommunity(e3);
        } }, { key: "updateTopicProfile", value: function(e3) {
          return this._getModule(eo).updateTopicProfile(e3);
        } }, { key: "getTopicList", value: function(e3) {
          return this._getModule(eo).getTopicList(e3);
        } }, { key: "addSignalingListener", value: function(e3, t2, n2) {
          var o2 = this._getModule(Do);
          o2 && o2.addSignalingListener(e3, this._safetyCallbackFactory.defense(e3, t2, n2), n2);
        } }, { key: "removeSignalingListener", value: function(e3, t2, n2) {
          var o2 = this._safetyCallbackFactory.find(e3, t2);
          if (null !== o2) {
            var i2 = this._getModule(Do);
            i2 && (i2.removeSignalingListener(e3, o2, n2), this._safetyCallbackFactory.delete(e3, t2));
          }
        } }, { key: "invite", value: function(e3) {
          var t2 = this._getModule(Do);
          return t2 ? t2.invite(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "inviteSync", value: function(e3, t2, n2) {
          var o2 = this._getModule(Do);
          return o2 ? o2.inviteSync(e3, t2, n2) : "";
        } }, { key: "inviteInGroup", value: function(e3) {
          var t2 = this._getModule(Do);
          return t2 ? t2.invite(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "inviteInGroupSync", value: function(e3, t2, n2) {
          var o2 = this._getModule(Do);
          return o2 ? o2.inviteSync(e3, t2, n2) : "";
        } }, { key: "cancel", value: function(e3) {
          var t2 = this._getModule(Do);
          return t2 ? t2.cancel(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "accept", value: function(e3) {
          var t2 = this._getModule(Do);
          return t2 ? t2.accept(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "reject", value: function(e3) {
          var t2 = this._getModule(Do);
          return t2 ? t2.reject(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }, { key: "getSignalingInfo", value: function(e3) {
          var t2 = this._getModule(Do);
          return t2 ? t2.getSignalingInfo(e3) : null;
        } }, { key: "modifyInvitation", value: function(e3) {
          var t2 = this._getModule(Do);
          return t2 ? t2.modifyInvitation(e3) : Ro({ code: No.CANNOT_FIND_MODULE });
        } }]), e2;
      }(), gu = { login: 1, logout: 1, destroy: 1, on: 1, off: 1, ready: 1, setLogLevel: 1, joinGroup: 1, quitGroup: 1, registerPlugin: 1, getGroupOnlineMemberCount: 1, isReady: 1, addSignalingListener: 1, removeSignalingListener: 1 };
      function hu(e2, t2) {
        if (e2.isReady() || 1 === gu[t2])
          return true;
        var n2 = e2.getNotReadyReason(), o2 = { code: n2, message: "".concat(e2.getErrorMessage(n2), " | ").concat(t2, " | ").concat(e2.getErrorMessage(No.SDK_IS_NOT_READY)) };
        return e2.onError(o2), o2;
      }
      var _u = {}, fu = {};
      return fu.create = function(e2) {
        var n2 = "TencentCloudChat.create", o2 = 0, i2 = e2.SDKAppID;
        if (dt(i2))
          o2 = i2;
        else if (o2 = parseInt(i2), isNaN(i2))
          return Ye.e("".concat(n2, " failed. Failed to parse the SDKAppID, please check the arguments")), null;
        if (o2 && _u[o2])
          return _u[o2];
        Ye.l("".concat(n2));
        var a2 = new pu(t(t({}, e2), {}, { SDKAppID: o2 }));
        a2.on(k.SDK_DESTROY, function(e3) {
          _u[e3.data.SDKAppID] = null, delete _u[e3.data.SDKAppID];
        });
        var s2 = function(e3) {
          var t2 = /* @__PURE__ */ Object.create(null);
          return Object.keys(Yn).forEach(function(n3) {
            if (e3[n3]) {
              var o3 = new S();
              t2[n3] = function() {
                var t3 = Array.from(arguments);
                return o3.use(function(t4, o4) {
                  var i3 = hu(e3, n3);
                  return true === i3 ? o4() : Ro(i3);
                }).use(function(e4, t4) {
                  if (true === ln(e4, Wn[n3], n3))
                    return t4();
                }).use(function(t4, o4) {
                  return e3[n3].apply(e3, t4);
                }), o3.run(t3);
              };
            }
          }), t2;
        }(a2);
        return _u[o2] = s2, Wn.hookGetAPITips(a2.getErrorMessage.bind(a2)), Ye.l("".concat(n2, " ok")), s2;
      }, fu.TYPES = L, fu.EVENT = k, fu.TSignaling = N, fu.VERSION = "3.2.0", Ye.l("TencentCloudChat.VERSION:".concat(fu.VERSION)), fu;
    });
  }
});
export default require_chat();
//# sourceMappingURL=@tencentcloud_chat.js.map
