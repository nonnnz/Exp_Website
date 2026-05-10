import MembersClient from "./MembersClient";
import { getMembers } from "./members-data";

export default async function MembersPage() {
  const members = await getMembers();

  return <MembersClient members={members} />;
}
