let authHelper = require('../../server/helpers/auth.js');

let email_dummy_user = 'dummy.user@vitrino.de';
let email_dummy_vendor = 'dummy.vendor@vitrino.de';
let email_dummy_admin = 'dummy.admin@vitrino.de';
let password = 'Vitrino2017';

let knex;
let Promise;

function roles () {
  return knex('roles').del()
    .then(function () {
      return Promise.all([
        knex('roles').insert({
          name: 'user'
        }),
        knex('roles').insert({
          name: 'vendor'
        }),
        knex('roles').insert({
          name: 'admin'
        })
      ]);
    });
}

function productCategories () {
  return knex('product_categories').del()
    .then(function () {
      return Promise.all([
        knex('product_categories').insert({
          id: 1,
          name: 'Mode & Accessoires'
        }),
        knex('product_categories').insert({
          id: 2,
          name: 'Schmuck'
        }),
        knex('product_categories').insert({
          id: 3,
          name: 'Design & Geschenkartikel'
        }),
        knex('product_categories').insert({
          id: 4,
          name: 'Parfumerie & Kosmetik'
        }),
        knex('product_categories').insert({
          id: 5,
          name: 'Kunst'
        }),
        knex('product_categories').insert({
          id: 6,
          name: 'Hobby'
        }),
        knex('product_categories').insert({
          id: 7,
          name: 'Haus & Wohnen'
        }),
        knex('product_categories').insert({
          id: 8,
          name: 'Kinder'
        })
      ])
    })
}

function addresses () {
  return knex('addresses').del()
    .then(function () {
      return Promise.all([
        knex('addresses').insert({
          street: 'Pfuelstraße 5',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.502717,
          lng: 13.440806
        }),
        knex('addresses').insert({
          street: 'Wenckebachstr. 11',
          city: 'Berlin',
          zip_code: 12099,
          lat: 52.457710,
          lng: 13.386780
        }),
        knex('addresses').insert({
          street: 'Treskowallee 8',
          city: 'Berlin',
          zip_code: 10318,
          lat: 52.492293,
          lng: 13.525906
        }),
        knex('addresses').insert({
          street: 'Pfuelstraße 1',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.502091,
          lng: 13.440505
        }),
        knex('addresses').insert({
          street: 'Skalitzer Str 14',
          city: 'Berlin',
          zip_code: 10999,
          lat: 52.498966,
          lng: 13.419543
        }),
        knex('addresses').insert({
          street: 'Oppelner Str. 43',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.499757,
          lng: 13.44111
        }),
        knex('addresses').insert({
          street: 'Schlesische Str 4',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.500394,
          lng: 13.442619
        }),
        knex('addresses').insert({
          street: 'Falckensteinstraße 46',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.500511,
          lng: 13.444584
        })
      ])
    })
}

function users () {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          email: email_dummy_user,
          username: 'Dummy User',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(email_dummy_user),
          role: 'user'
        }),
        knex('users').insert({
          email: email_dummy_vendor,
          username: 'Dummy Vendor',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(email_dummy_vendor),
          role: 'vendor'
        }),
        knex('users').insert({
          email: email_dummy_admin,
          username: 'Dummy Admin',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(email_dummy_admin),
          role: 'admin'
        })
      ]);
    });
}

function companies () {
  return knex('companies').del()
    .then(function () {
      return Promise.all([
        knex('companies').insert({
          name: 'Schuhzauberei GmbH',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
          verified: true,
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          product_category_id: 1,
          address_id: 1
        }),
        knex('companies').insert({
          name: 'Die Glaserei GmbH & Co. KG',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
          verified: false,
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_admin + "')"),
          product_category_id: 2,
          address_id: 1
        }),
        knex('companies').insert({
          name: 'We will hurt you AG',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
          verified: false,
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_admin + "')"),
          product_category_id: 3,
          address_id: 1
        })
      ]);
    });
}

function products () {
  return knex('products').del()
    .then(function () {
      return Promise.all([
        knex('products').insert({
          name: 'Winterschuhe',
          description: 'Ganz tolle Schuhe.',
          image_url: '',
          verified: true,
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        }),
        knex('products').insert({
          name: 'Goldene Sneaker',
          description: 'Bitte Gewicht beachten!',
          image_url: '',
          verified: true,
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        }),
        knex('products').insert({
          name: 'Eine wundersamer Schuhkarton',
          description: 'Was mag wohl drin sein?!',
          image_url: '',
          verified: true,
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        }),
        knex('products').insert({
          name: 'Grüne Tanzschuhe',
          description: 'Ganz tolle Schuhe.',
          image_url: '',
          verified: false,
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        }),
        knex('products').insert({
          name: 'Jack Wolfskin Sandalen',
          description: 'Für die nächste Weltreise.',
          image_url: '',
          verified: false,
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        })
      ]);
    });
}

function stores () {
  return knex('stores').del()
    .then(function () {
      return Promise.all([
        knex('stores').insert({
          name: 'Der Saftladen',
          company_id: knex.raw("(SELECT id FROM companies WHERE name='We will hurt you AG')"),
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          address_id: 1
        }),
        knex('stores').insert({
          name: 'Bruno\'s Glaskunst',
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Die Glaserei GmbH & Co. KG')"),
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          address_id: 2
        }),
        knex('stores').insert({
          name: 'Skater Shop',
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')"),
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          address_id: 3
        }),
        knex('stores').insert({
          name: 'Schuhe des Manitu',
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')"),
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          address_id: 4
        }),
        knex('stores').insert({
          name: 'Rosa Rote Buntstifte',
          company_id: knex.raw("(SELECT id FROM companies WHERE name='We will hurt you AG')"),
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          address_id: 5
        }),
        knex('stores').insert({
          name: 'Rosa Rote Buntstifte',
          company_id: knex.raw("(SELECT id FROM companies WHERE name='We will hurt you AG')"),
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          address_id: 6
        }),
        knex('stores').insert({
          name: 'Rosa Rote Buntstifte',
          company_id: knex.raw("(SELECT id FROM companies WHERE name='We will hurt you AG')"),
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          address_id: 7
        }),
        knex('stores').insert({
          name: 'Rosa Rote Buntstifte',
          company_id: knex.raw("(SELECT id FROM companies WHERE name='We will hurt you AG')"),
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          address_id: 8
        })
      ])
    })
}

function store_has_product () {
  return knex('store_has_product').del()
    .then(function () {
      return Promise.all([
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 1,
          price: 14.90
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 1,
          price: 9.90
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 1,
          price: 9.90
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 2,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 2,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 3,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 3,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 4,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 4,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 4,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 4,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 5,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 5,
          price: 4.90
        })
      ])
    })
}

exports.seed = function(k, p) {
  knex = k;
  Promise = p;

  return roles()
    .then(productCategories)
    .then(addresses)
    .then(users)
    .then(companies)
    .then(products)
    .then(stores)
    .then(store_has_product);
};
