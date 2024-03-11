export const usersRoutes = {
  getAll: '/user',
  getById: (userId) => `/user/${userId}`,
  create: '/user',
  update: (userId) => `/user/${userId}`,
  delete: (userId) => `/user/${userId}`,
};

export const artistsRoutes = {
  getAll: '/artist',
  getById: (artistid) => `/artist/${artistid}`,
  create: '/artist',
  update: (artistid) => `/artist/${artistid}`,
  delete: (artistid) => `/artist/${artistid}`,
};

export const albumsRoutes = {
  getAll: '/album',
  getById: (albumid) => `/album/${albumid}`,
  create: '/album',
  update: (albumid) => `/album/${albumid}`,
  delete: (albumid) => `/album/${albumid}`,
};

export const tracksRoutes = {
  getAll: '/track',
  getById: (trackid) => `/track/${trackid}`,
  create: '/track',
  update: (trackid) => `/track/${trackid}`,
  delete: (trackid) => `/track/${trackid}`,
};

export const favoritesRoutes = {
  getAll: '/favs',
  artists: (artistid) => `/favs/artist/${artistid}`,
  albums: (albumid) => `/favs/album/${albumid}`,
  tracks: (trackid) => `/favs/track/${trackid}`,
};

export const authRoutes = {
  signup: '/auth/signup',
  login: '/auth/login',
  refresh: '/auth/refresh',
};
