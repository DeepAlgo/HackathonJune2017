std::string hello(std::string name){
  std::string s("Hello ");
  s += name;
  return s;
}
int main(int argc, char *argv[])
{
  std::string res = hello(argv);
  printf(res);
  return res.length();
}
