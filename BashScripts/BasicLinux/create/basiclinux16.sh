#!/bin/bash

echo "Step 16 which basicman"
printf "#!/bin/bash\n\necho 'Welcome to Basicman, simple program that does nothing :)'" | sudo tee /usr/local/bin/basicman > /dev/null
sudo chmod 755 /usr/local/bin/basicman
