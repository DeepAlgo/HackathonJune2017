int main(int argc, char *argv[])
{
  int var=3;
  int more = var + 1;
  if(argc == 0){
    var = 2;
  }
  else{
    var = 4;
  }
  printf(more);
  return var;
}
