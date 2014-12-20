# Function to remove any private / non-user-data properties
# We've hung off the object
module.exports = (obj) ->
	cleanJson = (obj) ->
		# LOOP THROUGH ARRAYS
		if obj instanceof Array
			cleaned = []
			i = 0

			while i < obj.length
				cleaned.push cleanJson(obj[i])
				i++
			cleaned

		# CLEAN AN OBJECT
		else if obj and (typeof obj is "object")
			cleaned = {}
			for key of obj

				# Is this a Private Variable?
				privateVariable = key.charAt(0) is "$"

				# Contain any black-listed Mongo fields?
				isBlackListed = no
				blackListFields =
					for blackListed in [ '_id', '__v', '__t' ]
						if key is blackListed
							isBlackListed = yes
							break

				# Skip to next loop if private / blacklisted
				if privateVariable or isBlackListed then continue

				cleaned[key] = cleanJson(obj[key])
			cleaned
		else
			obj

	# Init
	cleanJson( obj )