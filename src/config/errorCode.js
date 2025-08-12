const server = {
  ERROR: {
    httpStatusCode: 400,
    body: {
      code: 'error',
      message: 'Something went wrong, please try again later.',
    },
  },

  ALREADY_EXISTS: {
    httpStatusCode: 400,
    body: {
      code: 'already_exists',
      message: 'Value already existed',
    },
  },

  INTERNAL_SERVER_ERROR: {
    httpStatusCode: 500,
    body: {
      code: 'internal_server_error',
      message: 'Something went wrong, please try again later.',
    },
  },

  NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: 'not_found',
      message: 'You lost somewhere. Please check url again.',
    },
  },

  FORBIDDEN: {
    httpStatusCode: 403,
    body: {
      code: 'forbidden',
      message: 'Permission denied.',
    },
  },

  UNAUTHORIZED: {
    httpStatusCode: 401,
    body: {
      code: 'unauthorized',
      message: 'You are not authorized.',
    },
  },

  INVALID_DATA: {
    httpStatusCode: 400,
    body: {
      code: 'invalid_data',
      message: 'Provided arguments are invalid or does not exists',
    },
  },

  PERMISSION_DENIED: {
    httpStatusCode: 403,
    body: {
      code: 'permission_denied',
      message: 'Permission denied.',
    },
  },

};

const postgres = {
  23505: {
    httpStatusCode: 400,
    code: 'duplicate_key_value',
    message: 'Value already exists',

    constraint: {
      uk_users_phone_number: 'Phone Number already exists!'
    },
  },

  23503: {
    httpStatusCode: 400,
    code: 'foreign_key_violation',
    message: 'Foreign key violation',

    constraint: {
      fk_orders_users:'User dose not exist!',
      fk_orders_products:'Product dose not exist!'
    },
  },
};

module.exports = {
  server,
  postgres,
};
