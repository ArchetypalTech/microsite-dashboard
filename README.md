## ![Arcetypal Repo](./archetypal-heading.jpg)

# ArchetypalTech Microsite's Dashboard

_Keeping track of all the microsites, incrementally_

Each site will self publish tracking info during its deployment phase via the implemented workflow.

**Requirement**

- Add the following to a site's `package.json`

```json
"meta": {
    "ip": "198.23.24.25",
    "host": "vercel",
    "dev": "instance-red.archetypal.fly.io",
    "prod": "app.archetypal.com",
    "title": "Rolling",
    "repo_ui": "github.com/1",
    "repo_content": "github.com/2"
}
```
