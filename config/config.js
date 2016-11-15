let config = {
  env: process.env.NODE_ENV || 'development',
  host: 'http://vitrino.herokuapp.com',
  port: process.env.PORT || 3000,

  // --- Database ---
  database: {
    uri: process.env.DATABASE_URL || 'postgres://asxemzsxuktjom:UjG1gCmN54eBoqyfSFzyIo5QoO@ec2-54-75-232-56.eu-west-1.compute.amazonaws.com:5432/ddm8rtt5jmaf7j?ssl=true'
  },

  // --- Passport authentication framework

  passport: {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  },

  // --- Nunjucks templating engine ---
  nunjucks: {
    options: {
      autoescape: true,
      trimBlocks: true,
      noCache: true,
      watch: true,
      express: null // Must point to the express app object after the app has been initialized
    },
    viewPaths: [
      'server/partials',
      'server/components/map/views',
      'server/components/user/views'
    ]
  },

  // --- Sessions library ---
  sessions: {
    secret: process.env.SECRET_SESSION_KEY || 'G"ZTq^Z|T/i!cbBH"Gj2tizi2"_.("$")&?#<S<zF§S',
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false, // TODO: Must be set to true as soon as we haved switched to https
      maxAge: null
    }
  },

  // --- Redis storage ---
  redis: {
    sessions: {
      host: 'pub-redis-11657.eu-central-1-1.1.ec2.redislabs.com',
      port: 11657,
      pass: process.env.REDIS_SESSIONS_PW
    }
  },

  // --- Helmet protection library ---
  helmet: {
    xssFilter: true,
    hidePoweredBy: true,
    ieNoOpen: true,
    noSniff: true,
    noCache: false,
    dnsPrefetchControl: {
      allow: true
    },
    frameguard: {
      action: 'deny'
    },

    contentSecurityPolicy: {
      // Specify directives as normal
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://*.tiles.mapbox.com https://api.mapbox.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://*.tiles.mapbox.com https://api.mapbox.com'],
        childSrc: ["'self'", 'blob:'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https://www.mapbox.com'],
        connectSrc: ["'self'", 'https://*.tiles.mapbox.com https://api.mapbox.com'],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        sandbox: ['allow-forms', 'allow-scripts'],
        objectSrc: []
        // TODO: Specify 'reportUri' to report CSP violations in a log file
      },

      // Set to true if you only want browsers to report errors, not block them
      reportOnly: false,

      // Set to true if you want to blindly set all headers: Content-Security-Policy,
      // X-WebKit-CSP, and X-Content-Security-Policy.
      setAllHeaders: false,

      // Set to true if you want to disable CSP on Android where it can be buggy.
      disableAndroid: true,

      // Set to false if you want to completely disable any user-agent sniffing.
      // This may make the headers less compatible but it will be much faster.
      // This defaults to `true`.
      browserSniff: true
    }
  },

  // Sendgrid E-Mail service provider
  sendgrid: {
    apikey: process.env.SENDGRID_API_KEY || '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',
    mails: {
      welcome: {
        sender: {
          email: 'info@vitrino.de',
          name: 'Vitrino'
        },
        templateId: 'd2c7b6f5-42c5-411b-a911-114f76ec9f64'
      },
      passwordForgotten: {
        sender: {
          email: 'info@vitrino.de',
          name: 'Vitrino'
        },
        templateId: 'be66a06b-9dc6-4c19-b1b1-457b99c45dd4'
      }
    }
  }
};

module.exports = config;