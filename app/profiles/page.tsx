import Container from "../components/Container";
import NullData from "@/app/components/NullData";
import Profiles from "./profiles";
import { getCurrentUser } from "@/actions/getCurrentUser";

const ProfilesUser = async () => {
  const currentUser = await getCurrentUser()

    if(!currentUser ){
        return <NullData title="Oops! Access denied" />
    }

  return (
    <div className="p-8 ">
      <Container>
        <Profiles  />
      </Container>
    </div>
  );
}
export default ProfilesUser;