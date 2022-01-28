Mini World of Pipeline CRM
Pipeline CRM is a customer relationship manager that incorporates pipelines of projects, products and monetary value. It will allow Teams to track the progress of projects in these pipelines.
The Pipeline CRM's features will include:
	-pipelines with project levels of completion
	-how much money has been received in the pipelines
        -with percentages
	-clients with a status showing if they are active or dormant
    -a way for team members to upload invoices for storage

Pipeline CRM entities with a description of what each entity should include:
CLIENTS(companies)
	-standard information of clients
        -name
    -information will include:
		-alias for types(will be a separate entity)
    -status of clients (active/dormant)
    -client contacts
	-client notes
        -information on timestamps
        -information on who made that note
        -new notes should notify clients and team members

CONTACTS
    -standard information of client contacts
        -name
        -title
        -what contact they belong to
    -information will include:
		-alias for types(will be a separate entity)
    -contact notes
        -information on timestamps
        -information on who made that note
        -new notes should notify clients and team members

PIPELINES
	-name of pipeline
        - name category suggestions = software, development, consulting, powerBI
	-team name that is currently assigned to pipeline
	-pipeline notes
		-information on timestamps
        -information on who made that note
        -new notes should notify clients and team members
	-pipeline completion
		-code with a value
            -NEW: 0.0%, 1/4 = 25.0%, 1/2 = 50.0%, DONE: 100.0%
	-status
		-status name suggestions: backlog, waiting, in progress, complete, billed, cancelled

PRODUCT
	-name of product
    -name of price
    -pipeline it belongs to
	-product notes
		-information on timestamps
        -information on who made that note
        -new notes should notify clients and team members

PIPELINE ITEM 
	-name of item
    -contracted revenue(price, decimal value, 2 places)
    -timestamp of planned start
    -timestamp of planned end
    -actual start
    -actual end
	-completion
	-status
	-client it refers to
	-product it refers to
	-item notes
		-information on timestamps
        -information on who made that note
        -new notes should notify clients and team members

INVOICE
	-invoice number
	-name/description
	-bill date
	-due date
	-what client it belongs to

INVOICE ITEM
	-description of item
	-monetary amount
	-what item it belongs to
	-which invoice it refers to

RECEIPT
	-timestamp of time received
	-amount received
	-what invoice it refers to
	-there can be more than one receipt to each invoice until the invoice is paid of