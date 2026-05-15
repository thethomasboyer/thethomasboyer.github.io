---
layout: distill
title: On the Reproducibility of ML experiments
date: 2026-05-15
description:
tags: 
categories:
toc: true
---

Sometimes when discussing or reading about **reproducibility** in ML experiments you would stumble upon mentions of **random seeds** (*e.g.* [here](https://web.archive.org/web/20251006163636/https://neptune.ai/blog/how-to-solve-reproducibility-in-ml) or [there](https://aimstack.io/blog/tutorials/reproducibility-in-ml)).

Then the discussion usually revolves around the idea that you should set these as *fixed, hard-coded values*, otherwise other people might not be able to *exactly* reproduce your experiments, and that *this* has to do with *Reproducibility*.

Even [the official PyTorch documentation page](https://pytorch.org/docs/stable/notes/randomness.html) titled "Reproducibility”<d-footnote>The webpage name is actually "randomness"; says something about the conflation of both ideas, doesn't it?!</d-footnote> *starts* with a "Controlling sources of randomness” section where you are somehow invited to `torch.manual_seed(0)`, `random.seed(0)`, `np.random.seed(0)`.

## What Reproducibility is not

The problem with the idea that *setting random seeds is necessary to “reproduce” experiments* is that it *is* true (in a sense), but it is not what *Reproducibility*-with-a-capital-*R* is about. Not at all, actually.

**Quite the *contrary*, as a matter of fact!**

In a machine learning context, it is important to understand that we don’t want to be able to reproduce a very, very long chain of tensor operations down to the last bit exactly, because *we really do not care about “the last bit”*.

This fact comes from the nature of ML experiments:

- they train on datasets that are quite arbitrary collections of data (we could have created many other versions of ImageNet that would have still been very good ImageNets!)
- they embrace probabilistic modeling as one of their theoretical foundations
- they use iterative optimization algorithms and sometimes even stochastic models that themselves leverage the quite fantastic properties of *Randomness*<d-footnote>Randomness, like Reproducibility, is a deity in ML World, but they are very much unrelated.</d-footnote> to speed up –or even allow– convergence

That is: to be able to reproduce on my computer the *exact* training or even inference run that you performed down to the bit-for-bit representation is not simply useless, it is *meaningless*.

Moreover, exact reproducibility is quite hard. You have to deactivate non-deterministic algorithms that may be used internally by linear algebra libraries, and trust that different implementations on different hardware / drivers / software will yield the exact same result (not that crazy of a demand *per se* though, it's just that, [you know, software...](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference)).

Time spent to exactly replicate an experiment to an identical version would be better spent assessing whether this experiment is *actually reproducible*.

## What Reproducibility is really about

A reproducible experiment is one people around the globe with the same compute capacity as you can run, then look at their results, and come to the same *conclusions* as you did. That’s Reproducibility. This sentence seems simple but really, it is not:

1. Being able to run an ML experiment means having access to:
    1. a compatible hardware environment(!)
    2. the source code, or at least a *very* detailed description of it
    3. instructions to run that code on another machine ("set that data path and you’re good to go"…)
    4. the software environment (I click “install” and it installs, I click “run” and it runs, oh sweet, sweet, wet Python dream…)
    5. the data(!), the code used to preprocess the data (usually separated from the training code, often lost in some non-git-tracked notebook somewhere)
    6. potentially even any experiment tracking software used (sometimes hosted and non-free), otherwise having a clue about what is going on on that cluster is quite hard
2. Looking at the results the way the original authors did means having access to:
    1. the benchmarks, or evaluations (code, data, … basically repeat the above :)
    2. the postprocessing and visualization code used by the authors to create the figures that you are looking at when reading the paper (seems dumb but sometimes the devil hides in the details, and it’s also usually lost in some non-git-tracked notebook somewhere)
    3. potentially the competitor models’ reported performances, ideally from independent sources than that paper claiming to beat them

When you have all of that, and the right computing power, you should basically be able to *independently write the same paper as the original authors did*. That's Reproducibility, and that's exactly what reproducibility challenges are about, by the way!

When writing that sibling paper, it doesn’t (shouldn’t) matter if the classification accuracy you find is $87.8 \pm 0.7\%$ vs $88.2 \pm 0.6\%$ in the original paper.
Actually, it doesn’t even really matter if the classification accuracy you find is $87.8 \pm 0.2\%$ vs $88.2 \pm 0.1\%$ in the original paper, because the standard deviations (that they of course computed) come from 3 runs only on that particular and quite arbitrary dataset on different GPUs using different driver / firmware versions in mixed `fp32`/`TF32`/`bf16` instead of mixed `fp32`/`fp16` and it was Monday when you launched the thing while the Wednesday they launched it was a rather rainy one.

What matters is that the ideas they presented in their paper are interesting and that –oh– they actually might apply to this data –and: it works too!

Or maybe what matters is that they claimed their method was SOTA because it was 10 (5? 2?) percentage points above the rest, and you found the same *result*.<d-footnote>Also what matters is that their model has twice the parameter count of other methods they compare against, but that’s another story.</d-footnote>

Or as delightfully put in the [umap-learn documentation](https://umap-learn.readthedocs.io/en/latest/reproducibility.html#umap-reproducibility):

> "As noted by Vito Zanotelli  
> > … setting a random seed is like signing a waiver “I am aware that this is a stochastic algorithm and I have done sufficient tests to confirm that my main conclusions are not affected by this randomness”.  
> "

## Appendix

### A note about software and hardware

You'll note from the above that being able to reproduce an experiment implies having access to “a compatible hardware environment(!)”. That itself obviously means that some large-scale experiments are essentially *not* reproducible, because we random laypeople simply don't have Google's TPU clusters.

However, that hardware requirement is far from as bad in the software world as it is in pretty much *any* other world. Think (wet lab) experimental Biology for example: it is extraordinarily difficult to reproduce an experiment simply because of 1.a. If you don't have that two-photon microscope in your lab, you can basically either spend something like half a million euros buying one plus hiring someone to operate it (you probably shouldn't do that just to reproduce something), or find yourself lucky enough to be able to rent one in a (very) nearby imaging platform (plus hiring someone to operate it). Contrary to numerical data and its accompanying software, there is no such thing as renting one at the other side of the country, because transporting (artificially nurtured) living stuff over even moderately long distances is often quite complicated.

We software people live in the clouds, and that makes everything much easier, really.
