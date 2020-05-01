import brandStore from './brand-store';
import Color from 'color';

const defaultColours = [
    { name: 'primary', value: '#333' },
    { name: 'secondary', value: '#222' },
    { name: 'tertiary', value: '#555' },
];

const defaultBodyFont = 'Lato';
const allowedFonts = ['lato', 'arial', 'helvetica', 'courier'];

const convertToRgb = c =>
    Color(c).rgb().string();

    let found = false;
    const validateBodyFont = (bodyFont) => {
        allowedFonts.forEach(font => {
            if (font === bodyFont.toLowerCase()) found = true;
        });
        if (found) return bodyFont;
        return defaultBodyFont;
    };

function buildTheme(colours, bodyFont) {
    if (!colours) colours = defaultColours;
    if (!bodyFont) colours = defaultBodyFont;

    const newColours = {};
    colours.forEach(color => {
        newColours[color.name] = convertToRgb(color.value);
    });

    return {
        colours: newColours,
        bodyFont: validateBodyFont(),
    };
}


    export function getBranding(user) {
        if (user.brandId) {
            const brands = brandStore.getAll();
            if (brands.length < 1) return buildTheme(defaultColours, defaultBodyFont);

            if (brands.length) {
                let brandDetails;

                brands.forEach(brand => {
                    if (brand.id === user.brandId) brandDetails = brand;
                });

                if (!brandDetails) return buildTheme(defaultColours, defaultBodyFont);

                return buildTheme(brandDetails.colours, brandDetails.bodyFont);
            }
        }

        return buildTheme(defaultColours, defaultBodyFont);
    };

