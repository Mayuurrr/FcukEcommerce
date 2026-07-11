// Product seed script — run with: node seed.js
// Requires: .env file with MONGODB_URI in backend folder
import 'dotenv/config'
import mongoose from 'mongoose'
import productModel from './models/productModel.js'

// Image mappings for Category/Subcategory to ensure 100% unique, highly aesthetic clothing items
const imagesData = {
  Men: {
    Topwear: [
      {
        name: "Classic White Oxford Shirt",
        desc: "A timeless staple, crafted from 100% premium cotton with a relaxed Oxford weave. Perfect for smart-casual looks.",
        price: 1299,
        urls: ["https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80", "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80"]
      },
      {
        name: "Essential Crew Neck Tee",
        desc: "Supremely soft, midweight jersey cotton. A minimal crew neck that goes with everything.",
        price: 599,
        urls: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80"]
      },
      {
        name: "Premium Polo Shirt",
        desc: "Fine piqué cotton polo with a clean cut and ribbed collar. Moves effortlessly from casual to formal.",
        price: 899,
        urls: ["https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&q=80", "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80"]
      },
      {
        name: "Minimalist Linen Blazer",
        desc: "Lightweight, unstructured linen blazer. Features patch pockets and a two-button closure.",
        price: 3499,
        urls: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"]
      },
      {
        name: "Structured Cotton Overshirt",
        desc: "Heavy cotton twill overshirt. Dual chest pockets, steel snap buttons, perfect for layering.",
        price: 1899,
        urls: ["https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80"]
      },
      {
        name: "Fine Knit Silk-Cotton Polo",
        desc: "Luxury blend knit polo. Extremely soft drape and slight sheen, suitable for summer evenings.",
        price: 2299,
        urls: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80"]
      },
      {
        name: "Garment-Dyed Utility Shirt",
        desc: "Washed utility shirt in heavy organic canvas cotton. Styled with button-flap patch pockets.",
        price: 1499,
        urls: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80"]
      },
      {
        name: "Minimalist Striped Tee",
        desc: "Breton-striped crewneck in extra-long staple combed cotton. Classic fit.",
        price: 799,
        urls: ["https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800&q=80"]
      }
    ],
    Bottomwear: [
      {
        name: "Slim Straight Jeans — Indigo",
        desc: "Italian selvedge denim with a slim straight cut. Sits at the waist with a clean, tailored leg.",
        price: 2199,
        urls: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80", "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80"]
      },
      {
        name: "Tailored Chino Trousers",
        desc: "Stretch-cotton twill chinos with a clean crease. A modern taper through the leg.",
        price: 1599,
        urls: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"]
      },
      {
        name: "Minimalist Linen Shorts",
        desc: "Relaxed linen-blend shorts with an elastic drawstring waist. Cool and comfortable.",
        price: 999,
        urls: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80"]
      },
      {
        name: "Structured Cargo Trousers",
        desc: "Rugged cargo pants in premium ripstop cotton twill. Features low-profile side pockets.",
        price: 2499,
        urls: ["https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=800&q=80"]
      },
      {
        name: "Pleated Tapered Chinos",
        desc: "Relaxed pleated chinos with a sharp taper. A modern spin on traditional trousers.",
        price: 1799,
        urls: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"]
      },
      {
        name: "Light Washed Summer Denim",
        desc: "Lighter weight organic cotton jeans. Bleach wash with subtle natural fades.",
        price: 2299,
        urls: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80"]
      },
      {
        name: "Relaxed Fit Corduroy Pants",
        desc: "Comfortable fine-wale corduroy pants in a dark forest green. Soft and warm.",
        price: 1999,
        urls: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"]
      },
      {
        name: "Tailored Smart Shorts",
        desc: "Flat-front cotton shorts with clean side pockets. Sits just above the knee.",
        price: 1299,
        urls: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80"]
      }
    ],
    Winterwear: [
      {
        name: "Wool Blend Overcoat",
        desc: "A structured overcoat in a Italian wool-blend with a double-breasted closure. Fully lined.",
        price: 5499,
        urls: ["https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80", "https://images.unsplash.com/photo-1512327428085-db8d48c173d4?w=800&q=80"]
      },
      {
        name: "Heavy Knit Merino Sweater",
        desc: "Knitted from 100% fine Merino wool. Delivers natural temperature regulation.",
        price: 2499,
        urls: ["https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=800&q=80"]
      },
      {
        name: "Classic Denim Jacket",
        desc: "Heavyweight indigo denim jacket. Contrast stitching, regular fit, and metal shank buttons.",
        price: 2299,
        urls: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80"]
      },
      {
        name: "Classic Aviator Bomber",
        desc: "Water-repellent nylon shell with high-loft insulation and a faux shearling collar.",
        price: 3999,
        urls: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"]
      },
      {
        name: "Merino Wool Cardigan",
        desc: "Fine merino wool knit cardigan. Ribbed cuffs, patch pockets, V-neck front.",
        price: 2899,
        urls: ["https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=800&q=80"]
      },
      {
        name: "Sherpa Lining Worker Jacket",
        desc: "Heavy duty canvas shell jacket lined with soft, warm sherpa fleece.",
        price: 3299,
        urls: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"]
      },
      {
        name: "Lightweight Down Jacket",
        desc: "90/10 down-to-feather fill power puffer. Packs down into its own carry bag.",
        price: 3499,
        urls: ["https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80"]
      },
      {
        name: "Ribbed Mock Neck Sweater",
        desc: "Chunky knit mock neck sweater in a warm oatmeal color. 100% pure lambswool.",
        price: 2199,
        urls: ["https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=800&q=80"]
      }
    ]
  },
  Women: {
    Topwear: [
      {
        name: "Silk-Touch Relaxed Blouse",
        desc: "A fluid blouse in a satin-finish fabric with a relaxed drape. Effortlessly elevated.",
        price: 1799,
        urls: ["https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&q=80", "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"]
      },
      {
        name: "Linen Cropped Shirt",
        desc: "Boxy crop shirt in a soft linen-cotton blend. Cool with high-waist bottoms.",
        price: 1299,
        urls: ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"]
      },
      {
        name: "Ribbed Sleeveless Tank",
        desc: "Fine-rib knit tank with a clean neck. A perfect layering piece.",
        price: 799,
        urls: ["https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?w=800&q=80", "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80"]
      },
      {
        name: "Minimal Cotton T-Shirt",
        desc: "Slub cotton knit boyfriend t-shirt. Soft, breathable, and slightly translucent.",
        price: 899,
        urls: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"]
      },
      {
        name: "Wrap V-Neck Knit Top",
        desc: "Flattering wrap front design in a soft linen-tencel blend knit.",
        price: 1199,
        urls: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"]
      },
      {
        name: "Puff Sleeve Cotton Top",
        desc: "Structured organic cotton poplin top with subtle puff sleeve volume and keyhole back detail.",
        price: 1399,
        urls: ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"]
      },
      {
        name: "Oversized Denim Utility Shirt",
        desc: "Light blue washed denim shirt. Dropped shoulders, relaxed fit, functional patch pockets.",
        price: 1699,
        urls: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"]
      },
      {
        name: "Satin Camisole Top",
        desc: "Delicate cowl-neck camisole with adjustable cross-back spaghetti straps.",
        price: 999,
        urls: ["https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?w=800&q=80"]
      }
    ],
    Bottomwear: [
      {
        name: "Wide Leg Tailored Trousers",
        desc: "High-rise trousers in a fluid crepe fabric. A generous leg opening and clean front crease.",
        price: 1999,
        urls: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80", "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"]
      },
      {
        name: "Satin Midi Slip Skirt",
        desc: "A bias-cut midi skirt in satin fabric. Elegant silhouette with hidden elastic waistband.",
        price: 1499,
        urls: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80", "https://images.unsplash.com/photo-1561677978-583a6c42d7d6?w=800&q=80"]
      },
      {
        name: "Minimalist Utility Shorts",
        desc: "Mid-rise utility shorts with custom pocket details and clean tailoring.",
        price: 1199,
        urls: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80"]
      },
      {
        name: "High-Waist Denim Skirt",
        desc: "Classic A-line midi denim skirt. Center front slit, contrast stitching, rigid organic denim.",
        price: 1799,
        urls: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80"]
      },
      {
        name: "Relaxed Linen Wide-Leg Pants",
        desc: "100% Belgian flax linen. High-rise elastic waist with a very wide, flowing leg.",
        price: 1899,
        urls: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"]
      },
      {
        name: "Straight Crop Jeans",
        desc: "Rigid high-rise denim with a slightly cropped ankle length. Light vintage wash.",
        price: 2199,
        urls: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"]
      },
      {
        name: "Tailored Smart Shorts",
        desc: "Pleated linen-blend shorts with a clean waistband and side slanted pockets.",
        price: 1099,
        urls: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80"]
      },
      {
        name: "Fine Knit Midi Skirt",
        desc: "Elasticized rib-knit pencil skirt. Features a back walking slit and super soft hand-feel.",
        price: 1599,
        urls: ["https://images.unsplash.com/photo-1561677978-583a6c42d7d6?w=800&q=80"]
      }
    ],
    Winterwear: [
      {
        name: "Oversized Cashmere-Blend Coat",
        desc: "A statement overcoat in a warm cashmere-blend. Dropped shoulders and a relaxed fit.",
        price: 6999,
        urls: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80", "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80"]
      },
      {
        name: "Ribbed Knit Alpaca Cardigan",
        desc: "Cozy cardigan made from ethically sourced alpaca and wool. Features oversized buttons.",
        price: 2999,
        urls: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"]
      },
      {
        name: "Longline Trench Coat",
        desc: "Classic double-breasted cotton gabardine trench coat. Includes waist tie belt and storm flaps.",
        price: 4999,
        urls: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"]
      },
      {
        name: "Wool Blend Knit Mock Neck",
        desc: "Chunky boiled wool knit mock neck. Cozy loose fit, dropped sleeve seams.",
        price: 2299,
        urls: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"]
      },
      {
        name: "Minimalist Quilted Puffer",
        desc: "Matte finish grid-quilted boxy puffer jacket. Duck down filled, water resistant shell.",
        price: 4599,
        urls: ["https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80"]
      },
      {
        name: "Cashmere Crewneck Sweater",
        desc: "100% pure Grade-A Mongolian cashmere sweater. Standard fit, fine rib trims.",
        price: 3999,
        urls: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"]
      },
      {
        name: "Teddy Fleece Zip Jacket",
        desc: "Soft pile teddy fleece jacket with dynamic contrast pocket details.",
        price: 2499,
        urls: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"]
      },
      {
        name: "Tailored Blazer Coat",
        desc: "Structured wool blazer coat. Slim notch lapels, flap pockets, single vent back.",
        price: 5299,
        urls: ["https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80"]
      }
    ]
  },
  Kids: {
    Topwear: [
      {
        name: "Kids Organic Cotton Tee",
        desc: "Soft 100% organic cotton t-shirt for kids. Pre-shrunk, durable.",
        price: 499,
        urls: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80"]
      },
      {
        name: "Kids Striped Cotton Tee",
        desc: "Combed cotton kids tee. Lightweight and breathable, fun stripe design.",
        price: 549,
        urls: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80"]
      },
      {
        name: "Kids Linen Summer Shirt",
        desc: "Relaxed kids linen shirt with mandarin collar. Perfect for warm days.",
        price: 799,
        urls: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80"]
      },
      {
        name: "Kids Basic Henley Tee",
        desc: "Kids cotton slub henley tee with three button placket.",
        price: 599,
        urls: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80"]
      },
      {
        name: "Kids Long-Sleeve Ribbed Tee",
        desc: "Stretch ribbed cotton long sleeve tee. Super soft base layer.",
        price: 649,
        urls: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80"]
      },
      {
        name: "Kids Printed Graphic Tee",
        desc: "Fine jersey tee with non-toxic minimalist water-based prints.",
        price: 499,
        urls: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80"]
      }
    ],
    Bottomwear: [
      {
        name: "Kids Slim Denim Jeans",
        desc: "Comfortable stretch denim in a slim fit. An adjustable waistband.",
        price: 899,
        urls: ["https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"]
      },
      {
        name: "Kids Cotton Chino Shorts",
        desc: "Comes with adjustable waist button. Durable twill, perfect for play.",
        price: 699,
        urls: ["https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"]
      },
      {
        name: "Kids Organic Cotton Joggers",
        desc: "Elastic waist and cuffs. Extremely soft french terry fabric.",
        price: 799,
        urls: ["https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"]
      },
      {
        name: "Kids Twill Cargo Shorts",
        desc: "Spacious side flap pockets. Sturdy cotton construction.",
        price: 849,
        urls: ["https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"]
      },
      {
        name: "Kids Knit Leggings",
        desc: "Cotton spandex blend. Highly stretchable, snug fit for all day comfort.",
        price: 599,
        urls: ["https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"]
      },
      {
        name: "Kids Linen Tapered Trousers",
        desc: "Drawstring elastic waist. Light linen blend for easy wearing.",
        price: 999,
        urls: ["https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"]
      }
    ],
    Winterwear: [
      {
        name: "Kids Puffer Jacket",
        desc: "A lightweight, warm puffer jacket with a water-resistant outer shell.",
        price: 1999,
        urls: ["https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80"]
      },
      {
        name: "Cozy Fleece Sweatshirt",
        desc: "Perfect for active play. High-pile fleece locks warmth in.",
        price: 1199,
        urls: ["https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80"]
      },
      {
        name: "Kids Knit Cardigan",
        desc: "V-neck organic cotton chunky knit button cardigan.",
        price: 1499,
        urls: ["https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80"]
      },
      {
        name: "Kids Windbreaker Jacket",
        desc: "Hooded lightweight windproof shell, features full zip front.",
        price: 1299,
        urls: ["https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80"]
      },
      {
        name: "Kids Ribbed Knit Beanie Set",
        desc: "Includes soft knit stretch beanie and matching scarf.",
        price: 699,
        urls: ["https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80"]
      },
      {
        name: "Kids Heavy Fleece Zip-Up Hoodie",
        desc: "Thick fleece-back cotton hoodie with split kangaroo pockets.",
        price: 1399,
        urls: ["https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80"]
      }
    ]
  }
};

const sizesByCat = {
  Men: ["S", "M", "L", "XL", "XXL"],
  Women: ["XS", "S", "M", "L", "XL"],
  Kids: ["S", "M", "L"]
};

// Generate the 66 premium structured products
const generatedProducts = [];
const categories = ["Men", "Women", "Kids"];
const subCategories = ["Topwear", "Bottomwear", "Winterwear"];

categories.forEach(cat => {
  subCategories.forEach(sub => {
    const list = imagesData[cat][sub] || [];
    list.forEach((item, index) => {
      generatedProducts.push({
        name: item.name,
        description: item.desc,
        price: item.price,
        image: item.urls,
        category: cat,
        subCategory: sub,
        sizes: sizesByCat[cat],
        bestSeller: index < 2, // Set first two in each subcategory as bestseller
        date: Date.now() - (index * 1000 * 3600 * 24) // Slightly different dates
      });
    });
  });
});

async function seed() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    })
    console.log('Connected!')

    console.log('Clearing existing products...')
    await productModel.deleteMany({})
    console.log('Cleared!')

    console.log(`Inserting ${generatedProducts.length} products...`)
    const result = await productModel.insertMany(generatedProducts)
    console.log(`✅ Successfully seeded ${result.length} products!`)

    await mongoose.disconnect()
    console.log('Done.')
    process.exit(0)
  } catch (error) {
    console.error('Seed failed:', error.message)
    process.exit(1)
  }
}

seed()
