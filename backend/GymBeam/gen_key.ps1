# Create a random number generator
$rng = New-Object System.Security.Cryptography.RNGCryptoServiceProvider

# Specify the key length in bytes (e.g. 32 bytes is 256 bits)
$keyLength = 32

# Initialize a byte array to hold the key
$keyBytes = New-Object byte[] $keyLength

# Generate a cryptographically secure key
$rng.GetBytes($keyBytes)

# Convert key to hexadecimal string
$signingKey = [System.BitConverter]::ToString($keyBytes).Replace("-", "")

# Set an environment variable with the generated key
[Environment]::SetEnvironmentVariable("GymBeamSecret", $signingKey, "User")
