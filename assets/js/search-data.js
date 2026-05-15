// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "post-on-the-reproducibility-of-ml-experiments",
      
        title: "On the Reproducibility of ML experiments",
      
      description: "Sometimes when discussing or reading about reproducibility in ML experiments you would stumble upon mentions of random seeds (e.g. here or there). Then the discussion usually revolves around the idea that you should set these as fixed, hard-coded values, otherwise other people might not be able to exactly reproduce your experiments, and that this has to do with Reproducibility. Even the official PyTorch documentation page titled “Reproducibility”The webpage name is actually &quot;randomness&quot;; says something about the conflation of both ideas, doesn&#39;t it?! starts with a “Controlling sources of randomness” section where you are somehow invited to torch.manual_seed(0), random.seed(0), np.random.seed(0). What...",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2026/on-reproducibility/";
        
      },
    },{
      id: "publication-bourou2024phendiff",
      title: "PhenDiff: Revealing Subtle Phenotypes with Diffusion Models in Real Images",
      description: "Anis Bourou, Thomas Boyer, Marzieh Gheisari, Kévin Daupin, Véronique Dubreuil, Aurélie De Thonel, Valérie Mezger, Auguste Genovesio - MICCAI, 2024",
      section: "Publications",
      handler: () => {
        window.location.href = "/publications/#bourou2024phendiff";
      },
    },{
      id: "publication-myara2026xfactors",
      title: "XFACTORS: Disentangled Information Bottleneck via Contrastive Supervision",
      description: "Alexandre Myara, Nicolas Bourriez, Thomas Boyer, Thomas Lemercier, Ihab Bendidi, Auguste Genovesio - arXiv, 2026",
      section: "Publications",
      handler: () => {
        window.location.href = "/publications/#myara2026xfactors";
      },
    },{
      id: "publication-gravier2026mmtsbm",
      title: "Multi-marginal temporal Schrödinger Bridge Matching from unpaired data",
      description: "Thomas Gravier, Thomas Boyer, Auguste Genovesio - ICML, 2026",
      section: "Publications",
      handler: () => {
        window.location.href = "/publications/#gravier2026mmtsbm";
      },
    },{
      id: "publication-bourou2025diffex",
      title: "DiffEx: Explaining a Classifier with Diffusion Models to Identify Microscopic Cellular Variations",
      description: "Anis Bourou, Saranga Kingkor Mahanta, Thomas Boyer, Valérie Mezger, Auguste Genovesio - arXiv, 2025",
      section: "Publications",
      handler: () => {
        window.location.href = "/publications/#bourou2025diffex";
      },
    },{
      id: "publication-bourou2025latentdiffusion",
      title: "Revealing Subtle Phenotypes in Small Microscopy Datasets Using Latent Diffusion Models",
      description: "Anis Bourou, Biel Castaño Segade, Thomas Boyer, Valérie Mezger, Auguste Genovesio - CVPR CVDD, 2025",
      section: "Publications",
      handler: () => {
        window.location.href = "/publications/#bourou2025latentdiffusion";
      },
    },{
        id: 'social-email',
        title: 'email',
        description: 'thomasboyer@protonmail.ch',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%74%68%6F%6D%61%73%62%6F%79%65%72@%70%72%6F%74%6F%6E%6D%61%69%6C.%63%68", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        description: 'TheThomasBoyer',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/TheThomasBoyer", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        description: 'thethomasboyer',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/thethomasboyer", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        description: '0009-0000-8554-4864',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0000-8554-4864", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        description: 'eqheP7MAAAAJ',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=eqheP7MAAAAJ", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        description: 'true',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
