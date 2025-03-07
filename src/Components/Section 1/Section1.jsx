import { Box, HStack } from '@chakra-ui/react'
import Section1Card from './Section1Card'

import Image1 from '../../assets/Section 1 Card 1 Image.png'
import Image2 from '../../assets/Section 1 Card 2 Image.png'
import Image3 from '../../assets/Section 1 Card 3 Image.png'
import Image4 from '../../assets/Section 1 Card 4 Image.png'

function Section1() {
  return (
    <Box
    width={'100%'}
    min-height={'100vh'}
    // backgroundColor={'red'}
    >
     
     {/* Section 1 Cards */}
     <HStack justifyContent={'center'} alignItems={'center'} height={'100%'} flexWrap={'wrap'}>
      <Section1Card cardImage={Image1}  cardNumber={'01'} cardTitle={'No Pesticides'} cardText={"The customer is very important, the customer will be followed by the customer"}/>
      <Section1Card cardImage={Image2}  cardNumber={'02'} cardTitle={'Organic Products'} cardText={"Tomorrow the pillow of the estate now flatters the free weekend but the time"}/>
      <Section1Card cardImage={Image3}  cardNumber={'03'} cardTitle={'Fresh Eatables'} cardText={"How many kids and not even a salad. Who will choose the policy?"}/>
      <Section1Card cardImage={Image4}  cardNumber={'04'} cardTitle={'Healthy Life'} cardText={"In order for the salad to be pulled by trucks, it needs to be a lot of land. Let's get into some salad"} />
      
     </HStack>
    </Box>
  )
}

export default Section1
