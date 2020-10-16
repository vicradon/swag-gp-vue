const { create } = require("core-js/fn/object");

// signup
const { query: q, Client } = require("faunadb");

const signup = async (user) => {
  const client = new Client({ secret: localStorage.getItem("DB_SECRET") });
  const createdUser = await client.query(
    q.Create(q.Collection("Users"), {
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      credentials: {
        password: user.password,
      },
    }),
  );
  return createdUser;
};

// login
const login = async (user) => {
  const client = new Client({ secret: localStorage.getItem("DB_SECRET") });
  const credentials = await client.query(
    q.Let(
      {
        user_id: q.Get(q.Match(q.Index("users_by_email"), user.email)),
      },
      q.Login(q.Ref(q.Collection("Users"), q.Get(q.Var("user_id")))),
    ),
  );
  return credentials;
};

module.exports = async function(context, req) {
  try {
    const { query: q, Client } = require("faunadb");

    const client = new Client({ secret: "" });
    const credentials = await client.query(
      q.Let(
        {
          user_id: q.Get(q.Match(q.Index("users_by_email"), req.body.email)),
        },
        q.Login(q.Get(q.Identity()), { password: req.body.password, ttl: q.TimeAdd(q.Now(), 1, "day") }),
      ),
    );
    context.res = {
      status: 200,
      body: credentials,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};
