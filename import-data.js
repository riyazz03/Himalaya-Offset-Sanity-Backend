// import-data.js
const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'k0dxt5dl', // Your project ID
  dataset: 'production',
  useCdn: false,
  token: 'skKRGvhZXVxni5SKVjot4qIFtn5wZx5qrnZ4qlOVFaxHOslBg7DcVbBFgNvsnqPjCNLQChyRGG79LUVy8OHe5qzQwnbWROHBC3BrXFq9fQzfYEkqOiPV57hVRml2GgrnGAC7PJyJDMdxGjpEnVMmHahywjaR2vv3MGn9Dut2Gye0WREhfrv5', // Your write token
  apiVersion: '2023-05-03',
})

// Your categories and subcategories data
const categoriesData = [
  {
    name: "Business Cards / Visiting Cards",
    description: "Professional business cards in various styles and finishes",
    subcategories: [
      "Standard Paper Cards",
      "Textured Cards", 
      "Laminated Cards",
      "Spot UV Cards",
      "Foil Stamped Cards",
      "Embossed / Debossed Cards",
      "Transparent / Plastic Cards",
      "Die-Cut Cards",
      "Magnetic Visiting Cards",
      "Metal Cards (Luxury)",
      "Folded / Tent Cards",
      "QR Code Cards"
    ]
  },
  {
    name: "Brochures & Flyers",
    description: "High-quality brochures and flyers for marketing and promotion",
    subcategories: [
      "Single-Sheet Flyers",
      "Bi-Fold Brochures",
      "Tri-Fold Brochures", 
      "Gate Fold Brochures",
      "Accordion Fold Brochures",
      "Roll Fold Brochures",
      "Product Brochures",
      "Service Brochures",
      "Corporate Brochures",
      "Event Flyers",
      "Promotional Flyers",
      "Menu Flyers",
      "Real Estate Brochures"
    ]
  },
  {
    name: "Letterheads & Envelopes",
    description: "Professional letterheads and envelopes for business correspondence",
    subcategories: [
      "Standard Letterheads",
      "Premium Letterheads",
      "Color Letterheads",
      "Watermarked Letterheads",
      "Embossed / Foil Letterheads",
      "Digital Letterheads",
      "Standard Business Envelopes",
      "Window Envelopes",
      "Custom Size Envelopes",
      "Padded / Bubble Envelopes",
      "Textured or Premium Envelopes",
      "Security Envelopes"
    ]
  },
  {
    name: "Posters",
    description: "High-quality posters for advertising and decoration",
    subcategories: [
      "Litho Posters",
      "Oil Posters",
      "Glossy Posters",
      "Matte Posters",
      "UV Coated Posters"
    ]
  },
  {
    name: "Calendars",
    description: "Custom calendars for promotional and personal use",
    subcategories: [
      "Wall Calendars",
      "Desk Calendars / Table Calendars",
      "Daily Tear-Off Calendars",
      "Monthly View Calendars",
      "Poster Calendars",
      "Flip Calendars",
      "Corporate Calendars",
      "Religious / Festival Calendars",
      "Photo Calendars",
      "Planner Calendars",
      "Magnetic Calendars",
      "Pocket Calendars"
    ]
  },
  {
    name: "Catalogs & Booklets",
    description: "Professional catalogs and booklets for product showcasing",
    subcategories: [
      "Product Catalogs",
      "Service Catalogs",
      "Corporate Booklets",
      "Instruction Booklets"
    ]
  },
  {
    name: "Packaging Boxes & Labels",
    description: "Custom packaging solutions and labels",
    subcategories: [
      "Custom Packaging Boxes",
      "Product Labels",
      "Shipping Labels",
      "Barcode Labels"
    ]
  },
  {
    name: "Wedding Cards & Invitations",
    description: "Elegant wedding cards and invitation designs",
    subcategories: [
      "Traditional Wedding Cards",
      "Modern Wedding Cards",
      "Embossed Wedding Cards",
      "Foil Stamped Wedding Cards"
    ]
  },
  {
    name: "Stickers & Tags",
    description: "Custom stickers and tags in various finishes",
    subcategories: [
      "Vinyl Stickers (Glossy or Matte)",
      "Paper Stickers (Chromalux or Art Paper)",
      "Transparent Stickers",
      "Reflective Stickers",
      "Pre-Cut Sticker Sheets",
      "Full Sheet Stickers"
    ]
  },
  {
    name: "Bill Books / Invoice Books",
    description: "Professional bill books and invoice books",
    subcategories: [
      "Single Copy Bill Books",
      "Duplicate Copy Bill Books", 
      "Triplicate Copy Bill Books",
      "Custom Invoice Books"
    ]
  },
  {
    name: "Banners",
    description: "Durable banners for advertising and events",
    subcategories: [
      "Flex Banners",
      "Vinyl Banners",
      "Mesh Banners",
      "Roll-Up Banners",
      "Hanging Banners",
      "Pull-Up Banners",
      "Step and Repeat Banners"
    ]
  },
  {
    name: "Sunpack Boards",
    description: "Lightweight and durable signage boards",
    subcategories: [
      "Single-Color Printed Sunpack",
      "Multicolor Offset Sunpack",
      "Eco-Solvent / UV Printed Sunpack",
      "2mm Sunpack",
      "3mm Sunpack",
      "5mm+ Sunpack"
    ]
  },
  {
    name: "Certificates",
    description: "Professional certificates for awards and achievements",
    subcategories: [
      "Award Certificates",
      "Training Certificates",
      "Achievement Certificates",
      "Custom Certificates"
    ]
  },
  {
    name: "Presentation Folders",
    description: "Professional folders for presentations and documents",
    subcategories: [
      "Standard Presentation Folders",
      "Custom Presentation Folders",
      "Pocket Folders"
    ]
  },
  {
    name: "Standees",
    description: "Portable display standees for promotions",
    subcategories: [
      "Roll-up Standees",
      "X-Banner Standees",
      "Promotional Standees"
    ]
  }
]

const gradients = [
  'linear-gradient(135deg, #ff6b6b, #ee5a24)',
  'linear-gradient(135deg, #2ed573, #1e8449)',
  'linear-gradient(135deg, #ffa502, #ff6348)',
  'linear-gradient(135deg, #3498db, #2980b9)',
  'linear-gradient(135deg, #9b59b6, #8e44ad)'
]

async function importData() {
  console.log('Starting import...')
  
  for (let i = 0; i < categoriesData.length; i++) {
    const categoryData = categoriesData[i]
    
    // Create category
    const category = {
      _type: 'category',
      name: categoryData.name,
      slug: {
        _type: 'slug',
        current: categoryData.name.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      },
      description: categoryData.description,
      sortOrder: i + 1,
      isActive: true,
      bgColor: gradients[i % gradients.length]
    }
    
    try {
      const createdCategory = await client.create(category)
      console.log(`✅ Created category: ${categoryData.name}`)
      
      // Create subcategories
      for (let j = 0; j < categoryData.subcategories.length; j++) {
        const subName = categoryData.subcategories[j]
        
        const subcategory = {
          _type: 'subcategory',
          name: subName,
          slug: {
            _type: 'slug',
            current: subName.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          },
          category: {
            _type: 'reference',
            _ref: createdCategory._id
          },
          sortOrder: j + 1,
          isActive: true,
          minOrderQuantity: 1,
          isFeatured: j === 0, // Mark first item as featured
          // Add sample pricing for demonstration
          pricingTiers: [
            {
              _key: `tier-100`,
              quantity: 100,
              price: 200,
              pricePerUnit: 2.0,
              isRecommended: false
            },
            {
              _key: `tier-200`,
              quantity: 200,
              price: 340,
              pricePerUnit: 1.7,
              savingsPercentage: 15,
              isRecommended: true,
              badge: "15% savings"
            },
            {
              _key: `tier-300`,
              quantity: 300,
              price: 480,
              pricePerUnit: 1.6,
              savingsPercentage: 20,
              isRecommended: false,
              badge: "20% savings"
            }
          ],
          deliveryOptions: [
            {
              _key: 'standard',
              type: 'standard',
              description: 'Standard delivery'
            },
            {
              _key: 'same-day',
              type: 'same_day',
              description: 'Same Day Delivery - Mumbai, Pune & Bengaluru',
              locations: 'Mumbai, Pune & Bengaluru'
            }
          ]
        }
        
        await client.create(subcategory)
        console.log(`   ✅ Created subcategory: ${subName}`)
      }
      
    } catch (error) {
      console.error(`❌ Error creating ${categoryData.name}:`, error)
    }
  }
  
  console.log('🎉 Import completed!')
}

importData()