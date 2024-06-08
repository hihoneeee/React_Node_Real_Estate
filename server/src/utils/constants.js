const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const Roles = [
  {
    code: "DA5",
    value: "Admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "SU4",
    value: "User",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "GA5",
    value: "Agent",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "WO5",
    value: "Owner",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const User = Array.from([...Array(10).keys()]).map(() => {
  const roleCode = "WO5";
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phone: "0" + faker.string.numeric(9),
    email: faker.internet.email({
      provider: "gmail.com",
      allowSpecialCharacters: false,
    }),
    address: faker.location.streetAddress({ useFullAddresst: true }),
    password: hashPassword("123456"),
    avatar: faker.image.avatar(),
    roleCode: roleCode,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

const PropertyTypes = [
  {
    id: faker.string.uuid(),
    title: "House",
    description: "Newest House sale today",
    image: faker.image.urlLoremFlickr({
      width: 1000,
      height: 500,
      category: "House",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.string.uuid(), // Add UUID for each property type
    title: "Apartment",
    description: "Newest Apartment sale today",
    image: faker.image.urlLoremFlickr({
      width: 1000,
      height: 500,
      category: "Apartment",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.string.uuid(), // Add UUID for each property type
    title: "TownHouse",
    description: "Newest TownHouse sale today",
    image: faker.image.urlLoremFlickr({
      width: 1000,
      height: 500,
      category: "TownHouse",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const Property = Array.from([...Array(60).keys()]).map(() => ({
  id: faker.string.uuid(),
  title: faker.commerce.productName(),
  address: faker.helpers.arrayElement(User).address,
  userId: faker.helpers.arrayElement(User).id,
  owner: faker.helpers.arrayElement(User).id,
  listingType: faker.helpers.arrayElement(["sale", "rental"]),
  propertyTypeId: faker.helpers.arrayElement(PropertyTypes).id,
  price: faker.number.int({ max: 1000000, min: 1000 }),
  status: "pending",
  isAvailable: true,
  avatar: faker.image.urlLoremFlickr({ category: "realestate" }),
  images: JSON.stringify(
    Array.from([...Array(faker.number.int({ max: 7, min: 5 })).keys()]).map(
      () =>
        `${faker.image.urlLoremFlickr({
          category: "realestate",
        })}?random=${faker.string.numeric(30)}`
    )
  ),
  bedroom: faker.number.int({ max: 3, min: 1 }),
  bathroom: faker.number.int({ max: 3, min: 1 }),
  size: faker.number.int({ max: 100, min: 10 }),
  yearBuild: faker.number.int({ max: 2024, min: 2010 }),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const Features = [
  {
    id: faker.string.uuid(),
    title: "Air Conditioning",
    image: faker.image.urlLoremFlickr({
      width: 1000,
      height: 500,
      category: "AirConditioning",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.string.uuid(),
    title: "Garage",
    image: faker.image.urlLoremFlickr({
      width: 1000,
      height: 500,
      category: "Garage",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.string.uuid(),
    title: "Furnance",
    image: faker.image.urlLoremFlickr({
      width: 1000,
      height: 500,
      category: "Furnance",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.string.uuid(),
    title: "Pool",
    image: faker.image.urlLoremFlickr({
      width: 1000,
      height: 500,
      category: "Pool",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const Property_Feature = Array.from([...Array(60).keys()]).map(() => ({
  propertyId: faker.helpers.arrayElement(Property).id,
  featureId: faker.helpers.arrayElement(Features).id,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  Roles,
  User,
  PropertyTypes,
  Property,
  Features,
  Property_Feature,
};
