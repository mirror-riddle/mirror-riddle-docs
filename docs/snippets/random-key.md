# random key

## use Math.random

    const randomKey = Math.random().toString(36).slice(2);  // random string

## use window.crypto

    const array = new Uint32Array(1);
    const randomKey = window.crypto.getRandomValues(array)[0];  // random number (0 ~ 2^32)
