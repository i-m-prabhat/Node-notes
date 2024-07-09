const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const ProductVariant = require('../models/ProductVariant');
const VariationType = require('../models/VariationType');
const VariationName = require('../models/VariationName');

// Utility function to format variation names
const formatVariationName = (variation, type, id, slug) => ({
    nameId: variation.nameId._id,
    name: variation.nameId.name,
    type,
    id,
    slug,
});

router.get('/product-variations/:productId', async (req, res) =>
{
    try
    {
        const { productId } = req.params;

        // Fetch the product
        const product = await Product.findById(productId)
            .populate('variations.typeId variations.nameId')
            .exec();
        if (!product) return res.status(404).send('Product not found');

        // Fetch product variants
        const productVariants = await ProductVariant.find({ productId })
            .populate('variations.typeId variations.nameId')
            .exec();

        // Collect variations
        const variationsMap = new Map();

        // Add product variations
        product.variations.forEach(variation =>
        {
            const typeId = variation.typeId._id.toString();
            if (!variationsMap.has(typeId))
            {
                variationsMap.set(typeId, {
                    typeId,
                    type: variation.typeId.name,
                    NameIds: [],
                });
            }
            const formattedVariation = formatVariationName(
                variation,
                'product',
                product._id,
                product._id
            );
            variationsMap.get(typeId).NameIds.push(formattedVariation);
        });

        // Add variant variations
        productVariants.forEach(variant =>
        {
            variant.variations.forEach(variation =>
            {
                const typeId = variation.typeId._id.toString();
                if (!variationsMap.has(typeId))
                {
                    variationsMap.set(typeId, {
                        typeId,
                        type: variation.typeId.name,
                        NameIds: [],
                    });
                }
                const formattedVariation = formatVariationName(
                    variation,
                    'variant',
                    variant._id,
                    variant._id
                );
                variationsMap.get(typeId).NameIds.push(formattedVariation);
            });
        });

        // Convert map to array
        const variations = Array.from(variationsMap.values());

        res.json({ variations });
    } catch (err)
    {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
