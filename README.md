# n0

**n0** or No Zero Days is a type of habit tracker or habit streaks tracker primarily meant to be self hosted.
Originally built for [@soulninja](https://twitter.com/_soulninja), later made open source.

---

### How to Self Host

<p align="center"><a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpybash1%2Fn0&env=SELF_HOST,DETA_API_KEY&envDescription=These%20environment%20variables%20are%20required%20to%20deploy%20this%20application.&envLink=https%3A%2F%2Fgithub.com%2Fpybash1%2Fn0%23env&project-name=n0&repository-name=n0&demo-title=n0%20Demo&demo-description=Here's%20a%20public%20demo%20of%20how%20n0%20works.&demo-url=https%3A%2F%2Fn0.pybash.xyz"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
</p>

The easiest way to self host this is on [Vercel](https://vercel.com). You can do so simply by clicking the button above, and configuring the environment variables. You can also, manually clone the repository, and deploy to Vercel, but if you're really gonna do that, I'll assume you know what you're doing and so I'm not gonna provide instructions for that(I'm also lazy).

Here's the environment variable setup:

### Env

```sh
# Deta
DETA_API_KEY="<YOUR_DETA_KEY>"

# Self Host
SELF_HOST=1 # 1 means true, it wont work if its set to 0
```

---

Now, if you're gonna deploy this to something other than Vercel(I don't know why you would), then you're on you own. Firstly, because I'm too lazy write the instructions, and also because you shouldn't.
