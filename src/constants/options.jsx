export const SelectTravelList = [
    {
        id: 1,
        title: 'Solo Travel',
        desc: 'Experience the world on your own terms',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'Couple Travel',
        desc: 'Create unforgettable memories with your partner',
        icon: '❤️',
        people: '2'
    },
    {
        id: 3,
        title: 'Family Travel',
        desc: 'Bond with your family while discovering new places',
        icon: '👨‍👩‍👧‍👦',
        people: '3-5'
    },
    {
        id: 4,
        title: 'Group Travel',
        desc: 'Travel with friends or like-minded individuals',
        icon: '🛥️',
        people: '6+'
    }
]


export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Budget',
        desc: 'Affordable options for budget-conscious travelers.',
        icon: '💰',
        range: '$'
    },
    {
        id: 2,
        title: 'Mid-Range',
        desc: 'Comfortable and enjoyable experiences',
        icon: '💵',
        range: '$$'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'costly experiences for those who want the best',
        icon: '💎',
        range: '$$$'
    }
]


export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {totaldays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with

HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and give itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totaldays} days with each day plan with

best time to visit in JSON format`