import MembersClient from "./MembersClient";
import { getMembers } from "./members-data";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const members = await getMembers();

  return <MembersClient members={members} />;
}
