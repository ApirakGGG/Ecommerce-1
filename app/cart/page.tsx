import { getCurrentUser } from "@/actions/getCurrentUser";
import getProducts from "@/actions/getProducts";
import Container from "../components/Container";
import CartClient from "./CartClient";


const Cart = async() => {

const currentUser = await getCurrentUser()
const recommendedProducts = await getProducts({ category: null })

    return ( <div className="pt-8">
        <Container>
          <CartClient currentUser={currentUser} recommendedProducts={recommendedProducts} />
        </Container>
    </div> );
}
 
export default Cart;