export function generateUserDTO(user) {
  return {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
    role: user.role
  };
}
