1. Connect to your Amazon Linux 2 instance using SSH.

2. Update the package manager's cache:
   sudo yum update

3. Install the necessary dependencies for building Node.js from source:
   sudo yum install -y gcc-c++ make

4. Download the Node.js binary distribution for Linux:
   curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -

5. Install Node.js:
   sudo yum install -y nodejs

6. Verify the installation:
   node -v
   npm -v

7 . clone repository
    git clone https://github.com/princepatrice/Access-DyanomoDB-BY-EC2

8 . install package 
    npm install

9. run
    npm start
