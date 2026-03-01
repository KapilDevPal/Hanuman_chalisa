export const textLibrary = {
    hanuman_ashtak: {
        hi: require('../../assets/data/hi/hanuman_ashtak.json'),
    },
    hanuman_aarti: {
        hi: require('../../assets/data/hi/hanuman_aarti.json'),
    },
    sundarkand: {
        hi: require('../../assets/data/hi/sundarkand.json'),
    },
    bajrang_baan: {
        hi: require('../../assets/data/hi/bajrang_baan.json'),
    },
    hanuman_raksha_mantra: {
        hi: require('../../assets/data/hi/hanuman_raksha_mantra.json'),
    },
    mangalwar_katha: {
        hi: require('../../assets/data/hi/mangalwar_katha.json'),
    },
    bahuk_path: {
        hi: require('../../assets/data/hi/bahuk_path.json'),
    },
    ram_stuti: {
        hi: require('../../assets/data/hi/ram_stuti.json'),
    },
    panchmukhi_hanuman_kavach: {
        hi: require('../../assets/data/hi/panchmukhi_hanuman_kavach.json'),
    },
    hanuman_gayatri_mantra: {
        hi: require('../../assets/data/hi/hanuman_gayatri_mantra.json'),
    },
    hanuman_dwadash_naam_stotram: {
        hi: require('../../assets/data/hi/hanuman_dwadash_naam_stotram.json'),
    }
};

export const textList = Object.keys(textLibrary).map(key => ({
    id: key,
    // @ts-ignore
    title: textLibrary[key].hi.title
}));
