import * as authorFields from '../common/authorSortFields';
import * as bookFields from '../common/bookSortFields';
import * as loanFields from '../common/loanSortFields';
import * as publisherFields from '../common/publisherSortFields';
import * as userFields from '../common/userSortFields';
import * as bookStatuses from '../common/bookStatuses';
import * as roles from '../common/roles';

export default {
    bookStatuses: [],
    
    books: [],
    booksSearchFilter: {
      booksSortField: bookFields.TITLE,
      booksSortDesc: false,
    },
    filteredBooks: [],
    book: {},
    bookEditMode: false,

    authors: [],
    authorsSearchFilter: {
      authorsSortField: authorFields.FULL_NAME,
      authorsSortDesc: false,
    },
    filteredAuthors: [],
    author: {},
    authorEditMode: false,

    publishers: [],
    publishersSearchFilter: {
      publishersSortField: publisherFields.NAME,
      publishersSortDesc: false,
    },
    filteredPublishers: [],
    publisher: {},
    publisherEditMode: false,

    users: [],
    usersSearchFilter: {
      usersSortField: userFields.FULL_NAME,
      usersSortDesc: false,
      roles: [roles.ADMINISTRATOR, roles.LIBRARIAN, roles.STUDENT]
    },
    filteredUsers: [],
    user: {},
    userEditMode: false,
    roles: [],

    currentUser: {
      username: '',
      role: 0,
      isLoggedIn: false
    },
            
    loans: [],
    loansSearchFilter: {
      loansSortField: loanFields.TITLE,
      loansSortDesc: false,
      bookStatuses: [bookStatuses.REQUESTED, bookStatuses.BORROWED, bookStatuses.LOST]
    },
    filteredLoans: [],

    ajaxCallSuccess: true,
  };