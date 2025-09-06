"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = void 0;
var pinia_1 = require("pinia");
var createBoard_1 = require("./actions/createBoard");
var getBoardDetail_1 = require("./actions/getBoardDetail");
var getBoardList_1 = require("./actions/getBoardList");
var patchCard_1 = require("./actions/patchCard");
var uploadFile_1 = require("./actions/uploadFile");
var deleteCard_1 = require("./actions/deleteCard");
var deleteList_1 = require("./actions/deleteList");
var patchList_1 = require("./actions/patchList");
var createCard_1 = require("./actions/createCard");
var createList_1 = require("./actions/createList");
var sortLists_1 = require("./actions/sortLists");
var deleteBoard_1 = require("./actions/deleteBoard");
var signup_1 = require("./actions/signup");
var login_1 = require("./actions/login");
var user_1 = require("./actions/user");
var reset_1 = require("./actions/reset");
var showNotification_1 = require("./actions/showNotification");
var showCardModule_1 = require("./actions/showCardModule");
var resetBoards_1 = require("./actions/resetBoards");
var resetLists_1 = require("./actions/resetLists");
var resetCards_1 = require("./actions/resetCards");
var resetUsers_1 = require("./actions/resetUsers");
var patchBoard_1 = require("./actions/patchBoard");
var toggleTools_1 = require("./actions/toggleTools");
var toggleSearch_1 = require("./actions/toggleSearch");
var searchCard_1 = require("./actions/searchCard");
var oauthLogin_1 = require("./actions/oauthLogin");
var oauthSignup_1 = require("./actions/oauthSignup");
var getLocation_1 = require("./actions/getLocation");
exports.useStore = (0, pinia_1.defineStore)({
    id: 'store',
    state: function () {
        return {
            board: {},
            redirectBoardId: 0,
            lists: [],
            loading: true,
            loadingListCards: {},
            loadingError: {
                show: false,
                status: -1,
                message: '',
                tooLong: false,
            },
            createListInput: true,
            cardModule: false,
            activeCard: {},
            notification: {
                error: false,
                show: false,
                message: '',
            },
            boardList: {
                all: [],
            },
            activeUser: {
                accessToken: '',
                email: '',
                id: 0,
                loggedIn: false,
            },
            signupForm: {
                email: '',
                password: '',
                welcomeEmail: false,
            },
            loginForm: {
                email: '',
                password: '',
            },
            pricing: {
                activePlan: 2,
                location: 'us',
                currency: 'USD',
                discountEligible: false,
                discountAmount: 0,
            },
            showTools: false,
            showSearch: false,
            searchResults: [],
        };
    },
    actions: {
        // board actions
        createBoard: createBoard_1.createBoard,
        getBoardDetail: getBoardDetail_1.getBoardDetail,
        getBoardList: getBoardList_1.getBoardList,
        patchBoard: patchBoard_1.patchBoard,
        deleteBoard: deleteBoard_1.deleteBoard,
        // list actions
        createList: createList_1.createList,
        deleteList: deleteList_1.deleteList,
        patchList: patchList_1.patchList,
        sortLists: sortLists_1.sortLists,
        // card actions
        createCard: createCard_1.createCard,
        patchCard: patchCard_1.patchCard,
        deleteCard: deleteCard_1.deleteCard,
        uploadFile: uploadFile_1.uploadFile,
        // user actions
        signup: signup_1.signup,
        login: login_1.login,
        oauthLogin: oauthLogin_1.oauthLogin,
        oauthSignup: oauthSignup_1.oauthSignup,
        user: user_1.user,
        // other actions
        showNotification: showNotification_1.showNotification,
        showCardModule: showCardModule_1.showCardModule,
        getLocation: getLocation_1.getLocation,
        // api tools
        toggleTools: toggleTools_1.toggleTools,
        // search functionality
        toggleSearch: toggleSearch_1.toggleSearch,
        searchCard: searchCard_1.searchCard,
        // reset actions
        reset: reset_1.reset,
        resetBoards: resetBoards_1.resetBoards,
        resetLists: resetLists_1.resetLists,
        resetCards: resetCards_1.resetCards,
        resetUsers: resetUsers_1.resetUsers,
    },
    getters: {
        starred: function (state) {
            var _a;
            return (_a = state.boardList.all) === null || _a === void 0 ? void 0 : _a.filter(function (board) { return board.starred === true; });
        },
        allBoards: function (state) {
            var _a;
            return (_a = state.boardList.all) === null || _a === void 0 ? void 0 : _a.filter(function (board) { return board.starred === false; });
        },
    },
});
/* istanbul ignore if */
if (window.Cypress) {
    window.store = exports.useStore;
}
//# sourceMappingURL=store.js.map