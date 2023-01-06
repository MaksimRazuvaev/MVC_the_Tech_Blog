



const sess = {
    secret: 'Super secret secret',
    // TODO: Add a comment describing the purpose of adding a cookies object to our options to our session object
    // this is parameter how you DEAL with cookies
    cookie: {
      // TODO: Add a comment describing the functionality of the maxAge attribute
      // this is how long session stays alaive
      maxAge: 60 * 60 * 1000,
      // TODO: Add a comment describing the functionality of the httpOnly attribute
      // do not return cookies exept to HTTPS, required or not
      httpOnly: true,
      // TODO: Add a comment describing the functionality of the secure attribute
      // do not return cookies exept to HTTPS, required or not
      secure: false,
      // TODO: Add a comment describing the functionality of the sameSite attribute
      // is able to deliver to other domain site
      sameSite: 'strict',
    },
}